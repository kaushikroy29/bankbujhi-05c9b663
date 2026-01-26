import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavingsRateCard from "@/components/cards/SavingsRateCard";

const fdrRates = [
  {
    id: 1,
    bank: "City Bank",
    bankCode: "City",
    interestRate: 9.5,
    compounding: "At Maturity",
    taxAdjusted: 8.55,
    bgColor: "bg-green-800",
  },
  {
    id: 2,
    bank: "BRAC Bank",
    bankCode: "BRAC",
    interestRate: 8.75,
    compounding: "Monthly",
    taxAdjusted: 7.87,
    bgColor: "bg-red-700",
  },
  {
    id: 3,
    bank: "IDLC Finance",
    bankCode: "IDLC",
    interestRate: 8.25,
    compounding: "Quarterly",
    taxAdjusted: 7.42,
    bgColor: "bg-blue-800",
  },
  {
    id: 4,
    bank: "Eastern Bank",
    bankCode: "EBL",
    interestRate: 8.0,
    compounding: "At Maturity",
    taxAdjusted: 7.2,
    bgColor: "bg-blue-900",
  },
];

const highInterestRates = [
  {
    id: 1,
    bank: "Standard Chartered",
    bankCode: "SCB",
    interestRate: 6.5,
    compounding: "Monthly",
    taxAdjusted: 5.85,
    bgColor: "bg-teal-700",
  },
  {
    id: 2,
    bank: "Dutch Bangla Bank",
    bankCode: "DBBL",
    interestRate: 6.25,
    compounding: "Quarterly",
    taxAdjusted: 5.62,
    bgColor: "bg-orange-700",
  },
];

const FDRSavings = () => {
  const [depositAmount, setDepositAmount] = useState([100000]);
  const [duration, setDuration] = useState([1]);
  const [activeTab, setActiveTab] = useState("fdr");

  // Calculate estimated interest (8.5% average, 10% tax)
  const calculateInterest = () => {
    const principal = depositAmount[0];
    const years = duration[0];
    const rate = 0.085;
    const grossInterest = principal * rate * years;
    const netInterest = grossInterest * 0.9; // 10% tax
    return Math.round(netInterest);
  };

  const interest = calculateInterest();
  const maturityAmount = depositAmount[0] + interest;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-2">
            Fixed Deposit & Savings <span className="text-primary">Comparison Tool</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find the best interest rates from top Bangladeshi banks and calculate your maturity returns instantly.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-card border border-primary/10">
            <TabsTrigger value="fdr" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Fixed Deposits (FDR)
            </TabsTrigger>
            <TabsTrigger value="savings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              High-Interest Savings
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: Calculator */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl border border-primary/10 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <MaterialIcon name="calculate" className="text-primary" />
                Investment Calculator
              </h3>

              {/* Deposit Amount */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Deposit Amount (BDT)
                  </label>
                  <div className="bg-primary/10 px-3 py-1 rounded border border-primary/30">
                    <span className="text-sm font-bold text-primary">৳ {formatCurrency(depositAmount[0])}</span>
                  </div>
                </div>
                <Slider
                  value={depositAmount}
                  onValueChange={setDepositAmount}
                  min={10000}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>৳ 10,000</span>
                  <span>৳ 10,00,000</span>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Duration (Tenure)
                  </label>
                  <div className="bg-primary/10 px-3 py-1 rounded border border-primary/30">
                    <span className="text-sm font-bold text-primary">{duration[0]} Year{duration[0] > 1 ? "s" : ""}</span>
                  </div>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span>5 Years</span>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4 pt-4 border-t border-primary/10">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Interest (Net)</span>
                  <span className="font-bold text-primary">৳ {formatCurrency(interest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Maturity Amount</span>
                  <span className="font-bold text-lg">৳ {formatCurrency(maturityAmount)}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 italic">
                * Calculation based on 8.5% average interest rate and 10% tax deduction for TIN holders.
              </p>
            </div>

            {/* Promo Box */}
            <div className="mt-6 bg-gradient-to-br from-primary to-primary-light p-6 rounded-xl text-primary-foreground">
              <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Limited Offer</div>
              <h4 className="text-2xl font-black mb-2">Earn up to 9.25% Interest</h4>
              <p className="text-sm opacity-90 mb-4">
                Compare exclusive rates from 20+ partner banks and start your investment journey today with zero processing fees.
              </p>
              <Button variant="secondary" className="w-full">
                Compare All Rates
              </Button>
            </div>
          </div>

          {/* Right: Rate Tables */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden">
              <div className="p-6 border-b border-primary/10">
                <h3 className="text-xl font-bold">Top Bank Rates</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      <th className="px-6 py-4">Bank</th>
                      <th className="px-6 py-4">Interest Rate</th>
                      <th className="px-6 py-4">Compounding</th>
                      <th className="px-6 py-4">Tax-Adjusted</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab === "fdr" ? fdrRates : highInterestRates).map((rate) => (
                      <SavingsRateCard key={rate.id} rate={rate} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tax Info */}
            <div className="mt-6 bg-card p-6 rounded-xl border border-primary/10">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <MaterialIcon name="help" className="text-primary" />
                How are tax-adjusted returns calculated?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As per Bangladesh Bank regulations, a withholding tax is applicable on interest earnings. 
                For individuals with a valid TIN, the tax rate is 10%. For those without a TIN, a 15% tax 
                is deducted at source. Our calculation assumes you are a TIN holder. Interest rates are 
                subject to change based on bank policies and regulatory updates.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FDRSavings;
