import os
import time
import random
import logging
import requests
from abc import ABC, abstractmethod
from functools import wraps

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# User agents for rotation
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
]


def retry_with_backoff(max_retries=3, base_delay=2):
    """Decorator for retry logic with exponential backoff."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except (requests.RequestException, Exception) as e:
                    last_exception = e
                    if attempt < max_retries - 1:
                        delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                        logging.warning(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay:.1f}s...")
                        time.sleep(delay)
                    else:
                        logging.error(f"All {max_retries} attempts failed: {e}")
            raise last_exception
        return wrapper
    return decorator


class BaseScraper(ABC):
    """Base class for all bank scrapers with built-in robustness features."""
    
    # Default timeout for requests (seconds)
    REQUEST_TIMEOUT = 30
    
    def __init__(self):
        # Support both standard names and VITE_ prefixed names (from .env)
        self.url = os.environ.get("SUPABASE_URL") or os.environ.get("VITE_SUPABASE_URL")
        self.key = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("VITE_SUPABASE_ANON_KEY")
        
        if not self.url or not self.key:
            raise ValueError("Supabase credentials not found. Set SUPABASE_URL/KEY or VITE_SUPABASE_URL/ANON_KEY")
        
        self.logger = logging.getLogger(self.__class__.__name__)
        self.session = requests.Session()
        
        self.api_headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
        self.delay_range = (2, 5)  # seconds between requests
    
    def _get_random_user_agent(self) -> str:
        """Get a random user agent for request headers."""
        return random.choice(USER_AGENTS)
    
    def _get_browser_headers(self) -> dict:
        """Get headers that mimic a real browser."""
        return {
            "User-Agent": self._get_random_user_agent(),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        }
    
    def delay(self):
        """Random delay to behave like a human."""
        delay_time = random.uniform(*self.delay_range)
        self.logger.debug(f"Sleeping for {delay_time:.1f} seconds...")
        time.sleep(delay_time)
    
    @retry_with_backoff(max_retries=3, base_delay=2)
    def fetch_page(self, url: str, method: str = "GET", **kwargs) -> requests.Response:
        """
        Fetch a page with retry logic, timeout, and proper headers.
        
        Args:
            url: The URL to fetch
            method: HTTP method (GET, POST, etc.)
            **kwargs: Additional arguments to pass to requests
            
        Returns:
            requests.Response object
            
        Raises:
            requests.RequestException on failure after all retries
        """
        headers = kwargs.pop("headers", {})
        headers = {**self._get_browser_headers(), **headers}
        
        timeout = kwargs.pop("timeout", self.REQUEST_TIMEOUT)
        
        self.logger.info(f"Fetching: {url}")
        
        response = self.session.request(
            method=method,
            url=url,
            headers=headers,
            timeout=timeout,
            **kwargs
        )
        response.raise_for_status()
        
        self.logger.info(f"Successfully fetched {url} (Status: {response.status_code})")
        return response
    
    @abstractmethod
    def get_bank_slug(self) -> str:
        """Return the unique slug for the bank."""
        pass
    
    @abstractmethod
    def scrape_credit_cards(self) -> list[dict]:
        """Scrape credit card data."""
        pass
    
    @abstractmethod
    def scrape_loan_products(self) -> list[dict]:
        """Scrape loan data."""
        pass
    
    @abstractmethod
    def scrape_savings_rates(self) -> list[dict]:
        """Scrape savings rate data."""
        pass
    
    def save_to_staging(self, bank_id: str, data_type: str, data: list, source_url: str):
        """Save scraped data to the staging table via REST API."""
        if not data:
            self.logger.warning(f"No data to save for {data_type}")
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
        
        try:
            resp = requests.post(
                endpoint, 
                json=records, 
                headers=self.api_headers,
                timeout=self.REQUEST_TIMEOUT
            )
            
            if resp.status_code >= 400:
                self.logger.error(f"Error saving data: {resp.text}")
                resp.raise_for_status()
                
            self.logger.info(f"[{self.get_bank_slug()}] Saved {len(records)} {data_type} records to staging.")
            return resp.json() if resp.content else {}
            
        except requests.RequestException as e:
            self.logger.error(f"Failed to save data to staging: {e}")
            raise
