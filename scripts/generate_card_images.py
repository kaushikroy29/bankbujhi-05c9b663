# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "openai",
#     "requests",
# ]
# ///

import json
import os
import re
import requests
from openai import OpenAI

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(BASE_DIR, 'cards_list.json')
OUTPUT_DIR = os.path.join(BASE_DIR, 'public', 'cards')

def slugify(text):
    text = text.lower()
    return re.sub(r'[\W_]+', '-', text).strip('-')

def generate_image_dalle(client, prompt, output_path):
    try:
        print(f"Generating: {output_path}...")
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        
        image_url = response.data[0].url
        
        # Download the image
        img_data = requests.get(image_url).content
        with open(output_path, 'wb') as handler:
            handler.write(img_data)
            
        return True
    except Exception as e:
        print(f"Error generating image: {e}")
        return False

def main():
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    if not os.path.exists(JSON_PATH):
        print(f"Error: {JSON_PATH} not found.")
        return

    # Initialize OpenAI Client
    # It automatically picks up OPENAI_API_KEY from env
    try:
        client = OpenAI()
    except Exception as e:
        print(f"Failed to initialize OpenAI client: {e}")
        return

    with open(JSON_PATH, 'r') as f:
        cards = json.load(f)

    updated_count = 0
    
    for card in cards:
        # Check if image is missing
        if not card.get('image_url'):
            bank_name = card.get('banks', {}).get('name', 'Bank')
            card_name = card.get('name', 'Credit Card')
            
            slug = f"{slugify(bank_name)}-{slugify(card_name)}"
            filename = f"{slug}.png"
            output_full_path = os.path.join(OUTPUT_DIR, filename)
            public_path = f"/cards/{filename}"

            # Skip if file already exists
            if os.path.exists(output_full_path):
                print(f"Image exists for {bank_name} - {card_name}, linking...")
                card['image_url'] = public_path
                updated_count += 1
                continue

            # Generate Prompt
            prompt = (
                f"A photorealistic, high-quality credit card design for '{bank_name} {card_name}'. "
                f"The card should look premium and modern. "
                f"Text '{bank_name}' and '{card_name}' clearly visible on the card face. "
                f"Isometric view, floating slightly, soft studio lighting, white background. "
                f"No text artifacts or gibberish."
            )

            success = generate_image_dalle(client, prompt, output_full_path)
            
            if success:
                card['image_url'] = public_path
                updated_count += 1
                
                # Save immediately after each success
                with open(JSON_PATH, 'w') as f:
                    json.dump(cards, f, indent=2)
            else:
                print(f"Failed to generate for {bank_name} - {card_name}")

    print(f"Process complete. Updated {updated_count} cards.")

if __name__ == "__main__":
    main()
