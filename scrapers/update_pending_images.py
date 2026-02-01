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

# 1. Fetch pending items
print("Fetching pending items...")
r = requests.get(f"{url}/rest/v1/scraped_data?select=id,scraped_json,data_type&status=eq.pending", headers=headers)
items = r.json()

# 2. Update image_url in filtered list
updates = {
    "BRAC Bank Signature Card": "/cards/brac-signature.png",
    "BRAC Bank Platinum Card": "/cards/brac-platinum.png",
    "EBL Visa Signature Credit Card": "/cards/ebl-visa-signature.png",
    "EBL Visa Platinum Credit Card": "/cards/ebl-visa-platinum.png"
}

count = 0
for item in items:
    name = item.get('scraped_json', {}).get('name')
    if name in updates:
        # Update the scraped_json to include image_url
        item['scraped_json']['image_url'] = updates[name]
        
        # Patch the record in DB
        patch_url = f"{url}/rest/v1/scraped_data?id=eq.{item['id']}"
        resp = requests.patch(patch_url, json={"scraped_json": item['scraped_json']}, headers=headers)
        if resp.status_code < 300:
            count += 1
            print(f"Updated image for {name}")
        else:
            print(f"Failed to update {name}: {resp.text}")

print(f"Total pending items updated: {count}")
