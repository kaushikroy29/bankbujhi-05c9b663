import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from '@/components/ui/MaterialIcon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadNotificationCount,
    type Notification
} from '@/lib/api/watchlist';
import { supabase } from '@/integrations/supabase/client';
import { realtimeService } from '@/services/realtimeService';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        checkAuthAndLoadNotifications();

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Setup Realtime Subscription
        const channel = realtimeService.subscribeToNotifications((newNotif) => {
            setNotifications(prev => [newNotif, ...prev]);
            setUnreadCount(prev => prev + 1);
        });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // We don't unsubscribe here if we want the service to handle singleton persistence, 
            // but for safety in this component's lifecycle:
            // supabase.removeChannel(channel); 
        };
    }, []);

    const checkAuthAndLoadNotifications = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setIsAuthenticated(!!user);

        if (user) {
            await loadNotifications();
            await loadUnreadCount();
        }
    };

    const loadNotifications = async () => {
        const { data } = await getUserNotifications(10);
        if (data) {
            setNotifications(data);
        }
    };

    const loadUnreadCount = async () => {
        const count = await getUnreadNotificationCount();
        setUnreadCount(count);
    };

    const handleMarkAsRead = async (notificationId: string) => {
        await markNotificationAsRead(notificationId);
        await loadNotifications();
        await loadUnreadCount();
    };

    const handleMarkAllAsRead = async () => {
        await markAllNotificationsAsRead();
        await loadNotifications();
        await loadUnreadCount();
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'warning':
                return 'text-amber-600 bg-amber-50 border-amber-200';
            default:
                return 'text-blue-600 bg-blue-50 border-blue-200';
        }
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'এখনই';
        if (diffMins < 60) return `${diffMins} মিনিট আগে`;
        if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
        return `${diffDays} দিন আগে`;
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            >
                <MaterialIcon name="notifications" className="text-2xl text-foreground" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-primary/10 rounded-xl shadow-xl z-50 max-h-[500px] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-primary/10 flex items-center justify-between">
                        <h3 className="font-bold text-lg">বিজ্ঞপ্তি</h3>
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleMarkAllAsRead}
                                className="text-xs"
                            >
                                সব পড়া হয়েছে
                            </Button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                <MaterialIcon name="notifications_off" className="text-4xl mb-2" />
                                <p className="text-sm">কোনো বিজ্ঞপ্তি নেই</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border/40">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                                            !notification.read && "bg-primary/5"
                                        )}
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={cn(
                                                "size-2 rounded-full mt-2 shrink-0",
                                                !notification.read ? "bg-primary" : "bg-transparent"
                                            )} />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm mb-1">{notification.title_bn}</p>
                                                <p className="text-xs text-muted-foreground mb-2">{notification.message_bn}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatTimeAgo(notification.created_at)}
                                                    </span>
                                                    <Link
                                                        to={`/cards/${notification.product_id}`}
                                                        className="text-xs text-primary hover:underline"
                                                    >
                                                        বিস্তারিত →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-primary/10 text-center">
                            <Link
                                to="/notifications"
                                className="text-sm text-primary hover:underline font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                সব বিজ্ঞপ্তি দেখুন
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
