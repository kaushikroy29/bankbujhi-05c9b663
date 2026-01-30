# BankBujhi: Bangladesh Localization Walkthrough 🇧🇩

This document outlines the specific localization strategies and implementations that make **BankBujhi** tailored for the Bangladeshi market.

## 1. 🇧🇩 Language & Typography

### Bengali First Approach
- **Primary Language**: The entire user interface (UI) is written in **Bengali (বাংলা)** to ensure maximum accessibility for local users.
- **Font**: We use **'Noto Sans Bengali'** from Google Fonts as the primary typeface. This ensures:
  - Legible and modern Bengali typography.
  - Proper rendering of complex conjuncts (যুক্তবর্ণ).
  - Consistent look across all devices.

### Implementation
- **Files**: `index.html` loads the font.
- **Tailwind**: `font-bengali` utility class is configured in `tailwind.config.ts`.
- **UI Components**: All buttons, labels, and headings are hardcoded in Bengali for performance (no heavy i18n libraries needed for a single-market app).

## 2. ৳ Currency & Formatting

### BDT (Bangladeshi Taka)
- **Symbol**: All monetary values use the Taka symbol (**৳**).
- **Formatting**:
  - Comma separation follows the Bangladeshi/South Asian numbering system (e.g., `৳১,০০,০০০` for 1 Lakh, not `100,000`).
  - Numbers are displayed in **Bengali digits** (০-৯) instead of English (0-9).

## 3. 🏦 Localized Data (Supabase)

The database is seeded with real-world Bangladeshi financial products.

### Seeded Banks
1.  **City Bank** (সিটি ব্যাংক) - Known for Amex cards.
2.  **Eastern Bank PLC (EBL)** (ইস্টার্ন ব্যাংক) - Popular for Aqua Prepaid.
3.  **BRAC Bank** (ব্র্যাক ব্যাংক) - SME and retail banking leader.
4.  **Standard Chartered** (স্ট্যান্ডার্ড চার্টার্ড) - Premium foreign bank.
5.  **Dutch-Bangla Bank (DBBL)** (ডাচ-বাংলা ব্যাংক) - Largest ATM network.
6.  **Mutual Trust Bank (MTB)** (মিউচুয়াল ট্রাস্ট ব্যাংক).

### Specific Products
- **Credit Cards**: EBL Aqua (Dual Currency), City Amex Gold/Platinum, BRAC Visa Signature.
- **Loans**: Personal loans for salary account holders, Auto loans.
- **Savings**: FDR rates for 3 months, 6 months, and 1 year tenures common in BD.

## 4. 🔍 SEO for Bangladesh

### Meta Tags
- **Title**: "ব্যাংকবুঝি - বাংলাদেশের সেরা কার্ড ও লোন তুলনা".
- **Keywords**: "credit card bd", "loan bd", "best bank bangladesh", "student card bd".
- **Description**: Optimized in Bengali for Google.com.bd search results.

### Structured Data (JSON-LD)
- Includes strict schema for "FinancialProduct" to help Google understand the comparison data.

## 5. 📱 User Experience (UX)

### Local Context
- **Employment Types**: Dropdowns include "Govt. Job" (সরকারি চাকরি), "Private Service" (বেসরকারি চাকরি), "Business" (ব্যবসা) - matching local job categories.
- **Income Brackets**: Filters are set reasonably for the BD economy (starting from ৳20k up to ৳1 Lakh+).
- **Mobile First**: Optimized for low-cost Android devices common in Bangladesh.

---

**Ready to Deploy?**
If this localization strategy meets your approval, you can proceed to deploy this version to production.
