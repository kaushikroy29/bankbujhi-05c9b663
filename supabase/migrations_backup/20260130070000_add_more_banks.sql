-- Add More Bangladeshi Banks (Government, Private, Foreign)

-- Government Banks
INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
VALUES 
    ('Sonali Bank', 'সোনালী ব্যাংক লিমিটেড', 'government', 'Dhaka', 1972, 'https://www.sonalibank.com.bd', true),
    ('Janata Bank', 'জনতা ব্যাংক লিমিটেড', 'government', 'Dhaka', 1972, 'https://www.janatabank-bd.com', true),
    ('Agrani Bank', 'অগ্রণী ব্যাংক লিমিটেড', 'government', 'Dhaka', 1972, 'https://www.agranibank.org', true),
    ('Rupali Bank', 'রূপালী ব্যাংক লিমিটেড', 'government', 'Dhaka', 1972, 'https://www.rupalibank.org', true),
    ('Bangladesh Development Bank', 'বাংলাদেশ উন্নয়ন ব্যাংক লিমিটেড', 'government', 'Dhaka', 2009, 'https://www.bdbl.com.bd', true);

-- Private Commercial Banks
INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
VALUES 
    ('Islami Bank Bangladesh', 'ইসলামী ব্যাংক বাংলাদেশ', 'commercial', 'Dhaka', 1983, 'https://www.islamibankbd.com', true),
    ('Prime Bank', 'প্রাইম ব্যাংক লিমিটেড', 'commercial', 'Dhaka', 1995, 'https://www.primebank.com.bd', true),
    ('United Commercial Bank', 'ইউনাইটেড কমার্শিয়াল ব্যাংক', 'commercial', 'Dhaka', 1983, 'https://www.ucbl.com', true),
    ('Mercantile Bank', 'মার্কেন্টাইল ব্যাংক লিমিটেড', 'commercial', 'Dhaka', 1999, 'https://www.mblbd.com', true),
    ('Southeast Bank', 'সাউথইস্ট ব্যাংক লিমিটেড', 'commercial', 'Dhaka', 1995, 'https://www.southeastbank.com.bd', true),
    ('National Bank Limited', 'ন্যাশনাল ব্যাংক লিমিটেড', 'commercial', 'Dhaka', 1983, 'https://www.nblbd.com', true),
    ('IFIC Bank', 'আইএফআইসি ব্যাংক লিমিটেড', 'commercial', 'Dhaka', 1983, 'https://www.ificbank.com.bd', true);

-- Foreign Banks
INSERT INTO public.banks (name, name_bn, type, headquarters, established_year, website_url, is_active)
VALUES 
    ('HSBC', 'এইচএসবিসি', 'foreign', 'London / Dhaka', 1996, 'https://www.hsbc.com.bd', true),
    ('Citibank N.A.', 'সিটিব্যাংক এন.এ.', 'foreign', 'New York / Dhaka', 1995, 'https://www.citibank.com/bangladesh', true),
    ('Commercial Bank of Ceylon', 'কমার্শিয়াল ব্যাংক অফ সিলন', 'foreign', 'Colombo / Dhaka', 2003, 'https://www.combankbd.com', true),
    ('Habib Bank Limited', 'হাবিব ব্যাংক লিমিটেড', 'foreign', 'Karachi / Dhaka', 1976, 'https://www.hbl.com', true);
