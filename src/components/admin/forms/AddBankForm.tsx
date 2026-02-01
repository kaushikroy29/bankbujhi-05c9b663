import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface AddBankFormData {
    name: string;
    name_bn: string;
    type: string;
    headquarters: string;
    website_url: string;
    established_year: number;
}

export default function AddBankForm({ onSuccess }: { onSuccess: () => void }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm<AddBankFormData>();

    const onSubmit = async (data: AddBankFormData) => {
        setLoading(true);
        try {
            const { error } = await supabase.from('banks').insert({
                name: data.name,
                name_bn: data.name_bn,
                type: data.type || 'commercial',
                headquarters: data.headquarters,
                website_url: data.website_url,
                established_year: data.established_year,
                is_active: true
            });

            if (error) throw error;

            toast.success("Bank added successfully!");
            setOpen(false);
            reset();
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : "Failed to add bank");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <MaterialIcon name="add" className="mr-2" />
                    Add Bank
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Bank</DialogTitle>
                    <DialogDescription>
                        Add a new bank partner to the platform.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name (English)</Label>
                            <Input id="name" {...register("name", { required: true })} placeholder="City Bank" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name_bn">Name (Bangla)</Label>
                            <Input id="name_bn" {...register("name_bn")} placeholder="সিটি ব্যাংক" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <select
                                {...register("type")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="commercial">Commercial</option>
                                <option value="islamic">Islamic</option>
                                <option value="foreign">Foreign</option>
                                <option value="government">Government</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="established_year">Est. Year</Label>
                            <Input type="number" id="established_year" {...register("established_year", { valueAsNumber: true })} placeholder="1983" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="headquarters">Headquarters</Label>
                        <Input id="headquarters" {...register("headquarters")} placeholder="Dhaka" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="website_url">Website URL</Label>
                        <Input id="website_url" {...register("website_url")} placeholder="https://..." />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Bank
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
