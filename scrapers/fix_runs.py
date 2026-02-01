
import os
import requests
from dotenv import load_dotenv

load_dotenv('e:/bankbujhi git/bankbujhi-05c9b663/.env')
load_dotenv('e:/bankbujhi git/bankbujhi-05c9b663/.env.local', override=True)

url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_ANON_KEY") or os.environ.get("SUPABASE_SERVICE_KEY")

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def get_runs():
    # Explicitly ask for running items
    endpoint = f"{url}/rest/v1/scraper_runs?status=eq.running&select=*"
    print(f"Querying: {endpoint} with key starting {key[:5]}...")
    resp = requests.get(endpoint, headers=headers)
    return resp.json()

def fix_stuck_runs():
    runs = get_runs()
    print("Current runs:")
    stuck_ids = []
    for run in runs:
        print(f"ID: {run['id']}, Status: {run['status']}, Started: {run['started_at']}")
        if run['status'] == 'running':
            stuck_ids.append(run['id'])
    
    if not stuck_ids:
        print("No stuck runs found.")
        return

    print(f"Found {len(stuck_ids)} stuck runs. Updating to 'failed'...")
    
    for rid in stuck_ids:
        update_url = f"{url}/rest/v1/scraper_runs?id=eq.{rid}"
        data = {"status": "failed", "errors": [{"error": "Manually marked as failed by cleanup script"}]}
        resp = requests.patch(update_url, json=data, headers=headers)
        if resp.status_code < 300:
             print(f"Fixed {rid}")
        else:
             print(f"Failed to fix {rid}: {resp.text}")

if __name__ == "__main__":
    fix_stuck_runs()
