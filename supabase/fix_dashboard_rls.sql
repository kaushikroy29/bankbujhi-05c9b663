-- Ensure Public Read Access for Banks and Products
DO $$
BEGIN
    -- Banks: Public Read
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read banks' AND tablename = 'banks') THEN
        CREATE POLICY "Allow public read banks" ON banks FOR SELECT USING (true);
    END IF;
    
    -- Credit Cards: Public Read
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read credit cards' AND tablename = 'credit_cards') THEN
        CREATE POLICY "Allow public read credit cards" ON credit_cards FOR SELECT USING (true);
    END IF;

    -- Loan Products: Public Read
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read loan products' AND tablename = 'loan_products') THEN
        CREATE POLICY "Allow public read loan products" ON loan_products FOR SELECT USING (true);
    END IF;
END
$$;
