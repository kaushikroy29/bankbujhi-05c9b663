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
        'Entry Level',
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
    
    -- BRAC Bank
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

    -- SCB
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

    -- MTB
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    VALUES (
        mtb_id,
        'MTB Angana',
        'Shopping & Utility Payments',
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


    -- 3. Insert Savings Rates (FDR)
    INSERT INTO public.savings_rates (bank_id, product_type, tenure_months, tenure_label, interest_rate, min_deposit, is_active)
    VALUES 
        (city_bank_id, 'fdr', 12, '১ বছর', 9.50, '৳১,০০,০০০', true),
        (city_bank_id, 'fdr', 3, '৩ মাস', 8.00, '৳৫,০০০', true),
        (ebl_id, 'fdr', 12, '১ বছর', 9.25, '৳১,০০,০০০', true),
        (brac_bank_id, 'fdr', 12, '১ বছর', 9.00, '৳৫,০০০', true),
        (dbbl_id, 'fdr', 12, '১ বছর', 8.50, '৳১০,০০০', true),
        (scb_id, 'fdr', 12, '১ বছর', 8.00, '৳৫,০০,০০০', true),
        (mtb_id, 'fdr', 12, '১ বছর', 9.75, '৳৫০,০০০', true);

    -- 4. Insert Loan Products
    INSERT INTO public.loan_products (bank_id, name, loan_type, interest_rate_min, interest_rate_max, processing_fee, max_amount, features, max_tenure_months, min_income, is_active)
    VALUES
        (city_bank_id, 'City Drive', 'auto', 10.50, 11.50, '1%', '৳৪০,০০,০০০', ARRAY['দ্রুত প্রসেসিং', '৯০% পর্যন্ত লোন'], 60, '৳৪০,০০০', true),
        (city_bank_id, 'City Solution', 'personal', 11.00, 12.00, '1.5%', '৳২০,০০,০০০', ARRAY['কোনো গ্যারান্টার প্রয়োজন নেই', 'সহজ কিস্তি'], 60, '৳৩০,০০০', true),
        (ebl_id, 'EBL Personal Loan', 'personal', 10.00, 11.50, '1%', '৳২০,০০,০০০', ARRAY['দ্রুত লোন ডিসবার্সমেন্ট', 'টপ-আপ সুবিধা'], 60, '৳৩০,০০০', true),
        (brac_bank_id, 'Salary Loan', 'personal', 9.00, 11.00, '0.5%', '৳১০,০০,০০০', ARRAY['কম সুদের হার', 'স্যালারি অ্যাকাউন্ট হোল্ডারদের জন্য বিশেষ সুবিধা'], 60, '৳২৫,০০০', true),
        (dbbl_id, 'Home Loan', 'home', 8.50, 9.50, '1%', '৳২,০০,০০,০০০', ARRAY['দীর্ঘমেয়াদি লোন', 'সহজ শর্ত'], 240, '৳৫০,০০০', true);

END $$;
