-- =========================================
-- Seed Initial Data for Bangladesh
-- =========================================

-- ---------- Banks ----------
INSERT INTO banks (name, name_bn, type, is_active)
VALUES
('Dutch-Bangla Bank', 'ডাচ বাংলা ব্যাংক', 'Commercial', true),
('Islami Bank Bangladesh', 'ইসলামী ব্যাংক বাংলাদেশ', 'Islamic', true),
('BRAC Bank', 'ব্র্যাক ব্যাংক', 'Commercial', true),
('City Bank', 'সিটি ব্যাংক', 'Commercial', true)
ON CONFLICT DO NOTHING;

-- ---------- Credit Cards ----------
INSERT INTO credit_cards (name, category, is_active)
VALUES
('Student Credit Card', 'Student Cards', true),
('Islamic Gold Card', 'Islamic Banking', true),
('Platinum Rewards Card', 'Rewards', true),
('Classic Credit Card', 'Classic', true)
ON CONFLICT DO NOTHING;
