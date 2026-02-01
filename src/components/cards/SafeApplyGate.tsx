import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { CreditCard } from "@/lib/api/banks";

interface SafeApplyGateProps {
    children: React.ReactNode;
    product: CreditCard; // Can be extended for LoanProduct later
}

const SafeApplyGate = ({ children, product }: SafeApplyGateProps) => {
    const [open, setOpen] = useState(false);

    // Extract key data for the summary
    const annualFee = product.fees?.annual || product.annual_fee || "N/A";
    const interestRate = product.fees?.interest_rate || product.interest_rate || "N/A";

    const handleProceed = () => {
        if (product.apply_url) {
            window.open(product.apply_url, '_blank', 'noopener,noreferrer');
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <MaterialIcon name="login" className="text-blue-600" />
                        আপনি ব্যাংকের ওয়েবসাইটে যাচ্ছেন
                    </DialogTitle>
                    <DialogDescription>
                        আবেদন করার আগে নিশ্চিত করুন যে আপনি এই খরচগুলো সম্পর্কে জানেন
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-3">
                        <h4 className="font-semibold text-blue-900 mb-2">খরচের সারসংক্ষেপ:</h4>

                        <div className="flex items-center gap-3">
                            <MaterialIcon name="payments" className="text-blue-600" />
                            <div>
                                <span className="text-sm text-blue-800 block">বার্ষিক ফি</span>
                                <span className="font-bold text-blue-900">{annualFee}</span>
                                {product.annual_fee_waived && (
                                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-2">শর্তসাপেক্ষে ফ্রি</span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <MaterialIcon name="percent" className="text-blue-600" />
                            <div>
                                <span className="text-sm text-blue-800 block">সুদের হার</span>
                                <span className="font-bold text-blue-900">{interestRate}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <MaterialIcon name="warning" className="text-amber-600" />
                            <div>
                                <span className="text-sm text-blue-800 block">লুকানো খরচ</span>
                                <span className="font-medium text-amber-700 text-sm">বিস্তারিত ফি ব্রেকডাউন দেখেছেন তো?</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded">
                        ⚠️ <strong>Disclaimer:</strong> BankBujhi কোনো ব্যাংক নয়। আমরা শুধু তথ্য দিই।
                        ব্যাংকের ওয়েবসাইটে গিয়ে সব শর্ত ভালো করে পড়ে তারপর আবেদন করুন।
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
                        বাতিল
                    </Button>
                    <Button onClick={handleProceed} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 gap-2">
                        আমি বুঝেছি, এগিয়ে যান
                        <MaterialIcon name="open_in_new" className="text-sm" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SafeApplyGate;
