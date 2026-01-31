## Supabase Production Workflow

This project uses an existing Supabase database created before CLI migrations.

Rules:
- Do NOT run supabase db push / pull in production
- All schema changes are applied via Supabase Dashboard
- TypeScript types are regenerated after every schema change
- RLS must remain enabled at all times

## Supabase CLI

This project uses Supabase CLI for database migrations.

Rules:
- Do NOT run supabase db push / pull in production
- All schema changes are applied via Supabase Dashboard
- TypeScript types are regenerated after every schema change
- RLS must remain enabled at all times
