
import { supabaseAdmin } from "../services/supabase.js";
import { callOpenClaw } from "../services/openclaw.js";
import crypto from "crypto";

/**
 * Triggered when a new raw item is inserted into the DB (e.g. scraped data).
 * This runs the analysis and updates the record with the result.
 */
export async function onNewRawData(tableName: string, record: any) {
  console.log(`[DB Automation] New record in ${tableName} (ID: ${record.id})`);

  try {
    // 0. Safety Check: Prevent Double Processing
    if (record.status === "analyzed") {
      console.log(`[DB Automation] Record ${record.id} already analyzed. Skipping.`);
      return;
    }

    const textToAnalyze = record.raw_text || record.content || record.description;
    if (!textToAnalyze) {
      console.warn(`[DB Automation] Record ${record.id} has no text to analyze.`);
      return;
    }

    // 1. Hash Content for Deduplication/Audit
    const hash = crypto.createHash("sha256").update(textToAnalyze).digest("hex");

    // 2. Call OpenClaw (Core Agent)
    // Map table names to OpenClaw contexts
    let context = "unknown";
    if (tableName === "raw_rates") context = "rate";
    else if (tableName === "raw_circulars") context = "circular";
    else if (tableName === "raw_fees") context = "fee";

    console.log(`[DB Automation] Analyzing as '${context}'...`);
    
    const result = await callOpenClaw({
      input_text: textToAnalyze,
      input_type: context
    });

    // 3. Update the DB record with the analysis
    // We assume the table has an 'analysis_result' (jsonb) and 'status' (text) column.
    const { error } = await supabaseAdmin
      .from(tableName)
      .update({
        analysis_result: result,
        content_hash: hash,
        status: "analyzed", // Move state from 'pending' to 'analyzed'
        analyzed_at: new Date().toISOString(),
        analysis_version: result.meta?.version || "v1" // Store Logic Version
      })
      .eq("id", record.id);

    if (error) {
      console.error(`[DB Automation] Failed to update record ${record.id}:`, error);
    } else {
      console.log(`[DB Automation] Record ${record.id} successfully analyzed and updated.`);
    }

  } catch (err) {
    console.error(`[DB Automation] Error processing record ${record.id}:`, err);
    // Optionally set status to 'failed'
    await supabaseAdmin
      .from(tableName)
      .update({ status: "failed", error_log: String(err) })
      .eq("id", record.id);
  }
}
