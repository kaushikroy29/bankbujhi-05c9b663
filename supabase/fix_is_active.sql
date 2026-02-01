-- Activate all banks
UPDATE banks
SET is_active = true
WHERE is_active IS NULL OR is_active = false;

-- Activate all credit cards (if any are null)
UPDATE credit_cards
SET is_active = true
WHERE is_active IS NULL;

-- Activate all loan products (if any are null)
UPDATE loan_products
SET is_active = true
WHERE is_active IS NULL;
