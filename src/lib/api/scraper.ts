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

export async function approveScrapedData(id: string, targetTable: 'credit_cards' | 'loan_products', data: any, bankId: string) {
    // 1. Insert into real table
    const { error: insertError } = await supabase
        .from(targetTable)
        .insert({
            ...data,
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
    // Ideally this triggers a GitHub Action dispatch
    // For now we just create a record that the python script might pick up if polling
    // Or we rely on the manual workflow_dispatch URL
    console.log("Triggering scraper run:", runType);
    return null;
}
