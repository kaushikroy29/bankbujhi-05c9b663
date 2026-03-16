
import { createClient } from "@supabase/supabase-js";

// Load from environment variables (ensure .env exists)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";

if (!process.env.VITE_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("⚠️ Supabase credentials missing. DB automation will fail. Using placeholder credentials to prevent startup crash.");
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
