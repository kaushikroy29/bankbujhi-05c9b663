
import express, { Request, Response } from 'express';
import cors from 'cors';
import adminAnalyzeRoute from "./routes/adminAnalyze.js";
import uploadRoute from "./routes/upload.js";
import automationRoute from "./routes/automation.js";
import publicAnalyzeRoute from "./routes/publicAnalyze.js";
import publicFeedbackRoute from "./routes/publicFeedback.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Trust Proxy for Rate Limiting (if behind Nginx/Cloudflare)
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminAnalyzeRoute);
app.use("/api", uploadRoute);
app.use("/api/internal", automationRoute);
app.use("/api/public", publicAnalyzeRoute); // Public Beta API
app.use("/api/public", publicFeedbackRoute); // Public Feedback Loop

app.get('/', (req: Request, res: Response) => {
  res.send('BankBujhi API v1');
});

const server = app.listen(PORT, () => {
  console.log(`✅ BankBujhi API running on http://localhost:${PORT}`);
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error("👉 Stop the other process or change PORT.");
    process.exit(1);
  } else {
    throw err;
  }
});

