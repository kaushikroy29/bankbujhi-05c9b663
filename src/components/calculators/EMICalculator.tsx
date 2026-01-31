import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatBDT } from "@/lib/utils/currency";

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(9.0);
    const [tenureMonths, setTenureMonths] = useState<number>(12);
    const [emi, setEmi] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);

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

        setEmi(Math.round(emiValue));
        setTotalPayment(Math.round(emiValue * n));
        setTotalInterest(Math.round((emiValue * n) - P));
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, tenureMonths]);

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5 pb-8">
                <CardTitle className="text-2xl font-bold text-center text-primary">EMI ক্যালকুলেটর</CardTitle>
                <CardDescription className="text-center text-muted-foreground">আপনার মাসিক কিস্তি হিসাব করুন সহজে</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">

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
                                min={10000}
                                max={5000000}
                                step={5000}
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
                                max={25}
                                step={0.5}
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
                                {[12, 24, 36, 48, 60].map(month => (
                                    <Button
                                        key={month}
                                        variant={tenureMonths === month ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setTenureMonths(month)}
                                        className="flex-1"
                                    >
                                        {month / 12} বছর
                                    </Button>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Results */}
                    <div className="bg-muted/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-6 border border-primary/5">
                        <div>
                            <p className="text-sm text-muted-foreground font-medium mb-1">মাসিক কিস্তি (EMI)</p>
                            <h3 className="text-4xl font-black text-primary">{formatBDT(emi)}</h3>
                        </div>

                        <div className="w-full h-px bg-border/50"></div>

                        <div className="w-full grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">মোট সুদ প্রদান</p>
                                <p className="text-lg font-bold text-orange-600">{formatBDT(totalInterest)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">মোট পরিশোধ</p>
                                <p className="text-lg font-bold text-foreground">{formatBDT(totalPayment)}</p>
                            </div>
                        </div>

                        <div className="pt-4 w-full">
                            <Button className="w-full font-bold h-11">
                                লোনের জন্য আবেদন করুন
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EMICalculator;
