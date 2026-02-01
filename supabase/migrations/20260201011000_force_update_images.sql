-- force_update_images.sql
-- This script updates all card images using fuzzy matching to catch everything.

-- 1. EBL Cards
UPDATE public.credit_cards SET image_url = '/cards/ebl-visa-signature.png' WHERE name ILIKE '%EBL%Signature%';
UPDATE public.credit_cards SET image_url = '/cards/ebl-visa-platinum.png' WHERE name ILIKE '%EBL%Platinum%';

-- 2. BRAC Bank Cards
UPDATE public.credit_cards SET image_url = '/cards/brac-signature.png' WHERE name ILIKE '%BRAC%Signature%';
UPDATE public.credit_cards SET image_url = '/cards/brac-platinum.png' WHERE name ILIKE '%BRAC%Platinum%';

-- 3. City Bank / Amex Cards (Catch all Amex)
UPDATE public.credit_cards SET image_url = '/cards/city-amex-platinum.png' WHERE name ILIKE '%American Express%';

-- 4. Generic Fallbacks (if any match)
UPDATE public.credit_cards SET image_url = '/cards/visa-platinum.png' WHERE name ILIKE '%Visa Platinum%' AND image_url IS NULL;

-- 5. Ensure Policy Exists (Safe Block)
DO $$
BEGIN
    -- Check if policy exists, if NOT, create it.
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
