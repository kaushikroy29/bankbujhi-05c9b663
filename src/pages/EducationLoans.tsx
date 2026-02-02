import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import LoanOfferCard from "@/components/cards/LoanOfferCard";
import { fetchLoanProducts, fetchBanks, type LoanProduct, type Bank } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/seo/SEOHead";

const EducationLoans = () => {
    const [loans, setLoans] = useState<LoanProduct[]>([]);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);
    const [loanAmount, setLoanAmount] = useState([500000]);
    const [tenure, setTenure] = useState([4]);
    const [loanType, setLoanType] = useState("education");
    const [selectedBank, setSelectedBank] = useState("all");
    const [sortBy, setSortBy] = useState("interest");

    useEffect(() => {
        loadData();
    }, [loanType, selectedBank]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [loansData, banksData] = await Promise.all([
                fetchLoanProducts({
                    loanType: loanType,
                    bankId: selectedBank,
                }),
                fetchBanks(),
            ]);
            setLoans(loansData);
            setBanks(banksData);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateEMI = (rate?: number) => {
        const principal = loanAmount[0];
        const years = tenure[0];
        const avgRate = rate || (loans.length > 0
            ? loans.reduce((sum, l) => sum + (l.interest_rate_min || 9), 0) / loans.length
            : 9);
        const monthlyRate = avgRate / 100 / 12;
        const months = years * 12;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();
    const totalRepayment = emi * tenure[0] * 12;
    const totalInterest = totalRepayment - loanAmount[0];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };

    const sortedLoans = [...loans].sort((a, b) => {
        switch (sortBy) {
            case "interest":
                return (a.interest_rate_min || 0) - (b.interest_rate_min || 0);
            case "fee":
                return (parseFloat(a.processing_fee?.replace('%', '') || '0')) -
                    (parseFloat(b.processing_fee?.replace('%', '') || '0'));
            default:
                return 0;
        }
    });

    const transformLoan = (loan: LoanProduct, index: number) => ({
        id: loan.id,
        bank: loan.banks?.name || "Unknown Bank",
        bankCode: loan.banks?.swift_code?.substring(0, 4) || loan.banks?.name?.substring(0, 4).toUpperCase() || "BANK",
        interestRate: loan.interest_rate_min || 0,
        processingFee: loan.processing_fee || "0.5%",
        processingFeeNote: loan.max_amount || "Student friendly",
        totalRepayment: Math.round(loanAmount[0] * (1 + (loan.interest_rate_min || 9) / 100 * tenure[0])),
        badge: loan.badge || "Student Special",
        isPremium: !!loan.badge,
        bgColor: "bg-blue-600",
    });

    return (
        <>
            <SEOHead
                title="এডুকেশন লোন ক্যালকুলেটর | BankBujhi"
                description="উচ্চ শিক্ষার জন্য সেরা স্টুডেন্ট লোন খুঁজুন। ইএমআই (EMI) হিসাব করুন এবং আবেদন করুন।"
                image="https://bankbujhi.lovable.app/og/og-education.jpg"
                path="/education-loans"
            />
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                <Header />
                <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
                    <PageBreadcrumb items={[{ label: "এডুকেশন লোন" }]} className="mb-6" />

                    <div className="mb-6 sm:mb-10">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground">
                                এডুকেশন লোন <span className="text-primary">গাইড ও তুলনা</span>
                            </h1>
                            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
                                আপনার উচ্চ শিক্ষার স্বপ্ন পূরণে আমরা আছি পাশে। সেরা রেটে এডুকেশন লোন খুঁজুন।
                                <span className="hidden sm:block mt-1 font-bengali">
                                    দেশে বা বিদেশে উচ্চ শিক্ষার জন্য প্রয়োজনীয় লোন সহায়তা।
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Loan Type Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {["education", "study_abroad", "skill_dev"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setLoanType(type)}
                                aria-pressed={loanType === type}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${loanType === type
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card border border-primary/10 hover:bg-primary/5"
                                    }`}
                            >
                                {type === "education" ? "স্টুডেন্ট লোন" : type === "study_abroad" ? "বিদেশে উচ্চশিক্ষা" : "স্কিল ডেভেলপমেন্ট"}
                            </button>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            <div className="bg-card p-4 sm:p-8 rounded-xl border border-primary/10 shadow-sm">
                                <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
                                    <MaterialIcon name="school" className="text-primary" />
                                    লোন কনফিগার করুন
                                </h3>

                                <div className="mb-6">
                                    <label className="text-sm font-semibold mb-2 block">ব্যাংক অনুযায়ী ফিল্টার</label>
                                    <select
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                        className="w-full sm:w-auto bg-background border border-primary/10 rounded-lg px-3 py-2 text-sm"
                                    >
                                        <option value="all">সব ব্যাংক</option>
                                        {banks.map((bank) => (
                                            <option key={bank.id} value={bank.id}>{bank.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-8 sm:mb-12">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
                                        <label className="text-sm sm:text-base font-semibold">লোনের পরিমাণ (৳)</label>
                                        <div className="bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/30 self-start sm:self-auto">
                                            <span className="text-base sm:text-lg font-bold text-primary tracking-wide">
                                                ৳ {formatCurrency(loanAmount[0])}
                                            </span>
                                        </div>
                                    </div>
                                    <Slider
                                        value={loanAmount}
                                        onValueChange={setLoanAmount}
                                        min={50000}
                                        max={2000000}
                                        step={10000}
                                        className="w-full"
                                        aria-label="লোনের পরিমাণ"
                                    />
                                    <div className="flex justify-between mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium text-muted-foreground">
                                        <span>৳ ৫০,০০০</span>
                                        <span>৳ ২০,০০,০০০</span>
                                    </div>
                                </div>

                                <div className="mb-6 sm:mb-8">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
                                        <label className="text-sm sm:text-base font-semibold">মেয়াদ (বছর)</label>
                                        <div className="bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/30 self-start sm:self-auto">
                                            <span className="text-base sm:text-lg font-bold text-primary">{tenure[0]} বছর</span>
                                        </div>
                                    </div>
                                    <Slider
                                        value={tenure}
                                        onValueChange={setTenure}
                                        min={1}
                                        max={10}
                                        step={1}
                                        className="w-full"
                                        aria-label="লোনের মেয়াদ"
                                    />
                                    <div className="flex justify-between mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium text-muted-foreground">
                                        <span>১ বছর</span>
                                        <span>১০ বছর</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-card rounded-xl border-t-4 border-primary shadow-xl overflow-hidden lg:sticky lg:top-24">
                                <div className="p-4 sm:p-6 bg-primary/5 border-b border-primary/10">
                                    <h4 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                        মাসিক সম্ভাব্য কিস্তি (EMI)
                                    </h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-black text-foreground">৳ {formatCurrency(emi)}</span>
                                        <span className="text-xs sm:text-sm font-medium text-muted-foreground">/মাস</span>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">মোট প্রদেয় সুদ</span>
                                        <span className="font-bold">৳ {formatCurrency(totalInterest)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">মোট পরিশোধের পরিমাণ</span>
                                        <span className="font-bold">৳ {formatCurrency(totalRepayment)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-16">
                        <h3 className="text-xl sm:text-2xl font-bold mb-6">
                            আপনার জন্য স্টুডেন্ট লোন অফার
                            <span className="text-muted-foreground font-normal text-base ml-2">({loans.length}টি অপশন)</span>
                        </h3>

                        <div className="space-y-4">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="h-48 w-full rounded-xl" />
                                ))
                            ) : sortedLoans.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground bg-card rounded-xl border border-dashed border-primary/20">
                                    <MaterialIcon name="school" className="text-4xl mb-2 opacity-50" />
                                    <p>এই মুহূর্তে কোনো শিক্ষা ঋণের তথ্য পাওয়া যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন অথবা ব্যাংকের সাথে যোগাযোগ করুন।</p>
                                </div>
                            ) : (
                                sortedLoans.map((loan, index) => (
                                    <div key={loan.id} className="bg-card rounded-xl border border-primary/10 p-4 relative overflow-hidden">
                                        <LoanOfferCard offer={transformLoan(loan, index)} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </main>
                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default EducationLoans;
