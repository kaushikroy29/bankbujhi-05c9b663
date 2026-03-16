
import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "backend/logs/admin-analysis.jsonl");

export function storeAnalysis(result: any, contentHash?: string) {
  // Ensure directory exists
  const dir = path.dirname(LOG_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const logEntry = JSON.stringify({
    created_at: new Date().toISOString(),
    content_hash: contentHash || null,
    result
  }) + "\n";

  fs.appendFileSync(LOG_FILE, logEntry);
}
