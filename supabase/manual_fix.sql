-- Consolidated Migration Script for Bank Scraper System
-- Run this in your Supabase Dashboard > SQL Editor > New Query

-- 1. Create Scraped Data Staging Table
CREATE TABLE IF NOT EXISTS scraped_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_id UUID REFERENCES banks(id),
  data_type TEXT NOT NULL,
  scraped_json JSONB NOT NULL,
  source_url TEXT NOT NULL,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'merged')),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  diff_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Scraper Run History Table
CREATE TABLE IF NOT EXISTS scraper_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_type TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'success', 'partial', 'failed')),
  banks_scraped INTEGER DEFAULT 0,
  items_found INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]'::jsonb,
  github_run_id TEXT
);

-- 3. Create Indexes
CREATE INDEX IF NOT EXISTS idx_scraped_data_status ON scraped_data(status);
CREATE INDEX IF NOT EXISTS idx_scraped_data_bank ON scraped_data(bank_id);
CREATE INDEX IF NOT EXISTS idx_scraped_data_date ON scraped_data(scraped_at DESC);
CREATE INDEX IF NOT EXISTS idx_scraper_runs_date ON scraper_runs(started_at DESC);

-- 4. Enable RLS
ALTER TABLE scraped_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraper_runs ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies (Includes Fix for Manual Trigger)
DO $$
BEGIN
    -- Scraper Runs: Read Access (Public)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow public read scraper runs" ON scraper_runs FOR SELECT USING (true);
    END IF;
    
    -- Scraper Runs: Service Insert
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow service insert scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow service insert scraper runs" ON scraper_runs FOR INSERT WITH CHECK (true);
    END IF;
    
    -- Scraper Runs: Service Update
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow service update scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow service update scraper runs" ON scraper_runs FOR UPDATE USING (true);
    END IF;

    -- Scraper Runs: Admin/Auth Insert (For UI Trigger)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow authenticated insert scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow authenticated insert scraper runs" ON scraper_runs FOR INSERT TO authenticated WITH CHECK (true);
    END IF;

    -- Scraped Data: Read Access (Public)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read scraped data' AND tablename = 'scraped_data') THEN
        CREATE POLICY "Allow public read scraped data" ON scraped_data FOR SELECT USING (true);
    END IF;
    
    -- Scraped Data: Admin Update (Approval)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth users to update scraped data' AND tablename = 'scraped_data') THEN
        CREATE POLICY "Allow auth users to update scraped data" ON scraped_data FOR UPDATE TO authenticated USING (true);
    END IF;
    
    -- Scraped Data: Service Insert
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow service insert scraped data' AND tablename = 'scraped_data') THEN
        CREATE POLICY "Allow service insert scraped data" ON scraped_data FOR INSERT WITH CHECK (true);
    END IF;
END
$$;

-- 6. Seed Bank Data (If missing on remote)
-- This is safe to run as it uses ON CONFLICT DO NOTHING
-- 6. Seed Bank Data (Safe Insert without ON CONFLICT)
INSERT INTO banks (name, swift_code, established_year, headquarters, website_url, logo_url)
SELECT * FROM (VALUES 
    ('BRAC Bank', 'BRACBDDH', 2001, 'Dhaka', 'https://www.bracbank.com', '/banks/brac-bank.png'),
    ('Dutch-Bangla Bank', 'DBBLBDDH', 1995, 'Dhaka', 'https://www.dutchbanglabank.com', '/banks/dbbl.png'),
    ('Eastern Bank', 'EBLBDDH', 1992, 'Dhaka', 'https://www.ebl.com.bd', '/banks/ebl.png')
) AS v(n, s, y, h, w, l)
WHERE NOT EXISTS (
    SELECT 1 FROM banks WHERE name = v.n
);
