from ..base_scraper import BaseScraper

class DbblScraper(BaseScraper):
    BASE_URL = "https://www.dutchbanglabank.com"
    
    def get_bank_slug(self) -> str:
        return "dutch-bangla-bank"
    
    def scrape_credit_cards(self) -> list[dict]:
        # Placeholder data
        return [
            {
                "name": "DBBL Platinum Credit Card",
                "annual_fee": "BDT 5,000",
                "interest_rate": "18%",
                "features": ["Free Supplementary Card", "Discount at Partners"]
            },
            {
                "name": "DBBL Gold Credit Card",
                "annual_fee": "BDT 3,000",
                "interest_rate": "18%",
                "features": ["Low Interest Rate"]
            }
        ]
    
    def scrape_loan_products(self) -> list[dict]:
        return []
        
    def scrape_savings_rates(self) -> list[dict]:
        return []
