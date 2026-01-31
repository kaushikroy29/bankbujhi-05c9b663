import os
import time
import random
from abc import ABC, abstractmethod
from supabase import create_client, Client

class BaseScraper(ABC):
    def __init__(self):
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_SERVICE_KEY")
        
        if not url or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set")
            
        self.supabase: Client = create_client(url, key)
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
        """Save scraped data to the staging table"""
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
            
        # Insert in batches if needed, but for now simple insert
        result = self.supabase.table("scraped_data").insert(records).execute()
        print(f"[{self.get_bank_slug()}] Saved {len(records)} {data_type} records to staging.")
        return result
