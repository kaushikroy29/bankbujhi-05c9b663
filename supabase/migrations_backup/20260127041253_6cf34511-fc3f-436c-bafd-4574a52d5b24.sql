-- Add explicit write policies to prevent any write operations on public tables
-- This makes the security intent clear and provides defense in depth

-- Banks table write restrictions
CREATE POLICY "Banks insert restricted" ON public.banks FOR INSERT WITH CHECK (false);
CREATE POLICY "Banks update restricted" ON public.banks FOR UPDATE USING (false);
CREATE POLICY "Banks delete restricted" ON public.banks FOR DELETE USING (false);

-- Credit cards table write restrictions
CREATE POLICY "Credit cards insert restricted" ON public.credit_cards FOR INSERT WITH CHECK (false);
CREATE POLICY "Credit cards update restricted" ON public.credit_cards FOR UPDATE USING (false);
CREATE POLICY "Credit cards delete restricted" ON public.credit_cards FOR DELETE USING (false);

-- Savings rates table write restrictions
CREATE POLICY "Savings rates insert restricted" ON public.savings_rates FOR INSERT WITH CHECK (false);
CREATE POLICY "Savings rates update restricted" ON public.savings_rates FOR UPDATE USING (false);
CREATE POLICY "Savings rates delete restricted" ON public.savings_rates FOR DELETE USING (false);

-- Loan products table write restrictions
CREATE POLICY "Loan products insert restricted" ON public.loan_products FOR INSERT WITH CHECK (false);
CREATE POLICY "Loan products update restricted" ON public.loan_products FOR UPDATE USING (false);
CREATE POLICY "Loan products delete restricted" ON public.loan_products FOR DELETE USING (false);