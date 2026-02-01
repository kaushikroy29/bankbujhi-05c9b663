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
    "Content-Type": "application/json",
    "Prefer": "return=representation"  # Ask for the updated row back
}

name = "American Express Platinum Credit Card"
params = {"name": f"eq.{name}"}
json_data = {"image_url": "/cards/city-amex-platinum.png"}

print(f"Attempting to update: {name}")
resp = requests.patch(f"{url}/rest/v1/credit_cards", params=params, json=json_data, headers=headers)

print(f"Status Code: {resp.status_code}")
print(f"Response: {resp.text}")
