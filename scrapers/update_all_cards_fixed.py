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

# Updates to apply (to 'credit_cards' table)
updates = {
    "American Express Platinum Credit Card": "/cards/city-amex-platinum.png",
    "City Bank American Express Platinum Credit Card": "/cards/city-amex-platinum.png",
    "BRAC Bank Signature Card": "/cards/brac-signature.png",
    "BRAC Bank Platinum Card": "/cards/brac-platinum.png",
    "EBL Visa Signature Credit Card": "/cards/ebl-visa-signature.png",
    "EBL Visa Platinum Credit Card": "/cards/ebl-visa-platinum.png"
}

print("Updating credit cards table...")
count = 0
for name, image_url in updates.items():
    # Use params for safe encoding
    patch_url = f"{url}/rest/v1/credit_cards"
    params = {"name": f"eq.{name}"}
    
    resp = requests.patch(patch_url, params=params, json={"image_url": image_url}, headers=headers)
    
    if resp.status_code < 300:
        print(f"Patched {name}")
    else:
        print(f"Failed to patch {name}: {resp.text}")

print("Done updating credit_cards.")
