import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBDT } from "@/lib/utils/currency";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const FDRCalculator = () => {
    const [depositAmount, setDepositAmount] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(9.5);
    const [tenureMonths, setTenureMonths] = useState<number>(12);
    const [taxRate, setTaxRate] = useState<number>(15);
    const [inflationRate, setInflationRate] = useState<number>(9.0);
    const [showRealReturn, setShowRealReturn] = useState<boolean>(true);

    // Results
    const [grossInterest, setGrossInterest] = useState<number>(0);
    const [netInterest, setNetInterest] = useState<number>(0);
    const [realReturn, setRealReturn] = useState<number>(0);
    const [maturityAmount, setMaturityAmount] = useState<number>(0);

    const calculateFDR = () => {
        // 1. Gross Interest (Simple)
        const P = depositAmount;
        const r = interestRate / 100;
        const t = tenureMonths / 12;
        const gross = P * r * t;

        // 2. Net Interest (After Tax)
        const tax = gross * (taxRate / 100);
        const net = gross - tax;

        // 3. Real Return (After Inflation)
        // Inflation eats into the Purchasing Power of the Principal + Net Interest
        // Future Value of Money logic: What is (P + Net) worth in today's money?
        // Or simpler: Real Return = Net Interest - (Principal * Inflation Rate * t)
        const inflationLoss = P * (inflationRate / 100) * t;
        const real = net - inflationLoss;

        setGrossInterest(Math.round(gross));
        setNetInterest(Math.round(net));
        setRealReturn(Math.round(real));
        setMaturityAmount(Math.round(P + net));
    };

    useEffect(() => {
        calculateFDR();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depositAmount, interestRate, tenureMonths, taxRate, inflationRate]);

    return (
        <>
            <SEOHead
                title="FDR রিয়েল রিটার্ন ক্যালকুলেটর | BankBujhi"
                description="ইনফ্লেশন এবং ট্যাক্স বাদ দেওয়ার পর আপনার FDR এর আসল লাভ কত? আমাদের ট্রু কস্ট ক্যালকুলেটরে দেখুন।"
                path="/calculator/fdr"
            />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
                    <PageBreadcrumb items={[{ label: "টুলস" }, { label: "FDR ক্যালকুলেটর" }]} className="mb-6" />

                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black mb-2 text-primary">FDR রিয়েল রিটার্ন ক্যালকুলেটর</h1>
                            <p className="text-muted-foreground">ব্যাংক যে লাভ দেখায় আর আপনি যা পান - তার আসল পার্থক্য দেখুন</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Inputs */}
                            <Card className="shadow-md border-primary/10">
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>তথ্য দিন</CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="real-mode" checked={showRealReturn} onCheckedChange={setShowRealReturn} />
                                            <Label htmlFor="real-mode" className="text-xs font-bold text-primary cursor-pointer">
                                                Advanced Mode
                                            </Label>
                                        </div>
                                    </div>
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
                                            <label className="text-sm font-bold text-muted-foreground">সুদের হার (% p.a.)</label>
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
                                            {[12, 24, 36, 60].map(month => (
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

                                    {/* Advanced Inputs: Tax & Inflation */}
                                    {showRealReturn && (
                                        <div className="pt-4 border-t border-dashed space-y-5 bg-slate-50 p-4 rounded-lg">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                                                        <MaterialIcon name="gavel" className="text-xs" />
                                                        সরকারি ট্যাক্স (AIT)
                                                    </label>
                                                    <select
                                                        className="text-xs border rounded px-2 py-1 bg-white"
                                                        value={taxRate}
                                                        onChange={(e) => setTaxRate(Number(e.target.value))}
                                                    >
                                                        <option value={10}>10% (TIN আছে)</option>
                                                        <option value={15}>15% (TIN নেই)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <label className="text-xs font-bold text-red-600 flex items-center gap-1">
                                                        <MaterialIcon name="trending_up" className="text-xs" />
                                                        মুদ্রাস্ফীতি (Inflation)
                                                    </label>
                                                    <div className="relative w-20">
                                                        <Input
                                                            type="number"
                                                            value={inflationRate}
                                                            onChange={(e) => setInflationRate(Number(e.target.value))}
                                                            className="h-8 pr-5 text-right font-bold text-xs"
                                                        />
                                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
                                                    </div>
                                                </div>
                                                <Slider
                                                    value={[inflationRate]}
                                                    min={0}
                                                    max={15}
                                                    step={0.5}
                                                    onValueChange={(vals) => setInflationRate(vals[0])}
                                                    className="py-1"
                                                />
                                                <p className="text-[10px] text-muted-foreground text-right">গড় মূল্যস্ফীতি ~9%</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Results */}
                            <Card className="bg-white shadow-lg border-primary/20 flex flex-col h-full overflow-hidden">
                                <div className="bg-slate-900 text-white p-4">
                                    <p className="text-xs uppercase tracking-wider opacity-80 mb-1 font-medium">মেয়াদ শেষে মোট পাবেন (Tax বাদে)</p>
                                    <h3 className="text-2xl font-bold">{formatBDT(maturityAmount)}</h3>
                                </div>
                                <CardContent className="pt-6 space-y-6 flex-1">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm border-b pb-2">
                                            <span className="text-muted-foreground">মোট সুদ (Gross Interest)</span>
                                            <span className="font-bold text-slate-700">{formatBDT(grossInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b pb-2">
                                            <span className="text-muted-foreground">ট্যাক্স কেটে রাখা হবে ({taxRate}%)</span>
                                            <span className="font-bold text-red-500">-{formatBDT(grossInterest - netInterest)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm pb-2 bg-green-50 p-2 rounded">
                                            <span className="font-bold text-green-700">নীট লাভ (Net Profit)</span>
                                            <span className="font-bold text-green-700">{formatBDT(netInterest)}</span>
                                        </div>
                                    </div>

                                    {showRealReturn && (
                                        <div className={`mt-6 p-4 rounded-xl border-2 ${realReturn >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
                                            <h4 className="text-center font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
                                                <MaterialIcon name="visibility" />
                                                আসল সত্য (Real Return)
                                            </h4>

                                            <div className="flex justify-between items-center text-sm mb-2">
                                                <span className="text-slate-600">মুদ্রাস্ফীতির কারণে ক্ষতি ({inflationRate}%)</span>
                                                <span className="font-bold text-red-600">-{formatBDT(depositAmount * (inflationRate / 100) * (tenureMonths / 12))}</span>
                                            </div>

                                            <div className="h-px bg-slate-200 my-3"></div>

                                            <div className="text-center">
                                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">প্রকৃত লাভ/ক্ষতি</p>
                                                <p className={`text-3xl font-black ${realReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                    {realReturn >= 0 ? "+" : ""}{formatBDT(realReturn)}
                                                </p>
                                                <p className="text-xs mt-2 leading-relaxed">
                                                    {realReturn < 0
                                                        ? `সাবধান! আপনি আসলে ${formatBDT(Math.abs(realReturn))} মূল্য হারাচ্ছেন। ব্যাংকের সুদের হার (${interestRate}%) মুদ্রাস্ফীতির (${inflationRate}%) চেয়ে কম।`
                                                        : `অভিনন্দন! আপনি মুদ্রাস্ফীতিকে হারিয়ে ${formatBDT(realReturn)} লাভ করছেন।`}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 mt-auto">
                                        <Button className="w-full font-bold h-11" asChild>
                                            <a href="/savings">সেরা রেট কোথায় পাবেন দেখুন</a>
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
