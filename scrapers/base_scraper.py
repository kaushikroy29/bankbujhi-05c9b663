import os
import time
import random
import requests
from abc import ABC, abstractmethod

class BaseScraper(ABC):
    def __init__(self):
        # Support both standard names and VITE_ prefixed names (from .env)
        self.url = os.environ.get("SUPABASE_URL") or os.environ.get("VITE_SUPABASE_URL")
        self.key = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("VITE_SUPABASE_ANON_KEY")
        
        if not self.url or not self.key:
            raise ValueError("Supabase credentials not found. Set SUPABASE_URL/KEY or VITE_SUPABASE_URL/ANON_KEY")
            
        self.headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
        self.delay_range = (2, 5)  # seconds
    
    def delay(self):
        """Random delay to behave like a human"""
        time.sleep(random.uniform(*self.delay_range))
    
    @abstractmethod
    def get_bank_slug(self) -> str:
        """Return the unique slug for the bank"""
        pass
    
    @abstractmethod
    def scrape_credit_cards(self) -> list[dict]:
        """Scrape credit card data"""
        pass
    
    @abstractmethod
    def scrape_loan_products(self) -> list[dict]:
        """Scrape loan data"""
        pass
    
    @abstractmethod
    def scrape_savings_rates(self) -> list[dict]:
        """Scrape savings rate data"""
        pass
    
    def save_to_staging(self, bank_id: str, data_type: str, data: list, source_url: str):
        """Save scraped data to the staging table via REST API"""
        if not data:
            return
            
        records = []
        for item in data:
            records.append({
                "bank_id": bank_id,
                "data_type": data_type,
                "scraped_json": item,
                "source_url": source_url,
                "status": "pending"
            })
            
        # PostgREST insert
        endpoint = f"{self.url}/rest/v1/scraped_data"
        resp = requests.post(endpoint, json=records, headers=self.headers)
        
        if resp.status_code >= 400:
            print(f"Error saving data: {resp.text}")
            resp.raise_for_status()
            
        print(f"[{self.get_bank_slug()}] Saved {len(records)} {data_type} records to staging.")
        return resp.json() if resp.content else {}
