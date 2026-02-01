-- final_update_all_images.sql
-- This script updates ALL 31+ cards with realistic AI images.

-- 1. EBL (Eastern Bank)
UPDATE public.credit_cards SET image_url = '/cards/ebl-aqua.png' WHERE name ILIKE '%Aqua%';
UPDATE public.credit_cards SET image_url = '/cards/ebl-skybanc.png' WHERE name ILIKE '%Skybanc%';
UPDATE public.credit_cards SET image_url = '/cards/ebl-visa-signature.png' WHERE name ILIKE '%EBL%Signature%';
UPDATE public.credit_cards SET image_url = '/cards/ebl-visa-platinum.png' WHERE name ILIKE '%EBL%Platinum%' OR name ILIKE '%Visa Platinum%Eastern%';

-- 2. City Bank / Amex
UPDATE public.credit_cards SET image_url = '/cards/city-amex-gold.png' WHERE name ILIKE '%American Express Gold%';
UPDATE public.credit_cards SET image_url = '/cards/city-simplycash.png' WHERE name ILIKE '%SimplyCash%';
UPDATE public.credit_cards SET image_url = '/cards/city-amex-platinum.png' WHERE name ILIKE '%American Express Platinum%';

-- 3. Standard Chartered
UPDATE public.credit_cards SET image_url = '/cards/scb-visa-signature.png' WHERE name ILIKE '%Standard Chartered%Signature%';
UPDATE public.credit_cards SET image_url = '/cards/scb-visa-infinite.png' WHERE name ILIKE '%Standard Chartered%Infinite%';

-- 4. BRAC Bank
UPDATE public.credit_cards SET image_url = '/cards/brac-astha.png' WHERE name ILIKE '%Astha%';
UPDATE public.credit_cards SET image_url = '/cards/brac-signature.png' WHERE name ILIKE '%BRAC%Signature%';
UPDATE public.credit_cards SET image_url = '/cards/brac-platinum.png' WHERE name ILIKE '%BRAC%Platinum%';

-- 5. Mutual Trust Bank (MTB)
UPDATE public.credit_cards SET image_url = '/cards/mtb-angana.png' WHERE name ILIKE '%Angana%';

-- 6. Dutch-Bangla Bank (DBBL)
UPDATE public.credit_cards SET image_url = '/cards/dbbl-nexus-classic.png' WHERE name ILIKE '%Nexus%';

-- 7. Islami Bank
UPDATE public.credit_cards SET image_url = '/cards/islami-khidmah-gold.png' WHERE name ILIKE '%Khidmah%';

-- 8. Prime Bank
UPDATE public.credit_cards SET image_url = '/cards/prime-visa-platinum.png' WHERE name ILIKE '%Prime%Platinum%';

-- 9. General Fallback for any Visa Platinum/Signature that missed specific matches
UPDATE public.credit_cards SET image_url = '/cards/visa-platinum.png' WHERE name ILIKE '%Visa Platinum%' AND image_url IS NULL;

-- 10. Ensure Policy Exists (Just in case)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public update credit cards' AND tablename = 'credit_cards') THEN
        CREATE POLICY "Allow public update credit cards" ON public.credit_cards FOR UPDATE USING (true) WITH CHECK (true);
    END IF;
END
$$;
