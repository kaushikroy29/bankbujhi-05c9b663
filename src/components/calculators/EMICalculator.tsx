import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatBDT } from "@/lib/utils/currency";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(9.0);
    const [tenureMonths, setTenureMonths] = useState<number>(12);
    const [processingFeePercent, setProcessingFeePercent] = useState<number>(1.0); // Standard 1-2%

    const [emi, setEmi] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0); // Interest + Fees

    const calculateEMI = () => {
        const P = loanAmount;
        const r = interestRate / 12 / 100;
        const n = tenureMonths;

        if (P === 0 || interestRate === 0) {
            setEmi(0);
            return;
        }

        // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
        const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        const fee = Math.round(P * (processingFeePercent / 100));
        const totalPay = Math.round(emiValue * n);
        const interest = totalPay - P;

        setEmi(Math.round(emiValue));
        setTotalPayment(totalPay);
        setTotalInterest(interest);
        setTotalCost(interest + fee);
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, tenureMonths, processingFeePercent]);

    // Derived States
    const processingFeeAmount = Math.round(loanAmount * (processingFeePercent / 100));
    const isBadLoan = totalInterest > (loanAmount * 0.5); // Paying >50% of principal as interest?

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5 pb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <MaterialIcon name="calculate" className="text-9xl" />
                </div>
                <CardTitle className="text-3xl font-black text-center text-primary relative z-10">লোন ট্রু কস্ট ক্যালকুলেটর</CardTitle>
                <CardDescription className="text-center text-muted-foreground relative z-10">শুধুমাত্র কিস্তি নয়, লোনের সম্পূর্ণ খরচ দেখুন</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-8">

                        {/* Loan Amount */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-muted-foreground">লোনের পরিমাণ</label>
                                <div className="relative w-32">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">৳</span>
                                    <Input
                                        type="number"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="pl-8 text-right font-bold"
                                    />
                                </div>
                            </div>
                            <Slider
                                value={[loanAmount]}
                                min={50000}
                                max={5000000}
                                step={10000}
                                onValueChange={(vals) => setLoanAmount(vals[0])}
                                className="py-2"
                            />
                            <p className="text-xs text-muted-foreground text-right">{formatBDT(loanAmount)}</p>
                        </div>

                        {/* Interest Rate */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-muted-foreground">সুদের হার (%)</label>
                                <div className="relative w-24">
                                    <Input
                                        type="number"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="pr-6 text-right font-bold"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">%</span>
                                </div>
                            </div>
                            <Slider
                                value={[interestRate]}
                                min={5}
                                max={20}
                                step={0.25}
                                onValueChange={(vals) => setInterestRate(vals[0])}
                                className="py-2"
                            />
                        </div>

                        {/* Tenure */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-muted-foreground">সময়কাল (মাস)</label>
                                <div className="relative w-24">
                                    <Input
                                        type="number"
                                        value={tenureMonths}
                                        onChange={(e) => setTenureMonths(Number(e.target.value))}
                                        className="text-right font-bold"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {[12, 24, 36, 48, 60, 84].map(month => (
                                    <Button
                                        key={month}
                                        variant={tenureMonths === month ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setTenureMonths(month)}
                                        className="flex-1"
                                    >
                                        {month < 12 ? `${month} M` : `${month / 12} Y`}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Processing Fee */}
                        <div className="space-y-3 pt-4 border-t border-dashed">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                                    <MaterialIcon name="receipt_long" className="text-sm text-slate-400" />
                                    প্রসেসিং ফি (%)
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-20">
                                        <Input
                                            type="number"
                                            value={processingFeePercent}
                                            onChange={(e) => setProcessingFeePercent(Number(e.target.value))}
                                            className="h-8 pr-5 text-right font-bold text-xs"
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
                                    </div>
                                    <span className="text-xs font-bold text-red-500">
                                        - {formatBDT(processingFeeAmount)}
                                    </span>
                                </div>
                            </div>
                            <Slider
                                value={[processingFeePercent]}
                                min={0}
                                max={3}
                                step={0.1}
                                onValueChange={(vals) => setProcessingFeePercent(vals[0])}
                                className="py-1"
                            />
                        </div>

                    </div>

                    {/* Results */}
                    <div className="flex flex-col space-y-4">
                        <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-2 shadow-xl">
                            <p className="text-sm font-medium opacity-80">মাসিক কিস্তি (EMI)</p>
                            <h3 className="text-5xl font-black tracking-tighter">{formatBDT(emi)}</h3>
                            <p className="text-xs opacity-60">প্রতি মাসে পরিশোধ করতে হবে</p>
                        </div>

                        <div className="bg-white border rounded-2xl p-6 flex-1 flex flex-col justify-center space-y-6">

                            <div>
                                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                    <MaterialIcon name="pie_chart" className="text-gray-400" />
                                    লোনের মোট খরচ ব্রেকডাউন
                                </h4>

                                {/* Simple Bar Chart Visualization */}
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold text-gray-600">
                                            <span>আসল ঋণ (Principal)</span>
                                            <span>{formatBDT(loanAmount)}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div className="bg-blue-500 h-full rounded-full w-full"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold text-orange-600">
                                            <span>মোট সুদ (Interest)</span>
                                            <span>{formatBDT(totalInterest)}</span>
                                        </div>
                                        {/* Width relative to Principal for visual comparison approx */}
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${isBadLoan ? "bg-red-500" : "bg-orange-500"}`}
                                                style={{ width: `${Math.min((totalInterest / loanAmount) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold text-slate-500">
                                            <span>প্রসেসিং ফি (Processing Fee)</span>
                                            <span>{formatBDT(processingFeeAmount)}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-slate-500 h-full rounded-full"
                                                style={{ width: `${Math.min((processingFeeAmount / loanAmount) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">সর্বমোট পরিশোধ</p>
                                        <p className="text-xs text-muted-foreground">(আসল + সুদ + ফি)</p>
                                    </div>
                                    <p className="text-2xl font-black text-slate-800">{formatBDT(loanAmount + totalInterest + processingFeeAmount)}</p>
                                </div>
                            </div>

                            {isBadLoan && (
                                <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex gap-3 items-start">
                                    <MaterialIcon name="warning" className="text-red-600 mt-1" />
                                    <div>
                                        <p className="text-sm font-bold text-red-800">উচ্চ সুদের সতর্কতা!</p>
                                        <p className="text-xs text-red-700 leading-snug">
                                            আপনি আসলের ৫০% এর বেশি সুদ দিচ্ছেন! মেয়াদ কমানোর চেষ্টা করুন।
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EMICalculator;
