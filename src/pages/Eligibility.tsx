import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

const employmentTypes = [
  { value: "salaried", label: "চাকরিজীবী", labelEn: "Salaried", icon: "badge" },
  { value: "business", label: "ব্যবসায়ী", labelEn: "Business Owner", icon: "storefront" },
  { value: "professional", label: "পেশাজীবী", labelEn: "Professional", icon: "work" },
];

const ageRanges = [
  { value: "18-25", label: "১৮-২৫ বছর", min: 18, max: 25 },
  { value: "26-35", label: "২৬-৩৫ বছর", min: 26, max: 35 },
  { value: "36-45", label: "৩৬-৪৫ বছর", min: 36, max: 45 },
  { value: "46-60", label: "৪৬-৬০ বছর", min: 46, max: 60 },
];

interface CreditCard {
  id: string;
  name: string;
  category: string | null;
  annual_fee: string | null;
  min_income: string | null;
  min_age: number | null;
  max_age: number | null;
  employment_types: string[] | null;
  badge: string | null;
  benefits: unknown;
  banks: {
    name: string;
    logo_url: string | null;
  } | null;
}

const fetchCreditCards = async (): Promise<CreditCard[]> => {
  const { data, error } = await supabase
    .from("credit_cards")
    .select("*, banks(*)")
    .eq("is_active", true);
  
  if (error) throw error;
  return data || [];
};

const parseIncome = (incomeStr: string | null): number => {
  if (!incomeStr) return 0;
  const match = incomeStr.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ""), 10);
  }
  return 0;
};

