import os
import requests
from dotenv import load_dotenv

# Load env
load_dotenv('e:/bankbujhi git/bankbujhi-05c9b663/.env')

url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_ANON_KEY")

# We need to use the service role key to modify schema
# Since we only have anon key, let's use the Supabase REST API to add column
# Actually, we can't ALTER TABLE via REST API with anon key

# Alternative: Update the scraper to NOT include fields that don't exist in schema
print("The anon key cannot modify schema. Updating scrapers instead to remove unsupported fields.")
