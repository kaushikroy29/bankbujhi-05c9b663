# Public Beta UI Design - "BankBujhi Intelligence"

## Goal
Introduce regular users to the AI capabilities without overwhelming them. Position it as a "Financial Clarity Tool," not a generic chatbot.

## Core Value Proposition
"Upload confusing bank documents. Get clear, simple answers."

## UI Copy & Screen Layout

### 1. The Hero Section (Landing Page)
**Headline:** Unconfuse Your Banking.
**Subhead:** Upload any circular, fee schedule, or rate sheet. BankBujhi Intelligence will tell you what it actually means for your wallet.

**Call to Action (CTA):** [Try the Beta] (Button)

---

### 2. The Analysis Interface (`/intelligence`)

**Layout:** Split Screen (Desktop) / Stacked (Mobile)

#### Left Panel: Input
- **Title:** What do you want to understand?
- **Tabs:** 
  1. [📄 Upload Document] (PDF/Image)
  2. [✍️ Paste Text]
- **Drop Zone:** "Drag & drop bank circulars or fee tables here."
- **Helper Text:** "We support PDF, JPG, and PNG. Private data is processed securely."

#### Right Panel: Results (The "BankBujhi Card")
*(Initially empty with placeholder: "Your simple summary will appear here.")*

**State: Processing**
- **Animation:** Scanning icon...
- **Text:** "Reading fine print... Checking hidden fees... Translating banker jargon..."

**State: Result (The Card)**
- **Header:** 📢 [Document Type] Summary
- **Section 1: The TL;DR** (One sentence summary)
- **Section 2: The Numbers** (Clean table of rates/fees)
- **Section 3: The Catch** (Hidden fees/Conditions - *FeeGuard Highlight*)
- **Section 4: Who cares?** (Impact on you)

**Footer Disclaimer:** "AI-generated for educational purposes. Always verify with your bank."

---

### 3. "Beta" Badging & onboarding
- **Badge:** "BETA" label next to the tool name.
- **First-time Modal:** 
  > **Welcome to BankBujhi Intelligence (Beta)**
  > This tool helps you decode financial documents.
  > ⚠️ It does **not** give financial advice.
  > ⚠️ It may make mistakes (it's new!).
  > [I Understand]

---

### 4. Share & Feedback
- **Feedback Buttons:** [👍 Helpful] [👎 Confusing]
- **Share:** "Found a hidden fee? Share this card!" (Generates a shareable image/link)
