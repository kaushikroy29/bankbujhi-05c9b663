import time
import sys
import os
import subprocess
import requests
from dotenv import load_dotenv

# Load env
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env'))

def get_pending_run():
    url = os.environ.get("VITE_SUPABASE_URL")
    key = os.environ.get("VITE_SUPABASE_ANON_KEY")
    
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }
    
    # Find runs created by UI (status=running) that haven't been picked up?
    # Actually UI sets status='running'. 
    # We should probably look for ones created recently that don't have 'completed_at'
    # But run_all.py creates one with status='running' and completed_at=null too.
    # Let's verify scraper logic in run_all.py: it creates a new record.
    
    # To support UI trigger:
    # UI creates record with ID X.
    # Watcher finds record X (status=running, completed_at=null, run_type=manual).
    # Watcher runs scrape logic updating record X.
    
    # Let's query for the most recent run with status='running' and no completed_at
    resp = requests.get(
        f"{url}/rest/v1/scraper_runs?status=eq.running&completed_at=is.null&order=started_at.desc&limit=1", 
        headers=headers
    )
    
    runs = resp.json()
    return runs[0] if runs else None

def main():
    print("👀 Watching for scraper runs... (Press Ctrl+C to stop)")
    print("   (Click 'Run Scraper Now' in Admin Dashboard to trigger)")
    
    last_run_id = None
    
    while True:
        try:
            run = get_pending_run()
            
            if run and run['id'] != last_run_id:
                # Check if this run is "new" (created within last minute? or just different ID)
                # To avoid picking up a run that is currently executing by this same script (if we updated run_all to take ID)
                # For now, let's just trigger run_all.py
                
                print(f"🚀 Detected trigger! Run ID: {run['id']}")
                last_run_id = run['id']
                
                # Execute run_all.py
                # Note: run_all.py creates its *own* run record currently.
                # We should update run_all.py to accept an existing RUN_ID if provided.
                
                env = os.environ.copy()
                env['EXISTING_RUN_ID'] = run['id']
                
                subprocess.run([sys.executable, "run_all.py"], env=env)
                print("✅ Run complete. Returning to watch mode.")
                
            time.sleep(5)
            
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
