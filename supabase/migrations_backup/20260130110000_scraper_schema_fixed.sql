
-- Create pending_updates table for scraper results
CREATE TABLE IF NOT EXISTS public.pending_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bank_name TEXT NOT NULL,
    product_type TEXT NOT NULL, -- 'credit_card', 'loan', 'savings'
    product_id UUID, -- NULL if it's a new product or we can't match it yet
    product_name TEXT,
    field_name TEXT, -- e.g. 'annual_fee', 'interest_rate'
    old_value TEXT,
    new_value TEXT NOT NULL,
    source_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for pending_updates
ALTER TABLE public.pending_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated full access to pending_updates"
ON public.pending_updates
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create table for product update history (audit log of changes)
CREATE TABLE IF NOT EXISTS public.product_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_type TEXT NOT NULL,
    product_id UUID NOT NULL,
    change_description TEXT NOT NULL,
    change_type TEXT, -- 'fee_increase', 'rate_change', etc.
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.product_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to product_updates"
ON public.product_updates
FOR SELECT
TO public
USING (true);
