import os
import sys
import requests
from dotenv import load_dotenv

# Load env from parent dir
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env'))

def main():
    url = os.environ.get("VITE_SUPABASE_URL")
    key = os.environ.get("VITE_SUPABASE_ANON_KEY")
    
    print(f"Checking visibility on: {url}")
    
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }
    
    # 1. Check Banks (Exact match to frontend query)
    print("\n--- Checking 'banks' table (is_active=true) ---")
    resp = requests.get(f"{url}/rest/v1/banks?select=*&is_active=eq.true", headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        print(f"✅ Success! Found {len(data)} banks.")
        if len(data) > 0:
            print(f"Sample: {data[0].get('name')} | is_active: {data[0].get('is_active')}")
    else:
        print(f"❌ Failed: {resp.status_code}")
        print(resp.text)

    # 2. Check Scraped Data
    print("\n--- Checking 'scraped_data' table (as Anon) ---")
    resp = requests.get(f"{url}/rest/v1/scraped_data?select=*", headers=headers)
    if resp.status_code == 200:
        data = resp.json()
        print(f"✅ Success! Found {len(data)} items.")
    else:
        print(f"❌ Failed: {resp.status_code}")
        print(resp.text)

if __name__ == "__main__":
    main()
