import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { format } from "date-fns";

interface ProductChangeLog {
    id: string;
    product_type: string;
    product_id: string;
    change_type: string; // 'fee_update', 'rate_change', etc.
    field_changed: string;
    old_value: string | null;
    new_value: string;
    change_reason: string | null;
    source_url: string | null;
    effective_date: string;
    verified: boolean;
    created_at: string;
}

const WhatsNewSection = () => {
    const [changes, setChanges] = useState<(ProductChangeLog & { product_name?: string })[]>([]);
    const [loading, setLoading] = useState(true);

    const handleNewChange = useCallback(async (newLog: ProductChangeLog) => {
        // Fetch product name for the new log
        const { data } = await supabase
            .from(newLog.product_type === 'credit_card' ? 'credit_cards' : 'loan_products')
            .select('name')
            .eq('id', newLog.product_id)
            .single();

        setChanges(prev => [{ ...newLog, product_name: data?.name || 'Unknown Product' }, ...prev].slice(0, 6));
    }, []);

    const loadChanges = useCallback(async () => {
        try {
            // 1. Fetch latest verified changes
            const { data: logs, error } = await supabase
                .from('product_change_log')
                .select('*')
                .eq('verified', true)
                .order('effective_date', { ascending: false })
                .limit(6);

            if (error) throw error;
            if (!logs || logs.length === 0) {
                setLoading(false);
                return;
            }

            // 2. Fetch product names manually
            const cardIds = logs.filter(l => l.product_type === 'credit_card').map(l => l.product_id);
            const loanIds = logs.filter(l => l.product_type === 'loan').map(l => l.product_id);

            const namesMap = new Map<string, string>();

            if (cardIds.length > 0) {
                const { data: cards } = await supabase.from('credit_cards').select('id, name').in('id', cardIds);
                cards?.forEach(c => namesMap.set(c.id, c.name));
            }

            if (loanIds.length > 0) {
                const { data: loans } = await supabase.from('loan_products').select('id, name').in('id', loanIds);
                loans?.forEach(l => namesMap.set(l.id, l.name));
            }

            const enrichedLogs = logs.map(log => ({
                ...log,
                product_name: namesMap.get(log.product_id) || "Unknown Product"
            }));

            setChanges(enrichedLogs);

        } catch (err) {
            console.error("Error loading updates:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadChanges();

        // Real-time subscription
        const channel = supabase
            .channel('public:product_change_log')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'product_change_log', filter: 'verified=eq.true' },
                (payload) => {
                    handleNewChange(payload.new as ProductChangeLog);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [loadChanges, handleNewChange]);

    if (loading) return null; // Or a skeleton
    if (changes.length === 0) return null;

    const getBadge = (type: string) => {
        switch (type) {
            case 'fee_update': return { label: 'ফি আপডেট', variant: 'destructive' as const, icon: 'payments' };
            case 'rate_change': return { label: 'ইটারেস্ট রেট', variant: 'default' as const, icon: 'trending_up' };
            case 'benefit_change': return { label: 'নতুন সুবিধা', variant: 'secondary' as const, icon: 'diamond' };
            default: return { label: 'আপডেট', variant: 'outline' as const, icon: 'info' };
        }
    };

    const formatFieldName = (field: string) => {
        if (field === 'annual_fee') return 'বার্ষিক ফি';
        if (field === 'interest_rate') return 'ইটারেস্ট রেট';
        return field;
    };

    return (
        <section className="bg-muted/30 border-y py-10">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                        <MaterialIcon name="campaign" className="text-2xl" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">সর্বশেষ আপডেট</h2>
                        <p className="text-sm text-muted-foreground">ব্যাংক ফি এবং রেটের সবশেষ পরিবর্তন</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {changes.map(changeLog => {
                        const badge = getBadge(changeLog.change_type);

                        return (
                            <div key={changeLog.id} className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-3">
                                    <Badge variant={badge.variant} className="gap-1">
                                        <MaterialIcon name={badge.icon} className="text-[10px]" />
                                        {badge.label}
                                    </Badge>
                                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                        {format(new Date(changeLog.effective_date), "dd MMM, yyyy")}
                                    </span>
                                </div>

                                <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {changeLog.product_name}
                                </h3>

                                <div className="text-sm text-foreground/80 bg-muted/30 p-3 rounded-lg border border-dashed border-primary/10">
                                    <p className="font-medium text-xs text-muted-foreground mb-1">
                                        {formatFieldName(changeLog.field_changed)}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {changeLog.old_value && (
                                            <>
                                                <span className="line-through text-muted-foreground/70 text-xs">{changeLog.old_value}</span>
                                                <MaterialIcon name="arrow_forward" className="text-muted-foreground text-xs" />
                                            </>
                                        )}
                                        <span className="font-bold text-primary">{changeLog.new_value}</span>
                                    </div>
                                </div>

                                {changeLog.change_reason && (
                                    <p className="text-xs text-muted-foreground mt-3 italic">
                                        " {changeLog.change_reason} "
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhatsNewSection;
