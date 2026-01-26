import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import LoanOfferCard from "@/components/cards/LoanOfferCard";

const loanOffers = [
  {
    id: 1,
    bank: "Eastern Bank",
    bankCode: "EBL",
    interestRate: 11.5,
    processingFee: "0.5%",
    processingFeeNote: "Min ৳2,000",
    totalRepayment: 1428400,
    badge: "Quick Approval",
    isPremium: false,
    bgColor: "bg-blue-900",
  },
  {
    id: 2,
    bank: "Mutual Trust Bank",
    bankCode: "MTB",
    interestRate: 10.99,
    processingFee: "0.25%",
    processingFeeNote: "Promotion Offer",
    totalRepayment: 1412200,
    badge: "Low Processing Fee",
    isPremium: true,
    bgColor: "bg-red-800",
  },
  {
    id: 3,
    bank: "City Bank",
    bankCode: "City",
    interestRate: 12.2,
    processingFee: "1.0%",
    processingFeeNote: "Standard Fee",
    totalRepayment: 1448900,
    badge: "Paperless",
    isPremium: false,
    bgColor: "bg-green-800",
  },
];

const PersonalLoans = () => {
  const [loanAmount, setLoanAmount] = useState([1200000]);
  const [tenure, setTenure] = useState([3]);

  // EMI calculation based on 12% average interest rate
  const calculateEMI = () => {
    const principal = loanAmount[0];
    const years = tenure[0];
    const monthlyRate = 12 / 100 / 12;
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

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Left: Configuration (Inputs) */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-card p-4 sm:p-8 rounded-xl border border-primary/10 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
                <MaterialIcon name="tune" className="text-primary" />
                Configure Your Loan
              </h3>

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
                  max={2000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium text-muted-foreground">
                  <span>৳ 50,000</span>
                  <span>৳ 20,00,000</span>
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
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-3 sm:mt-4 text-[10px] sm:text-xs font-medium text-muted-foreground">
                  <span>1 Year</span>
                  <span>5 Years</span>
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
                      Calculations based on an average interest rate of 12%. Final rates may vary by bank.
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
            <h3 className="text-xl sm:text-2xl font-bold">Top Offers for You</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">Sort by:</span>
              <select className="bg-card border border-primary/10 rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2 focus:ring-primary">
                <option>Lowest Interest Rate</option>
                <option>Lowest Processing Fee</option>
                <option>Quickest Approval</option>
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
                  <th className="px-6 pb-2">Total Repayment</th>
                  <th className="px-6 pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {loanOffers.map((offer) => (
                  <LoanOfferCard key={offer.id} offer={offer} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {loanOffers.map((offer) => (
              <div 
                key={offer.id}
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
                    <span className="text-xs text-muted-foreground block">Total Repayment</span>
                    <span className="font-bold">৳ {formatCurrency(offer.totalRepayment)}</span>
                  </div>
                  <Button size="sm" className="h-9">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
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
                All rates and fees displayed are updated daily from official bank communications. We provide 
                transparent comparisons to help you make informed decisions. No hidden charges from BankBujhi.
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
