-- Create product_change_log table
CREATE TABLE IF NOT EXISTS public.product_change_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_type TEXT NOT NULL, -- 'credit_card', 'loan', 'savings'
    product_id UUID NOT NULL,
    change_type TEXT NOT NULL, -- 'fee_update', 'rate_change', 'benefit_change', 'new_offer'
    field_changed TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT NOT NULL,
    change_description TEXT,
    source_url TEXT,
    effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    verified BOOLEAN DEFAULT false
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_change_log_product ON public.product_change_log(product_type, product_id);
CREATE INDEX IF NOT EXISTS idx_change_log_date ON public.product_change_log(effective_date DESC);
CREATE INDEX IF NOT EXISTS idx_change_log_verified ON public.product_change_log(verified);

-- Add RLS policies
ALTER TABLE public.product_change_log ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone for verified changes (for "What's New" section)
CREATE POLICY "Allow public read verified changes"
ON public.product_change_log
FOR SELECT
USING (verified = true);

-- Allow authenticated users (admins) to insert/update
CREATE POLICY "Allow authenticated insert"
ON public.product_change_log
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
ON public.product_change_log
FOR UPDATE
TO authenticated
USING (true);
