import os
import sys
import requests
from dotenv import load_dotenv

# Load env variables from .env file in parent directory
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env'))

def main():
    url = os.environ.get("VITE_SUPABASE_URL")
    key = os.environ.get("VITE_SUPABASE_ANON_KEY")
    
    if not url or not key:
        print("Error: Supabase credentials not found")
        return

    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }

    # Check Banks
    try:
        resp = requests.get(f"{url}/rest/v1/banks?select=count", headers=headers)
        # PostgREST returns rows, or Range header contains count if requested with Prefer: count=exact
        # But simple get returns array.
        
        # Proper count request
        headers["Prefer"] = "count=exact"
        resp = requests.get(f"{url}/rest/v1/banks?select=*", headers=headers)
        
        count = 0
        content_range = resp.headers.get("Content-Range")
        if content_range:
            count = int(content_range.split('/')[-1])
        else:
            count = len(resp.json())
            
        print(f"Banks count: {count}")
        
        if count > 0:
            print(" - Sample banks:")
            banks = resp.json()[:3]
            for b in banks:
                print(f"   - {b.get('name')} ({b.get('website_url')})")
        else:
            print("WARNING: No banks found in database.")

    except Exception as e:
        print(f"Error checking banks: {e}")

    # Check Scraper Runs
    try:
        headers["Prefer"] = "count=exact"
        resp = requests.get(f"{url}/rest/v1/scraper_runs?select=*", headers=headers)
        count = 0
        content_range = resp.headers.get("Content-Range")
        if content_range:
            count = int(content_range.split('/')[-1])
        print(f"Scraper runs: {count}")
    except Exception as e:
        print(f"Error checking scraper runs: {e}")

if __name__ == "__main__":
    main()