const Eligibility = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employmentType: "",
    monthlyIncome: 50000,
    ageRange: "",
  });
  const [showResults, setShowResults] = useState(false);

  const { data: allCards = [], isLoading } = useQuery({
    queryKey: ["credit-cards-eligibility"],
    queryFn: fetchCreditCards,
  });

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setShowResults(false);
    setFormData({
      employmentType: "",
      monthlyIncome: 50000,
      ageRange: "",
    });
  };

  const getMatchingCards = (): CreditCard[] => {
    const selectedAge = ageRanges.find(a => a.value === formData.ageRange);
    const userAge = selectedAge ? (selectedAge.min + selectedAge.max) / 2 : 30;

    return allCards
      .filter(card => {
        // Check income
        const minIncome = parseIncome(card.min_income);
        if (minIncome > formData.monthlyIncome) return false;

        // Check age
        if (card.min_age && userAge < card.min_age) return false;
        if (card.max_age && userAge > card.max_age) return false;

        // Check employment type
        if (card.employment_types && card.employment_types.length > 0) {
          const employmentMap: Record<string, string[]> = {
            salaried: ["Salaried", "salaried"],
            business: ["Business Owner", "Self-employed", "business"],
            professional: ["Professional", "Self-employed", "Salaried", "professional"],
          };
          const matchingTypes = employmentMap[formData.employmentType] || [];
          const hasMatch = card.employment_types.some(et => 
            matchingTypes.some(mt => et.toLowerCase().includes(mt.toLowerCase()))
          );
          if (!hasMatch) return false;
        }

        return true;
      })
      .slice(0, 3);
  };

  const matchingCards = showResults ? getMatchingCards() : [];

  const canProceed = () => {
    if (step === 1) return formData.employmentType !== "";
    if (step === 2) return formData.monthlyIncome >= 20000;
    if (step === 3) return formData.ageRange !== "";
    return true;
  };

  const formatIncome = (value: number) => {
    return new Intl.NumberFormat('bn-BD').format(value);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 py-8 md:py-12 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-foreground mb-3 font-bengali">
            আপনার জন্য সঠিক <span className="text-primary">কার্ড খুঁজুন</span>
          </h1>
          <p className="text-muted-foreground font-bengali text-sm md:text-base">
            তিনটি সহজ প্রশ্নের উত্তর দিন, আমরা আপনার জন্য উপযুক্ত কার্ড সুপারিশ করব।
          </p>
        </div>

        {!showResults ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold font-bengali">
                  ধাপ {step}/৩: {step === 1 ? "পেশা" : step === 2 ? "আয়" : "বয়স"}
                </span>
                <span className="font-bold text-primary">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-2xl border border-primary/10 shadow-lg p-6 md:p-8">
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold mb-3 font-bengali">
                    আপনার পেশা কী?
                  </label>
                  <div className="grid gap-3">
                    {employmentTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, employmentType: type.value })}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                          formData.employmentType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-primary/10 hover:border-primary/30"
                        }`}
                      >
                        <MaterialIcon
                          name={type.icon}
                          className={`text-2xl ${
                            formData.employmentType === type.value ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <div className="text-left">
                          <span className="text-base font-semibold block font-bengali">{type.label}</span>
                          <span className="text-xs text-muted-foreground">({type.labelEn})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <label className="block text-sm font-semibold font-bengali">
                    আপনার মাসিক আয় কত?
                  </label>
                  <div className="text-center py-6">
                    <div className="text-4xl font-black text-primary mb-2">
                      ৳ {formatIncome(formData.monthlyIncome)}
                    </div>
                    <p className="text-sm text-muted-foreground font-bengali">প্রতি মাসে</p>
                  </div>
                  <Slider
                    value={[formData.monthlyIncome]}
                    onValueChange={(value) => setFormData({ ...formData, monthlyIncome: value[0] })}
                    min={20000}
                    max={500000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>৳২০,০০০</span>
                    <span>৳৫,০০,০০০+</span>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold mb-3 font-bengali">
                    আপনার বয়স কত?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {ageRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setFormData({ ...formData, ageRange: range.value })}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          formData.ageRange === range.value
                            ? "border-primary bg-primary/5"
                            : "border-primary/10 hover:border-primary/30"
                        }`}
                      >
                        <span className="text-base font-semibold block font-bengali">{range.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="border-primary/20"
                >
                  <MaterialIcon name="arrow_back" className="mr-2" />
                  <span className="font-bengali">পেছনে</span>
                </Button>
                <Button onClick={handleNext} disabled={!canProceed()}>
                  <span className="font-bengali">{step === 3 ? "ফলাফল দেখুন" : "পরবর্তী"}</span>
                  <MaterialIcon name="arrow_forward" className="ml-2" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <h3 className="font-semibold text-sm mb-2 font-bengali">আপনার তথ্য:</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-background px-3 py-1 rounded-full border">
                  {employmentTypes.find(e => e.value === formData.employmentType)?.label}
                </span>
                <span className="bg-background px-3 py-1 rounded-full border">
                  ৳{formatIncome(formData.monthlyIncome)}/মাস
                </span>
                <span className="bg-background px-3 py-1 rounded-full border">
                  {ageRanges.find(a => a.value === formData.ageRange)?.label}
                </span>
              </div>
            </div>

            {/* Results Header */}
            <div className="text-center">
              <MaterialIcon name="check_circle" className="text-5xl text-primary mb-3" />
              <h2 className="text-xl font-bold mb-2 font-bengali">
                {matchingCards.length > 0 
                  ? `আপনার জন্য ${matchingCards.length}টি কার্ড পাওয়া গেছে`
                  : "দুঃখিত, কোনো কার্ড মেলেনি"
                }
              </h2>
              <p className="text-sm text-muted-foreground font-bengali">
                {matchingCards.length > 0 
                  ? "আপনার তথ্যের ভিত্তিতে এই কার্ডগুলো উপযুক্ত হতে পারে।"
                  : "অনুগ্রহ করে অন্য মানদণ্ড দিয়ে আবার চেষ্টা করুন।"
                }
              </p>
            </div>

            {/* Card Recommendations */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {matchingCards.map((card, index) => (
                  <Link
                    key={card.id}
                    to={`/cards/${card.id}`}
                    className="block bg-card rounded-xl border border-primary/10 p-4 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {card.banks?.logo_url ? (
                          <img 
                            src={card.banks.logo_url} 
                            alt={card.banks.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <MaterialIcon name="credit_card" className="text-primary text-xl" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-sm truncate">{card.name}</h3>
                            <p className="text-xs text-muted-foreground">{card.banks?.name}</p>
                          </div>
                          {index === 0 && (
                            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bengali whitespace-nowrap">
                              সেরা মিল
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                          {card.annual_fee && (
                            <span className="flex items-center gap-1">
                              <MaterialIcon name="payments" className="text-sm" />
                              {card.annual_fee}
                            </span>
                          )}
                          {card.min_income && (
                            <span className="flex items-center gap-1">
                              <MaterialIcon name="trending_up" className="text-sm" />
                              ন্যূনতম {card.min_income}
                            </span>
                          )}
                        </div>
                        {card.badge && (
                          <span className="inline-block mt-2 text-xs bg-accent/10 text-accent-foreground px-2 py-0.5 rounded">
                            {card.badge}
                          </span>
                        )}
                      </div>
                      <MaterialIcon name="chevron_right" className="text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-muted/30 rounded-lg p-4 text-xs text-muted-foreground font-bengali">
              <MaterialIcon name="info" className="inline mr-1 text-sm" />
              এটি আনুমানিক হিসাব। চূড়ান্ত যোগ্যতা নির্ধারণ করবে সংশ্লিষ্ট ব্যাংক। BankBujhi কোনো ব্যাংক নয়।
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                <MaterialIcon name="refresh" className="mr-2" />
                <span className="font-bengali">আবার চেষ্টা করুন</span>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/compare">
                  <span className="font-bengali">সব কার্ড দেখুন</span>
                  <MaterialIcon name="arrow_forward" className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Help Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs">
          <Link to="/guides" className="text-muted-foreground hover:text-primary flex items-center gap-1 font-bengali">
            <MaterialIcon name="help" className="text-sm" /> কীভাবে কাজ করে?
          </Link>
          <Link to="/privacy" className="text-muted-foreground hover:text-primary flex items-center gap-1 font-bengali">
            <MaterialIcon name="security" className="text-sm" /> গোপনীয়তা নীতি
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Eligibility;
