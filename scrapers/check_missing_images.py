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
cards = r.json()

missing = [c for c in cards if not c.get('image_url')]

if not missing:
    print("SUCCESS: All cards have images!")
else:
    print(f"Found {len(missing)} cards without images:")
    for c in missing:
        print(f"- {c['name']}")
