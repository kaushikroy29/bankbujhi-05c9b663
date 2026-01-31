import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { supabase } from "@/integrations/supabase/client";
import { fetchCreditCards, CreditCard } from "@/lib/api/banks";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const QuickUpdate = () => {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState("");

    const [formData, setFormData] = useState({
        change_type: "fee_update",
        field_changed: "annual_fee",
        old_value: "",
        new_value: "",
        change_description: "",
        source_url: "",
    });

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        const data = await fetchCreditCards();
        setCards(data);
    };

    const handleCardSelect = (id: string) => {
        setSelectedCardId(id);
        const card = cards.find(c => c.id === id);
        if (card) {
            // Auto-fill old value if possible based on field selection
            // Simplified logic for demo
            if (formData.field_changed === "annual_fee") {
                setFormData(prev => ({ ...prev, old_value: card.annual_fee || "" }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const { error } = await supabase
                .from('product_change_log')
                .insert({
                    product_type: 'credit_card',
                    product_id: selectedCardId,
                    change_type: formData.change_type,
                    field_changed: formData.field_changed,
                    old_value: formData.old_value,
                    new_value: formData.new_value,
                    change_description: formData.change_description,
                    source_url: formData.source_url,
                    created_by: user.id,
                    verified: true // Admin updates are auto-verified
                });

            if (error) throw error;

            toast.success("আপডেট সফলভাবে লগ করা হয়েছে");
            // Reset form
            setFormData(prev => ({ ...prev, new_value: "", change_description: "" }));
        } catch (error) {
            console.error(error);
            toast.error("আপডেট করতে ব্যর্থ হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <MaterialIcon name="admin_panel_settings" />
                Quick Update Panel
            </h1>

            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="space-y-2">
                        <Label>Product / Card</Label>
                        <Select onValueChange={handleCardSelect} value={selectedCardId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a card to update" />
                            </SelectTrigger>
                            <SelectContent>
                                {cards.map(card => (
                                    <SelectItem key={card.id} value={card.id}>{card.name} ({card.banks?.name})</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Change Type</Label>
                            <Select
                                value={formData.change_type}
                                onValueChange={(val) => setFormData(p => ({ ...p, change_type: val }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fee_update">Fee Update</SelectItem>
                                    <SelectItem value="rate_change">Rate Change</SelectItem>
                                    <SelectItem value="benefit_added">New Benefit</SelectItem>
                                    <SelectItem value="benefit_removed">Benefit Removed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Field Changed</Label>
                            <Input
                                value={formData.field_changed}
                                onChange={e => setFormData(p => ({ ...p, field_changed: e.target.value }))}
                                placeholder="e.g. annual_fee"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Old Value</Label>
                            <Input
                                value={formData.old_value}
                                onChange={e => setFormData(p => ({ ...p, old_value: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>New Value</Label>
                            <Input
                                value={formData.new_value}
                                onChange={e => setFormData(p => ({ ...p, new_value: e.target.value }))}
                                className="border-green-500 bg-green-50/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description (Bangla)</Label>
                        <Textarea
                            placeholder="e.g. সিটি ব্যাংক আমেরিকান এক্সপ্রেস গোল্ড কার্ডের বার্ষিক ফি ৫,০০০ টাকা থেকে বেড়ে ৬,০০০ টাকা হয়েছে।"
                            value={formData.change_description}
                            onChange={e => setFormData(p => ({ ...p, change_description: e.target.value }))}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Source URL (Optional)</Label>
                        <Input
                            placeholder="https://..."
                            value={formData.source_url}
                            onChange={e => setFormData(p => ({ ...p, source_url: e.target.value }))}
                        />
                    </div>

                    <Button type="submit" className="w-full font-bold" disabled={loading || !selectedCardId}>
                        {loading ? "Updating..." : "Publish Update"}
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default QuickUpdate;
