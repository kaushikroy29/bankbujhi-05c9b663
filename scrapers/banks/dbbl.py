from bs4 import BeautifulSoup
from ..base_scraper import BaseScraper


class DbblScraper(BaseScraper):
    """Scraper for Dutch Bangla Bank credit cards and loan products."""
    
    BASE_URL = "https://www.dutchbanglabank.com"
    CARDS_URL = "https://www.dutchbanglabank.com/credit-card/credit-card.html"
    
    def get_bank_slug(self) -> str:
        return "dutch-bangla-bank"
    
    def scrape_credit_cards(self) -> list[dict]:
        """Scrape credit card data from DBBL website."""
        cards = []
        
        try:
            self.delay()
            response = self.fetch_page(self.CARDS_URL)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Try to find card containers
            card_elements = soup.select('.card-item, .product-card, [class*="card"]')
            
            if not card_elements:
                card_elements = soup.select('article, .col-md-4, .col-lg-4, .row > div')
            
            self.logger.info(f"Found {len(card_elements)} potential card elements")
            
            for element in card_elements:
                try:
                    name_el = element.select_one('h2, h3, h4, .card-title, .title, strong')
                    if not name_el:
                        continue
                        
                    name = name_el.get_text(strip=True)
                    if not name or len(name) < 3:
                        continue
                    
                    features = []
                    feature_els = element.select('li, .feature, p')
                    for feat in feature_els[:5]:
                        feat_text = feat.get_text(strip=True)
                        if feat_text and len(feat_text) > 5:
                            features.append(feat_text)
                    
                    link_el = element.select_one('a[href]')
                    detail_url = ""
                    if link_el and link_el.get('href'):
                        href = link_el.get('href')
                        if href.startswith('/'):
                            detail_url = self.BASE_URL + href
                        elif href.startswith('http'):
                            detail_url = href
                    
                    card_data = {
                        "name": name,
                        "features": features if features else ["Contact bank for details"],
                        "detail_url": detail_url,
                        "annual_fee": "Contact bank",
                        "interest_rate": "Contact bank"
                    }
                    
                    cards.append(card_data)
                    self.logger.info(f"Extracted card: {name}")
                    
                except Exception as e:
                    self.logger.warning(f"Error parsing card element: {e}")
                    continue
            
            if not cards:
                self.logger.warning("Could not extract cards from HTML. Using fallback data.")
                cards = self._get_fallback_cards()
                
        except Exception as e:
            self.logger.error(f"Error scraping DBBL cards: {e}")
            cards = self._get_fallback_cards()
        
        return cards
    
    def _get_fallback_cards(self) -> list[dict]:
        """Return fallback card data when scraping fails."""
        return [
            {
                "name": "DBBL Platinum Credit Card",
                "annual_fee": "BDT 5,000",
                "interest_rate": "18% p.a.",
                "features": ["Free Supplementary Card", "Discount at Partner Merchants"],
                "detail_url": f"{self.BASE_URL}/credit-card/credit-card.html",
                "is_fallback": True
            },
            {
                "name": "DBBL Gold Credit Card",
                "annual_fee": "BDT 3,000",
                "interest_rate": "18% p.a.",
                "features": ["Low Interest Rate", "EMI Facility"],
                "detail_url": f"{self.BASE_URL}/credit-card/credit-card.html",
                "is_fallback": True
            }
        ]
    
    def scrape_loan_products(self) -> list[dict]:
        return []
        
    def scrape_savings_rates(self) -> list[dict]:
        return []
