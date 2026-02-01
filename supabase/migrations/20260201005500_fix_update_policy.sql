-- Allow UPDATE on credit_cards for public (anon)
-- In production, you'd restrict this, but for this dev setup we need it.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE policyname = 'Allow public update credit cards' 
        AND tablename = 'credit_cards'
    ) THEN
        CREATE POLICY "Allow public update credit cards" 
        ON public.credit_cards 
        FOR UPDATE 
        USING (true) 
        WITH CHECK (true);
    END IF;
END
$$;
