import requests
from bs4 import BeautifulSoup
from ..base_scraper import BaseScraper


class BracBankScraper(BaseScraper):
    """Scraper for BRAC Bank credit cards and loan products."""
    
    BASE_URL = "https://www.bracbank.com"
    CARDS_URL = "https://www.bracbank.com/en/retail/cards/credit-cards"
    
    def get_bank_slug(self) -> str:
        return "brac-bank"
    
    def scrape_credit_cards(self) -> list[dict]:
        """Scrape credit card data from BRAC Bank website."""
        cards = []
        
        try:
            # Add delay before request
            self.delay()
            
            # Fetch the credit cards page
            response = self.fetch_page(self.CARDS_URL)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Try to find card containers
            # Note: Actual selectors depend on the website structure
            card_elements = soup.select('.card-item, .product-card, .credit-card-box, [class*="card"]')
            
            if not card_elements:
                self.logger.warning("No card elements found with primary selectors. Trying alternative selectors...")
                # Try alternative selectors
                card_elements = soup.select('article, .col-md-4, .col-lg-4')
            
            self.logger.info(f"Found {len(card_elements)} potential card elements")
            
            for element in card_elements:
                try:
                    # Extract card name
                    name_el = element.select_one('h2, h3, h4, .card-title, .title')
                    if not name_el:
                        continue
                        
                    name = name_el.get_text(strip=True)
                    
                    # Skip if name doesn't seem like a card
                    if not name or len(name) < 3:
                        continue
                    
                    # Extract description/features
                    features = []
                    feature_els = element.select('li, .feature')
                    for feat in feature_els[:5]:  # Limit to 5 features
                        feat_text = feat.get_text(strip=True)
                        if feat_text and len(feat_text) > 5:
                            features.append(feat_text)
                    
                    # Extract link if available
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
                        "annual_fee": "Contact bank",  # Usually requires parsing detail page
                        "interest_rate": "Contact bank"
                    }
                    
                    cards.append(card_data)
                    self.logger.info(f"Extracted card: {name}")
                    
                except Exception as e:
                    self.logger.warning(f"Error parsing card element: {e}")
                    continue
            
            # If we couldn't scrape real data, return sample data as fallback
            if not cards:
                self.logger.warning("Could not extract cards from HTML. Using fallback data.")
                cards = self._get_fallback_cards()
                
        except Exception as e:
            self.logger.error(f"Error scraping BRAC Bank cards: {e}")
            # Return fallback data on error
            cards = self._get_fallback_cards()
        
        return cards
    
    def _get_fallback_cards(self) -> list[dict]:
        """Return fallback card data when scraping fails."""
        return [
            {
                "name": "BRAC Bank Signature Card",
                "annual_fee": "BDT 10,000",
                "interest_rate": "20% p.a.",
                "features": ["Airport Lounge Access", "Priority Pass", "Reward Points"],
                "detail_url": f"{self.BASE_URL}/en/retail/cards/credit-cards",
                "image_url": "",
                "is_fallback": True
            },
            {
                "name": "BRAC Bank Platinum Card",
                "annual_fee": "BDT 5,000",
                "interest_rate": "20% p.a.",
                "features": ["BOGO Offers", "Dining Discounts", "EMI Facility"],
                "detail_url": f"{self.BASE_URL}/en/retail/cards/credit-cards",
                "image_url": "",
                "is_fallback": True
            }
        ]
    
    def scrape_loan_products(self) -> list[dict]:
        """Scrape loan products from BRAC Bank website."""
        # For now, return empty - can be implemented similarly
        return []
    
    def scrape_savings_rates(self) -> list[dict]:
        """Scrape savings rates from BRAC Bank website."""
        return []
