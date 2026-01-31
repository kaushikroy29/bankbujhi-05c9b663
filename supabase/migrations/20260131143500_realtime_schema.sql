-- Create Change Log Table
CREATE TABLE IF NOT EXISTS product_change_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_type TEXT NOT NULL, -- 'credit_card', 'loan', 'savings'
  product_id UUID NOT NULL,
  change_type TEXT NOT NULL, -- 'fee_update', 'rate_change', 'benefit_change', 'new_offer'
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT NOT NULL,
  change_reason TEXT,
  source_url TEXT,
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  verified BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_change_log_product ON product_change_log(product_type, product_id);
CREATE INDEX IF NOT EXISTS idx_change_log_date ON product_change_log(effective_date DESC);


-- Create Pending Updates Table (For Admin Approval)
CREATE TABLE IF NOT EXISTS pending_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_name TEXT NOT NULL, -- De-normalized for easier display
  product_type TEXT NOT NULL,
  product_id UUID, -- Can be null if it's a completely new product being proposed
  product_name TEXT NOT NULL,
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT NOT NULL,
  source_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_by UUID REFERENCES auth.users(id),
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Notifications Table (For Users)
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL, -- 'fee_increase', 'fee_decrease', 'new_benefit', 'new_card', 'general'
  title_bn TEXT NOT NULL,
  message_bn TEXT NOT NULL,
  product_id UUID,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- RLS Policies (Simple for now, can be refined)
ALTER TABLE product_change_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone for notifications and logs (transparency)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access to notifications' AND tablename = 'notifications') THEN
        CREATE POLICY "Allow public read access to notifications" ON notifications FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access to change logs' AND tablename = 'product_change_log') THEN
        CREATE POLICY "Allow public read access to change logs" ON product_change_log FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth users to insert pending updates' AND tablename = 'pending_updates') THEN
        CREATE POLICY "Allow auth users to insert pending updates" ON pending_updates FOR INSERT TO authenticated WITH CHECK (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read pending updates' AND tablename = 'pending_updates') THEN
        CREATE POLICY "Allow public read pending updates" ON pending_updates FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow admins to update pending updates' AND tablename = 'pending_updates') THEN
        CREATE POLICY "Allow admins to update pending updates" ON pending_updates FOR UPDATE TO authenticated USING (true); 
    END IF;
END
$$;

-- 5. FUNCTION: Log Product Changes
CREATE OR REPLACE FUNCTION log_product_changes()
RETURNS TRIGGER AS $$
DECLARE
    prod_type TEXT;
BEGIN
    prod_type := TG_ARGV[0]; -- 'credit_card' or 'loan' passed as arg

    -- Detect specific changes
    IF NEW.annual_fee IS DISTINCT FROM OLD.annual_fee THEN
        INSERT INTO product_change_log (product_type, product_id, change_type, field_name, old_value, new_value, verified)
        VALUES (prod_type, NEW.id, 'fee_update', 'annual_fee', OLD.annual_fee, NEW.annual_fee, true);
    END IF;

    IF NEW.interest_rate IS DISTINCT FROM OLD.interest_rate THEN
        INSERT INTO product_change_log (product_type, product_id, change_type, field_name, old_value, new_value, verified)
        VALUES (prod_type, NEW.id, 'rate_change', 'interest_rate', OLD.interest_rate, NEW.interest_rate, true);
    END IF;
    
    -- Check for benefits change (Simple cast to text for comparison)
    IF NEW.benefits::text IS DISTINCT FROM OLD.benefits::text THEN
         INSERT INTO product_change_log (product_type, product_id, change_type, field_name, old_value, new_value, verified)
        VALUES (prod_type, NEW.id, 'benefit_change', 'benefits', 'Details', 'See Updated Benefits', true);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. FUNCTION: Notify Users
CREATE OR REPLACE FUNCTION notify_users_on_change()
RETURNS TRIGGER AS $$
DECLARE
    product_name_val TEXT;
BEGIN
    -- Only notify for verified changes
    IF NEW.verified = false THEN
        RETURN NEW;
    END IF;

    -- Fetch product name
    IF NEW.product_type = 'credit_card' THEN
        SELECT name INTO product_name_val FROM credit_cards WHERE id = NEW.product_id;
    ELSIF NEW.product_type = 'loan' THEN
        SELECT name INTO product_name_val FROM loan_products WHERE id = NEW.product_id;
    ELSE 
        product_name_val := 'Product';
    END IF;

    -- Construct Notification
    INSERT INTO notifications (type, title_bn, message_bn, product_id, severity)
    VALUES (
        NEW.change_type,
        'আপডেট: ' || COALESCE(product_name_val, 'Unknown'),
        CASE 
            WHEN NEW.field_name = 'annual_fee' THEN 'বার্ষিক ফি পরিবর্তন হয়েছে: ' || NEW.new_value
            WHEN NEW.field_name = 'interest_rate' THEN 'ইটারেস্ট রেট পরিবর্তন হয়েছে: ' || NEW.new_value
            ELSE 'প্রোডাক্টের তথ্যে গুরুত্বপূর্ণ পরিবর্তন এসেছে।'
        END,
        NEW.product_id,
        'info'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. TRIGGERS
DROP TRIGGER IF EXISTS on_credit_card_change ON credit_cards;
CREATE TRIGGER on_credit_card_change
AFTER UPDATE ON credit_cards
FOR EACH ROW EXECUTE FUNCTION log_product_changes('credit_card');

DROP TRIGGER IF EXISTS on_loan_change ON loan_products;
CREATE TRIGGER on_loan_change
AFTER UPDATE ON loan_products
FOR EACH ROW EXECUTE FUNCTION log_product_changes('loan');

DROP TRIGGER IF EXISTS on_log_created ON product_change_log;
CREATE TRIGGER on_log_created
AFTER INSERT ON product_change_log
FOR EACH ROW EXECUTE FUNCTION notify_users_on_change();

-- 8. REALTIME PUBLICATION
-- Enable realtime for specific tables
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE product_change_log, notifications;
    EXCEPTION
        WHEN duplicate_object THEN
            NULL; -- Ignore error if table is already in publication
        WHEN OTHERS THEN
            RAISE; -- Re-raise other errors
    END;
END $$;
