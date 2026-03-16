# BankBujhi Deployment Guide (v1)

This document explains how to run BankBujhi’s backend services and automation jobs.

## Prerequisites

- Node.js ≥ 18
- OpenClaw installed and configured
- Supabase project + service role key
- macOS / Linux (cron-based automation)

---

## 1. Environment Variables

Create a `.env` file inside `backend/`:

```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENCLAW_PATH=openclaw
# (Optional)
PORT=3001
```

---

## 2. Running OpenClaw

OpenClaw must be running before the backend starts.

### Start Gateway
```bash
openclaw gateway
```

Verify it is running:
```bash
openclaw doctor
```

⚠️ **Do not expose the gateway publicly.**

---

## 3. Running the Backend API

From the repository root:

```bash
cd backend
npm install
npm run dev
```

The backend will be available at:
`http://localhost:3001`

### Health check:
`GET /health` (or `/` for v1 root)

---

## 4. Admin Automation Endpoints

### Admin Analyze
`POST /api/admin/analyze`

### PDF Upload
`POST /api/upload`

### Internal Automation Trigger
`POST /api/internal/trigger-automation`

⚠️ **These endpoints are for internal/admin use only.**

---

## 5. RateWatch Cron Automation

The RateWatch cron script is located at:
`backend/cron/ratewatch.ts`

### Manual run (test)
```bash
# If using tsx/ts-node
tsx backend/cron/ratewatch.ts

# Or compiled JS
node backend/dist/cron/ratewatch.js
```

### Cron setup (weekly example)

Edit crontab:
```bash
crontab -e
```

Add:
```bash
0 7 * * 1 /usr/local/bin/node /absolute/path/to/bankbujhi/backend/dist/cron/ratewatch.js >> /var/log/bankbujhi-ratewatch.log 2>&1
```

This runs RateWatch every **Monday at 7 AM**.

---

## 6. Safety Notes

- **OpenClaw never auto-publishes results.**
- All automation results require **review**.
- Failed jobs are logged and can be re-run.
- **No scraping is enabled in v1.**

---

## 7. Re-running Analyses

To re-run analysis:
1.  Update the logic version.
2.  Trigger automation again via the backend.
3.  Old results remain stored for audit.

---
