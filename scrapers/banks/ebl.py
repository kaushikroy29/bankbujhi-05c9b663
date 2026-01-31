from ..base_scraper import BaseScraper

class EblScraper(BaseScraper):
    BASE_URL = "https://www.ebl.com.bd"
    
    def get_bank_slug(self) -> str:
        return "eastern-bank"
    
    def scrape_credit_cards(self) -> list[dict]:
        # Placeholder data
        return [
            {
                "name": "EBL Visa Platinum",
                "annual_fee": "BDT 5,000",
                "interest_rate": "20%",
                "features": ["EBL Skybanking", "Lounge Access"]
            },
            {
                "name": "EBL Mastercard Titanic",
                "annual_fee": "BDT 10,000",
                "interest_rate": "20%",
                "features": ["Meet & Greet", "Global Data Roaming"]
            }
        ]
    
    def scrape_loan_products(self) -> list[dict]:
        return []
        
    def scrape_savings_rates(self) -> list[dict]:
        return []
