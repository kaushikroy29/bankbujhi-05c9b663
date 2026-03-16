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
    
    # Try different name variations that failed previously
    updates = [
        {
            "bank_name": "BRAC Bank",
            "search_name": "Platinum",  # Broader search
            "annual_fee": "BDT 5,000",
            "interest_rate": "20% p.a."
        },
        {
            "bank_name": "Eastern Bank PLC",
            "search_name": "Skybanc",
            "annual_fee": "BDT 575",
            "interest_rate": "N/A (Prepaid)"
        }
    ]

    print(f"Retrying {len(updates)} manual fee updates...")

    for item in updates:
        try:
            bank_res = supabase.table('banks').select('id').eq('name', item['bank_name']).execute()
            if not bank_res.data:
                continue
            
            bank_id = bank_res.data[0]['id']
            
            res = supabase.table('credit_cards') \
                .update({
                    'annual_fee': item['annual_fee'],
                    'interest_rate': item['interest_rate']
                }) \
                .eq('bank_id', bank_id) \
                .ilike('name', f"%{item['search_name']}%") \
                .execute()
                
            print(f"Updated {item['bank_name']} - {item['search_name']}: {len(res.data)} rows")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
