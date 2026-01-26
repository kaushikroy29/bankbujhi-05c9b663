import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import LoanOfferCard from "@/components/cards/LoanOfferCard";
import { fetchLoanProducts, fetchBanks, type LoanProduct, type Bank } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";

const PersonalLoans = () => {
  const [loans, setLoans] = useState<LoanProduct[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [loanAmount, setLoanAmount] = useState([1200000]);
  const [tenure, setTenure] = useState([3]);
  const [loanType, setLoanType] = useState("personal");
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

  // EMI calculation
  const calculateEMI = (rate?: number) => {
    const principal = loanAmount[0];
    const years = tenure[0];
    const avgRate = rate || (loans.length > 0 
      ? loans.reduce((sum, l) => sum + (l.interest_rate_min || 12), 0) / loans.length
      : 12);
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

  // Sort loans
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

  // Transform data for LoanOfferCard
  const transformLoan = (loan: LoanProduct, index: number) => ({
    id: index + 1,
    bank: loan.banks?.name || "Unknown Bank",
    bankCode: loan.banks?.swift_code?.substring(0, 4) || loan.banks?.name?.substring(0, 4).toUpperCase() || "BANK",
    interestRate: loan.interest_rate_min || 0,
    processingFee: loan.processing_fee || "1%",
    processingFeeNote: loan.max_amount || "",
    totalRepayment: Math.round(loanAmount[0] * (1 + (loan.interest_rate_min || 12) / 100 * tenure[0])),
    badge: loan.badge || (loan.features?.[0] || ""),
    isPremium: !!loan.badge,
    bgColor: "bg-primary",
  });

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Page Heading */}
        <div className="mb-6 sm:mb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground">
              Personal Loan <span className="text-primary">Comparison Tool</span>
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
              Compare interest rates, calculate EMI, and apply for the best personal loans from top Bangladeshi banks instantly.
              <span className="hidden sm:block mt-1 font-bengali">
                বাংলাদেশের শীর্ষস্থানীয় ব্যাংকগুলো থেকে আপনার জন্য সেরা লোনটি বেছে নিন।
              </span>
            </p>
          </div>
        </div>

        {/* Loan Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["personal", "home", "auto"].map((type) => (
            <button
              key={type}
              onClick={() => setLoanType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                loanType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-primary/10 hover:bg-primary/5"
              }`}
            >
              {type === "personal" ? "Personal Loans" : type === "home" ? "Home Loans" : "Auto Loans"}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Left: Configuration (Inputs) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-card p-4 sm:p-8 rounded-xl border border-primary/10 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
                <MaterialIcon name="tune" className="text-primary" />
                Configure Your Loan
              </h3>

              {/* Bank Filter */}
              <div className="mb-6">
                <label className="text-sm font-semibold mb-2 block">Filter by Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full sm:w-auto bg-background border border-primary/10 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Banks</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                  ))}
                </select>
              </div>

              {/* Slider: Loan Amount */}
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
                  <label className="text-sm sm:text-base font-semibold">Loan Amount (৳)</label>
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
                  max={loanType === "home" ? 20000000 : 2000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium text-muted-foreground">
                  <span>৳ 50,000</span>
                  <span>৳ {loanType === "home" ? "2,00,00,000" : "20,00,000"}</span>
                </div>
              </div>

              {/* Slider: Tenure */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
                  <label className="text-sm sm:text-base font-semibold">Tenure (Years)</label>
                  <div className="bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/30 self-start sm:self-auto">
                    <span className="text-base sm:text-lg font-bold text-primary">{tenure[0]} Years</span>
                  </div>
                </div>
                <Slider
                  value={tenure}
                  onValueChange={setTenure}
                  min={1}
                  max={loanType === "home" ? 25 : 5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium text-muted-foreground">
                  <span>1 Year</span>
                  <span>{loanType === "home" ? "25" : "5"} Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dynamic EMI Box */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border-t-4 border-primary shadow-xl overflow-hidden lg:sticky lg:top-24">
              <div className="p-4 sm:p-6 bg-primary/5 border-b border-primary/10">
                <h4 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">
                  Estimated Monthly EMI
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-foreground">৳ {formatCurrency(emi)}</span>
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">/mo</span>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Interest Payable</span>
                  <span className="font-bold">৳ {formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Repayment</span>
                  <span className="font-bold">৳ {formatCurrency(totalRepayment)}</span>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-dashed border-primary/10">
                  <div className="bg-accent/10 p-2.5 sm:p-3 rounded flex items-start gap-2 border border-accent/20">
                    <MaterialIcon name="info" className="text-accent text-base sm:text-lg leading-none shrink-0" />
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-tight">
                      Based on average rate. Final rates may vary by bank.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="mt-10 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold">
              Top Offers for You 
              <span className="text-muted-foreground font-normal text-base ml-2">({loans.length} options)</span>
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card border border-primary/10 rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2 focus:ring-primary"
              >
                <option value="interest">Lowest Interest Rate</option>
                <option value="fee">Lowest Processing Fee</option>
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 pb-2">Bank Partner</th>
                  <th className="px-6 pb-2">Interest Rate</th>
                  <th className="px-6 pb-2">Processing Fee</th>
                  <th className="px-6 pb-2">Max Amount</th>
                  <th className="px-6 pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="p-2">
                        <Skeleton className="h-20 w-full rounded-xl" />
                      </td>
                    </tr>
                  ))
                ) : sortedLoans.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No loan products found for selected filters
                    </td>
                  </tr>
                ) : (
                  sortedLoans.map((loan, index) => (
                    <LoanOfferCard key={loan.id} offer={transformLoan(loan, index)} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))
            ) : sortedLoans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No loan products found for selected filters
              </div>
            ) : (
              sortedLoans.map((loan, index) => {
                const offer = transformLoan(loan, index);
                return (
                  <div 
                    key={loan.id}
                    className={`bg-card rounded-xl border ${offer.isPremium ? 'border-accent' : 'border-primary/10'} p-4 relative overflow-hidden`}
                  >
                    {offer.isPremium && (
                      <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl">
                        Premium Choice
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${offer.bgColor} rounded-xl flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{offer.bankCode}</span>
                      </div>
                      <div>
                        <h4 className="font-bold">{offer.bank}</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{offer.badge}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <span className="text-xs text-muted-foreground block">Interest Rate</span>
                        <span className="text-lg font-bold text-primary">{offer.interestRate}%</span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block">Processing Fee</span>
                        <span className="text-lg font-bold">{offer.processingFee}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                      <div>
                        <span className="text-xs text-muted-foreground block">Max Amount</span>
                        <span className="font-bold">{loan.max_amount}</span>
                      </div>
                      <Button size="sm" className="h-9">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-12 sm:mt-20 py-8 sm:py-12 border-t border-primary/10">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h5 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Confused about which loan to pick?</h5>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Our financial advisors are here to help you navigate the best rates and terms for your specific needs.
              </p>
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm sm:text-base">
                Talk to an Advisor <MaterialIcon name="arrow_forward" />
              </button>
            </div>
            <div className="bg-primary/5 p-4 sm:p-6 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="bg-primary p-2 rounded-full shrink-0">
                  <MaterialIcon name="verified_user" className="text-primary-foreground text-lg sm:text-xl" />
                </div>
                <h6 className="font-bold text-sm sm:text-base">BankBujhi Verified</h6>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground italic">
                All rates and fees displayed are updated from official bank communications. We provide 
                transparent comparisons to help you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default PersonalLoans;
