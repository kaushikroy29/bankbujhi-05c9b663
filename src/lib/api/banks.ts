import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface Bank {
  id: string;
  name: string;
  name_bn: string | null;
  logo_url: string | null;
  website_url: string | null;
  type: string;
  swift_code: string | null;
  established_year: number | null;
  headquarters: string | null;
  description: string | null;
  is_active: boolean;
}

export interface CardBenefit {
  icon: string;
  text: string;
  description?: string;
}

export interface CreditCard {
  id: string;
  bank_id: string | null;
  name: string;
  category: string | null;
  image_url: string | null;
  annual_fee: string | null;
  annual_fee_note: string | null;
  annual_fee_waived: boolean | null;
  interest_rate: string | null;
  min_income: string | null;
  min_age: number | null;
  max_age: number | null;
  credit_score: string | null;
  employment_types: string[] | null;
  required_documents: string[] | null;
  benefits: CardBenefit[];
  fees: Record<string, string>;
  badge: string | null;
  apply_url: string | null;
  is_active: boolean | null;
  banks?: Bank | null;
}

export interface SavingsRate {
  id: string;
  bank_id: string | null;
  product_type: string;
  tenure_months: number | null;
  tenure_label: string | null;
  interest_rate: number | null;
  min_deposit: string | null;
  special_offer: string | null;
  is_active: boolean | null;
  banks?: Bank | null;
}

export interface LoanProduct {
  id: string;
  bank_id: string | null;
  name: string;
  loan_type: string;
  interest_rate_min: number | null;
  interest_rate_max: number | null;
  processing_fee: string | null;
  max_amount: string | null;
  max_tenure_months: number | null;
  min_income: string | null;
  features: string[] | null;
  badge: string | null;
  apply_url: string | null;
  is_active: boolean | null;
  banks?: Bank | null;
}

// Helper to parse JSON fields
function parseBenefits(benefits: Json): CardBenefit[] {
  if (Array.isArray(benefits)) {
    return benefits.map(b => {
      if (b && typeof b === 'object' && !Array.isArray(b)) {
        return {
          icon: String((b as Record<string, unknown>).icon || ''),
          text: String((b as Record<string, unknown>).text || ''),
          description: (b as Record<string, unknown>).description ? String((b as Record<string, unknown>).description) : undefined,
        };
      }
      return { icon: '', text: '' };
    });
  }
  return [];
}

function parseFees(fees: Json): Record<string, string> {
  if (fees && typeof fees === 'object' && !Array.isArray(fees)) {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(fees as Record<string, unknown>)) {
      result[key] = String(value || '');
    }
    return result;
  }
  return {};
}

// Fetch all banks
export async function fetchBanks() {
  const { data, error } = await supabase
    .from('banks')
    .select('*')
    .eq('is_active', true)
    .order('name');
  
  if (error) throw error;
  return data as Bank[];
}

// Fetch all credit cards with bank info
export async function fetchCreditCards(filters?: {
  category?: string;
  bankId?: string;
  search?: string;
}) {
  let query = supabase
    .from('credit_cards')
    .select('*, banks(*)')
    .eq('is_active', true);

  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }
  if (filters?.bankId && filters.bankId !== 'all') {
    query = query.eq('bank_id', filters.bankId);
  }
  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Transform data to match interface
  return (data || []).map(card => ({
    ...card,
    benefits: parseBenefits(card.benefits),
    fees: parseFees(card.fees),
  })) as CreditCard[];
}

// Fetch single credit card
export async function fetchCreditCard(id: string) {
  const { data, error } = await supabase
    .from('credit_cards')
    .select('*, banks(*)')
    .eq('id', id)
    .maybeSingle();
  
  if (error) throw error;
  if (!data) return null;
  
  return {
    ...data,
    benefits: parseBenefits(data.benefits),
    fees: parseFees(data.fees),
  } as CreditCard;
}

// Fetch savings rates with bank info
export async function fetchSavingsRates(filters?: {
  productType?: string;
  bankId?: string;
}) {
  let query = supabase
    .from('savings_rates')
    .select('*, banks(*)')
    .eq('is_active', true);

  if (filters?.productType && filters.productType !== 'all') {
    query = query.eq('product_type', filters.productType);
  }
  if (filters?.bankId && filters.bankId !== 'all') {
    query = query.eq('bank_id', filters.bankId);
  }

  const { data, error } = await query.order('interest_rate', { ascending: false });
  
  if (error) throw error;
  return (data || []) as SavingsRate[];
}

// Fetch loan products with bank info
export async function fetchLoanProducts(filters?: {
  loanType?: string;
  bankId?: string;
}) {
  let query = supabase
    .from('loan_products')
    .select('*, banks(*)')
    .eq('is_active', true);

  if (filters?.loanType && filters.loanType !== 'all') {
    query = query.eq('loan_type', filters.loanType);
  }
  if (filters?.bankId && filters.bankId !== 'all') {
    query = query.eq('bank_id', filters.bankId);
  }

  const { data, error } = await query.order('interest_rate_min', { ascending: true });
  
  if (error) throw error;
  return (data || []) as LoanProduct[];
}

// Trigger scraping
export async function triggerScrape(bankId?: string) {
  const { data, error } = await supabase.functions.invoke('scrape-bank-data', {
    body: { 
      bankId,
      action: bankId ? 'scrape-single' : 'scrape-all'
    },
  });

  if (error) throw error;
  return data;
}
