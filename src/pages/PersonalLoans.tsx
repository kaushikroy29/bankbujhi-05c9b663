import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        {/* Page Heading */}
        <div className="mb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground">
              Personal Loan <span className="text-primary">Comparison Tool</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Compare interest rates, calculate EMI, and apply for the best personal loans from top Bangladeshi banks instantly.
              <span className="block mt-1 font-bengali">
                বাংলাদেশের শীর্ষস্থানীয় ব্যাংকগুলো থেকে আপনার জন্য সেরা লোনটি বেছে নিন।
              </span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: Configuration (Inputs) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card p-8 rounded-xl border border-primary/10 shadow-sm">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <MaterialIcon name="tune" className="text-primary" />
                Configure Your Loan
              </h3>

              {/* Slider: Loan Amount */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <label className="text-base font-semibold">Loan Amount (৳)</label>
                  <div className="bg-primary/10 px-4 py-2 rounded-lg border border-primary/30">
                    <span className="text-lg font-bold text-primary tracking-wide">
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
                <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground">
                  <span>৳ 50,000</span>
                  <span>৳ 20,00,000</span>
                </div>
              </div>

              {/* Slider: Tenure */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <label className="text-base font-semibold">Tenure (Years)</label>
                  <div className="bg-primary/10 px-4 py-2 rounded-lg border border-primary/30">
                    <span className="text-lg font-bold text-primary">{tenure[0]} Years</span>
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
                <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground">
                  <span>1 Year</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dynamic EMI Box */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border-t-4 border-primary shadow-xl overflow-hidden sticky top-24">
              <div className="p-6 bg-primary/5 border-b border-primary/10">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">
                  Estimated Monthly EMI
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">৳ {formatCurrency(emi)}</span>
                  <span className="text-sm font-medium text-muted-foreground">/mo</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Interest Payable</span>
                  <span className="font-bold">৳ {formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Repayment</span>
                  <span className="font-bold">৳ {formatCurrency(totalRepayment)}</span>
                </div>
                <div className="pt-4 border-t border-dashed border-primary/10">
                  <div className="bg-accent/10 p-3 rounded flex items-start gap-2 border border-accent/20">
                    <MaterialIcon name="info" className="text-accent text-lg leading-none" />
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      Calculations based on an average interest rate of 12%. Final rates may vary by bank.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-bold">Top Offers for You</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <select className="bg-card border border-primary/10 rounded-lg text-sm px-4 py-2 focus:ring-primary">
                <option>Lowest Interest Rate</option>
                <option>Lowest Processing Fee</option>
                <option>Quickest Approval</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
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
        </div>

        {/* Footer Help */}
        <div className="mt-20 py-12 border-t border-primary/10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h5 className="text-xl font-bold mb-4">Confused about which loan to pick?</h5>
              <p className="text-muted-foreground mb-6">
                Our financial advisors are here to help you navigate the best rates and terms for your specific needs.
              </p>
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                Talk to an Advisor <MaterialIcon name="arrow_forward" />
              </button>
            </div>
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary p-2 rounded-full">
                  <MaterialIcon name="verified_user" className="text-primary-foreground" />
                </div>
                <h6 className="font-bold">BankBujhi Verified</h6>
              </div>
              <p className="text-xs text-muted-foreground italic">
                All rates and fees displayed are updated daily from official bank communications. We provide 
                transparent comparisons to help you make informed decisions. No hidden charges from BankBujhi.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PersonalLoans;
