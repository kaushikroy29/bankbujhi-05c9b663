# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "supabase",
# ]
# ///

import os
from collections import defaultdict
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

    print("--- Scanning for Duplicate Banks ---")
    banks = supabase.table('banks').select('id, name').execute().data
    
    bank_map = defaultdict(list)
    for b in banks:
        name_norm = b['name'].strip().lower()
        bank_map[name_norm].append(b)

    duplicate_banks = {k: v for k, v in bank_map.items() if len(v) > 1}
    
    if not duplicate_banks:
        print("No duplicate banks found.")
    else:
        for name, entries in duplicate_banks.items():
            print(f"Duplicate Bank: '{name}' ({len(entries)} copies)")
            for e in entries:
                print(f"  - ID: {e['id']} | Name: {e['name']}")

    print("\n--- Scanning for Duplicate Credit Cards ---")
    # Fetch all cards with bank names
    # Note: Supabase-py join syntax is simple string
    cards = supabase.table('credit_cards').select('id, name, bank_id, banks(name)').execute().data
    
    card_map = defaultdict(list)
    for c in cards:
        # Key is (bank_id, card_name_normalized)
        # If bank_id is None, treat as separate group or skip? Let's group by None too.
        b_id = c['bank_id'] or "no_bank"
        c_name = c['name'].strip().lower()
        key = (b_id, c_name)
        card_map[key].append(c)

    duplicate_cards = {k: v for k, v in card_map.items() if len(v) > 1}

    if not duplicate_cards:
        print("No duplicate credit cards found.")
    else:
        for (b_id, c_name), entries in duplicate_cards.items():
            bank_name = entries[0]['banks']['name'] if entries[0].get('banks') else "Unknown Bank"
            print(f"Duplicate Card: '{c_name}' at {bank_name} ({len(entries)} copies)")
            for e in entries:
                print(f"  - ID: {e['id']} | Name: {e['name']}")

if __name__ == "__main__":
    main()
