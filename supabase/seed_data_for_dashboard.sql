-- Seed Data for BankBujhi - Bangladeshi Banks & Products

BEGIN;

    -- 1. Insert Banks
    INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
    VALUES 
        ('City Bank', 'সিটি ব্যাংক', 'commercial', 'Dhaka', 1983, 'https://www.thecitybank.com', true),
        ('Eastern Bank PLC', 'ইস্টার্ন ব্যাংক পিএলসি', 'commercial', 'Dhaka', 1992, 'https://www.ebl.com.bd', true),
        ('BRAC Bank', 'ব্র্যাক ব্যাংক', 'commercial', 'Dhaka', 2001, 'https://www.bracbank.com', true),
        ('Standard Chartered', 'স্ট্যান্ডার্ড চার্টার্ড ব্যাংক', 'foreign', 'London / Dhaka', 1905, 'https://www.sc.com/bd', true),
        ('Dutch-Bangla Bank', 'ডাচ-বাংলা ব্যাংক', 'commercial', 'Dhaka', 1995, 'https://www.dutchbanglabank.com', true),
        ('Mutual Trust Bank', 'মিউচুয়াল ট্রাস্ট ব্যাংক', 'commercial', 'Dhaka', 1999, 'https://www.mutualtrustbank.com', true),
        ('Islami Bank Bangladesh', 'ইসলামী ব্যাংক বাংলাদেশ', 'islamic', 'Dhaka', 1983, 'https://www.islamibankbd.com', true),
        ('Prime Bank', 'প্রাইম ব্যাংক', 'commercial', 'Dhaka', 1995, 'https://www.primebank.com.bd', true),
        ('Sonali Bank', 'সোনালী ব্যাংক', 'government', 'Dhaka', 1972, 'https://www.sonalibank.com.bd', true),
        ('Agrani Bank', 'অগ্রণী ব্যাংক', 'government', 'Dhaka', 1972, 'https://www.agranibank.org', true)
    ON CONFLICT (name) DO NOTHING; -- Prevent errors on re-run

    -- Fetch IDs for relationships (Generic lookups to avoid hardcoding UUIDs from previous failed runs)
    -- This approach is safer for repeated seeding.    
    
    -- 2. Insert Credit Cards (Using sub-selects for IDs)
    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    SELECT id, 'American Express Gold Credit Card', 'Premium Rewards', '৳৫,০০০', '২০%', '৳৫০,০০০', 21, 60,
        '[{"icon": "flight", "text": "লাউঞ্জ এক্সেস সুবিধা", "description": "বলাকা লাউঞ্জে বছরে ৪ বার ফ্রি ভিসিট"}, {"icon": "shopping_bag", "text": "আগোরা ও মিনাবাজারে ডিসকাউন্ট", "description": "নির্দিষ্ট দিনে ১০% ক্যাশব্যাক"}]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 5000", "supplementary_fee": "Free (1st & 2nd)"}'::jsonb, true
    FROM public.banks WHERE name = 'City Bank'
    ON CONFLICT DO NOTHING;

    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    SELECT id, 'Visa Platinum Credit Card', 'Travel', '৳৩,০০০', '২০%', '৳৪০,০০০', 21, 60,
        '[{"icon": "flight_takeoff", "text": "কমপ্লিমেন্টারি লাউঞ্জ এক্সেস", "description": "স্কাইলঞ্জ এ ফ্রি এক্সেস"}, {"icon": "payments", "text": "ইএমআই সুবিধা", "description": "২৯ টি ব্যাংকের সাথে ০% ইএমআই"}]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 3000"}'::jsonb, true
    FROM public.banks WHERE name = 'Eastern Bank PLC'
    ON CONFLICT DO NOTHING;

    INSERT INTO public.credit_cards (bank_id, name, category, annual_fee, interest_rate, min_income, min_age, max_age, benefits, fees, is_active)
    SELECT id, 'Visa Signature Credit Card', 'Premium Rewards', '৳১৫,০০০', '২০%', '৳১,৫০,০০০', 21, 65,
        '[{"icon": "flight", "text": "প্রিওরিটি পাস", "description": "বিনামূল্যে প্রিওরিটি পাস মেম্বারশিপ"}, {"icon": "local_offer", "text": "এক্সক্লুসিভ অফার", "description": "ফাইভ স্টার হোটেল এবং রিসোর্টে বিশেষ সুবিধা"}]'::jsonb,
        '{"issuance_fee": "Free", "renewal_fee": "BDT 15000"}'::jsonb, true
    FROM public.banks WHERE name = 'Standard Chartered'
    ON CONFLICT DO NOTHING;
    
    -- 3. Insert Savings Rates
    INSERT INTO public.savings_rates (bank_id, product_type, tenure_months, tenure_label, interest_rate, min_deposit, special_offer, is_active)
    SELECT id, 'fdr', 12, '১ বছর', 9.50, '৳১,০০,০০০', NULL, true FROM public.banks WHERE name = 'City Bank'
    ON CONFLICT DO NOTHING;

    INSERT INTO public.savings_rates (bank_id, product_type, tenure_months, tenure_label, interest_rate, min_deposit, special_offer, is_active)
    SELECT id, 'fdr', 12, '১ বছর', 9.25, '৳১,০০,০০০', NULL, true FROM public.banks WHERE name = 'Eastern Bank PLC'
    ON CONFLICT DO NOTHING;

    -- 4. Insert Loan Products
    INSERT INTO public.loan_products (bank_id, name, loan_type, interest_rate_min, interest_rate_max, processing_fee, max_amount, features, max_tenure_months, min_income, is_active)
    SELECT id, 'City Drive', 'auto', 10.50, 11.50, '1%', '৳৪০,০০,০০০', ARRAY['দ্রুত প্রসেসিং', '৯০% পর্যন্ত লোন'], 60, '৳৪০,০০০', true FROM public.banks WHERE name = 'City Bank'
    ON CONFLICT DO NOTHING;

COMMIT;
