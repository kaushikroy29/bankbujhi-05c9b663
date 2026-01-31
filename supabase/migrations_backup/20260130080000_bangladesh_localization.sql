-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_credit_cards_category ON credit_cards(category);
CREATE INDEX IF NOT EXISTS idx_credit_cards_bank_id ON credit_cards(bank_id);
CREATE INDEX IF NOT EXISTS idx_savings_rates_product_type ON savings_rates(product_type);
CREATE INDEX IF NOT EXISTS idx_loan_products_loan_type ON loan_products(loan_type);

-- Add full-text search for Bangla
ALTER TABLE banks ADD COLUMN IF NOT EXISTS search_vector tsvector;
CREATE INDEX IF NOT EXISTS banks_search_idx ON banks USING GIN(search_vector);
