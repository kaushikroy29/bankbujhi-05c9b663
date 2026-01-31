import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPendingUpdate } from "@/lib/api/updates";
import { fetchCreditCards } from "@/lib/api/banks";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaterialIcon from "@/components/ui/MaterialIcon";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const QuickUpdate = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);

    // Fetch cards for dropdown
    const { data: cards, isLoading: cardsLoading } = useQuery({
        queryKey: ['credit-cards-admin'],
        queryFn: () => fetchCreditCards({})
    });

    const mutation = useMutation({
        mutationFn: createPendingUpdate,
        onSuccess: () => {
            toast.success("আপডেট সফলভাবে সাবমিট করা হয়েছে!");
            reset();
            queryClient.invalidateQueries({ queryKey: ['pending-updates'] });
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const onSubmit = (data: any) => {
        setSubmitting(true);

        let productName = data.product_name;
        // If an existing product is selected, use its name
        if (data.product_id && cards) {
            const card = cards.find(c => c.id === data.product_id);
            if (card) productName = card.name;
        }

        const payload = {
            bank_name: data.bank_name || "Unknown Bank", // Should be derived from product or input
            product_type: data.product_type,
            product_name: productName,
            field_name: data.field_name,
            old_value: data.old_value,
            new_value: data.new_value,
            source_url: data.source_url,
            product_id: data.product_id === 'new' ? null : data.product_id
        };

        mutation.mutate(payload);
        setSubmitting(false);
    };

    const productType = watch('product_type');

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full pb-20 md:pb-8">
                <PageBreadcrumb
                    items={[
                        { label: "অ্যাডমিন", href: "/admin" },
                        { label: "কুইক আপডেট" }
                    ]}
                    className="mb-6"
                />

                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary/10 p-3 rounded-xl">
                        <MaterialIcon name="flash_on" className="text-primary text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Quick Update</h1>
                        <p className="text-muted-foreground">Submit manual updates for approval.</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>নতুন আপডেট তথ্য</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Product Type</Label>
                                    <Select onValueChange={(val) => setValue('product_type', val)} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                            <SelectItem value="loan">Personal Loan</SelectItem>
                                            <SelectItem value="savings">FDR / Savings</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Bank Name</Label>
                                    <Input {...register('bank_name')} placeholder="e.g. City Bank" />
                                </div>
                            </div>

                            {/* Conditional Product Select */}
                            {productType === 'credit_card' && (
                                <div className="space-y-2">
                                    <Label>Select Existing Card (Optional)</Label>
                                    <Select onValueChange={(val) => setValue('product_id', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Card" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">-- New Product --</SelectItem>
                                            {cards?.map(card => (
                                                <SelectItem key={card.id} value={card.id}>{card.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Product Name</Label>
                                <Input {...register('product_name', { required: true })} placeholder="e.g. Agora Amex Gold" />
                            </div>

                            <div className="space-y-2">
                                <Label>Field Changed</Label>
                                <Input {...register('field_name', { required: true })} placeholder="e.g. Annual Fee, Interest Rate" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Old Value (Optional)</Label>
                                    <Input {...register('old_value')} placeholder="e.g. 5000" />
                                </div>
                                <div className="space-y-2">
                                    <Label>New Value</Label>
                                    <Input {...register('new_value', { required: true })} placeholder="e.g. 6000" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Source URL (Verification)</Label>
                                <Input {...register('source_url')} placeholder="https://bank-website.com/notice" />
                            </div>

                            <div className="space-y-2">
                                <Label>Change Reason</Label>
                                <Textarea {...register('change_reason')} placeholder="Details about this change..." />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending || submitting}>
                                {mutation.isPending || submitting ? "Submitting..." : "Submit Update"}
                            </Button>

                        </form>
                    </CardContent>
                </Card>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default QuickUpdate;
