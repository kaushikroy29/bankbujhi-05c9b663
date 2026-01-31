-- Add detailed fee tracking to credit_cards table
ALTER TABLE credit_cards ADD COLUMN IF NOT EXISTS fees_detailed JSONB DEFAULT '{
  "annual": {
    "fee": "৳0",
    "waived": false,
    "waiver_condition": null,
    "renewal_fee": "৳0"
  },
  "transaction": {
    "cash_advance": "3%",
    "foreign_currency": "3.5%",
    "balance_transfer": "2%"
  },
  "penalty": {
    "late_payment": "৳500",
    "over_limit": "৳1000",
    "returned_payment": "৳500"
  },
  "service": {
    "replacement_card": "৳500",
    "duplicate_statement": "৳100",
    "pin_change": "৳50"
  },
  "emi": {
    "processing_fee": "1-3%",
    "interest_rate": "18-24%"
  }
}'::jsonb;

-- Add last_updated timestamp for tracking changes
ALTER TABLE credit_cards ADD COLUMN IF NOT EXISTS last_fee_update TIMESTAMP DEFAULT NOW();
ALTER TABLE credit_cards ADD COLUMN IF NOT EXISTS last_verified_date DATE;
