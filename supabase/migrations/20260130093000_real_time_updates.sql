-- Create change log table
CREATE TABLE product_change_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_type TEXT NOT NULL, -- 'credit_card', 'loan', 'savings'
  product_id UUID NOT NULL,
  change_type TEXT NOT NULL, -- 'fee_update', 'rate_change', 'benefit_change'
  field_changed TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT NOT NULL,
  change_reason TEXT,
  source_url TEXT,
  effective_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT,
  verified BOOLEAN DEFAULT false
);

-- Create index for quick lookups
CREATE INDEX idx_change_log_product ON product_change_log(product_type, product_id);
CREATE INDEX idx_change_log_date ON product_change_log(effective_date DESC);
