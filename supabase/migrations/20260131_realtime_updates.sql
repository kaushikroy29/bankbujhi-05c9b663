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

CREATE INDEX idx_change_log_product ON product_change_log(product_type, product_id);
CREATE INDEX idx_change_log_date ON product_change_log(effective_date DESC);


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

CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- RLS Policies (Simple for now, can be refined)
ALTER TABLE product_change_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone for notifications and logs (transparency)
CREATE POLICY "Allow public read access to notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access to change logs" ON product_change_log FOR SELECT USING (true);

-- Pending updates: Only admins (or authenticated users for submission)
-- For this MVP, we'll allow authenticated users to submit, everyone to read (for transparency dashboard?) 
-- or restrict read to admins. Let's restrict write to auth users.
CREATE POLICY "Allow auth users to insert pending updates" ON pending_updates FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow public read pending updates" ON pending_updates FOR SELECT USING (true);
CREATE POLICY "Allow admins to update pending updates" ON pending_updates FOR UPDATE TO authenticated USING (true); -- Ideally check for role
