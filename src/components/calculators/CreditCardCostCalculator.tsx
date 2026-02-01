import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatBDT } from "@/lib/utils/currency";

const CreditCardCostCalculator = () => {
    const [balance, setBalance] = useState<number>(50000);
    const [interestRate, setInterestRate] = useState<number>(20); // Standard 20% in BD
    const [monthlyPayment, setMonthlyPayment] = useState<number>(2500);
    const [minPaymentPercent, setMinPaymentPercent] = useState<number>(5); // Usually 5% or 500tk

    const calculatePayoff = (payment: number, isFixed: boolean) => {
        let currentBalance = balance;
        let totalInterest = 0;
        let months = 0;
        const monthlyRate = interestRate / 100 / 12;

        // Safety break
        while (currentBalance > 0 && months < 360) { // Cap at 30 years
            const interest = currentBalance * monthlyRate;
            let principal = 0;

            if (isFixed) {
                principal = payment - interest;
            } else {
                // Minimum payment logic: usually max(5% of balance, 500tk)
                // If balance is low, minimum might clear it.
                // But typically min payment decreases as balance decreases, dragging it out forever.
                let calculatedMin = currentBalance * (minPaymentPercent / 100);
                if (calculatedMin < 500) calculatedMin = 500;
                // However, user usually pays a "Fixed" amount if they want to pay off.
                // If they pay ONLY minimum calculated each month, it takes forever.
                // Let's assume the user input 'monthlyPayment' is a FIXED amount they plan to pay.
                // The "Minimum Payment Trap" scenario is if they pay ONLY the dynamic minimum.

                // For this function, let's treat 'payment' as the FIXED amount strategy.
                // I will make a separate calculation for the "Minimum Payment Trap".
                principal = payment - interest;
            }

            if (principal <= 0) {
                // Interest covers payment, debt grows or stays same
                return { totalInterest: Infinity, months: Infinity };
            }

            // Payoff logic
            if (currentBalance < payment) {
                // Last month
                principal = currentBalance;
                totalInterest += interest; // Simplified (interest on remaining)
                currentBalance = 0;
            } else {
                totalInterest += interest;
                currentBalance -= principal;
            }
            months++;
        }
        return { totalInterest, months };
    };

    const calculateMinimumTrap = () => {
        let currentBalance = balance;
        let totalInterest = 0;
        let months = 0;
        const monthlyRate = interestRate / 100 / 12;

        while (currentBalance > 100 && months < 600) { // 50 years cap
            const interest = currentBalance * monthlyRate;
            let payment = currentBalance * (minPaymentPercent / 100);
            if (payment < 500) payment = 500; // Floor
            if (payment > currentBalance + interest) payment = currentBalance + interest;

            const principal = payment - interest;
            totalInterest += interest;
            currentBalance -= principal;
            months++;
        }
        return { totalInterest, months };
    };

    const fixedResults = calculatePayoff(monthlyPayment, true);
    const trapResults = calculateMinimumTrap();

    const isPaymentTooLow = (balance * (interestRate / 100 / 12)) >= monthlyPayment;

    return (
        <>
            <SEOHead
                title="ক্রেডিট কার্ডের ফাঁদ ক্যালকুলেটর | BankBujhi"
                description="মিনিমাম পেমেন্ট করলে কি হয়? ঋণের ফাঁদ থেকে বাঁচতে আমাদের ক্যালকুলেটর ব্যবহার করুন।"
                path="/tools/calculator"
            />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-4xl mx-auto w-full">
                    <PageBreadcrumb items={[{ label: "টুলস" }, { label: "কার্ড ক্যালকুলেটর" }]} className="mb-6" />

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black mb-3">ক্রেডিট কার্ড <span className="text-red-600">Cost & Trap</span> ক্যালকুলেটর</h1>
                        <p className="text-muted-foreground">
                            দেখুন "মিনিমাম পেমেন্ট" করলে কিভাবে আপনি ঋণের ফাঁদে আটকা পড়েন।
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inputs */}
                        <Card className="border-primary/10 shadow-md h-fit">
                            <CardHeader>
                                <CardTitle>আপনার ঋণের তথ্য</CardTitle>
                                <CardDescription>স্লাইডার ব্যবহার করে মান নির্ধারণ করুন</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Balance Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold flex justify-between">
                                        মোট বকেয়া (Outstanding)
                                        <span className="text-primary">{formatBDT(balance)}</span>
                                    </label>
                                    <Slider
                                        value={[balance]}
                                        max={500000}
                                        step={1000}
                                        onValueChange={(v) => setBalance(v[0])}
                                    />
                                    <Input
                                        type="number"
                                        value={balance}
                                        onChange={(e) => setBalance(Number(e.target.value))}
                                        className="mt-2 font-bold"
                                    />
                                </div>

                                {/* Interest Rate Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold flex justify-between">
                                        সুদের হার (Interest Rate)
                                        <span className="text-primary">{interestRate}%</span>
                                    </label>
                                    <Slider
                                        value={[interestRate]}
                                        max={30}
                                        step={0.5}
                                        onValueChange={(v) => setInterestRate(v[0])}
                                    />
                                    <p className="text-[10px] text-muted-foreground text-right">*বাংলাদেশে সাধারণত ২০%</p>
                                </div>

                                {/* Monthly Payment Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold flex justify-between">
                                        আপনি মাসে কত দিতে চান?
                                        <span className="text-primary">{formatBDT(monthlyPayment)}</span>
                                    </label>
                                    <Slider
                                        value={[monthlyPayment]}
                                        max={50000}
                                        step={500}
                                        onValueChange={(v) => setMonthlyPayment(v[0])}
                                    />
                                    <Input
                                        type="number"
                                        value={monthlyPayment}
                                        onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                                        className="mt-2 font-bold"
                                    />
                                    {isPaymentTooLow && (
                                        <p className="text-xs text-red-600 font-bold">
                                            Warning: এই টাকা সুদের চেয়েও কম! ঋণ বাড়তেই থাকবে।
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        <div className="space-y-6">
                            {/* Scenario 1: User's Plan */}
                            <Card className="bg-green-50/50 border-green-200">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <MaterialIcon name="check_circle" className="text-green-600" />
                                        আপনার প্ল্যান ({formatBDT(monthlyPayment)}/মাস)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm text-gray-600">সময় লাগবে:</span>
                                        <span className="text-2xl font-black text-gray-900">
                                            {fixedResults.months === Infinity ? "কখনোই না" :
                                                fixedResults.months < 12 ? `${fixedResults.months} মাস` :
                                                    `${Math.floor(fixedResults.months / 12)} বছর ${fixedResults.months % 12} মাস`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm text-gray-600">অতিরিক্ত সুদ:</span>
                                        <span className="text-xl font-bold text-orange-600">
                                            {fixedResults.totalInterest === Infinity ? "অসীম" : formatBDT(fixedResults.totalInterest)}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Scenario 2: The Trap */}
                            <Card className="bg-red-50 border-red-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 bg-red-600 text-white rounded-bl-xl text-[10px] font-bold uppercase tracking-wider">
                                    Bank's Trap
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg flex items-center gap-2 text-red-900">
                                        <MaterialIcon name="warning" className="text-red-600" />
                                        মিনিমাম পেমেন্ট ({minPaymentPercent}%) করলে?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm text-red-800">সময় লাগবে:</span>
                                        <span className="text-2xl font-black text-red-900">
                                            {trapResults.months >= 600 ? "৫০+ বছর (আজীবন!)" :
                                                `${Math.floor(trapResults.months / 12)} বছর ${trapResults.months % 12} মাস`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm text-red-800">অতিরিক্ত সুদ:</span>
                                        <span className="text-xl font-bold text-red-600">
                                            {formatBDT(trapResults.totalInterest)}
                                        </span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-red-200">
                                        <p className="text-xs text-red-800 leading-relaxed">
                                            <strong>সাবধান:</strong> ব্যাংক আপনাকে মিনিমাম পেমেন্ট করতে উৎসাহিত করে কারণ এতে আপনি আজীবন সুদ দিতে থাকবেন। সব সময় পুরো বিল শোধ করুন।
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" asChild>
                                <a href="/guides/credit-card-trap">ক্রেডিট কার্ডের ফাঁদ থেকে বাঁচার উপায় পড়ুন</a>
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default CreditCardCostCalculator;
