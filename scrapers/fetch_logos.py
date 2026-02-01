import requests
import os

banks = [
    ("brac-bank", "bracbank.com"),
    ("dbbl", "dutchbanglabank.com"),
    ("ebl", "ebl.com.bd"),
    ("city-bank", "thecitybank.com"),
    ("sc", "sc.com"),
    ("hsbc", "hsbc.com.bd"),
    ("prime-bank", "primebank.com.bd"),
    ("islami-bank", "islamibankbd.com"),
    ("mtb", "mutualtrustbank.com"),
    ("ucb", "ucb.com.bd"),
    ("ncc", "nccbank.com.bd"),
    ("bank-asia", "bankasia-bd.com"),
    ("southeast", "southeastbank.com.bd"),
    ("pubali", "pubalibankbd.com"),
    ("ab-bank", "abbl.com")
]

print("Checking logo availability (Method: Google)...")
found = 0
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

for name, domain in banks:
    # Google Favicon API (sz=128 for higher quality)
    url = f"https://www.google.com/s2/favicons?domain={domain}&sz=128"
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        if resp.status_code == 200 and len(resp.content) > 100: # Ensure not empty
            print(f"✅ {name}: Found ({len(resp.content)} bytes)")
            found += 1
            # Save it
            with open(f"../public/banks/{name}.png", "wb") as f:
                f.write(resp.content)
        else:
            print(f"❌ {name}: {resp.status_code}")
    except Exception as e:
        print(f"❌ {name}: Error {e}")

print(f"\nTotal Found: {found}/{len(banks)}")
