-- Banks table
CREATE TABLE public.banks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_bn TEXT,
  logo_url TEXT,
  website_url TEXT,
  type TEXT NOT NULL DEFAULT 'commercial',
  swift_code TEXT,
  established_year INTEGER,
  headquarters TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Credit Cards table
CREATE TABLE public.credit_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_id UUID REFERENCES public.banks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  annual_fee TEXT,
  annual_fee_note TEXT,
  annual_fee_waived BOOLEAN DEFAULT false,
  interest_rate TEXT,
  min_income TEXT,
  min_age INTEGER,
  max_age INTEGER,
  credit_score TEXT,
  employment_types TEXT[],
  required_documents TEXT[],
  benefits JSONB DEFAULT '[]'::jsonb,
  fees JSONB DEFAULT '{}'::jsonb,
  badge TEXT,
  apply_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Savings/FDR rates table
CREATE TABLE public.savings_rates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_id UUID REFERENCES public.banks(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL DEFAULT 'fdr',
  tenure_months INTEGER,
  tenure_label TEXT,
  interest_rate DECIMAL(5,2),
  min_deposit TEXT,
  special_offer TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Loan products table
CREATE TABLE public.loan_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_id UUID REFERENCES public.banks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  loan_type TEXT NOT NULL DEFAULT 'personal',
  interest_rate_min DECIMAL(5,2),
  interest_rate_max DECIMAL(5,2),
  processing_fee TEXT,
  max_amount TEXT,
  max_tenure_months INTEGER,
  min_income TEXT,
  features TEXT[],
  badge TEXT,
  apply_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read, admin write)
ALTER TABLE public.banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_products ENABLE ROW LEVEL SECURITY;

-- Public read policies (financial data is public)
CREATE POLICY "Banks are publicly readable" ON public.banks FOR SELECT USING (true);
CREATE POLICY "Credit cards are publicly readable" ON public.credit_cards FOR SELECT USING (true);
CREATE POLICY "Savings rates are publicly readable" ON public.savings_rates FOR SELECT USING (true);
CREATE POLICY "Loan products are publicly readable" ON public.loan_products FOR SELECT USING (true);

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_banks_updated_at BEFORE UPDATE ON public.banks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_credit_cards_updated_at BEFORE UPDATE ON public.credit_cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_savings_rates_updated_at BEFORE UPDATE ON public.savings_rates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_loan_products_updated_at BEFORE UPDATE ON public.loan_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();