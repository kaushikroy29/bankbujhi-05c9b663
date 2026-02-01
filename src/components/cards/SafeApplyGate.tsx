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
import { Checkbox } from "@/components/ui/checkbox";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { CreditCard, LoanProduct } from "@/lib/api/banks";

interface SafeApplyGateProps {
    children: React.ReactNode;
    product: CreditCard | LoanProduct;
}

const SafeApplyGate = ({ children, product }: SafeApplyGateProps) => {
    const [open, setOpen] = useState(false);
    const [checks, setChecks] = useState({
        fees: false,
        interest: false,
        conditions: false
    });

    // Extract key data
    const isLoan = 'loan_type' in product;
    const annualFee = isLoan ? product.processing_fee : (product as CreditCard).fees?.annual || (product as CreditCard).annual_fee || "N/A";
    const interestRate = isLoan ? `${product.interest_rate_min}%` : (product as CreditCard).fees?.interest_rate || (product as CreditCard).interest_rate || "N/A";

    const handleProceed = () => {
        if (product.apply_url) {
            window.open(product.apply_url, '_blank', 'noopener,noreferrer');
            setOpen(false);
            // Reset checks for next time
            setChecks({ fees: false, interest: false, conditions: false });
        }
    };

    const allChecked = Object.values(checks).every(Boolean);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <MaterialIcon name="security" className="text-primary" />
                        নিরাপত্তা চেকলিস্ট
                    </DialogTitle>
                    <DialogDescription>
                        আবেদন করার আগে নিশ্চিত করুন যে আপনি নিচের বিষয়গুলো যাচাই করেছেন
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg border space-y-3">
                        <h4 className="font-semibold text-sm mb-2">খরচের সারসংক্ষেপ:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-muted-foreground block text-xs">{isLoan ? 'প্রসেসিং ফি' : 'বার্ষিক ফি'}</span>
                                <span className="font-bold">{annualFee}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-xs">সুদের হার</span>
                                <span className="font-bold">{interestRate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-2 max-w-[90%]">
                            <Checkbox
                                id="check-fees"
                                checked={checks.fees}
                                onCheckedChange={(c) => setChecks(p => ({ ...p, fees: c as boolean }))}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="check-fees"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    আমি সকল ফি এবং চার্জ সম্পর্কে জেনেছি
                                </label>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 max-w-[90%]">
                            <Checkbox
                                id="check-interest"
                                checked={checks.interest}
                                onCheckedChange={(c) => setChecks(p => ({ ...p, interest: c as boolean }))}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="check-interest"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    আমি সুদের হার ও পরিশোধের শর্ত বুঝতে পেরেছি
                                </label>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 max-w-[90%]">
                            <Checkbox
                                id="check-conditions"
                                checked={checks.conditions}
                                onCheckedChange={(c) => setChecks(p => ({ ...p, conditions: c as boolean }))}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="check-conditions"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    আমি ব্যাংকের অফিসিয়াল সাইট ভিজিট করতে সম্মত
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                        ফিরে যান
                    </Button>
                    <Button
                        onClick={handleProceed}
                        disabled={!allChecked}
                        className="bg-green-600 hover:bg-green-700 gap-2"
                    >
                        নিশ্চিত ও আবেদন করুন
                        <MaterialIcon name="arrow_forward" className="text-sm" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SafeApplyGate;
