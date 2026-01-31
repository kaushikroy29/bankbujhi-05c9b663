import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const CreditCardCostCalculator = () => {
    const [balance, setBalance] = useState<number>(50000);
    const [interestRate, setInterestRate] = useState<number>(20); // Standard 20% in BD
    const [monthlyPayment, setMonthlyPayment] = useState<number>(2500); // 5% minimum usually

    const calculatePayoff = () => {
        let currentBalance = balance;
        let totalInterest = 0;
        let months = 0;
        const monthlyRate = interestRate / 100 / 12;

        // Safety break to prevent infinite loops for too low payments
        while (currentBalance > 0 && months < 360) {
            const interest = currentBalance * monthlyRate;
            totalInterest += interest;
            const principal = monthlyPayment - interest;
            currentBalance -= principal;
            months++;
        }

        return { totalInterest, months };
    };

    const results = calculatePayoff();
    const isPaymentTooLow = (balance * (interestRate / 100 / 12)) >= monthlyPayment;

    return (
        <>
            <SEOHead
                title="ক্রেডিট কার্ড বিল ক্যালকুলেটর"
                description="আপনার ঋণের ওপর কত সুদ দিতে হবে তা হিসাব করুন।"
                path="/tools/calculator"
            />
            <div>
                {/* Note: Header/Footer handled by Parent Route or Layout usually, but included here for standalone if needed */}
                <Header />
                <main className="container-padding py-8 max-w-4xl mx-auto w-full min-h-[calc(100vh-300px)]">
                    <PageBreadcrumb items={[{ label: "টুলস" }, { label: "ক্যালকুলেটর" }]} className="mb-6" />

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-black mb-3">কার্ড বিল ও সুদ ক্যালকুলেটর</h1>
                        <p className="text-muted-foreground">
                            আপনার বকেয়া বিল পরিশোধ করতে কত সময় লাগবে এবং কত টাকা সুদ দিতে হবে তা দেখুন।
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-primary/10 shadow-md">
                            <CardHeader>
                                <CardTitle>আপনার তথ্য দিন</CardTitle>
                                <CardDescription>নিচের স্লাইডার ব্যবহার করে মান নির্ধারণ করুন</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Balance Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold flex justify-between">
                                        মোট বকেয়া (Outstanding)
                                        <span className="text-primary">৳{balance.toLocaleString()}</span>
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
                                        className="mt-2"
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
                                </div>

                                {/* Monthly Payment Input */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold flex justify-between">
                                        মাসিক পরিশোধ (Monthly Payment)
                                        <span className="text-primary">৳{monthlyPayment.toLocaleString()}</span>
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
                                        className="mt-2"
                                    />
                                </div>

                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5 border-primary/20 flex flex-col justify-center">
                            <CardContent className="pt-6 text-center space-y-6">

                                {isPaymentTooLow ? (
                                    <div className="p-4 bg-red-100 text-red-700 rounded-xl">
                                        <MaterialIcon name="warning" className="text-2xl mb-2" />
                                        <p className="font-bold">সতর্কতা!</p>
                                        <p className="text-sm">আপনার মাসিক পেমেন্ট সুদের হারের চেয়ে কম। এই হারে ঋণ কখনই শোধ হবে না। পেমেন্ট বাড়ান।</p>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-1">পরিশোধ করতে সময় লাগবে</p>
                                            <p className="text-4xl font-black text-primary">
                                                {Math.floor(results.months / 12)} বছর {results.months % 12} মাস
                                            </p>
                                        </div>

                                        <div className="border-t border-primary/10 pt-6">
                                            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-1">মোট সুদ দিতে হবে</p>
                                            <p className="text-3xl font-bold text-orange-600">
                                                ৳{Math.round(results.totalInterest).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                মূল ঋণের অতিরিক্ত খরচ
                                            </p>
                                        </div>

                                        <div className="border-t border-primary/10 pt-6">
                                            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-1">মোট পরিশোধ</p>
                                            <p className="text-2xl font-bold">
                                                ৳{Math.round(balance + results.totalInterest).toLocaleString()}
                                            </p>
                                        </div>
                                    </>
                                )}

                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default CreditCardCostCalculator;
