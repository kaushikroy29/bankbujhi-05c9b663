from bs4 import BeautifulSoup
from ..base_scraper import BaseScraper


class StandardCharteredScraper(BaseScraper):
    """Scraper for Standard Chartered Bank credit cards and loan products."""
    
    BASE_URL = "https://www.sc.com/bd"
    CARDS_URL = "https://www.sc.com/bd/credit-cards/"
    
    def get_bank_slug(self) -> str:
        return "standard-chartered"
    
    def scrape_credit_cards(self) -> list[dict]:
        """Scrape credit card data from SC website."""
        cards = []
        
        try:
            self.delay()
            response = self.fetch_page(self.CARDS_URL)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # SC usually uses specific classes for their product cards
            card_elements = soup.select('.sc-product-card, .card-module, .c-product-card')
            
            if not card_elements:
                 # Fallback selectors
                card_elements = soup.select('.col-md-4, .col-lg-4, .row > div')
            
            self.logger.info(f"Found {len(card_elements)} potential card elements")
            
            for element in card_elements:
                try:
                    name_el = element.select_one('h2, h3, h4, .card-title, .title')
                    if not name_el:
                        continue
                        
                    name = name_el.get_text(strip=True)
                    if not name or len(name) < 3:
                        continue
                    
                    features = []
                    feature_els = element.select('li, .sc-list-item, .feature')
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
            self.logger.error(f"Error scraping SC cards: {e}")
            cards = self._get_fallback_cards()
        
        return cards
    
    def _get_fallback_cards(self) -> list[dict]:
        """Return fallback card data when scraping fails."""
        return [
            {
                "name": "Visa Signature Credit Card",
                "annual_fee": "BDT 15,000",
                "interest_rate": "20% p.a.",
                "features": ["Airport Lounge Access", "Rewards Program", "Travel Insurance"],
                "detail_url": f"{self.BASE_URL}/credit-cards/visa-signature-card",
                "image_url": "",
                "is_fallback": True
            },
            {
                "name": "Visa Platinum Credit Card",
                "annual_fee": "BDT 5,000",
                "interest_rate": "20% p.a.",
                "features": ["BOGO Offers", "Dining Discounts"],
                "detail_url": f"{self.BASE_URL}/credit-cards/visa-platinum-card",
                "image_url": "",
                "is_fallback": True
            },
            {
                 "name": "Visa Infinite Credit Card",
                 "annual_fee": "BDT 25,000",
                 "interest_rate": "20% p.a.",
                 "features": ["Unlimited Lounge Access", "Concierge Service", "Golf Privileges"],
                 "detail_url": f"{self.BASE_URL}/credit-cards/visa-infinite-card",
                 "image_url": "",
                 "is_fallback": True
            }
        ]
    
    def scrape_loan_products(self) -> list[dict]:
        return []
        
    def scrape_savings_rates(self) -> list[dict]:
        return []
