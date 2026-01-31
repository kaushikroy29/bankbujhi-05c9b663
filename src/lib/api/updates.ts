import { supabase } from "@/integrations/supabase/client";

export type UpdateStatus = 'pending' | 'approved' | 'rejected';
export type UpdateSeverity = 'info' | 'warning' | 'critical';

export interface PendingUpdate {
    id: string;
    bank_name: string;
    product_type: string;
    product_id?: string | null;
    product_name: string;
    field_name: string;
    old_value?: string | null;
    new_value: string;
    source_url?: string | null;
    status: UpdateStatus;
    submitted_by?: string | null;
    created_at: string;
}

export interface ProductChangeLog {
    id: string;
    product_type: string;
    product_id: string;
    change_type: string;
    field_name: string;
    old_value?: string | null;
    new_value: string;
    change_reason?: string | null;
    source_url?: string | null;
    effective_date: string;
    created_at: string;
    verified: boolean;
}

export interface Notification {
    id: string;
    type: string;
    title_bn: string;
    message_bn: string;
    product_id?: string | null;
    severity: UpdateSeverity;
    created_at: string;
    expires_at?: string | null;
}

// Fetch Pending Updates
export async function fetchPendingUpdates() {
    const { data, error } = await supabase
        .from('pending_updates')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as PendingUpdate[];
}

// Create Pending Update
export async function createPendingUpdate(update: Omit<PendingUpdate, 'id' | 'created_at' | 'status'>) {
    const { data, error } = await supabase
        .from('pending_updates')
        .insert({
            ...update,
            status: 'pending'
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Approve Update (Transaction: Update Status -> Log Change -> Create Notification)
export async function approveUpdate(id: string) {
    // 1. Get the update details
    const { data: update, error: fetchError } = await supabase
        .from('pending_updates')
        .select('*')
        .eq('id', id)
        .single();

    if (fetchError || !update) throw fetchError || new Error("Update not found");

    // 2. Insert into Change Log
    const { error: logError } = await supabase
        .from('product_change_log')
        .insert({
            product_type: update.product_type,
            product_id: update.product_id || crypto.randomUUID(), // Handle new products
            change_type: 'manual_update',
            field_name: update.field_name,
            old_value: update.old_value,
            new_value: update.new_value,
            source_url: update.source_url,
            effective_date: new Date().toISOString(),
            verified: true
        });

    if (logError) throw logError;

    // 3. Create Notification (Logic to determine severity/message)
    let severity: UpdateSeverity = 'info';
    let message = `${update.product_name} এর ${update.field_name} পরিবর্তিত হয়েছে।`;

    if (update.field_name.includes('fee') && parseFloat(update.new_value) > parseFloat(update.old_value || '0')) {
        severity = 'critical'; // Fee increase
        message = `${update.product_name} এর ফি বৃদ্ধি পেয়েছে!`;
    }

    const { error: notifError } = await supabase
        .from('notifications')
        .insert({
            type: 'update',
            title_bn: `${update.bank_name} - আপডেট`,
            message_bn: message,
            product_id: update.product_id,
            severity: severity
        });

    if (notifError) console.error("Failed to create notification", notifError);

    // 4. Mark as Approved
    const { error: updateError } = await supabase
        .from('pending_updates')
        .update({ status: 'approved' })
        .eq('id', id);

    if (updateError) throw updateError;

    return true;
}

// Reject Update
export async function rejectUpdate(id: string) {
    const { error } = await supabase
        .from('pending_updates')
        .update({ status: 'rejected' })
        .eq('id', id);

    if (error) throw error;
    return true;
}

// Fetch Notifications
export async function fetchNotifications(limit = 10) {
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data as Notification[];
}
