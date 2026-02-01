import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { cn } from "@/lib/utils";
import { fetchLoanProduct, type LoanProduct } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import WatchlistButton from "@/components/ui/WatchlistButton";
import SEOHead from "@/components/seo/SEOHead";
import SocialShare from "@/components/ui/SocialShare";
import SafeApplyGate from "@/components/cards/SafeApplyGate"; // Reusing SafeApplyGate, explicitly compatible with logic
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

const LoanDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [loan, setLoan] = useState<LoanProduct | null>(null);
    const [loading, setLoading] = useState(true);

    // Calculator State
    const [amount, setAmount] = useState([500000]);
    const [tenure, setTenure] = useState([3]); // years

    useEffect(() => {
        if (id) {
            loadLoan();
        }
    }, [id]);

    const loadLoan = async () => {
        setLoading(true);
        try {
            const data = await fetchLoanProduct(id!);
            setLoan(data);
        } catch (error) {
            console.error("Error loading loan:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 pb-20 md:pb-0 container mx-auto px-4 py-10">
                    <Skeleton className="h-8 w-64 mb-4" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </main>
                <Footer />
                <BottomNav />
            </div>
        );
    }

    if (!loan) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                        <MaterialIcon name="error" className="text-6xl text-muted-foreground mb-4" />
                        <h1 className="text-2xl font-bold mb-2">লোন পাওয়া যায়নি</h1>
                        <Link to="/loans"><Button>সব লোন দেখুন</Button></Link>
                    </div>
                </main>
                <Footer />
                <BottomNav />
            </div>
        );
    }

    // Calculations
    const interestRate = loan.interest_rate_min || 12;
    const processingFeeRate = parseFloat(loan.processing_fee?.replace('%', '') || '0.5'); // Default 0.5% if parsing fails
    const processingFee = (amount[0] * processingFeeRate) / 100;

    const monthlyRate = interestRate / 100 / 12;
    const months = tenure[0] * 12;
    const emi = (amount[0] * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalRepayment = emi * months;
    const totalInterest = totalRepayment - amount[0];
    const trueCost = totalInterest + processingFee;

    const bankName = loan.banks?.name || "Unknown Bank";

    return (
        <>
            <SEOHead
                title={`${loan.name} | BankBujhi`}
                description={`${bankName}-এর ${loan.name} সম্পর্কে বিস্তারিত জানুন। সুদের হার ও প্রকৃত খরচ।`}
                path={`/loans/${id}`}
            />
            <div className="min-h-screen bg-background flex flex-col">
                <Header />

                <main className="flex-1 pb-20 md:pb-0">
                    {/* Hero */}
                    <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
                        <div className="container mx-auto px-4 py-6 md:py-10">
                            <PageBreadcrumb items={[{ label: "লোন", href: "/loans" }, { label: loan.name }]} className="mb-6" />

                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-bold text-muted-foreground">{bankName}</span>
                                        {loan.badge && <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded">{loan.badge}</span>}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-black mb-2">{loan.name}</h1>
                                    <p className="text-muted-foreground mb-6">{loan.loan_type === 'personal' ? 'পার্সোনাল লোন' : 'লোন'}</p>

                                    <div className="flex flex-wrap gap-4 mb-6">
                                        <div className="bg-background p-4 rounded-xl border shadow-sm text-center min-w-[120px]">
                                            <p className="text-xs text-muted-foreground">সুদের হার</p>
                                            <p className="text-xl font-black text-primary">{loan.interest_rate_min}%</p>
                                        </div>
                                        <div className="bg-background p-4 rounded-xl border shadow-sm text-center min-w-[120px]">
                                            <p className="text-xs text-muted-foreground">প্রসেসিং ফি</p>
                                            <p className="text-xl font-black">{loan.processing_fee || "N/A"}</p>
                                        </div>
                                        <div className="bg-background p-4 rounded-xl border shadow-sm text-center min-w-[120px]">
                                            <p className="text-xs text-muted-foreground">সর্বোচ্চ পরিমাণ</p>
                                            <p className="text-lg font-black">{loan.max_amount || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button size="lg" className="font-bold" onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}>
                                            বিস্তারিত ও খরচ দেখুন
                                        </Button>
                                        <WatchlistButton productType="loan" productId={loan.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl" id="details">

                        {/* TRUE COST CALCULATOR SPECIFIC TO THIS LOAN */}
                        <section className="scroll-mt-20">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Inputs */}
                                <Card className="border-primary/10">
                                    <CardContent className="p-6 space-y-6">
                                        <h2 className="font-bold text-xl flex items-center gap-2">
                                            <MaterialIcon name="calculate" className="text-primary" />
                                            আপনার খরচ হিসাব করুন
                                        </h2>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-semibold">লোনের পরিমাণ</label>
                                                    <span className="font-bold text-primary">৳ {amount[0].toLocaleString()}</span>
                                                </div>
                                                <Slider value={amount} onValueChange={setAmount} min={50000} max={2000000} step={10000} />
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-semibold">মেয়াদ (বছর)</label>
                                                    <span className="font-bold text-primary">{tenure[0]} বছর</span>
                                                </div>
                                                <Slider value={tenure} onValueChange={setTenure} min={1} max={5} step={1} />
                                            </div>

                                            <div className="pt-4 border-t space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">মাসিক কিস্তি (EMI)</span>
                                                    <span className="font-black text-lg">৳ {Math.round(emi).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">প্রসেসিং ফি ({loan.processing_fee})</span>
                                                    <span>৳ {Math.round(processingFee).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Visualization */}
                                <Card className={cn("border-l-4", trueCost > amount[0] * 0.5 ? "border-l-red-500 bg-red-50/10" : "border-l-primary")}>
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-lg mb-4">প্রকৃত খরচের বিশ্লেষণ (True Cost)</h3>

                                        <div className="relative pt-6 pb-2">
                                            {/* Bar Chart */}
                                            <div className="h-8 w-full bg-gray-200 rounded-full flex overflow-hidden">
                                                <div className="bg-green-500 h-full flex items-center justify-center text-[10px] text-white font-bold" style={{ width: `${(amount[0] / (totalRepayment + processingFee)) * 100}%` }}>
                                                    আসল {Math.round((amount[0] / (totalRepayment + processingFee)) * 100)}%
                                                </div>
                                                <div className="bg-red-400 h-full flex items-center justify-center text-[10px] text-white font-bold" style={{ width: `${(totalInterest / (totalRepayment + processingFee)) * 100}%` }}>
                                                    সুদ
                                                </div>
                                                <div className="bg-orange-500 h-full" style={{ width: `${(processingFee / (totalRepayment + processingFee)) * 100}%` }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                                                <span>আপনার লোন</span>
                                                <span>মোট পরিশোধ</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-3">
                                            <div className="flex justify-between items-center bg-white p-3 rounded border">
                                                <span className="text-sm">লোন নিচ্ছেন</span>
                                                <span className="font-bold">৳ {amount[0].toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-red-50 p-3 rounded border border-red-100">
                                                <span className="text-sm text-red-800">অতিরিক্ত খরচ (সুদ + ফি)</span>
                                                <span className="font-bold text-red-900">+ ৳ {Math.round(trueCost).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-slate-100 p-3 rounded font-bold">
                                                <span>মোট পরিশোধ করতে হবে</span>
                                                <span>৳ {Math.round(totalRepayment + processingFee).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {trueCost > amount[0] * 0.5 && (
                                            <div className="mt-4 flex items-start gap-2 text-xs text-red-700 bg-red-100 p-2 rounded">
                                                <MaterialIcon name="warning" className="text-sm" />
                                                সাবধান: আপনি যা নিচ্ছেন, তার ৫০% এর বেশি অতিরিক্ত ফেরত দিচ্ছেন। মেয়াদ কমানোর চেষ্টা করুন।
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Features */}
                        {loan.features && (
                            <section>
                                <h2 className="font-bold text-xl mb-4">বৈশিষ্ট্যসমূহ</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {loan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-card border rounded-lg">
                                            <MaterialIcon name="check_circle" className="text-primary" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Application */}
                        <section className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
                            <h3 className="font-bold text-lg mb-2">এই লোনটি নিতে চান?</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                আবেদনের আগে ব্যাংকের সাথে কথা বলে বর্তমান রেট জেনে নিন।
                            </p>

                            {/* Using SafeApplyGate for safety checklist */}
                            {loan.apply_url ? (
                                <SafeApplyGate product={loan}>
                                    <Button size="lg" className="font-bold bg-green-600 hover:bg-green-700">
                                        <MaterialIcon name="open_in_new" className="text-lg mr-1" />
                                        ব্যাংকের সাইটে যান
                                    </Button>
                                </SafeApplyGate>
                            ) : (
                                <Button size="lg" className="font-bold" onClick={() => window.location.href = '/contact'}>
                                    <MaterialIcon name="call" className="text-lg mr-1" />
                                    যোগাযোগ করুন
                                </Button>
                            )}
                        </section>

                    </div>
                </main>
                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default LoanDetails;
