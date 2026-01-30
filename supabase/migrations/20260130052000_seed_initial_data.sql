-- Seed Data for BankBujhi - Bangladeshi Banks & Products

DO $$
DECLARE
    city_bank_id UUID;
    ebl_id UUID;
    brac_bank_id UUID;
    scb_id UUID;
    dbbl_id UUID;
    mtb_id UUID;
    prime_bank_id UUID;
    islami_bank_id UUID;
    sonali_bank_id UUID;
    agrani_id UUID;
BEGIN

    -- 1. Insert Banks
    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('City Bank', 'সিটি ব্যাংক', 'commercial', 'Dhaka', 1983, 'https://www.thecitybank.com', true)
    RETURNING id INTO city_bank_id;

    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Eastern Bank PLC', 'ইস্টার্ন ব্যাংক পিএলসি', 'commercial', 'Dhaka', 1992, 'https://www.ebl.com.bd', true)
    RETURNING id INTO ebl_id;

    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('BRAC Bank', 'ব্র্যাক ব্যাংক', 'commercial', 'Dhaka', 2001, 'https://www.bracbank.com', true)
    RETURNING id INTO brac_bank_id;

    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Standard Chartered', 'স্ট্যান্ডার্ড চার্টার্ড ব্যাংক', 'foreign', 'London / Dhaka', 1905, 'https://www.sc.com/bd', true)
    RETURNING id INTO scb_id;

    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Dutch-Bangla Bank', 'ডাচ-বাংলা ব্যাংক', 'commercial', 'Dhaka', 1995, 'https://www.dutchbanglabank.com', true)
    RETURNING id INTO dbbl_id;
    
    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Mutual Trust Bank', 'মিউচুয়াল ট্রাস্ট ব্যাংক', 'commercial', 'Dhaka', 1999, 'https://www.mutualtrustbank.com', true)
    RETURNING id INTO mtb_id;

    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Islami Bank Bangladesh', 'ইসলামী ব্যাংক বাংলাদেশ', 'islamic', 'Dhaka', 1983, 'https://www.islamibankbd.com', true)
    RETURNING id INTO islami_bank_id;

    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Prime Bank', 'প্রাইম ব্যাংক', 'commercial', 'Dhaka', 1995, 'https://www.primebank.com.bd', true)
    RETURNING id INTO prime_bank_id;

    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Sonali Bank', 'সোনালী ব্যাংক', 'government', 'Dhaka', 1972, 'https://www.sonalibank.com.bd', true)
    RETURNING id INTO sonali_bank_id;
    
    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('Agrani Bank', 'অগ্রণী ব্যাংক', 'government', 'Dhaka', 1972, 'https://www.agranibank.org', true)
    RETURNING id INTO agrani_id;


    -- 2. Insert Credit Cards
    
    -- City Bank Amex Gold
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        city_bank_id,
        'American Express Gold Credit Card',
        'Premium Rewards',
        '৳৫,০০০',
        '২০%',
        '৳৫০,০০০',
        21, 60,
        '[
            {"icon": "flight", "text": "লাউঞ্জ এক্সেস সুবিধা", "description": "বলাকা লাউঞ্জে বছরে ৪ বার ফ্রি ভিসিট"},
            {"icon": "shopping_bag", "text": "আগোরা ও মিনাবাজারে ডিসকাউন্ট", "description": "নির্দিষ্ট দিনে ১০% ক্যাশব্যাক"},
            {"icon": "restaurant", "text": "ডাইনিং অফার", "description": "টপ রেস্টুরেন্টে বাই-ওয়ান-গেট-ওয়ান"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 5000", "supplementary_fee": "Free (1st & 2nd)"}'::jsonb,
        true
    );
    
    -- City Bank Amex Plat
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        city_bank_id,
        'American Express Platinum Credit Card',
        'Premium Rewards',
        '৳২০,০০০',
        '২০%',
        '৳১,০০,০০০',
        21, 60,
        '[
            {"icon": "flight_takeoff", "text": "আনলিমিটেড লাউঞ্জ এক্সেস", "description": "সিটি ব্যাংক লাউঞ্জ ও বলাকা লাউঞ্জে"},
            {"icon": "hotel", "text": "ফাইভ স্টার হোটেল সুবিধা", "description": "মেম্বারশিপ ও ডিসকাউন্ট সুবিধা"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 20000"}'::jsonb,
        true
    );

    -- EBL Visa Platinum
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        ebl_id,
        'Visa Platinum Credit Card',
        'Travel',
        '৳৩,০০০',
        '২০%',
        '৳৪০,০০০',
        21, 60,
        '[
            {"icon": "flight_takeoff", "text": "কমপ্লিমেন্টারি লাউঞ্জ এক্সেস", "description": "স্কাইলঞ্জ এ ফ্রি এক্সেস"},
            {"icon": "payments", "text": "ইএমআই সুবিধা", "description": "২৯ টি ব্যাংকের সাথে ০% ইএমআই"},
            {"icon": "security", "text": "বীমা সুবিধা", "description": "দুর্ঘটনাজনিত মৃত্যু বীমা"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 3000"}'::jsonb,
        true
    );
    
    -- EBL Aqua
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        ebl_id,
        'Aqua Prepaid Card',
        'Prepaid Cards',
        '৳৫৭৫',
        'N/A',
        'N/A',
        18, 65,
        '[
            {"icon": "public", "text": "ডুয়াল কারেন্সি", "description": "আন্তর্জাতিক কেনাকাটার সুবিধা"},
            {"icon": "shopping_cart", "text": "অনলাইন পেমেন্ট", "description": "সহজ অনলাইন ট্রানজ্যাকশন"}
        ]'::jsonb,
        '{"issuance_fee": "BDT 575 + VAT", "renewal_fee": "BDT 575 + VAT"}'::jsonb,
        true
    );

    -- EBL Skybanc
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        ebl_id,
        'EBL Skybanc Dual Currency',
        'Travel',
        '৳১,৫০০',
        '২০%',
        '৳৩০,০০০',
        21, 60,
        '[
            {"icon": "flight", "text": "আন্তর্জাতিক ভ্রমণ", "description": "বিশ্বব্যাপী গ্রহণযোগ্য"},
            {"icon": "shopping_bag", "text": "শপিং ডিসকাউন্ট", "description": "দেশী-বিদেশী ব্র্যান্ডে ডিসকাউন্ট"}
        ]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 1500"}'::jsonb,
        true
    );
    
    -- BRAC Bank Signature
     INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        brac_bank_id,
        'Visa Signature Credit Card',
        'Premium Rewards',
        '৳১০,০০০',
        '২০%',
        '৳১,০০,০০০',
        21, 65,
        '[
             {"icon": "vip_lounge", "text": "গ্লোবাল লাউঞ্জ এক্সেস", "description": "লাউঞ্জকী (LoungeKey) সুবিধা"},
             {"icon": "golf_course", "text": "গলফ ক্লাব সুবিধা", "description": "বিনামূল্যে গলফ খেলার সুযোগ"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 10000"}'::jsonb,
        true
    );

    -- BRAC Bank Astha
     INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        brac_bank_id,
        'Astha Credit Card',
        'Shopping & Lifestyle',
        '৳১,৫০০',
        '২০%',
        '৳২৫,০০০',
        21, 60,
        '[
             {"icon": "smartphone", "text": "আস্থা অ্যাপ সুবিধা", "description": "অ্যাপের মাধ্যমে সহজ নিয়ন্ত্রণ"},
             {"icon": "redeem", "text": "রিওয়ার্ড পয়েন্টস", "description": "প্রতি খরচে রিওয়ার্ড পয়েন্ট"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 1500"}'::jsonb,
        true
    );

    -- SCB Visa Signature
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        scb_id,
        'Visa Signature Credit Card',
        'Premium Rewards',
        '৳১৫,০০০',
        '২০%',
        '৳১,৫০,০০০',
        21, 65,
        '[
             {"icon": "flight", "text": "প্রিওরিটি পাস", "description": "বিনামূল্যে প্রিওরিটি পাস মেম্বারশিপ"},
             {"icon": "local_offer", "text": "এক্সক্লুসিভ অফার", "description": "ফাইভ স্টার হোটেল এবং রিসোর্টে বিশেষ সুবিধা"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 15000"}'::jsonb,
        true
    );

    -- SCB Visa Infinite
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        scb_id,
        'Visa Infinite Credit Card',
        'Premium Rewards',
        '৳২৫,০০০',
        '২০%',
        '৳৩,০০,০০০',
        21, 65,
        '[
             {"icon": "diamond", "text": "ইনফিনিট প্রিভিলেজ", "description": "বিশ্বমানের লাইফস্টাইল সুবিধা"},
             {"icon": "flight_takeoff", "text": "আনলিমিটেড লাউঞ্জ", "description": "বিশ্বব্যাপী ১০০০+ লাউঞ্জে এক্সেস"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 25000"}'::jsonb,
        true
    );

    -- MTB Angana
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        mtb_id,
        'MTB Angana',
        'Shopping & Lifestyle',
        '৳১,৫০০',
        '২০%',
        '৳৩০,০০০',
        21, 60,
        '[
             {"icon": "female", "text": "নারীদের জন্য বিশেষ কার্ড", "description": "ইন্স্যুরেন্স সুবিধা ও মেডিকেল ডিসকাউন্ট"},
             {"icon": "shopping_bag", "text": "শপিং অফার", "description": "লাইফস্টাইল শপে বিশেষ ডিসকাউন্ট"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 1500"}'::jsonb,
        true
    );

    -- DBBL Nexus
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        dbbl_id,
        'Nexus Classic Card',
        'Entry Level',
        '৳৫০০',
        '২০%',
        '৳২০,০০০',
        21, 60,
        '[
             {"icon": "credit_card", "text": "নেক্সাস নেটওয়ার্ক", "description": "বৃহত্তম এটিএম নেটওয়ার্ক সুবিধা"},
             {"icon": "store", "text": "মার্চেন্ট ডিসকাউন্ট", "description": "হাজার হাজার মার্চেন্টে ডিসকাউন্ট"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 500"}'::jsonb,
        true
    );

    -- Islami Bank Visa Gold
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        islami_bank_id,
        'Khidmah Gold Card',
        'Islamic Banking',
        '৳১,০০০',
        'N/A',
        '৳৩০,০০০',
        21, 60,
        '[
             {"icon": "mosque", "text": "শরীয়াহ সম্মত", "description": "সম্পূর্ণ ইসলামিক শরীয়াহ মেনে পরিচালিত"},
             {"icon": "discount", "text": "হাসপাতাল ডিসকাউন্ট", "description": "বিভিন্ন হাসপাতালে বিশেষ ছাড়"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 1000"}'::jsonb,
        true
    );

     -- Prime Bank Platinum
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        prime_bank_id,
        'Visa Platinum Credit Card',
        'Travel',
        '৳৩,০০০',
        '২০%',
        '৳৫০,০০০',
        21, 60,
        '[
             {"icon": "flight_land", "text": "বলাকা লাউঞ্জ", "description": "ফ্রি এক্সেস"},
             {"icon": "shopping_cart", "text": "সুপারশপ অফার", "description": "মীনা বাজার ও স্বপ্ন-এ ডিসকাউন্ট"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 3000"}'::jsonb,
        true
    );

    -- City Bank SimplyCash
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        city_bank_id,
        'SimplyCash Amex',
        'Cashback',
        '৳১,০০০',
        '২০%',
        '৳২৫,০০০',
        21, 60,
        '[
             {"icon": "percent", "text": "ক্যাশব্যাক", "description": "সব কেনাকাটায় ফ্ল্যাট ক্যাশব্যাক"},
             {"icon": "local_dining", "text": "রেস্টুরেন্ট অফার", "description": "সিলেক্টেড রেস্টুরেন্টে ডিসকাউন্ট"}
        ]'::jsonb,
         '{"issuance_fee": "Free", "renewal_fee": "BDT 1000"}'::jsonb,
        true
    );


    -- 3. Insert Savings Rates (FDR)
    INSERT INTO public.savings_rates (bank_id, product_type, tenure_months, tenure_label, interest_rate, min_deposit, special_offer, is_active)
    VALUES 
        (city_bank_id, 'fdr', 12, '১ বছর', 9.50, '৳১,০০,০০০', NULL, true),
        (city_bank_id, 'fdr', 3, '৩ মাস', 8.00, '৳৫,০০০', NULL, true),
        (ebl_id, 'fdr', 12, '১ বছর', 9.25, '৳১,০০,০০০', NULL, true),
        (brac_bank_id, 'fdr', 12, '১ বছর', 9.00, '৳৫,০০০', NULL, true),
        (dbbl_id, 'fdr', 12, '১ বছর', 8.50, '৳১০,০০০', NULL, true),
        (scb_id, 'fdr', 12, '১ বছর', 8.00, '৳৫,০০,০০০', NULL, true),
        (mtb_id, 'fdr', 12, '১ বছর', 9.75, '৳৫০,০০০', NULL, true),
        
        -- New Savings & DPS
        (city_bank_id, 'dps', NULL, 'মাসিক সঞ্চয়', 9.00, '৳১,০০০', '৫ বছর মেয়াদ', true),
        (brac_bank_id, 'education', 60, 'শিক্ষা সঞ্চয়', 10.00, '৳৫,০০০', NULL, true),
        (sonali_bank_id, 'senior_citizen', 36, 'সিনিয়র সিটিজেন', 11.50, '৳১,০০,০০০', 'বয়স ৬০+ বছর', true),
        (islami_bank_id, 'dps', 60, 'মুদারাবা সঞ্চয়', 8.50, '৳ ৫০০', 'শরীয়াহ সম্মত মুনাফা', true);

    -- 4. Insert Loan Products
    INSERT INTO public.loan_products (bank_id, name, loan_type, interest_rate_min, interest_rate_max, processing_fee, max_amount, features, max_tenure_months, min_income, is_active)
    VALUES
        (city_bank_id, 'City Drive', 'auto', 10.50, 11.50, '1%', '৳৪০,০০,০০০', ARRAY['দ্রুত প্রসেসিং', '৯০% পর্যন্ত লোন'], 60, '৳৪০,০০০', true),
        (city_bank_id, 'City Solution', 'personal', 11.00, 12.00, '1.5%', '৳২০,০০,০০০', ARRAY['কোনো গ্যারান্টার প্রয়োজন নেই', 'সহজ কিস্তি'], 60, '৳৩০,০০০', true),
        (ebl_id, 'EBL Personal Loan', 'personal', 10.00, 11.50, '1%', '৳২০,০০,০০০', ARRAY['দ্রুত লোন ডিসবার্সমেন্ট', 'টপ-আপ সুবিধা'], 60, '৳৩০,০০০', true),
        (brac_bank_id, 'Salary Loan', 'personal', 9.00, 11.00, '0.5%', '৳১০,০০,০০০', ARRAY['কম সুদের হার', 'স্যালারি অ্যাকাউন্ট হোল্ডারদের জন্য বিশেষ সুবিধা'], 60, '৳২৫,০০০', true),
        (dbbl_id, 'Home Loan', 'home', 8.50, 9.50, '1%', '৳২,০০,০০,০০০', ARRAY['দীর্ঘমেয়াদি লোন', 'সহজ শর্ত'], 240, '৳৫০,০০০', true),
        
        -- New Loan Products
        (dbbl_id, 'ব্যবসায়িক ঋণ', 'sme', 9.00, 10.50, '1%', '৳৫০,০০,০০০', ARRAY['কম সুদ', 'দ্রুত ডিসবার্সমেন্ট'], 36, '৳৫০,০০০', true),
        (city_bank_id, 'শিক্ষা ঋণ', 'education', 8.00, 9.00, '0.5%', '৳১০,০০,০০০', ARRAY['নমনীয় পরিশোধ', 'গ্রেস পিরিয়ড'], 120, '৳২০,০০০', true),
        (agrani_id, 'কৃষি ঋণ', 'agriculture', 7.00, 8.00, '0%', '৳৫,০০,০০০', ARRAY['সরকারি ভর্তুকি', 'সহজ শর্ত'], 24, '৳০', true),
        (islami_bank_id, 'ঘর কেনা মুরাবাহা', 'home_islamic', 8.00, 9.00, '1%', '৳১,৫০,০০,০০০', ARRAY['শরীয়াহ অনুমোদিত', 'দীর্ঘমেয়াদী'], 240, '৳৬০,০০০', true);

END $$;
