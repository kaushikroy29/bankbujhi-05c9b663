import os
import sys
import requests
from dotenv import load_dotenv

# Load env
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env'))

def main():
    url = os.environ.get("VITE_SUPABASE_URL")
    key = os.environ.get("VITE_SUPABASE_ANON_KEY")
    
    print(f"Testing connectivity to: {url}")
    
    if not url or not key:
        print("❌ Missing credentials in .env")
        return

    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    try:
        # Try to insert a test record into scraper_runs (or just read)
        # Read is safer
        print("Attempting to read from scraper_runs...")
        resp = requests.get(f"{url}/rest/v1/scraper_runs?select=count", headers=headers)
        
        if resp.status_code == 200:
            print("✅ Connection Successful! (Read)")
            print(f"Response: {resp.text[:100]}...")
        else:
            print(f"❌ Connection Failed with Status: {resp.status_code}")
            print(f"Response: {resp.text}")
            
    except Exception as e:
        print(f"❌ Exception during request: {e}")

if __name__ == "__main__":
    main()
