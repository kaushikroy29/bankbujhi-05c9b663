from bs4 import BeautifulSoup
from ..base_scraper import BaseScraper


class PrimeBankScraper(BaseScraper):
    """Scraper for Prime Bank credit cards and loan products."""
    
    BASE_URL = "https://www.primebank.com.bd"
    CARDS_URL = "https://www.primebank.com.bd/cards/credit-cards"
    
    def get_bank_slug(self) -> str:
        return "prime-bank"
    
    def scrape_credit_cards(self) -> list[dict]:
        """Scrape credit card data from Prime Bank website."""
        cards = []
        
        try:
            self.delay()
            response = self.fetch_page(self.CARDS_URL)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Prime Bank usually uses specific structure
            card_elements = soup.select('.card-item, .product-item, .feature-box')
            
            if not card_elements:
                 # Fallback
                card_elements = soup.select('.col-md-4, .col-lg-4')
            
            self.logger.info(f"Found {len(card_elements)} potential card elements")
            
            for element in card_elements:
                try:
                    name_el = element.select_one('h2, h3, h4, .title')
                    if not name_el:
                        continue
                        
                    name = name_el.get_text(strip=True)
                    if not name or len(name) < 3:
                        continue
                    
                    features = []
                    feature_els = element.select('li, p')
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
                            
                    # Extract image URL
                    img_el = element.select_one('img')
                    image_url = ""
                    if img_el and img_el.get('src'):
                        src = img_el.get('src')
                        if src.startswith('/'):
                            image_url = self.BASE_URL + src
                        elif src.startswith('http'):
                            image_url = src
                    
                    card_data = {
                        "name": name,
                        "features": features if features else ["Contact bank for details"],
                        "detail_url": detail_url,
                        "image_url": image_url,
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
            self.logger.error(f"Error scraping Prime Bank cards: {e}")
            cards = self._get_fallback_cards()
        
        return cards
    
    def _get_fallback_cards(self) -> list[dict]:
        """Return fallback card data when scraping fails."""
        return [
            {
                "name": "Visa Platinum Credit Card",
                "annual_fee": "BDT 3,000",
                "interest_rate": "20% p.a.",
                "features": ["Free Supplementary Card", "Access to Balaka Lounge"],
                "detail_url": f"{self.BASE_URL}/cards/credit-cards",
                "image_url": "",
                "is_fallback": True
            },
            {
                "name": "MasterCard Titanium",
                "annual_fee": "BDT 3,000",
                "interest_rate": "20% p.a.",
                "features": ["BOGO Offers", "Dining Privileges"],
                "detail_url": f"{self.BASE_URL}/cards/credit-cards",
                "image_url": "",
                "is_fallback": True
            }
        ]
    
    def scrape_loan_products(self) -> list[dict]:
        return []
        
    def scrape_savings_rates(self) -> list[dict]:
        return []
