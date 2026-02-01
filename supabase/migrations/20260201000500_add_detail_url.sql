-- Add detail_url column to credit_cards table for storing source URLs
ALTER TABLE public.credit_cards ADD COLUMN IF NOT EXISTS detail_url TEXT;

-- Add features column if not exists (scraped data includes this)
ALTER TABLE public.credit_cards ADD COLUMN IF NOT EXISTS features TEXT[];

-- Also add to loan_products for consistency
ALTER TABLE public.loan_products ADD COLUMN IF NOT EXISTS detail_url TEXT;
