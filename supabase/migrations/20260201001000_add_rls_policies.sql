-- Add RLS policies for credit_cards and loan_products tables
-- Allow authenticated users to insert (for admin approval workflow)

-- Credit Cards
DO $$
BEGIN
    -- Enable RLS if not already enabled
    ALTER TABLE public.credit_cards ENABLE ROW LEVEL SECURITY;
    
    -- Policy for SELECT (public read)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read credit cards' AND tablename = 'credit_cards') THEN
        CREATE POLICY "Allow public read credit cards" ON public.credit_cards FOR SELECT USING (true);
    END IF;
    
    -- Policy for INSERT (allow all for now - in production, restrict to authenticated/admin)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow insert credit cards' AND tablename = 'credit_cards') THEN
        CREATE POLICY "Allow insert credit cards" ON public.credit_cards FOR INSERT WITH CHECK (true);
    END IF;
    
    -- Policy for UPDATE
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow update credit cards' AND tablename = 'credit_cards') THEN
        CREATE POLICY "Allow update credit cards" ON public.credit_cards FOR UPDATE USING (true);
    END IF;
END
$$;

-- Loan Products
DO $$
BEGIN
    ALTER TABLE public.loan_products ENABLE ROW LEVEL SECURITY;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read loan products' AND tablename = 'loan_products') THEN
        CREATE POLICY "Allow public read loan products" ON public.loan_products FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow insert loan products' AND tablename = 'loan_products') THEN
        CREATE POLICY "Allow insert loan products" ON public.loan_products FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow update loan products' AND tablename = 'loan_products') THEN
        CREATE POLICY "Allow update loan products" ON public.loan_products FOR UPDATE USING (true);
    END IF;
END
$$;
