
import { Router } from "express";
import crypto from "crypto";
import { callOpenClaw } from "../services/openclaw.js";
import { storeAnalysis } from "../services/storeAnalysis.js";

const router = Router();

router.post("/analyze", async (req, res) => {
  try {
    const { text, context } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid input: 'text' is required" });
    }

    // Generate SHA-256 hash to track unique inputs
    const hash = crypto
      .createHash("sha256")
      .update(text)
      .digest("hex");

    console.log(`[Admin Analyze] Processing hash: ${hash.substring(0, 8)}...`);

    const result = await callOpenClaw({
      input_text: text,
      input_type: context ?? "unknown"
    });

    // ⛔ DO NOT PUBLISH
    // ✅ Store for audit with hash
    storeAnalysis(result, hash);

    res.json({
      status: "analyzed",
      hash,
      preview: result
    });
  } catch (error) {
    console.error("Analysis failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
