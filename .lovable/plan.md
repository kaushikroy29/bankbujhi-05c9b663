

# BankBujhi Complete Website Recreation Plan

## Project Overview

Recreate the BankBujhi website - a Bengali financial comparison platform for credit cards, loans, savings, and banking products in Bangladesh. The complete website consists of **16 pages** across the homepage and 15 additional pages you've uploaded.

---

## Complete Page Inventory

| # | Page | Route | Description |
|---|------|-------|-------------|
| 1 | Homepage | `/` | Hero, stats, categories, featured cards |
| 2 | About Us | `/about` | Company mission, team, values |
| 3 | Banks Directory | `/banks` | Bank partner grid with search |
| 4 | Card Details | `/cards/:id` | Individual credit card profile |
| 5 | Card Analysis | `/analysis` | Comparison report generator |
| 6 | Compare (Search Results) | `/compare` | Card search with filters and results |
| 7 | Contact/Help Center | `/contact` | FAQ, contact form, support |
| 8 | Dashboard | `/dashboard` | User account, saved cards, profile |
| 9 | Eligibility Checker | `/eligibility` | Multi-step form for card eligibility |
| 10 | FDR/Savings | `/savings` | Fixed deposit comparison tool |
| 11 | Guides | `/guides` | Financial articles and education |
| 12 | Monthly Picks | `/newsletter` | Email-style monthly newsletter |
| 13 | Password Reset | `/reset-password` | Account recovery page |
| 14 | Personal Loans | `/loans` | Loan comparison with EMI calculator |
| 15 | Premium | `/premium` | Subscription pricing page |
| 16 | 404 Error | `*` | Custom Bengali error page |

---

## Design System

### Color Palette (Unified)

The pages use slight variations of greens; we will normalize to a consistent palette:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2f7f33` | Primary brand color (darker green) |
| `primary-light` | `#13ec5b` | Bright accent green |
| `accent-gold` | `#F9A825` | Premium badges, highlights |
| `background-light` | `#f6f8f6` | Light mode background |
| `background-dark` | `#141e15` | Dark mode background |
| `card-dark` | `#1a2e20` | Dark mode card background |
| `text-dark` | `#111811` | Primary text |
| `text-muted` | `#5e8760` | Secondary text |

### Typography
- **Primary fonts**: Inter + Noto Sans Bengali
- **Icons**: Google Material Symbols (Outlined)

---

## Shared Components Architecture

### Layout Components

```text
src/components/layout/
  Header.tsx          # Sticky navigation with search, language toggle
  Footer.tsx          # Multi-column footer with links
  MobileNav.tsx       # Hamburger menu for mobile
  DashboardSidebar.tsx # Sidebar for dashboard page
  Breadcrumb.tsx      # Breadcrumb navigation component
```

### Core UI Components

```text
src/components/ui/
  MaterialIcon.tsx    # Google Material Symbols wrapper
  Logo.tsx            # Diamond SVG brand logo
  Badge.tsx           # Category/status badges
  SearchBar.tsx       # Reusable search input with icon
  ProgressBar.tsx     # Profile completion, step indicators
  PriceDisplay.tsx    # Taka currency formatting
  TabNavigation.tsx   # Horizontal tab navigation
  FilterSidebar.tsx   # Filter panel with checkboxes, sliders
```

### Card/Product Components

```text
src/components/cards/
  CreditCardVisual.tsx    # 3D credit card mockup
  CreditCardListing.tsx   # Card result row with details
  BankCard.tsx            # Bank partner card
  LoanOfferCard.tsx       # Loan comparison row
  SavingsRateCard.tsx     # FDR bank rate row
  ArticleCard.tsx         # Blog/guide article preview
  PricingCard.tsx         # Premium subscription tier
```

### Feature Components

```text
src/components/features/
  StatCard.tsx            # Homepage statistics
  CategoryCard.tsx        # Browse by category
  ValueCard.tsx           # Core values (About page)
  TeamMemberCard.tsx      # Team profiles
  QuickLinkCard.tsx       # 404 page navigation
  FAQAccordion.tsx        # Contact page FAQs
  ContactMethodCard.tsx   # Email/phone/chat cards
```

### Form Components

```text
src/components/forms/
  EligibilityForm.tsx     # Multi-step eligibility wizard
  PasswordResetForm.tsx   # Account recovery form
  EMICalculator.tsx       # Loan EMI slider calculator
  InvestmentCalculator.tsx # FDR maturity calculator
  ContactForm.tsx         # Contact page form
```

---

## Implementation Phases

### Phase 1: Foundation Setup

**Design System:**
- Update `tailwind.config.ts` with complete BankBujhi color palette
- Add Google Fonts to `index.html` (Inter, Noto Sans Bengali, Material Symbols)
- Update `src/index.css` with CSS variables and custom utilities

**Core Infrastructure:**
- Create MaterialIcon component for consistent icon usage
- Create Logo component with SVG
- Set up responsive layout wrapper

### Phase 2: Shared Layout Components

- Header with navigation, search, login button
- Footer with multi-column links
- Mobile navigation drawer
- Breadcrumb component

### Phase 3: Homepage

**Components:**
- HeroSection with search bar
- StatsSection (3 stat cards)
- CategoriesSection (browse by category)
- FeaturedCardsSection

### Phase 4: Core Financial Pages

