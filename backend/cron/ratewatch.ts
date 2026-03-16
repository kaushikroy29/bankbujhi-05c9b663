
import { supabaseAdmin } from "../services/supabase.js";
import { callOpenClaw } from "../services/openclaw.js";

/**
 * RateWatch Cron Job
 * 
 * Purpose: Periodic re-verification or comparison of rate data.
 * Schedule: Weekly (e.g., Monday mornings)
 * 
 * Logic:
 * 1. Fetch recent rate records from DB.
 * 2. Re-run analysis (or run specific comparison logic).
 * 3. Log results.
 */
async function runRateWatch() {
  console.log(`[RateWatch Cron] 🕒 Starting job at ${new Date().toISOString()}`);

  try {
    // 1. Fetch latest rate records (last 7 days or last 10 items)
    // Assuming table 'raw_rates' exists
    const { data: rates, error } = await supabaseAdmin
      .from('raw_rates')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw new Error(`DB Fetch Error: ${error.message}`);
    }

    if (!rates || rates.length === 0) {
      console.log("[RateWatch Cron] No rate records found to process.");
      return;
    }

    console.log(`[RateWatch Cron] Processing ${rates.length} records...`);

    // 2. Process each record
    for (const rate of rates) {
      const text = rate.raw_text || rate.content;
      if (!text) continue;

      // Skip if already re-analyzed recently (optional optimization)
      // if (rate.last_audit_at > ...) continue;

      console.log(`[RateWatch Cron] 🔍 Analyzing Record ID: ${rate.id}`);

      // Call OpenClaw with 'rate' context
      // In a full implementation, we might use context='rate_comparison' 
      // to compare against previous values.
      const result = await callOpenClaw({
        input_text: text,
        input_type: "rate"
      });

      // 3. Update DB (e.g. set a 'last_checked_at' timestamp)
      // We don't overwrite analysis_result unless we want to auto-correct.
      // For now, we just log/update metadata.
      const { error: updateError } = await supabaseAdmin
        .from('raw_rates')
        .update({
          last_audit_at: new Date().toISOString(),
          audit_version: "v1"
        })
        .eq('id', rate.id);

      if (updateError) {
        console.error(`[RateWatch Cron] Failed to update record ${rate.id}:`, updateError);
      }
    }

    console.log("[RateWatch Cron] ✅ Job completed successfully.");

  } catch (err) {
    console.error("[RateWatch Cron] ❌ Job failed:", err);
    process.exit(1);
  }
}

// Execute immediately if run directly
runRateWatch();
