import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(BASE_DIR, 'cards_list.json')

# Map (Bank Name + Card Name part) -> Filename
# Keys are lowercase for easier matching
MAPPING = {
    ("eastern bank plc", "aqua"): "/cards/ebl-aqua.png",
    ("eastern bank plc", "skybanc"): "/cards/ebl-skybanc.png",
    ("brac bank", "visa signature"): "/cards/brac-signature.png",
    ("brac bank", "astha"): "/cards/brac-astha.png",
    ("standard chartered", "visa signature"): "/cards/scb-visa-signature.png",
    ("standard chartered", "visa infinite"): "/cards/scb-visa-infinite.png",
    ("mutual trust bank", "angana"): "/cards/mtb-angana.png",
    ("city bank", "gold"): "/cards/city-amex-gold.png",
    ("city bank", "simplycash"): "/cards/city-simplycash.png",
    ("dutch-bangla bank", "nexus"): "/cards/dbbl-nexus-classic.png",
    ("islami bank bangladesh", "khidmah"): "/cards/islami-khidmah-gold.png",
    ("prime bank", "visa platinum"): "/cards/prime-visa-platinum.png",
}

def main():
    with open(JSON_PATH, 'r') as f:
        cards = json.load(f)

    updated_count = 0
    
    for card in cards:
        if card.get('image_url'):
            continue
            
        bank_name = card.get('banks', {}).get('name', '').lower()
        card_name = card.get('name', '').lower()
        
        for (map_bank, map_card), url in MAPPING.items():
            if map_bank in bank_name and map_card in card_name:
                card['image_url'] = url
                updated_count += 1
                print(f"Linked {url} to {bank_name} - {card_name}")
                break

    with open(JSON_PATH, 'w') as f:
        json.dump(cards, f, indent=2)
    
    print(f"Updated {updated_count} cards.")

if __name__ == "__main__":
    main()
