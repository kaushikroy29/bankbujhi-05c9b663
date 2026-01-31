import { supabase } from '@/integrations/supabase/client';

export interface WatchlistItem {
    id: string;
    user_id: string;
    product_type: 'credit_card' | 'loan' | 'savings';
    product_id: string;
    notify_on: string[];
    created_at: string;
    updated_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    notification_type: 'fee_increase' | 'fee_decrease' | 'new_benefit' | 'removed_benefit' | 'rate_change' | 'new_card';
    title_bn: string;
    message_bn: string;
    product_type: 'credit_card' | 'loan' | 'savings';
    product_id: string;
    product_name: string;
    bank_name?: string;
    severity: 'info' | 'warning' | 'critical';
    read: boolean;
    created_at: string;
}

// Add item to watchlist
export async function addToWatchlist(
    productType: 'credit_card' | 'loan' | 'savings',
    productId: string,
    notifyOn: string[] = ['fee_change', 'rate_change', 'new_benefit']
): Promise<{ data: WatchlistItem | null; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('user_watchlist')
        .insert({
            user_id: user.id,
            product_type: productType,
            product_id: productId,
            notify_on: notifyOn
        })
        .select()
        .single();

    return { data, error };
}

// Remove item from watchlist
export async function removeFromWatchlist(
    productType: 'credit_card' | 'loan' | 'savings',
    productId: string
): Promise<{ error: any }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: new Error('User not authenticated') };
    }

    const { error } = await supabase
        .from('user_watchlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_type', productType)
        .eq('product_id', productId);

    return { error };
}

// Check if item is in watchlist
export async function isInWatchlist(
    productType: 'credit_card' | 'loan' | 'savings',
    productId: string
): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { data, error } = await supabase
        .from('user_watchlist')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_type', productType)
        .eq('product_id', productId)
        .single();

    return !error && !!data;
}

// Get user's watchlist
export async function getUserWatchlist(): Promise<{ data: WatchlistItem[] | null; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('user_watchlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return { data, error };
}

// Get user's notifications
export async function getUserNotifications(
    limit: number = 20,
    unreadOnly: boolean = false
): Promise<{ data: Notification[] | null; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    let query = supabase
        .from('user_notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (unreadOnly) {
        query = query.eq('read', false);
    }

    const { data, error } = await query;

    return { data, error };
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string): Promise<{ error: any }> {
    const { error } = await supabase
        .from('user_notifications')
        .update({ read: true })
        .eq('id', notificationId);

    return { error };
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(): Promise<{ error: any }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: new Error('User not authenticated') };
    }

    const { error } = await supabase
        .from('user_notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

    return { error };
}

// Get unread notification count
export async function getUnreadNotificationCount(): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return 0;

    const { count, error } = await supabase
        .from('user_notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);

    return error ? 0 : (count || 0);
}
