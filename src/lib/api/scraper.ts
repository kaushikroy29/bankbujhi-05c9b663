import { supabase } from "@/integrations/supabase/client";

export async function fetchScraperRuns() {
    const { data, error } = await supabase
        .from('scraper_runs')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(20);

    if (error) throw error;
    return data;
}

export async function fetchScrapedData(status = 'pending') {
    const { data, error } = await supabase
        .from('scraped_data')
        .select(`
            *,
            banks (name, logo_url)
        `)
        .eq('status', status)
        .order('scraped_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function approveScrapedData(id: string, targetTable: 'credit_cards' | 'loan_products', data: Record<string, unknown>, bankId: string) {
    // Define allowed fields for each table (matching database schema)
    const allowedFields: Record<string, string[]> = {
        credit_cards: [
            'name', 'category', 'image_url', 'annual_fee', 'annual_fee_note',
            'annual_fee_waived', 'interest_rate', 'min_income', 'min_age', 'max_age',
            'credit_score', 'employment_types', 'required_documents', 'benefits',
            'fees', 'fees_detailed', 'badge', 'apply_url'
        ],
        loan_products: [
            'name', 'loan_type', 'interest_rate_min', 'interest_rate_max',
            'processing_fee', 'max_amount', 'max_tenure_months', 'min_income',
            'features', 'badge', 'apply_url'
        ]
    };

    // Filter data to only include allowed fields
    const filteredData: Record<string, unknown> = {};
    const allowed = allowedFields[targetTable] || [];

    for (const key of allowed) {
        if (data[key] !== undefined) {
            filteredData[key] = data[key];
        }
    }

    // 1. Insert into real table with filtered data
    const { error: insertError } = await supabase
        .from(targetTable)
        .insert({
            ...filteredData,
            bank_id: bankId,
            is_active: true
        });

    if (insertError) throw insertError;

    // 2. Mark scraped data as approved/merged
    const { error: updateError } = await supabase
        .from('scraped_data')
        .update({
            status: 'approved',
            approved_at: new Date().toISOString()
        })
        .eq('id', id);

    if (updateError) throw updateError;
}

export async function rejectScrapedData(id: string) {
    const { error } = await supabase
        .from('scraped_data')
        .update({ status: 'rejected' })
        .eq('id', id);

    if (error) throw error;
}

export async function triggerScraperRun(runType = 'manual') {
    // Create a record so it shows up in the UI as running
    const { data, error } = await supabase
        .from('scraper_runs')
        .insert({
            run_type: runType,
            status: 'running',
            started_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) throw error;

    // In a real production app, this would also call a GitHub Actions webhook
    // await fetch('https://api.github.com/repos/.../dispatches', ...)

    return data;
}
