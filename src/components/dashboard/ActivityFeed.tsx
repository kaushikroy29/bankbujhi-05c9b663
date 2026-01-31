import { useState, useEffect } from 'react';
import MaterialIcon from '@/components/ui/MaterialIcon';
import { realtimeService } from '@/services/realtimeService';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import type { Database } from '@/integrations/supabase/types';

type Notification = Database['public']['Tables']['notifications']['Row'];
type ChangeLog = Database['public']['Tables']['product_change_log']['Row'];

interface ActivityItem {
    id: string;
    type: 'notification' | 'changelog';
    title: string;
    message: string;
    timestamp: string;
    severity?: string;
    product_id?: string;
}

const ActivityFeed = () => {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInitialActivities();

        // Subscribe to notifications
        const notifChannel = realtimeService.subscribeToNotifications((payload: Notification) => {
            const newItem: ActivityItem = {
                id: payload.id,
                type: 'notification',
                title: payload.title_bn,
                message: payload.message_bn,
                timestamp: payload.created_at || new Date().toISOString(),
                severity: payload.severity,
                product_id: payload.product_id || undefined,
            };
            setActivities(prev => [newItem, ...prev].slice(0, 10));
        });

        // Subscribe to change logs
        const logChannel = realtimeService.subscribeToChangeLogs((payload: ChangeLog) => {
            const newItem: ActivityItem = {
                id: payload.id,
                type: 'changelog',
                title: `আপডেট: ${payload.product_type === 'credit_card' ? 'ক্রেডিট কার্ড' : 'লোন'}`,
                message: `${payload.field_changed} পরিবর্তন হয়েছে। নতুন মান: ${payload.new_value}`,
                timestamp: payload.created_at || new Date().toISOString(),
                product_id: payload.product_id,
            };
            setActivities(prev => [newItem, ...prev].slice(0, 10));
        });

        return () => {
            // RealtimeService handles persistence, but we can clean up if needed
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadInitialActivities = async () => {
        setLoading(true);
        try {
            // Load recent notifications
            const { data: notifs } = await supabase
                .from('notifications')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            // Load recent change logs
            const { data: logs } = await supabase
                .from('product_change_log')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            const combined: ActivityItem[] = [
                ...(notifs || []).map((n): ActivityItem => ({
                    id: n.id,
                    type: 'notification',
                    title: n.title_bn,
                    message: n.message_bn,
                    timestamp: n.created_at || new Date().toISOString(),
                    severity: n.severity,
                    product_id: n.product_id || undefined,
                })),
                ...(logs || []).map((l): ActivityItem => ({
                    id: l.id,
                    type: 'changelog',
                    title: `আপডেট: ${l.product_type === 'credit_card' ? 'ক্রেডিট কার্ড' : 'লোন'}`,
                    message: `${l.field_changed} পরিবর্তন হয়েছে। নতুন মান: ${l.new_value}`,
                    timestamp: l.created_at || new Date().toISOString(),
                    product_id: l.product_id,
                }))
            ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

            setActivities(combined.slice(0, 10));
        } catch (error) {
            console.error("Error loading activity feed:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && activities.length === 0) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-muted/50 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {activities.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">কোনো সাম্প্রতিক আপডেট নেই</p>
            ) : (
                activities.map((item) => (
                    <div key={item.id} className="bg-card/50 p-4 rounded-xl border border-primary/10 flex items-start gap-4 hover:bg-card transition-colors">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            item.type === 'notification' ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-600"
                        )}>
                            <MaterialIcon name={item.type === 'notification' ? 'notifications' : 'history_edu'} className="text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                                <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
                                <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                                    {new Date(item.timestamp).toLocaleDateString('bn-BD')}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{item.message}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ActivityFeed;
