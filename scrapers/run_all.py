#!/usr/bin/env python3
import os
import sys
import requests
from datetime import datetime
from dotenv import load_dotenv

# Add parent directory to path to allow imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scrapers.banks.brac_bank import BracBankScraper
from scrapers.banks.dbbl import DbblScraper
from scrapers.banks.ebl import EblScraper

# Load env variables from .env file in parent directory
# Load .env first, then .env.local to override (matching Vite's behavior)
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(parent_dir, '.env'))
load_dotenv(os.path.join(parent_dir, '.env.local'), override=True)  # Local overrides production

SCRAPERS = [
    BracBankScraper(),
    DbblScraper(),
    EblScraper(),
]

def main():
    url = os.environ.get("SUPABASE_URL") or os.environ.get("VITE_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("VITE_SUPABASE_ANON_KEY")
    
    if not url or not key:
        print("Error: Supabase credentials not found")
        return

    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    # Create or resume run record
    existing_run_id = os.environ.get("EXISTING_RUN_ID")
    
    # NEW: Check for pending runs created by UI if no specific ID provided
    if not existing_run_id:
        try:
            # Look for runs marked 'running' created in the last 1 hour
            # We filter by creating valid REST query
            pending_url = f"{url}/rest/v1/scraper_runs?status=eq.running&order=started_at.desc&limit=1"
            p_resp = requests.get(pending_url, headers=headers)
            p_data = p_resp.json()
            
            if p_data and isinstance(p_data, list) and len(p_data) > 0:
                # Check if it's recent (optional, but good practice)
                # For now, we'll just pick it up
                existing_run_id = p_data[0]["id"]
                print(f"Picked up pending run from DB: {existing_run_id}")
        except Exception as e:
            print(f"Warning: Failed to check for pending runs: {e}")

    if existing_run_id:
        print(f"Resuming/Attaching to run: {existing_run_id}")
        run_id = existing_run_id
    else:
        run_type = os.environ.get("RUN_TYPE", "manual")
        run_data = {
            "run_type": run_type,
            "github_run_id": os.environ.get("GITHUB_RUN_ID", "local")
        }
        
        run_endpoint = f"{url}/rest/v1/scraper_runs"
        resp = requests.post(run_endpoint, json=run_data, headers=headers)
        
        if resp.status_code >= 400:
            print(f"Error creating run record: {resp.text}")
            return
            
        run_body = resp.json()
        run_id = run_body[0]["id"] if run_body else None
        print(f"Started new scraper run: {run_id}")
    
    
    errors = []
    items_found = 0
    banks_scraped = 0
    
    for scraper in SCRAPERS:
        slug = scraper.get_bank_slug()
        print(f"Scraping {slug}...")
        try:
            # Get bank ID
            # Use 'ilike' operator for case-insensitive search
            bank_url = f"{url}/rest/v1/banks?name=ilike.*{slug.replace('-', ' ')}*&select=id"
            bank_resp = requests.get(bank_url, headers=headers)
            bank_data = bank_resp.json()
            
            bank_id = None
            if bank_data:
                bank_id = bank_data[0]["id"]
            else:
                print(f"Bank {slug} not found in database. Skipping.")
                errors.append({"bank": slug, "error": "Bank not found in DB"})
                continue
            
            banks_scraped += 1
            
            # Scrape Cards
            cards = scraper.scrape_credit_cards()
            if cards:
                scraper.save_to_staging(bank_id, "credit_card", cards, scraper.BASE_URL)
                items_found += len(cards)
                print(f"  - Found {len(cards)} cards")
                
            # Scrape Loans
            loans = scraper.scrape_loan_products()
            if loans:
                scraper.save_to_staging(bank_id, "loan", loans, scraper.BASE_URL)
                items_found += len(loans)
                 
        except Exception as e:
            print(f"Error scraping {slug}: {str(e)}")
            errors.append({"bank": slug, "error": str(e)})
    
    # Update run record
    status = "success"
    if errors:
        status = "partial" if items_found > 0 else "failed"
        
    if run_id:
        update_url = f"{url}/rest/v1/scraper_runs?id=eq.{run_id}"
        update_data = {
            "completed_at": datetime.utcnow().isoformat(),
            "status": status,
            "items_found": items_found,
            "banks_scraped": banks_scraped,
            "errors": errors
        }
        requests.patch(update_url, json=update_data, headers=headers)
    
    print(f"Run completed with status: {status}. Total items: {items_found}")

if __name__ == "__main__":
    main()
