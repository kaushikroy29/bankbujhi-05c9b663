-- Update Bank Logos with High Quality Images from Wikimedia Commons
-- Using Special:FilePath for stable redirection to the actual image

-- 1. City Bank
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/The_City_Bank_Limited_logo.svg'
WHERE name = 'City Bank';

-- 2. Eastern Bank PLC (EBL)
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/EBL_Registered_Corporate_Logo_horizontal.svg'
WHERE name = 'Eastern Bank PLC' OR name = 'Eastern Bank Limited';

-- 3. BRAC Bank
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/BRAC_logo.png'
WHERE name = 'BRAC Bank';

-- 4. Dutch-Bangla Bank (DBBL)
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Dutch-bangla-bank-ltd.svg'
WHERE name = 'Dutch-Bangla Bank';

-- 5. Mutual Trust Bank (MTB)
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Mutual_Trust_Bank_PLC_Logo.jpg'
WHERE name = 'Mutual Trust Bank';

-- 6. Islami Bank Bangladesh
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Islami_Bank_Bangladesh_Logo.svg'
WHERE name = 'Islami Bank Bangladesh';

-- 7. Prime Bank
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Logo_of_Prime_Bank.svg'
WHERE name = 'Prime Bank';

-- 8. United Commercial Bank (UCB)
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/UCB_logo.jpg'
WHERE name = 'United Commercial Bank';

-- 9. Sonali Bank
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Sonali_Bank_Limited.svg'
WHERE name = 'Sonali Bank';

-- 10. Janata Bank
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Janata_Bank_Logo.svg'
WHERE name = 'Janata Bank';

-- 11. Agrani Bank (Best effort)
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Agrani_Bank_Logo.svg'
WHERE name = 'Agrani Bank';

-- 12. Standard Chartered
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Standard_Chartered.svg'
WHERE name = 'Standard Chartered';

-- 13. HSBC
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/HSBC_logo_(2018).svg'
WHERE name = 'HSBC';

-- 14. Citibank N.A.
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Citibank_logo.svg'
WHERE name = 'Citibank N.A.';

-- 15. Commercial Bank of Ceylon
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Commercial_Bank_of_Ceylon_logo.svg'
WHERE name = 'Commercial Bank of Ceylon';

-- 16. Habib Bank Limited
UPDATE public.banks 
SET logo_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/HBL_logo.svg'
WHERE name = 'Habib Bank Limited';
