import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavingsRateCard from "@/components/cards/SavingsRateCard";
import { fetchSavingsRates, fetchBanks, type SavingsRate, type Bank } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/seo/SEOHead";

const FDRSavings = () => {
  const [rates, setRates] = useState<SavingsRate[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState([100000]);
  const [duration, setDuration] = useState([1]);
  const [activeTab, setActiveTab] = useState("fdr");
  const [selectedBank, setSelectedBank] = useState("all");

  useEffect(() => {
    loadData();
  }, [activeTab, selectedBank]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ratesData, banksData] = await Promise.all([
        fetchSavingsRates({
          productType: activeTab,
          bankId: selectedBank,
        }),
        fetchBanks(),
      ]);
      setRates(ratesData);
      setBanks(banksData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate estimated interest based on average rate from data
  const calculateInterest = () => {
    const avgRate = rates.length > 0
      ? rates.reduce((sum, r) => sum + (r.interest_rate || 0), 0) / rates.length / 100
      : 0.085;
    const principal = depositAmount[0];
    const years = duration[0];
    const grossInterest = principal * avgRate * years;
    const netInterest = grossInterest * 0.9; // 10% tax
    return Math.round(netInterest);
  };

  const interest = calculateInterest();
  const maturityAmount = depositAmount[0] + interest;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  // Transform data for SavingsRateCard
  const transformRate = (rate: SavingsRate, index: number) => ({
    id: index + 1,
    bank: rate.banks?.name || "Unknown Bank",
    bankCode: rate.banks?.swift_code?.substring(0, 4) || rate.banks?.name?.substring(0, 4).toUpperCase() || "BANK",
    interestRate: rate.interest_rate || 0,
    compounding: rate.tenure_label || "At Maturity",
    taxAdjusted: Number(((rate.interest_rate || 0) * 0.9).toFixed(2)),
    bgColor: "bg-primary",
  });

  return (
    <>
      <SEOHead
        title="এফডিআর ও সেভিংস রেট | BankBujhi"
        description="সর্বোচ্চ সুদের হার তুলনা করুন। বাংলাদেশের সব ব্যাংকের FDR ও সেভিংস রেট এক জায়গায়।"
        image="https://bankbujhi.lovable.app/og/og-savings.jpg"
        path="/savings"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
          {/* Breadcrumb */}
          <PageBreadcrumb
            items={[{ label: "সেভিংস ও এফডিআর" }]}
            className="mb-6"
          />

          {/* Page Heading */}
          <div className="mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-2">
              ফিক্সড ডিপোজিট ও সেভিংস <span className="text-primary">তুলনা টুল</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              বাংলাদেশের শীর্ষ ব্যাংকগুলোর সুদের হার তুলনা করুন এবং আপনার বিনিয়োগের লাভ তাৎক্ষণিক হিসাব করুন।
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-card border border-primary/10 w-full sm:w-auto overflow-x-auto">
                <TabsTrigger
                  value="fdr"
                  className="flex-1 sm:flex-none text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
                >
                  ফিক্সড ডিপোজিট (FDR)
                </TabsTrigger>
                <TabsTrigger
                  value="savings"
                  className="flex-1 sm:flex-none text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
                >
                  উচ্চ-সুদযুক্ত সেভিংস
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Bank Filter */}
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="bg-card border border-primary/10 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">সব ব্যাংক</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>{bank.name}</option>
              ))}
            </select>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Calculator */}
            <div className="lg:col-span-1 order-1 lg:order-1">
              <div className="bg-card p-4 sm:p-6 rounded-xl border border-primary/10 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <MaterialIcon name="calculate" className="text-primary" />
                  বিনিয়োগ ক্যালকুলেটর
                </h3>

                {/* Deposit Amount */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                    <label className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      আমানতের পরিমাণ (BDT)
                    </label>
                    <div className="bg-primary/10 px-3 py-1 rounded border border-primary/30 self-start sm:self-auto">
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
                <div className="mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                    <label className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      সময়সীমা (মেয়াদ)
                    </label>
                    <div className="bg-primary/10 px-3 py-1 rounded border border-primary/30 self-start sm:self-auto">
                      <span className="text-sm font-bold text-primary">{duration[0]} বছর</span>
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
                    <span>১ বছর</span>
                    <span>৫ বছর</span>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3 sm:space-y-4 pt-4 border-t border-primary/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">আনুমানিক লাভ (নিট)</span>
                    <span className="font-bold text-primary text-lg">৳ {formatCurrency(interest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">মেয়াদ শেষে পরিমাণ</span>
                    <span className="font-bold text-lg sm:text-xl">৳ {formatCurrency(maturityAmount)}</span>
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs text-muted-foreground mt-4 italic">
                  * গড় সুদের হারের উপর ভিত্তি করে এবং টিন (TIN) ধারীদের জন্য ১০% ট্যাক্স কেটে হিসাব করা হয়েছে।
                </p>
              </div>

              {/* Promo Box */}
              <div className="hidden lg:block mt-6 bg-gradient-to-br from-primary to-primary-light p-6 rounded-xl text-primary-foreground">
                <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">লাইভ রেট</div>
                <h4 className="text-2xl font-black mb-2">
                  {rates.length > 0 ? `সর্বোচ্চ ${Math.max(...rates.map(r => r.interest_rate || 0)).toFixed(2)}%` : 'লোড হচ্ছে...'}
                </h4>
                <p className="text-sm opacity-90 mb-4">
                  {banks.length}+ পার্টনার ব্যাংকের সব এক্সক্লুসিভ রেট তুলনা করুন।
                </p>
                <Button variant="secondary" className="w-full">
                  সব রেট দেখুন
                </Button>
              </div>
            </div>

            {/* Rate Tables */}
            <div className="lg:col-span-2 order-2 lg:order-2">
              <div className="bg-card rounded-xl border border-primary/10 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-primary/10 flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold">সেরা ব্যাংকের রেটসমূহ</h3>
                  <span className="text-sm text-muted-foreground">{rates.length}টি অপশন</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] md:min-w-0">
                    <thead className="bg-muted/50 hidden md:table-header-group">
                      <tr className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        <th className="px-4 lg:px-6 py-4">ব্যাংক</th>
                        <th className="px-4 lg:px-6 py-4">সুদের হার</th>
                        <th className="px-4 lg:px-6 py-4">মেয়াদ</th>
                        <th className="px-4 lg:px-6 py-4">ট্যাক্স সহ</th>
                        <th className="px-4 lg:px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                          <tr key={i}>
                            <td colSpan={5} className="p-4">
                              <Skeleton className="h-16 w-full" />
                            </td>
                          </tr>
                        ))
                      ) : rates.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-muted-foreground">
                            নির্বাচিত ফিল্টার অনুযায়ী কোনো রেট পাওয়া যায়নি
                          </td>
                        </tr>
                      ) : (
                        rates.map((rate, index) => (
                          <SavingsRateCard key={rate.id} rate={transformRate(rate, index)} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tax Info */}
              <div className="mt-4 sm:mt-6 bg-card p-4 sm:p-6 rounded-xl border border-primary/10">
                <h4 className="font-bold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <MaterialIcon name="help" className="text-primary" />
                  ট্যাক্স-অ্যাডজাস্টেড রিটার্ন কীভাবে গণনা করা হয়?
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  বাংলাদেশ ব্যাংকের বিধান অনুযায়ী, অর্জিত সুদের ওপর উৎস কর প্রদেয়। বৈধ টিিন (TIN) থাকলে করের হার ১০%, আর টিিন (TIN) না থাকলে ১৫% কর কেটে নেওয়া হয়। আমাদের ক্যালকুলেটর আপনি একজন টিন ধারী ধরে নিয়ে হিসাব করেছে।
                </p>
              </div>

              {/* Mobile Promo Box */}
              <div className="lg:hidden mt-6 bg-gradient-to-br from-primary to-primary-light p-5 rounded-xl text-primary-foreground">
                <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">লাইভ রেট</div>
                <h4 className="text-xl font-black mb-2">
                  {rates.length > 0 ? `সর্বোচ্চ ${Math.max(...rates.map(r => r.interest_rate || 0)).toFixed(2)}%` : 'লোড হচ্ছে...'}
                </h4>
                <p className="text-sm opacity-90 mb-4">
                  {banks.length}+ পার্টনার ব্যাংকের রেট তুলনা করুন।
                </p>
                <Button variant="secondary" className="w-full">
                  সব রেট দেখুন
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default FDRSavings;
