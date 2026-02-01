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

r = requests.get(f"{url}/rest/v1/credit_cards?select=name,image_url,banks(name)&image_url=is.null", headers=headers)
cards = r.json()

with open('missing_details.json', 'w', encoding='utf-8') as f:
    json.dump(cards, f, indent=2)

print(f"Saved {len(cards)} cards to missing_details.json")
