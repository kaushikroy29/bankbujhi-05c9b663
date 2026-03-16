
import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import { extractTextFromPDF } from "../services/pdfExtractor.js";
import { callOpenClaw } from "../services/openclaw.js";
import { storeAnalysis } from "../services/storeAnalysis.js";

// Configure storage: keep extension or filename manageable?
// For v1, simple local storage with random names is fine.
const upload = multer({ dest: "backend/uploads/" });

const router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;
    console.log(`[Upload] Processing file: ${originalName} (${req.file.mimetype})`);

    // 1. Extract Text
    let text = "";
    try {
        // Simple check for PDF based on mimetype or extension
        if (req.file.mimetype === "application/pdf" || originalName.toLowerCase().endsWith(".pdf")) {
            text = await extractTextFromPDF(filePath);
        } else {
             // For safety in v1, reject non-PDFs to avoid text extractor issues
             // or attempting to read binary garbage.
             return res.status(400).json({ error: "Only PDF files are supported in this version." });
        }
    } catch (err) {
        console.error("Extraction failed:", err);
        return res.status(400).json({ error: "Failed to extract text from document." });
    }

    if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: "Extracted text is empty. Is this an image-only PDF?" });
    }

    // 2. Hash Content (Safety - reusing logic)
    const hash = crypto.createHash("sha256").update(text).digest("hex");
    console.log(`[Upload] Content hash: ${hash.substring(0, 8)}...`);

    // 3. Analyze (OpenClaw)
    // Default context to 'circular' if not specified, as PDFs are usually documents
    const context = req.body.context || "circular"; 
    
    const result = await callOpenClaw({
      input_text: text,
      input_type: context
    });

    // 4. Store (Audit)
    storeAnalysis(result, hash);

    // 5. Cleanup?
    // We are NOT deleting the uploaded file for audit purposes.
    // In production, move it to S3/permanent storage.
    // For now, it stays in backend/uploads/.

    res.json({
      status: "analyzed",
      hash,
      preview: result,
      extracted_text_preview: text.substring(0, 200) + "..."
    });

  } catch (error) {
    console.error("Upload flow failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
