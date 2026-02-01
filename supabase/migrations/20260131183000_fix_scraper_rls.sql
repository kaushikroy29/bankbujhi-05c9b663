-- Allow authenticated users (Admin) to insert scraper runs (Trigger button)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow authenticated insert scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow authenticated insert scraper runs" ON scraper_runs FOR INSERT TO authenticated WITH CHECK (true);
    END IF;
    
    -- Allow authenticated users to update runs (if needed)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow authenticated update scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow authenticated update scraper runs" ON scraper_runs FOR UPDATE TO authenticated USING (true);
    END IF;
END
$$;
