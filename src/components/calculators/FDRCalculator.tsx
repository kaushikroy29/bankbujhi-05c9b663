import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatBDT } from "@/lib/utils/currency";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const FDRCalculator = () => {
    const [depositAmount, setDepositAmount] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(9.5);
    const [tenureMonths, setTenureMonths] = useState<number>(12);

    // Results
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [maturityAmount, setMaturityAmount] = useState<number>(0);

    const calculateFDR = () => {
        // Simple Interest Formula: I = P * r * t
        // P = Principal (depositAmount)
        // r = Annual Rate / 100
        // t = Time in years (tenureMonths / 12)

        const P = depositAmount;
        const r = interestRate / 100;
        const t = tenureMonths / 12;

        const interest = P * r * t;
        // In Bangladesh, there is usually 10-15% tax on interest, but we'll show gross for simplicity
        // or add a tax toggle later. For now, let's keep it gross.

        setTotalInterest(Math.round(interest));
        setMaturityAmount(Math.round(P + interest));
    };

    useEffect(() => {
        calculateFDR();
    }, [depositAmount, interestRate, tenureMonths]);

    return (
        <>
            <SEOHead
                title="FDR মুনাফা ক্যালকুলেটর"
                description="ফিক্সড ডিপোজিট (FDR) থেকে কত লাভ পাবেন? এখনই হিসাব করুন।"
                path="/calculator/fdr"
            />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
                    <PageBreadcrumb items={[{ label: "টুলস" }, { label: "FDR ক্যালকুলেটর" }]} className="mb-6" />

                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black mb-2 text-primary">FDR মুনাফা ক্যালকুলেটর</h1>
                            <p className="text-muted-foreground">আপনার জমানো টাকার মেয়াদ শেষে কত লাভ পাবেন তা দেখুন</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Inputs */}
                            <Card className="shadow-md border-primary/10">
                                <CardHeader>
                                    <CardTitle>তথ্য দিন</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Deposit Amount */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-bold text-muted-foreground">জমা টাকার পরিমাণ</label>
                                            <div className="relative w-36">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">৳</span>
                                                <Input
                                                    type="number"
                                                    value={depositAmount}
                                                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                                                    className="pl-8 text-right font-bold"
                                                />
                                            </div>
                                        </div>
                                        <Slider
                                            value={[depositAmount]}
                                            min={10000}
                                            max={5000000}
                                            step={5000}
                                            onValueChange={(vals) => setDepositAmount(vals[0])}
                                            className="py-2"
                                        />
                                        <p className="text-xs text-muted-foreground text-right">{formatBDT(depositAmount)}</p>
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
                                            max={15}
                                            step={0.25}
                                            onValueChange={(vals) => setInterestRate(vals[0])}
                                            className="py-2"
                                        />
                                    </div>

                                    {/* Tenure */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-bold text-muted-foreground">মেয়াদ (মাস)</label>
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
                                            {[3, 6, 12, 24, 60].map(month => (
                                                <Button
                                                    key={month}
                                                    variant={tenureMonths === month ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setTenureMonths(month)}
                                                    className="flex-1"
                                                >
                                                    {month < 12 ? `${month} মাস` : `${month / 12} বছর`}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Results */}
                            <Card className="bg-primary/5 border-primary/20 flex flex-col justify-center shadow-lg">
                                <CardContent className="pt-6 text-center space-y-8">
                                    <div>
                                        <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-2">মোট মুনাফা (Gross)</p>
                                        <h3 className="text-4xl font-black text-green-600 drop-shadow-sm">{formatBDT(totalInterest)}</h3>
                                        <p className="text-xs text-muted-foreground mt-2">* ট্যাক্স এবং চার্জ ব্যতীত</p>
                                    </div>

                                    <div className="border-t border-primary/10 pt-6">
                                        <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-2">মেয়াদ শেষে মোট পাবেন</p>
                                        <h3 className="text-3xl font-bold text-primary">{formatBDT(maturityAmount)}</h3>
                                    </div>

                                    <div className="pt-4">
                                        <Button className="w-full font-bold h-11" asChild>
                                            <a href="/savings">সেরা সেভিংস রেট দেখুন</a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </main>
                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default FDRCalculator;
