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

    # Fix City Bank Amex Gold
    print("Fixing City Bank Amex Gold image...")
    
    # Update Supabase directly where name is "American Express Gold Credit Card"
    # and bank is City Bank (we can filter by name usually)
    res = supabase.table('credit_cards') \
        .update({'image_url': '/cards/city-amex-gold.png'}) \
        .eq('name', 'American Express Gold Credit Card') \
        .execute()
        
    print(f"Updated {len(res.data)} Gold cards.")

if __name__ == "__main__":
    main()
