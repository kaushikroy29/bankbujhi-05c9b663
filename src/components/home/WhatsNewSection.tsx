import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { format } from "date-fns";
import { CreditCard } from "@/lib/api/banks";

interface ProductChange {
    id: string;
    change_type: string;
    field_changed: string;
    change_description: string;
    effective_date: string;
    created_at: string;
    new_value: string;
    old_value: string;
    source_url?: string;
    product_id: string;
}

const WhatsNewSection = () => {
    const [changes, setChanges] = useState<(ProductChange & { product_name?: string })[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadChanges();
    }, []);

    const loadChanges = async () => {
        try {
            // 1. Fetch latest verified changes
            const { data: logs, error } = await supabase
                .from('product_change_log')
                .select('*')
                .eq('verified', true)
                .order('effective_date', { ascending: false })
                .limit(5);

            if (error) throw error;
            if (!logs || logs.length === 0) {
                setLoading(false);
                return;
            }

            // 2. Fetch product names manually (since no foreign key relation in Supabase types setup yet)
            // Ideally we would use a join, but for now separate fetch is safer with dynamic types
            const productIds = logs.map(l => l.product_id);

            const { data: products } = await supabase
                .from('credit_cards')
                .select('id, name')
                .in('id', productIds);

            const productMap = new Map(products?.map(p => [p.id, p.name]));

            const enrichedLogs = logs.map(log => ({
                ...log,
                product_name: productMap.get(log.product_id) || "Unknown Product"
            }));

            setChanges(enrichedLogs);

        } catch (err) {
            console.error("Error loading updates:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading || changes.length === 0) return null;

    return (
        <section className="bg-muted/50 border-y py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                    <MaterialIcon name="notifications_active" className="text-primary text-2xl" />
                    <h2 className="text-xl font-bold">What's New: Rates & Fees Updates</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {changes.map(change => (
                        <div key={change.id} className="bg-card border rounded-lg p-4 shadow-sm flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <Badge variant={change.change_type === 'fee_update' ? "destructive" : "default"}>
                                    {change.change_type === 'fee_update' ? 'Fee Updated' : 'New Update'}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{format(new Date(change.effective_date), "dd MMM yyyy")}</span>
                            </div>

                            <h3 className="font-bold text-sm">{change.product_name}</h3>

                            <p className="text-sm text-foreground/80 leading-relaxed">
                                {change.change_description || (
                                    <>
                                        {change.field_changed} changed from <span className="line-through text-muted-foreground">{change.old_value}</span> to <span className="font-bold text-primary">{change.new_value}</span>
                                    </>
                                )}
                            </p>

                            {change.source_url && (
                                <a href={change.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-auto flex items-center gap-1">
                                    Source <MaterialIcon name="open_in_new" className="text-[10px]" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatsNewSection;
