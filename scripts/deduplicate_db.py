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

def deduplicate_banks(supabase):
    print("\n=== Deduplicating Banks ===")
    banks = supabase.table('banks').select('*').execute().data
    
    # Group by name
    bank_map = defaultdict(list)
    for b in banks:
        name_norm = b['name'].strip().lower()
        bank_map[name_norm].append(b)

    for name, entries in bank_map.items():
        if len(entries) < 2:
            continue
            
        # Sort by creation time (keep oldest or newest? Oldest usually safer for existing refs)
        # Let's keep the one with the most data if possible, else oldest.
        entries.sort(key=lambda x: x['created_at'])
        master = entries[0]
        duplicates = entries[1:]
        
        print(f"Merging '{master['name']}': Keeping {master['id']}, deleting {len(duplicates)} duplicates.")
        
        for dup in duplicates:
            # Re-link Credit Cards
            supabase.table('credit_cards').update({'bank_id': master['id']}).eq('bank_id', dup['id']).execute()
            # Re-link Loans
            supabase.table('loan_products').update({'bank_id': master['id']}).eq('bank_id', dup['id']).execute()
            # Re-link Savings
            supabase.table('savings_rates').update({'bank_id': master['id']}).eq('bank_id', dup['id']).execute()
            
            # Delete Duplicate Bank
            supabase.table('banks').delete().eq('id', dup['id']).execute()

def deduplicate_cards(supabase):
    print("\n=== Deduplicating Credit Cards ===")
    # Fetch all cards
    cards = supabase.table('credit_cards').select('*').execute().data
    
    # Group by (bank_id, name)
    card_map = defaultdict(list)
    for c in cards:
        # Use simple key
        key = (c['bank_id'], c['name'].strip().lower())
        card_map[key].append(c)

    for (bank_id, name), entries in card_map.items():
        if len(entries) < 2:
            continue
            
        # Priority: Has Image > Has Fees > Created At
        def priority_score(c):
            score = 0
            if c.get('image_url'): score += 10
            if c.get('fees') or c.get('annual_fee'): score += 5
            return score

        entries.sort(key=priority_score, reverse=True)
        master = entries[0]
        duplicates = entries[1:]
        
        print(f"Merging '{master['name']}': Keeping {master['id']} (Score: {priority_score(master)}), deleting {len(duplicates)}.")
        
        for dup in duplicates:
            # Delete duplicate card
            # Note: dependent tables like 'user_watchlist' might refer to this ID. 
            # Ideally we update those too, but 'user_watchlist' schema uses 'product_id' string.
            # Let's try to update watchlist refs just in case.
            supabase.table('user_watchlist').update({'product_id': master['id']}).eq('product_id', dup['id']).execute()
            supabase.table('user_notifications').update({'product_id': master['id']}).eq('product_id', dup['id']).execute()
            
            # Finally delete
            supabase.table('credit_cards').delete().eq('id', dup['id']).execute()

def main():
    config = load_env()
    url = config.get('VITE_SUPABASE_URL')
    key = config.get('VITE_SUPABASE_ANON_KEY')
    supabase: Client = create_client(url, key)

    deduplicate_banks(supabase)
    deduplicate_cards(supabase)
    print("\nDeduplication complete.")

if __name__ == "__main__":
    main()
