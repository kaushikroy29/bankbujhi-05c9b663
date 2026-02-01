import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { fetchBanks, type Bank } from "@/lib/api/banks";

interface AddCardFormData {
    bank_id: string;
    name: string;
    annual_fee: string;
    interest_rate: string;
    min_income: string;
    category: string;
    apply_url: string;
}

export default function AddCreditCardForm({ onSuccess }: { onSuccess: () => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const { register, handleSubmit, reset } = useForm<AddCardFormData>();

    useEffect(() => {
        if (open) {
            loadBanks();
        }
    }, [open]);

    const loadBanks = async () => {
        const data = await fetchBanks();
        setBanks(data);
    };

    const onSubmit = async (data: AddCardFormData) => {
        setLoading(true);
        try {
            const { error } = await supabase.from('credit_cards').insert({
                bank_id: data.bank_id,
                name: data.name,
                annual_fee: data.annual_fee,
                interest_rate: data.interest_rate,
                min_income: data.min_income,
                category: data.category,
                apply_url: data.apply_url,
                is_active: true,
                // Default empty benefits structure
                benefits: [],
                fees: {}
            });

            if (error) throw error;

            toast.success("Card added successfully!");
            setOpen(false);
            reset();
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Failed to add card");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <MaterialIcon name="add_card" className="mr-2" />
                    Add Card
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Credit Card</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="bank_id">Bank</Label>
                        <select
                            {...register("bank_id", { required: true })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Select Bank</option>
                            {banks.map(bank => (
                                <option key={bank.id} value={bank.id}>{bank.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Card Name</Label>
                        <Input id="name" {...register("name", { required: true })} placeholder="Visa Platinum" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                {...register("category")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Travel">Travel</option>
                                <option value="Premium">Premium</option>
                                <option value="Student">Student</option>
                                <option value="Islamic">Islamic</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="min_income">Min Income</Label>
                            <Input id="min_income" {...register("min_income")} placeholder="BDT 50,000" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="annual_fee">Annual Fee</Label>
                            <Input id="annual_fee" {...register("annual_fee")} placeholder="BDT 5000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="interest_rate">Interest Rate</Label>
                            <Input id="interest_rate" {...register("interest_rate")} placeholder="20%" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="apply_url">Apply URL (Optional)</Label>
                        <Input id="apply_url" {...register("apply_url")} placeholder="https://..." />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Card
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
