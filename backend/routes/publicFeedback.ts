import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Ensure logs directory exists
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

router.post("/feedback", (req, res) => {
  const { sentiment, agent } = req.body;

  if (!["helpful", "partial", "confusing"].includes(sentiment)) {
    return res.status(400).json({ error: "Invalid feedback" });
  }

  const entry = {
    sentiment,
    agent: agent || "unknown",
    timestamp: new Date().toISOString(),
    origin: "public_beta"
  };

  // Append-only JSONL log
  try {
    fs.appendFileSync(
      path.join(logDir, "feedback.jsonl"),
      JSON.stringify(entry) + "\n"
    );
    res.status(204).end();
  } catch (err) {
    console.error("Feedback log error:", err);
    res.status(500).json({ error: "Failed to record feedback" });
  }
});

export default router;