**Compare/Search Page:**
- FilterSidebar with bank, category, fee filters
- CreditCardListing for search results
- Sort and pagination controls

**Card Details Page:**
- CardHero with visual and key info
- TabNavigation (Benefits, Fees, Eligibility)
- BenefitsGrid, FeesTable, DocumentsList
- StickyBottomCTA for mobile

**Personal Loans Page:**
- LoanConfigForm with sliders
- EMICalculator sidebar
- LoanOfferCard comparison table

**FDR/Savings Page:**
- InvestmentCalculator
- Tab navigation (FDR vs High-Interest)
- SavingsRateCard comparison list

### Phase 5: Utility Pages

**Eligibility Checker:**
- Multi-step form wizard with progress bar
- Employment type selector
- Income and bank selection

**Dashboard:**
- DashboardSidebar navigation
- Profile completion progress
- Saved cards grid
- Recent activity

**Password Reset:**
- Centered card layout
- Email/phone input
- Trust badges

### Phase 6: Content Pages

**Guides/Knowledge Center:**
- Hero with search
- Category filter tabs
- ArticleCard grid with images

**About Us:**
- Mission hero
- Problem/solution layout
- Core values cards
- Team carousel

**Contact/Help:**
- Search bar
- FAQ accordion sections
- Contact method cards (email, phone, chat)

**Monthly Newsletter:**
- Email-style layout
- Featured cards section
- Tips and highlights

### Phase 7: Premium/Subscription

- Hero with CTA buttons
- 3-tier pricing cards (Basic, Pro, Elite)
- Feature comparison table
- Dark theme by default

### Phase 8: 404 Error Page

- Custom Bengali error message
- Illustrated error graphic
- Quick link cards to main pages

---

## Routing Configuration

```text
App.tsx Routes:
  /                 → Index.tsx (Homepage)
  /about            → About.tsx
  /banks            → Banks.tsx
  /cards/:id        → CardDetails.tsx
  /analysis         → CardAnalysis.tsx
  /compare          → Compare.tsx (Search Results)
  /contact          → Contact.tsx
  /dashboard        → Dashboard.tsx
  /eligibility      → Eligibility.tsx
  /savings          → FDRSavings.tsx
  /guides           → Guides.tsx
  /newsletter       → MonthlyPicks.tsx
  /reset-password   → PasswordReset.tsx
  /loans            → PersonalLoans.tsx
  /premium          → Premium.tsx
  *                 → NotFound.tsx (404)
```

---

## Final File Structure

```text
src/
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNav.tsx
      DashboardSidebar.tsx
      Breadcrumb.tsx
    ui/
      MaterialIcon.tsx
      Logo.tsx
      Badge.tsx
      SearchBar.tsx
      ProgressBar.tsx
      PriceDisplay.tsx
      TabNavigation.tsx
      FilterSidebar.tsx
    cards/
      CreditCardVisual.tsx
      CreditCardListing.tsx
      BankCard.tsx
      LoanOfferCard.tsx
      SavingsRateCard.tsx
      ArticleCard.tsx
      PricingCard.tsx
    features/
      StatCard.tsx
      CategoryCard.tsx
      ValueCard.tsx
      TeamMemberCard.tsx
      QuickLinkCard.tsx
      FAQAccordion.tsx
      ContactMethodCard.tsx
    forms/
      EligibilityForm.tsx
      PasswordResetForm.tsx
      EMICalculator.tsx
      InvestmentCalculator.tsx
    home/
      HeroSection.tsx
      StatsSection.tsx
      CategoriesSection.tsx
      FeaturedCardsSection.tsx
  pages/
    Index.tsx
    About.tsx
    Banks.tsx
    CardDetails.tsx
    CardAnalysis.tsx
    Compare.tsx
    Contact.tsx
    Dashboard.tsx
    Eligibility.tsx
    FDRSavings.tsx
    Guides.tsx
    MonthlyPicks.tsx
    PasswordReset.tsx
    PersonalLoans.tsx
    Premium.tsx
    NotFound.tsx
  App.tsx
```

---

## Technical Requirements

### Font Loading

```html
<!-- Add to index.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Bengali:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

### Custom CSS

```css
/* Material Symbols styling */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}

/* Bengali font support */
.bengali-font {
  font-family: 'Noto Sans Bengali', sans-serif;
  line-height: 1.6;
}
```

### Dark Mode

All pages support dark mode using Tailwind's `dark:` prefix with class-based toggling.

---

## Order of Implementation

1. Design system setup (fonts, colors, CSS variables)
2. Core UI components (MaterialIcon, Logo, SearchBar, Badge)
3. Layout components (Header, Footer, MobileNav)
4. Homepage with all sections
5. 404 Error page (simple, tests routing)
6. Compare/Search page (core product page)
7. Card Details page
8. Banks Directory
9. Personal Loans with EMI calculator
10. FDR/Savings comparison
11. Eligibility Checker wizard
12. Contact/Help Center
13. Guides/Knowledge Center
14. About Us page
15. Dashboard (requires layout sidebar)
16. Password Reset
17. Monthly Picks newsletter
18. Premium pricing page

---

## Notes

- All images from the original HTML use external Google URLs - these will be kept as-is initially
- Bengali text (বাংলা) will be preserved exactly as in the original HTML
- Interactive features like sliders, accordions will use existing Radix UI components where possible
- Print styles will be implemented for the Card Analysis report page

