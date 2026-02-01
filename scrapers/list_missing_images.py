import requests
import os
import json
from dotenv import load_dotenv

# Load env
load_dotenv('e:/bankbujhi git/bankbujhi-05c9b663/.env')

url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_ANON_KEY")

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

# Fetch items with null image_url
r = requests.get(f"{url}/rest/v1/credit_cards?select=name,image_url", headers=headers)
cards = [c['name'] for c in r.json() if not c.get('image_url')]

print(json.dumps(cards, indent=2))
