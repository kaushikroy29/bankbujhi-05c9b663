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

# Fetch all cards with bank name
r = requests.get(f"{url}/rest/v1/credit_cards?select=id,name,bank_id,image_url,banks(name)", headers=headers)
cards = r.json()

print(json.dumps(cards, indent=2))
