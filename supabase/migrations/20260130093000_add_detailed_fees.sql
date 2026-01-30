-- Add new columns for detailed fees and tracking
ALTER TABLE public.credit_cards 
ADD COLUMN IF NOT EXISTS fees_detailed JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_fee_update TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS last_verified_date TIMESTAMPTZ DEFAULT NOW();

-- Add comments for clarity
COMMENT ON COLUMN public.credit_cards.fees_detailed IS 'Structured detailed fees (annual, transaction, penalty, etc)';
COMMENT ON COLUMN public.credit_cards.last_fee_update IS 'Date when fees were last updated';
COMMENT ON COLUMN public.credit_cards.last_verified_date IS 'Date when card details were last manually verified';
