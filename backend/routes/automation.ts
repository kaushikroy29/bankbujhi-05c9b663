
import { Router } from "express";
import { onNewRawData } from "../automation/onDbInsert.js";

const router = Router();

// This endpoint mimics a webhook receiver or an internal trigger.
// In a real scrape job, the scraper would call this AFTER inserting to DB,
// OR this could be a Supabase Database Webhook receiver (if configured securely).

// For v1, we treat this as an internal API called by our scrapers/admin tools.
router.post("/trigger-automation", async (req, res) => {
  const { table, record_id, record_data } = req.body;

  if (!table || !record_id) {
    return res.status(400).json({ error: "Missing table or record_id" });
  }

  // Run async (fire and forget response, but log internal)
  // We send 202 Accepted immediately so the caller doesn't wait for OpenClaw.
  res.status(202).json({ status: "queued", message: "Automation started in background." });

  // Execute automation
  // If record_data is provided (webhook style), use it.
  // Otherwise, we might need to fetch it (not implemented here for brevity, assuming push).
  if (record_data) {
    await onNewRawData(table, { id: record_id, ...record_data });
  } else {
    // Fetch logic would go here if we only got an ID
    console.warn("[Automation] No record_data provided, skipping fetch implementation for v1.");
  }
});

export default router;
