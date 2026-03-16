# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "supabase",
# ]
# ///

import json
import os
from supabase import create_client, Client

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, '.env')

def load_env():
    config = {}
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, val = line.strip().split('=', 1)
                    config[key] = val
    return config

def main():
    config = load_env()
    url = config.get('VITE_SUPABASE_URL')
    key = config.get('VITE_SUPABASE_ANON_KEY')
    supabase: Client = create_client(url, key)
    
    # Manual Data Update (collected from standard rates in BD market)
    updates = [
        {
            "bank_name": "BRAC Bank",
            "card_name": "Visa Platinum Credit Card",
            "annual_fee": "BDT 5,000",
            "interest_rate": "20% p.a."
        },
        {
            "bank_name": "BRAC Bank",
            "card_name": "Visa Signature Credit Card",
            "annual_fee": "BDT 10,000",
            "interest_rate": "20% p.a."
        },
        {
            "bank_name": "Eastern Bank PLC",
            "card_name": "Visa Platinum Credit Card", 
            "annual_fee": "BDT 5,000",
            "interest_rate": "20% p.a."
        },
        {
            "bank_name": "Eastern Bank PLC",
            "card_name": "Visa Signature Credit Card", 
            "annual_fee": "BDT 10,000", 
            "interest_rate": "20% p.a."
        },
        {
            "bank_name": "Eastern Bank PLC", 
            "card_name": "EBL Skybanc Dual Currency",
            "annual_fee": "BDT 575",
            "interest_rate": "N/A (Prepaid)"
        },
         {
            "bank_name": "City Bank", 
            "card_name": "American Express Gold Credit Card",
            "annual_fee": "BDT 3,000",
            "interest_rate": "20% p.a."
        }
    ]

    print(f"Applying {len(updates)} manual fee updates...")

    for item in updates:
        try:
            # We match by Name AND Bank Name (via joining/fetching manually would be safer, 
            # but usually Name is unique enough within context or we just update all matches)
            
            # Since Supabase table is 'credit_cards', and 'bank_id' is foreign key...
            # We first need to find the bank_id for the bank name? 
            # OR we can just update by card name if they are distinct enough. 
            # Let's try name only for simplicity, assuming card names like "Visa Platinum Credit Card" might duplicate across banks.
            # Actually, duplicate names exist ("Visa Platinum Credit Card" for both EBL and BRAC).
            
            # So: Find Bank ID first
            bank_res = supabase.table('banks').select('id').eq('name', item['bank_name']).execute()
            if not bank_res.data:
                print(f"Bank not found: {item['bank_name']}")
                continue
            
            bank_id = bank_res.data[0]['id']
            
            # Update Card
            res = supabase.table('credit_cards') \
                .update({
                    'annual_fee': item['annual_fee'],
                    'interest_rate': item['interest_rate']
                }) \
                .eq('bank_id', bank_id) \
                .ilike('name', f"%{item['card_name']}%") \
                .execute()
                
            if res.data:
                print(f"Updated {item['bank_name']} - {item['card_name']}: {len(res.data)} rows")
            else:
                print(f"No match for {item['bank_name']} - {item['card_name']}")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
