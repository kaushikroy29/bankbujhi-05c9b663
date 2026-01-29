# Deployment Guide for BankBujhi

This guide details how to deploy the **BankBujhi** application to production using **Vercel** (Frontend) and **Supabase** (Backend).

## Prerequisites

- [GitHub Account](https://github.com)
- [Vercel Account](https://vercel.com)
- [Supabase Account](https://supabase.com)
- Git installed locally

---

## Part 1: Backend Deployment (Supabase)

1.  **Create a Project**:
    - Log in to [Supabase](https://supabase.com/dashboard) and create a new project.
    - Note down the `Project URL` and `anon public key` from Settings > API.

2.  **Set up Database Schema**:
    - Go to the **SQL Editor** in your Supabase dashboard.
    - Copy the content required for the schema (you can find the migrations in `supabase/migrations/`).
    - Run the SQL to create `banks`, `credit_cards`, `savings_rates`, and `loan_products` tables.

3.  **Seed Data**:
    - Open `supabase/migrations/20260130052000_seed_initial_data.sql`.
    - Copy the content and run it in the SQL Editor.
    - This will populate your production database with the initial bank data.

4.  **Security (RLS)**:
    - Ensure Row Level Security (RLS) policies are active (included in the schema).
    - Checks: Public read access should be enabled for all tables.

---

## Part 2: Frontend Deployment (Vercel)

1.  **Push to GitHub**:
    - Ensure your project is pushed to a GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2.  **Import to Vercel**:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Import your `bankbujhi` repository.

3.  **Configure Project**:
    - **Framework Preset**: Vite
    - **Root Directory**: `./` (default)
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`

4.  **Environment Variables**:
    - Expand the "Environment Variables" section.
    - Add the keys using the values from your Supabase project:
      - `VITE_SUPABASE_URL`: (Your Project URL)
      - `VITE_SUPABASE_ANON_KEY`: (Your Anon Key)

5.  **Deploy**:
    - Click **"Deploy"**.
    - Vercel will build and deploy your site.
    - Once done, you will get a production URL (e.g., `bankbujhi.vercel.app`).

---

## Part 3: Post-Deployment

1.  **Custom Domain**:
    - On Vercel, go to Settings > Domains.
    - Add your domain (e.g., `bankbujhi.com.bd`).
    - Follow the DNS configuration instructions.

2.  **SEO Check**:
    - Verify `robots.txt` and `sitemap.xml` are accessible at your production domain.
    - Use [Google Search Console](https://search.google.com/search-console) to submit your sitemap.

3.  **Performance Check**:
    - Run a rigorous test on [PageSpeed Insights](https://pagespeed.web.dev/).
    - Optimization targets: Image sizing, script loading.

## Troubleshooting

- **Build Fails?** Check the "Build Logs" in Vercel. Common issues include missing devDependencies or type errors.
- **Data Not Loading?** Check the Browser Console. If you see CORS or 401 errors, check your Supabase RLS policies and Environment Variables.
