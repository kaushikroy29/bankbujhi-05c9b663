-- Add Real Credit Cards for Bangladesh Market

-- Helper function to get bank ID (safeguard)
-- We will use subqueries directly in INSERTs for portability

-- 1. City Bank Cards
INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
VALUES 
    (
        (SELECT id FROM public.banks WHERE name = 'City Bank' LIMIT 1),
        'Citymax American Express Card',
        'Shopping & Lifestyle',
        '৳২,০০০',
        '২৭%',
        '৳৩০,০০০',
        21, 60,
        '[
            {"icon": "shopping_cart", "text": "আগোরা সুপারশপে ১০% ক্যাশব্যাক", "description": "প্রতি মাসে সর্বোচ্চ ১০০০ টাকা পর্যন্ত"},
            {"icon": "restaurant", "text": "বাফে অফার", "description": "সিলেক্টেড রেস্টুরেন্টে বাই-ওয়ান-গেট-ওয়ান"},
            {"icon": "local_offer", "text": "স্বপ্ন ডিসকাউন্ট", "description": "স্বপ্ন সুপারশপে বিশেষ ডিসকাউন্ট"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 2000"}'::jsonb,
        true
    ),
    (
        (SELECT id FROM public.banks WHERE name = 'City Bank' LIMIT 1),
        'Visa Platinum Credit Card',
        'Travel',
        '৳৫,০০০',
        '২০%',
        '৳৫০,০০০',
        21, 60,
        '[
            {"icon": "flight", "text": "বলাকা লাউঞ্জ", "description": "বছরে ৪ বার কমপ্লিমেন্টারি ভিজিট"},
            {"icon": "priority_high", "text": "প্রায়োরিটি পাস", "description": "বিশ্বব্যাপী লাউঞ্জ এক্সেস সুবিধা"},
            {"icon": "umbrella", "text": "ট্রাভেল ইন্স্যুরেন্স", "description": "৫০,০০০ ডলার পর্যন্ত কভারেজ"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 5000"}'::jsonb,
        true
    );

-- 2. BRAC Bank Cards
INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
VALUES 
    (
        (SELECT id FROM public.banks WHERE name = 'BRAC Bank' LIMIT 1),
        'Astha Visa Signature',
        'Premium Rewards',
        '৳১০,০০০',
        '২০%',
        '৳১,০০,০০০',
        21, 65,
        '[
            {"icon": "star", "text": "রিওয়ার্ড পয়েন্ট", "description": "প্রতি ১০০ টাকা খরচে ২ পয়েন্ট"},
            {"icon": "flight_takeoff", "text": "বলাকা ও স্কাইলাউঞ্জ", "description": "আনলিমিটেড ফ্রি ভিজিট (কার্ডহোল্ডার + ১ জন গেস্ট)"},
            {"icon": "golf_course", "text": "গলফ সুবিধা", "description": "বিনামূল্যে গলফ খেলার সুযোগ"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 10000"}'::jsonb,
        true
    ),
    (
        (SELECT id FROM public.banks WHERE name = 'BRAC Bank' LIMIT 1),
        'Tara Platinum Credit Card',
        'Womens',
        '৳৩,০০০',
        '২০%',
        '৳৩৫,০০০',
        21, 60,
        '[
            {"icon": "female", "text": "নারীদের জন্য বিশেষ সুবিধা", "description": "পার্লার ও জুয়েলারিতে বিশেষ ডিসকাউন্ট"},
            {"icon": "health_and_safety", "text": "হেলথ চেকআপ", "description": "বিনামূল্যে বার্ষিক হেলথ চেকআপ"},
            {"icon": "percent", "text": "স্পেশাল রেট", "description": "লকার ভাড়ায় ৫০% ছাড়"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 3000"}'::jsonb,
        true
    );

-- 3. EBL (Eastern Bank)
INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
VALUES 
    (
        (SELECT id FROM public.banks WHERE name = 'Eastern Bank PLC' LIMIT 1),
        'EBL Aqua Prepaid Card',
        'Prepaid Cards',
        '৳৫৭৫',
        '০%',
        '৳০',
        18, 70,
        '[
            {"icon": "currency_exchange", "text": "ডুয়াল কারেন্সি", "description": "সহজেই গ্লোবাল পেমেন্ট করুন Google/Facebook এ"},
            {"icon": "money_off", "text": "নো ব্যাংক একাউন্ট", "description": "ব্যাংক একাউন্ট ছাড়াই কার্ড"},
            {"icon": "shopping_bag", "text": "লাইফস্টাইল অফার", "description": "শতাধিক মার্চেন্টে ডিসকাউন্ট"}
        ]'::jsonb,
        '{"issuance_fee": "BDT 575", "renewal_fee": "BDT 575"}'::jsonb,
        true
    ),
     (
        (SELECT id FROM public.banks WHERE name = 'Eastern Bank PLC' LIMIT 1),
        'EBL Skybanking Platinum',
        'Travel',
        '৳৩,০০০',
        '২০%',
        '৳৪০,০০০',
        21, 60,
        '[
            {"icon": "flight", "text": "স্কাইলাউঞ্জ", "description": "কমপ্লিমেন্টারি লাউঞ্জ এক্সেস"},
            {"icon": "wifi", "text": "ফ্রি ওয়াইফাই", "description": "বিমানবন্দরে ফ্রি ইন্টারনেট সুবিধা"},
            {"icon": "local_dining", "text": "ডাইনিং অফার", "description": "৫-স্টার হোটেলে ডাইনিং সুবিধা"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 3000"}'::jsonb,
        true
    );

-- 4. Dutch-Bangla Bank (DBBL)
INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
VALUES 
    (
        (SELECT id FROM public.banks WHERE name = 'Dutch-Bangla Bank' LIMIT 1),
        'DBBL Nexus World',
        'Shopping & Lifestyle',
        '৳১,৫০০',
        '১৮%',
        '৳২৫,০০০',
         21, 60,
        '[
            {"icon": "shopping_cart", "text": "ই-কমার্স পেমেন্ট", "description": "সব দেশি ওয়েবসাইটে পেমেন্ট সুবিধা"},
            {"icon": "local_offer", "text": "ডিসকাউন্ট", "description": "৩০০০+ আউটলেটে ডিসকাউন্ট"},
            {"icon": "redeem", "text": "লয়ালটি পয়েন্ট", "description": "প্রতিটি কেনাকাটায় পয়েন্ট"}
        ]'::jsonb,
        '{"issuance_fee": "BDT 500", "renewal_fee": "BDT 1500"}'::jsonb,
        true
    );

-- 5. Islami Bank Bangladesh
INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
VALUES 
    (
        (SELECT id FROM public.banks WHERE name = 'Islami Bank Bangladesh' LIMIT 1),
        'Khidmat Credit Card (Gold)',
        'Islamic Banking',
        '৳১,৫০০',
        '০%',
        '৳৩০,০০০',
        21, 60,
        '[
            {"icon": "mosque", "text": "শরীয়াহ সম্মত", "description": "সম্পূর্ণ সুদমুক্ত কার্ড"},
            {"icon": "hotel", "text": "হোটেল ডিসকাউন্ট", "description": "বিভিন্ন হোটেলে বিশেষ ছাড়"},
            {"icon": "medical_services", "text": "হাসপাতাল ডিসকাউন্ট", "description": "ইবনে সিনা হাসপাতালে ৩০% পর্যন্ত ছাড়"}
        ]'::jsonb,
        '{"issuance_fee": "BDT 1000", "renewal_fee": "BDT 1500"}'::jsonb,
        true
    );

-- 6. Standard Chartered
INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
VALUES 
    (
        (SELECT id FROM public.banks WHERE name = 'Standard Chartered' LIMIT 1),
        'Visa Signature Credit Card',
        'Premium Rewards',
        '৳১৫,০০০',
        '২০%',
        '৳১,৫০,০০০',
        21, 65,
        '[
            {"icon": "flight", "text": "গ্লোবাল লাউঞ্জ", "description": "Priority Pass দিয়ে ১০০০+ লাউঞ্জে এক্সেস"},
            {"icon": "restaurant", "text": "প্রিমিয়াম ডাইনিং", "description": "টপ হোটেলে ৫০% পর্যন্ত ছাড়"},
            {"icon": "verified_user", "text": "পারচেজ প্রোটেকশন", "description": "কেনাকাটায় বীমা সুবিধা"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 15000"}'::jsonb,
        true
    );

-- 7. Prime Bank
INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
VALUES 
    (
        (SELECT id FROM public.banks WHERE name = 'Prime Bank' LIMIT 1),
        'Prime Bank Platinum',
        'Shopping & Lifestyle',
        '৳৩,০০০',
        '২০%',
        '৳৪০,০০০',
        21, 60,
        '[
            {"icon": "local_mall", "text": "স্বপ্ন ডিসকাউন্ট", "description": "শুক্রবার ১০% ক্যাশব্যাক"},
            {"icon": "flight", "text": "এয়ারপোর্ট মিট & গ্রিট", "description": "বিনামূল্যে মিট & গ্রিট সুবিধা"},
            {"icon": "payments", "text": "সহজ কিস্তি", "description": "০% ইন্টারেস্টে ৩৬ মাস পর্যন্ত ইএমআই"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 3000"}'::jsonb,
        true
    );
