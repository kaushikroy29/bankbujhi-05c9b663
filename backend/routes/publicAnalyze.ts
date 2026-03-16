
import { Router } from "express";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import { callOpenClaw } from "../services/openclaw.js";
import { storeAnalysis } from "../services/storeAnalysis.js";

const router = Router();

// Rate Limiter: 5 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." }
});

router.post("/analyze", apiLimiter, async (req, res) => {
  try {
    const { text, context } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid input: 'text' is required" });
    }

    if (text.length > 5000) {
      return res.status(400).json({ error: "Text too long. Max 5000 characters." });
    }

    // Hash Content for Audit
    const hash = crypto.createHash("sha256").update(text).digest("hex");
    console.log(`[Public Analyze] Processing hash: ${hash.substring(0, 8)}...`);

    // Force "unknown" context for public to let Core Agent decide safely
    // Or map frontend 'mode' if trusted, but safer to let Router decide.
    // We accept context hint but validate or sanitize it if needed.
    const safeContext = context === "rate" || context === "fee" ? context : "unknown";

    const result = await callOpenClaw({
      input_text: text,
      input_type: safeContext
    });

    // Store for audit (mark source as public)
    storeAnalysis({ ...result, source: "public_api" }, hash);

    // Return restricted payload (hide internal meta if sensitive)
    res.json({
      status: "analyzed",
      preview: result
    });

  } catch (error) {
    console.error("Public Analysis failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
