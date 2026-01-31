-- Create Banks Table
CREATE TABLE IF NOT EXISTS public.banks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_bn TEXT,
    logo_url TEXT,
    website_url TEXT,
    type TEXT,
    swift_code TEXT,
    established_year INTEGER,
    headquarters TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Credit Cards Table
CREATE TABLE IF NOT EXISTS public.credit_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    bank_id UUID REFERENCES public.banks(id),
    name TEXT NOT NULL,
    category TEXT,
    image_url TEXT,
    annual_fee TEXT,
    annual_fee_note TEXT,
    annual_fee_waived BOOLEAN,
    interest_rate TEXT,
    min_income TEXT,
    min_age INTEGER,
    max_age INTEGER,
    credit_score TEXT,
    employment_types TEXT[],
    required_documents TEXT[],
    benefits JSONB DEFAULT '[]'::jsonb,
    fees JSONB DEFAULT '{}'::jsonb,
    fees_detailed JSONB DEFAULT '{}'::jsonb,
    badge TEXT,
    apply_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_fee_update TIMESTAMP WITH TIME ZONE,
    last_verified_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Loan Products Table
CREATE TABLE IF NOT EXISTS public.loan_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    bank_id UUID REFERENCES public.banks(id),
    name TEXT NOT NULL,
    loan_type TEXT,
    interest_rate_min NUMERIC,
    interest_rate_max NUMERIC,
    processing_fee TEXT,
    max_amount TEXT,
    max_tenure_months INTEGER,
    min_income TEXT,
    features TEXT[],
    badge TEXT,
    apply_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Savings Rates Table
CREATE TABLE IF NOT EXISTS public.savings_rates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    bank_id UUID REFERENCES public.banks(id),
    product_type TEXT,
    tenure_months INTEGER,
    tenure_label TEXT,
    interest_rate NUMERIC,
    min_deposit TEXT,
    special_offer TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_credit_cards_bank ON credit_cards(bank_id);
CREATE INDEX IF NOT EXISTS idx_loans_bank ON loan_products(bank_id);
CREATE INDEX IF NOT EXISTS idx_savings_bank ON savings_rates(bank_id);
