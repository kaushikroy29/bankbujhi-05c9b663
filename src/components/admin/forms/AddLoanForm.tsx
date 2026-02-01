import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface AddLoanFormData {
    bank_id: string;
    name: string;
    loan_type: string;
    interest_rate_min: number;
    interest_rate_max: number;
    processing_fee: string;
    max_amount: string;
    max_tenure_months: number;
    min_income: string;
    apply_url: string;
}

export default function AddLoanForm({ onSuccess }: { onSuccess: () => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const { register, handleSubmit, reset } = useForm<AddLoanFormData>();

    useEffect(() => {
        if (open) {
            loadBanks();
        }
    }, [open]);

    const loadBanks = async () => {
        const data = await fetchBanks();
        setBanks(data);
    };

    const onSubmit = async (data: AddLoanFormData) => {
        setLoading(true);
        try {
            const { error } = await supabase.from('loan_products').insert({
                bank_id: data.bank_id,
                name: data.name,
                loan_type: data.loan_type,
                interest_rate_min: data.interest_rate_min,
                interest_rate_max: data.interest_rate_max,
                processing_fee: data.processing_fee,
                max_amount: data.max_amount,
                max_tenure_months: data.max_tenure_months,
                min_income: data.min_income,
                apply_url: data.apply_url,
                is_active: true,
                features: [] // Default empty
            });

            if (error) throw error;

            toast.success("Loan product added successfully!");
            setOpen(false);
            reset();
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Failed to add loan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <MaterialIcon name="add" className="mr-2" />
                    Add Loan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Loan Product</DialogTitle>
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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" {...register("name", { required: true })} placeholder="Personal Loan" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="loan_type">Loan Type</Label>
                            <select
                                {...register("loan_type")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="personal">Personal Loan</option>
                                <option value="home">Home Loan</option>
                                <option value="auto">Auto Loan</option>
                                <option value="sme">SME Loan</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="interest_rate_min">Min Rate (%)</Label>
                            <Input type="number" step="0.01" id="interest_rate_min" {...register("interest_rate_min", { valueAsNumber: true })} placeholder="9.5" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="interest_rate_max">Max Rate (%)</Label>
                            <Input type="number" step="0.01" id="interest_rate_max" {...register("interest_rate_max", { valueAsNumber: true })} placeholder="12.5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="processing_fee">Processing Fee</Label>
                            <Input id="processing_fee" {...register("processing_fee")} placeholder="0.5% or BDT 2000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="max_amount">Max Amount</Label>
                            <Input id="max_amount" {...register("max_amount")} placeholder="BDT 50,00,000" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="max_tenure_months">Max Tenure (Months)</Label>
                            <Input type="number" id="max_tenure_months" {...register("max_tenure_months", { valueAsNumber: true })} placeholder="60" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="min_income">Min Income</Label>
                            <Input id="min_income" {...register("min_income")} placeholder="BDT 30,000" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="apply_url">Apply URL (Optional)</Label>
                        <Input id="apply_url" {...register("apply_url")} placeholder="https://..." />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Loan
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
