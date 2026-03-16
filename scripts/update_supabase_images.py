# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "supabase",
# ]
# ///

import json
import os
from supabase import create_client, Client

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(BASE_DIR, 'cards_list.json')
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
    
    if not url or not key:
        print("Error: Supabase credentials not found in .env")
        return

    supabase: Client = create_client(url, key)

    with open(JSON_PATH, 'r') as f:
        cards = json.load(f)

    updated_count = 0
    
    print(f"Checking {len(cards)} cards for updates...")

    for card in cards:
        image_url = card.get('image_url')
        if not image_url:
            continue
            
        bank_id = card.get('bank_id')
        card_name = card.get('name')
        
        # We try to update based on bank_id and name
        # First, find the card ID
        try:
            # Look up the card
            res = supabase.table('credit_cards') \
                .select('id') \
                .eq('bank_id', bank_id) \
                .eq('name', card_name) \
                .execute()
            
            if res.data and len(res.data) > 0:
                card_id = res.data[0]['id']
                
                # Update the card
                update_res = supabase.table('credit_cards') \
                    .update({'image_url': image_url}) \
                    .eq('id', card_id) \
                    .execute()
                
                # Check if update was successful (res.data usually contains updated rows)
                if update_res.data:
                    updated_count += 1
                    print(f"Updated: {card_name} -> {image_url}")
                else:
                    print(f"Update returned no data for {card_name}")
            else:
                print(f"Card not found in DB: {card_name} (Bank ID: {bank_id})")

        except Exception as e:
            print(f"Error updating {card_name}: {e}")

    print(f"Supabase update complete. Updated {updated_count} cards.")

if __name__ == "__main__":
    main()
