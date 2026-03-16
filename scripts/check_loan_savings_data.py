# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "supabase",
# ]
# ///

import os
from supabase import create_client, Client

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, '.env')

def load_env():
    config = {}
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH) as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, val = line.strip().split('=', 1)
                    config[key] = val
    return config

def main():
    config = load_env()
    url = config.get('VITE_SUPABASE_URL')
    key = config.get('VITE_SUPABASE_ANON_KEY')
    supabase: Client = create_client(url, key)

    print("Checking Loan Products...")
    loans = supabase.table('loan_products').select('id, name, bank_id, banks(name), loan_type').execute()
    
    if loans.data:
        print(f"✅ Found {len(loans.data)} Loan Products.")
        for l in loans.data[:5]:
            bank = l['banks']['name'] if l.get('banks') else "Unknown"
            print(f"  - [{bank}] {l['name']} ({l['loan_type']})")
    else:
        print("❌ No Loan Products found!")

    print("\nChecking Savings/FDR Rates...")
    savings = supabase.table('savings_rates').select('id, bank_id, banks(name), product_type, interest_rate, tenure_months').execute()
    
    if savings.data:
        print(f"✅ Found {len(savings.data)} Savings/FDR Rates.")
        for s in savings.data[:5]:
            bank = s['banks']['name'] if s.get('banks') else "Unknown"
            print(f"  - [{bank}] {s['product_type']} - {s['interest_rate']}% for {s['tenure_months']}m")
    else:
        print("❌ No Savings/FDR Rates found!")

if __name__ == "__main__":
    main()
