

# Open Graph Meta Tags & Bangla OG Images Implementation Plan

## Overview

This plan adds dynamic Open Graph meta tags for better social sharing on Facebook, Twitter, LinkedIn, and other platforms. It includes:
1. A reusable SEO component for page-specific meta tags
2. Custom OG images with Bangla text for key pages
3. Enhanced Twitter Card support

---

## Current State

- **Static OG tags** in `index.html` apply to all pages (same title/description everywhere)
- **OG image** uses a generic Lovable placeholder (`lovable.dev/opengraph-image-p98pqg.png`)
- **No dynamic meta management** - React pages don't update document head

---

## Implementation Plan

### Phase 1: Create SEO Meta Component

**Create `src/components/seo/SEOHead.tsx`**

A reusable component that dynamically updates the document head with:
- Page-specific `<title>`
- Meta description
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card tags (twitter:title, twitter:description, twitter:image)
- Canonical URL

```text
+--------------------------------------------------+
|                  SEOHead Component               |
+--------------------------------------------------+
|  Props:                                          |
|  - title: string (page title)                    |
|  - description: string (meta description)        |
|  - image?: string (OG image URL)                 |
|  - path?: string (canonical path)                |
|  - type?: "website" | "article"                  |
+--------------------------------------------------+
```

Uses vanilla JavaScript to manipulate `document.head` (no external dependencies needed since React Helmet isn't installed).

---

### Phase 2: Create OG Images with Bangla Text

**Add 8 custom OG images to `/public/og/`**

Each image will be **1200x630px** (Facebook recommended size) with:
- BankBujhi branding (logo + name)
- Page-specific Bangla headline
- Primary green gradient background
- Bengali typography (Noto Sans Bengali)

| Page | Image File | Bangla Headline |
|------|------------|-----------------|
| Home | `og-home.png` | বাংলাদেশের ব্যাংক ও ক্রেডিট কার্ড তুলনা |
| Compare | `og-compare.png` | ক্রেডিট কার্ড তুলনা করুন |
| Loans | `og-loans.png` | পার্সোনাল লোন ক্যালকুলেটর |
| Savings | `og-savings.png` | এফডিআর ও সেভিংস রেট |
| Eligibility | `og-eligibility.png` | ক্রেডিট কার্ড যোগ্যতা যাচাই |
| Quiz | `og-quiz.png` | আপনার জন্য সেরা কার্ড খুঁজুন |
| Banks | `og-banks.png` | ব্যাংক ডিরেক্টরি |
| About | `og-about.png` | BankBujhi সম্পর্কে |

**Note:** I will generate these images using the AI image generation API during implementation.

---

### Phase 3: Integrate SEOHead into Pages

**Update 12 key pages** with the `SEOHead` component:

| Page | Title (Bangla) | Description |
|------|----------------|-------------|
| Index | বাংলাদেশের ব্যাংক ও ক্রেডিট কার্ড তুলনা \| BankBujhi | সব ফি, ক্যাশব্যাক ও সুবিধা এক জায়গায় |
| Compare | ক্রেডিট কার্ড তুলনা \| BankBujhi | ২০+ ব্যাংকের কার্ড পাশাপাশি তুলনা করুন |
| PersonalLoans | পার্সোনাল লোন ক্যালকুলেটর \| BankBujhi | EMI হিসাব করুন ও সেরা রেট খুঁজুন |
| FDRSavings | এফডিআর ও সেভিংস রেট \| BankBujhi | সর্বোচ্চ সুদের হার তুলনা করুন |
| Eligibility | ক্রেডিট কার্ড যোগ্যতা যাচাই \| BankBujhi | আপনার জন্য যোগ্য কার্ড দেখুন |
| CardQuiz | কার্ড কুইজ \| BankBujhi | ৩০ সেকেন্ডে সেরা কার্ড খুঁজুন |
| Banks | ব্যাংক ডিরেক্টরি \| BankBujhi | বাংলাদেশের সব ব্যাংকের তথ্য |
| About | আমাদের সম্পর্কে \| BankBujhi | BankBujhi কেন তৈরি হলো |
| CardDetails | [Card Name] \| BankBujhi | Dynamic based on card data |
| Guides | গাইড ও টিউটোরিয়াল \| BankBujhi | আর্থিক বিষয়ে সহজ গাইড |
| FinancialTips | আর্থিক পরামর্শ \| BankBujhi | স্মার্ট আর্থিক সিদ্ধান্তের টিপস |
| HelpCenter | সাহায্য কেন্দ্র \| BankBujhi | প্রায়শই জিজ্ঞাসিত প্রশ্ন |

---

### Phase 4: Update Base HTML

**Enhance `index.html`** with:
- Add `og:url` with base URL
- Add `og:site_name`
- Add `twitter:title` and `twitter:description`
- Update default OG image to new branded image

---

## Technical Details

### SEOHead Component Implementation

```typescript
// src/components/seo/SEOHead.tsx
interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
}

const SEOHead = ({ title, description, image, path, type = "website" }: SEOHeadProps) => {
  const baseUrl = "https://bankbujhi.lovable.app";
  const defaultImage = `${baseUrl}/og/og-home.png`;
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags dynamically
    updateMetaTag("description", description);
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image || defaultImage);
    updateMetaTag("og:url", path ? `${baseUrl}${path}` : baseUrl);
    updateMetaTag("og:type", type);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image || defaultImage);
    
    // Cleanup on unmount
    return () => { /* Reset to defaults */ };
  }, [title, description, image, path, type]);
  
  return null; // Component only updates head, renders nothing
};
```

### OG Image Design Specifications

```text
+--------------------------------------------------+
|                   1200 x 630px                   |
|  +--------------------------------------------+  |
|  |                                            |  |
|  |        [BankBujhi Logo]                    |  |
|  |                                            |  |
|  |     বাংলাদেশের ব্যাংক ও ক্রেডিট কার্ড     |  |
|  |           তুলনা করুন                       |  |
|  |                                            |  |
|  |     সব ফি, ক্যাশব্যাক ও সুবিধা             |  |
|  |         এক জায়গায়                         |  |
|  |                                            |  |
|  |              bankbujhi.lovable.app         |  |
|  +--------------------------------------------+  |
+--------------------------------------------------+

Background: Linear gradient from #2f7f33 to #13ec5b
Text: White (Noto Sans Bengali)
Logo: BankBujhi diamond icon
```

---

## Files to Create/Modify

### New Files
| File | Purpose |
|------|---------|
| `src/components/seo/SEOHead.tsx` | Reusable SEO component |
| `public/og/og-home.png` | Home page OG image |
| `public/og/og-compare.png` | Compare page OG image |
| `public/og/og-loans.png` | Loans page OG image |
| `public/og/og-savings.png` | Savings page OG image |
| `public/og/og-eligibility.png` | Eligibility page OG image |
| `public/og/og-quiz.png` | Quiz page OG image |
| `public/og/og-banks.png` | Banks page OG image |
| `public/og/og-about.png` | About page OG image |

### Modified Files
| File | Changes |
|------|---------|
| `index.html` | Add og:site_name, og:url, update default image |
| `src/pages/Index.tsx` | Add SEOHead component |
| `src/pages/Compare.tsx` | Add SEOHead component |
| `src/pages/PersonalLoans.tsx` | Add SEOHead component |
| `src/pages/FDRSavings.tsx` | Add SEOHead component |
| `src/pages/Eligibility.tsx` | Add SEOHead component |
| `src/pages/CardQuiz.tsx` | Add SEOHead component |
| `src/pages/Banks.tsx` | Add SEOHead component |
| `src/pages/About.tsx` | Add SEOHead component |
| `src/pages/CardDetails.tsx` | Add dynamic SEOHead with card data |
| `src/pages/Guides.tsx` | Add SEOHead component |
| `src/pages/FinancialTips.tsx` | Add SEOHead component |
| `src/pages/HelpCenter.tsx` | Add SEOHead component |

---

## Expected Outcome

After implementation:

1. **Facebook/LinkedIn Sharing** - Shows custom Bangla title, description, and branded image
2. **Twitter Cards** - Large image cards with proper Bangla text
3. **WhatsApp Previews** - Displays localized content when sharing links
4. **SEO Benefits** - Each page has unique, descriptive meta content
5. **Brand Consistency** - All OG images follow BankBujhi design system

---

## Testing

After implementation, test sharing on:
- Facebook Sharing Debugger (developers.facebook.com/tools/debug)
- Twitter Card Validator (cards-dev.twitter.com/validator)
- LinkedIn Post Inspector (linkedin.com/post-inspector)
- WhatsApp (paste link and check preview)

