-- final_fix_images.sql
-- Updates generic card names by linking them to their specific banks.

-- 1. EBL "Visa Platinum" -> EBL Image
UPDATE public.credit_cards 
SET image_url = '/cards/ebl-visa-platinum.png' 
WHERE name = 'Visa Platinum Credit Card' 
AND bank_id IN (SELECT id FROM public.banks WHERE name = 'Eastern Bank PLC');

-- 2. BRAC "Visa Signature" -> BRAC Image
UPDATE public.credit_cards 
SET image_url = '/cards/brac-signature.png' 
WHERE name = 'Visa Signature Credit Card' 
AND bank_id IN (SELECT id FROM public.banks WHERE name = 'BRAC Bank');

-- 3. Standard Chartered "Visa Signature" -> SCB Image
UPDATE public.credit_cards 
SET image_url = '/cards/scb-visa-signature.png' 
WHERE name = 'Visa Signature Credit Card' 
AND bank_id IN (SELECT id FROM public.banks WHERE name = 'Standard Chartered');

-- 4. Standard Chartered "Visa Infinite" -> SCB Image
UPDATE public.credit_cards 
SET image_url = '/cards/scb-visa-infinite.png' 
WHERE name = 'Visa Infinite Credit Card' 
AND bank_id IN (SELECT id FROM public.banks WHERE name = 'Standard Chartered');

-- 5. Prime Bank "Visa Platinum" -> Prime Image
UPDATE public.credit_cards 
SET image_url = '/cards/prime-visa-platinum.png' 
WHERE name = 'Visa Platinum Credit Card' 
AND bank_id IN (SELECT id FROM public.banks WHERE name = 'Prime Bank');

-- 6. Ensure Policy Exists (Safe Block)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public update credit cards' AND tablename = 'credit_cards') THEN
        CREATE POLICY "Allow public update credit cards" ON public.credit_cards FOR UPDATE USING (true) WITH CHECK (true);
    END IF;
END
$$;
