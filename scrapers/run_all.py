#!/usr/bin/env python3
import os
import sys
from datetime import datetime
from dotenv import load_dotenv

# Add parent directory to path to allow imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scrapers.banks.brac_bank import BracBankScraper
from scrapers.banks.dbbl import DbblScraper
from scrapers.banks.ebl import EblScraper
from supabase import create_client

# Load env variables from .env file for local testing
load_dotenv()

SCRAPERS = [
    BracBankScraper(),
    DbblScraper(),
    EblScraper(),
    # Add other scrapers here as they are implemented
]

def main():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")
    
    if not url or not key:
        print("Error: SUPABASE_URL or SUPABASE_SERVICE_KEY not set")
        return

    supabase = create_client(url, key)
    
    # Create run record
    run_type = os.environ.get("RUN_TYPE", "manual")
    run_res = supabase.table("scraper_runs").insert({
        "run_type": run_type,
        "github_run_id": os.environ.get("GITHUB_RUN_ID", "local")
    }).execute()
    
    if not run_res.data:
        print("Error creating run record")
        return
        
    run_id = run_res.data[0]["id"]
    print(f"Started scraper run: {run_id}")
    
    errors = []
    items_found = 0
    banks_scraped = 0
    
    for scraper in SCRAPERS:
        slug = scraper.get_bank_slug()
        print(f"Scraping {slug}...")
        try:
            # Get bank ID
            bank_res = supabase.table("banks").select("id").ilike("name", f"%{slug.replace('-', ' ')}%").execute()
            
            # Fallback if slug search fails, try broad search or skip
            bank_id = None
            if bank_res.data:
                bank_id = bank_res.data[0]["id"]
            else:
                # Try to find a bank that might match or insert a placeholder?
                # For now, let's log error if bank not found in DB
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
        
    supabase.table("scraper_runs").update({
        "completed_at": datetime.utcnow().isoformat(),
        "status": status,
        "items_found": items_found,
        "banks_scraped": banks_scraped,
        "errors": errors
    }).eq("id", run_id).execute()
    
    print(f"Run completed with status: {status}. Total items: {items_found}")

if __name__ == "__main__":
    main()
