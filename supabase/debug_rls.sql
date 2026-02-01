-- Allow anonymous users to trigger scraper runs (for debugging/easier testing)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon insert scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow anon insert scraper runs" ON scraper_runs FOR INSERT TO anon WITH CHECK (true);
    END IF;
    
    -- Allow anon update (for scraper script if it runs as anon - though it uses service key usually)
    -- But let's keep it loose for now
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon update scraper runs' AND tablename = 'scraper_runs') THEN
        CREATE POLICY "Allow anon update scraper runs" ON scraper_runs FOR UPDATE TO anon USING (true);
    END IF;
END
$$;
