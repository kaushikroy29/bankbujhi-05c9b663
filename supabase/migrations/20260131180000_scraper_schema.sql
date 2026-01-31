-- Scraped Data Staging Table
-- Stores raw scraped data before admin approval
CREATE TABLE IF NOT EXISTS scraped_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bank_id UUID REFERENCES banks(id),
  data_type TEXT NOT NULL, -- 'credit_card', 'loan', 'savings_rate', 'bank_info'
  scraped_json JSONB NOT NULL, -- Raw scraped data
  source_url TEXT NOT NULL,
  scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'merged')),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  diff_summary TEXT, -- Human-readable summary of changes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scraper Run History
-- Tracks each execution of the scraper (scheduled or manual)
CREATE TABLE IF NOT EXISTS scraper_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_type TEXT NOT NULL, -- 'scheduled', 'manual'
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'running' CHECK (status IN ('running', 'success', 'partial', 'failed')),
  banks_scraped INTEGER DEFAULT 0,
  items_found INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]'::jsonb,
  github_run_id TEXT
);

-- Indexes for performance
CREATE INDEX idx_scraped_data_status ON scraped_data(status);
CREATE INDEX idx_scraped_data_bank ON scraped_data(bank_id);
CREATE INDEX idx_scraped_data_date ON scraped_data(scraped_at DESC);
CREATE INDEX idx_scraper_runs_date ON scraper_runs(started_at DESC);

-- RLS Policies
ALTER TABLE scraped_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraper_runs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    -- Allow public read access to scraper runs (for admin view)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow public read scraper runs" ON scraper_runs FOR SELECT USING (true);
    END IF;
    
    -- Allow public read access to scraped data (for admin view)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read scraped data' AND tablename = 'scraped_data') THEN
        CREATE POLICY "Allow public read scraped data" ON scraped_data FOR SELECT USING (true);
    END IF;
    
    -- Allow authenticated users to update scraped data (for approval)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow auth users to update scraped data' AND tablename = 'scraped_data') THEN
        CREATE POLICY "Allow auth users to update scraped data" ON scraped_data FOR UPDATE TO authenticated USING (true);
    END IF;
    
    -- Allow service role to insert (for scraper)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow service insert scraped data' AND tablename = 'scraped_data') THEN
        CREATE POLICY "Allow service insert scraped data" ON scraped_data FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow service insert scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow service insert scraper runs" ON scraper_runs FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow service update scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow service update scraper runs" ON scraper_runs FOR UPDATE USING (true);
    END IF;
END
$$;
