-- update_images.sql
-- Run this in your Supabase SQL Editor to instantly update the card images

-- 1. Update American Express Platinum (City Bank)
UPDATE public.credit_cards
SET image_url = '/cards/city-amex-platinum.png'
WHERE name = 'City Bank American Express Platinum Credit Card' OR name = 'American Express Platinum Credit Card';

-- 2. Update BRAC Bank Signature
UPDATE public.credit_cards
SET image_url = '/cards/brac-signature.png'
WHERE name = 'BRAC Bank Signature Card';

-- 3. Update BRAC Bank Platinum
UPDATE public.credit_cards
SET image_url = '/cards/brac-platinum.png'
WHERE name = 'BRAC Bank Platinum Card';

-- 4. Update EBL Visa Signature
UPDATE public.credit_cards
SET image_url = '/cards/ebl-visa-signature.png'
WHERE name = 'EBL Visa Signature Credit Card';

-- 5. Update EBL Visa Platinum
UPDATE public.credit_cards
SET image_url = '/cards/ebl-visa-platinum.png'
WHERE name = 'EBL Visa Platinum Credit Card';

-- 6. Also allow future updates via API (Fixes the "Nothing changed" issue for next time)
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
