import requests
import os
import json
from dotenv import load_dotenv

load_dotenv('e:/bankbujhi git/bankbujhi-05c9b663/.env')

url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_ANON_KEY")

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json"
}

r = requests.get(f"{url}/rest/v1/credit_cards?select=name,image_url", headers=headers)
missing = [c['name'] for c in r.json() if not c.get('image_url')]

with open('missing_cards_list.json', 'w') as f:
    json.dump(missing, f, indent=2)

print(f"Saved {len(missing)} missing cards.")
