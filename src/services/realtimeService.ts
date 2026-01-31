import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

export type NotificationCallback = (payload: any) => void;

class RealtimeService {
    private static instance: RealtimeService;
    private channels: Map<string, RealtimeChannel> = new Map();

    private constructor() { }

    public static getInstance(): RealtimeService {
        if (!RealtimeService.instance) {
            RealtimeService.instance = new RealtimeService();
        }
        return RealtimeService.instance;
    }

    /**
     * Subscribe to notifications
     */
    public subscribeToNotifications(onInsert: NotificationCallback) {
        const channelName = "public:notifications";

        if (this.channels.has(channelName)) {
            return this.channels.get(channelName);
        }

        const channel = supabase
            .channel(channelName)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notifications",
                },
                (payload) => {
                    console.log("New Notification received:", payload);
                    onInsert(payload.new);
                }
            )
            .subscribe();

        this.channels.set(channelName, channel);
        return channel;
    }

    /**
     * Subscribe to product change logs
     */
    public subscribeToChangeLogs(onInsert: NotificationCallback) {
        const channelName = "public:product_change_log";

        if (this.channels.has(channelName)) {
            return this.channels.get(channelName);
        }

        const channel = supabase
            .channel(channelName)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "product_change_log",
                },
                (payload) => {
                    console.log("New Change Log received:", payload);
                    onInsert(payload.new);
                }
            )
            .subscribe();

        this.channels.set(channelName, channel);
        return channel;
    }

    /**
     * Unsubscribe from all channels
     */
    public unsubscribeAll() {
        this.channels.forEach((channel) => {
            supabase.removeChannel(channel);
        });
        this.channels.clear();
    }
}

export const realtimeService = RealtimeService.getInstance();
