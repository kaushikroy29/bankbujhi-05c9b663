import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreditCardListing from "@/components/cards/CreditCardListing";
import { fetchCreditCards, fetchBanks, type CreditCard, type Bank } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/seo/SEOHead";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const categories = [
  { value: "all", label: "সব ক্যাটাগরি" },
  { value: "Premium Rewards", label: "প্রিমিয়াম রিওয়ার্ডস" },
  { value: "Travel", label: "ট্রাভেল" },
  { value: "Cashback", label: "ক্যাশব্যাক" },
  { value: "Islamic Banking", label: "ইসলামিক ব্যাংকিং" }, // New
  { value: "Shopping & Lifestyle", label: "শপিং ও লাইফস্টাইল" },
  { value: "Student Cards", label: "স্টুডেন্ট কার্ড" }, // New
  { value: "Entry Level", label: "এন্ট্রি লেভেল" },
  { value: "Business Cards", label: "বিজনেস কার্ড" },
  { value: "Prepaid Cards", label: "প্রিপেইড কার্ড" }, // New
  { value: "Womens", label: "নারীদের জন্য" }, // New
];

const annualFeeOptions = [
  { value: "all", label: "যেকোনো ফি" },
  { value: "free", label: "বিনামূল্যে (৳০)" },
  { value: "0-2000", label: "৳২,০০০ পর্যন্ত" },
  { value: "2000-5000", label: "৳২,০০০ - ৳৫,০০০" },
  { value: "5000+", label: "৳৫,০০০+" },
];

const incomeOptions = [
  { value: "all", label: "যেকোনো আয়" },
  { value: "25000", label: "৳২৫,০০০+" },
  { value: "50000", label: "৳৫০,০০০+" },
  { value: "75000", label: "৳৭৫,০০০+" },
  { value: "100000", label: "৳১,০০,০০০+" },
];

// Helper to parse fee string to number
const parseFeeAmount = (fee: string | null): number => {
  if (!fee) return 0;
  const match = fee.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// Helper to parse income string to number
const parseIncomeAmount = (income: string | null): number => {
  if (!income) return 0;
  const match = income.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// Helper to get fee value from nested object key (e.g., "annual.fee")
const getFeeValue = (card: CreditCard, mainCategory: string, subKey: string): string => {
  if (!card.fees_detailed) return "N/A";

  try {
    const categoryData = (card.fees_detailed as any)[mainCategory];
    if (!categoryData) return "N/A";

    // Handle nested keys if subKey contains dot (though current structure is flat per category)
    // Actually our feeCategories structure implies simpler mapping
    // But let's check the key mapping.
    // If subKey is 'fee', we access categoryData['fee']
    const val = categoryData[subKey];

    // Formatting: if val is "0" or "0.00", show "ফ্রি"
    if (val === "0" || val === "0.00") return "ফ্রি";
    return val || "N/A";
  } catch (e) {
    return "N/A";
  }
};

const isLowestFee = (currentFee: string, allCards: CreditCard[], mainCategory: string, subKey: string): boolean => {
  const amount = parseFeeAmount(currentFee);
  if (amount === 0 && currentFee !== "ফ্রি" && currentFee !== "0" && !currentFee.includes("Free")) return false; // N/A or text

  // Get all fees for this category
  const fees = allCards.map(c => parseFeeAmount(getFeeValue(c, mainCategory, subKey)));
  const minFee = Math.min(...fees.filter(f => !isNaN(f)));

  return amount === minFee;
};

// Visual comparison table
const FeeComparisonTable = ({ cards }: { cards: CreditCard[] }) => {
  const feeCategories = [
    {
      category: 'annual',
      label_bn: 'বার্ষিক ফি',
      subcategories: [
        { key: 'fee', label: 'মূল ফি' },
        { key: 'renewal_fee', label: 'নবায়ন ফি' },
        // { key: 'supplementary', label: 'সাপ্লিমেন্টারি কার্ড' } // Assuming this exists or we skip
      ]
    },
    {
      category: 'transaction',
      label_bn: 'লেনদেন ফি',
      subcategories: [
        { key: 'cash_advance', label: 'নগদ উত্তোলন' },
        { key: 'foreign_currency', label: 'বিদেশী মুদ্রা' },
        { key: 'balance_transfer', label: 'ব্যালেন্স ট্রান্সফার' }
      ]
    },
    {
      category: 'penalty',
      label_bn: 'জরিমানা ফি',
      subcategories: [
        { key: 'late_payment', label: 'দেরিতে পরিশোধ' },
        { key: 'over_limit', label: 'লিমিট ওভার' }
      ]
    }
  ];

  return (
    <div className="overflow-x-auto pb-4">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th className="p-3 text-left bg-muted/50 border-b sticky left-0 z-10 bg-background min-w-[150px]">ফি এর ধরন</th>
            {cards.map(card => (
              <th key={card.id} className="p-3 text-center bg-muted/30 border-b min-w-[200px]">
                <div className="flex flex-col items-center gap-2">
                  <img src={card.image_url || "/placeholder.svg"} className="h-12 w-auto object-contain" alt={card.name} />
                  <span className="text-sm font-bold line-clamp-2 leading-tight">{card.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {feeCategories.map(category => (
            <>
              <tr key={category.category} className="bg-primary/5">
                <td colSpan={cards.length + 1} className="p-2 px-3 font-bold text-primary text-sm sticky left-0 z-10 bg-primary/5">
                  {category.label_bn}
                </td>
              </tr>
              {category.subcategories.map(sub => (
                <tr key={`${category.category}-${sub.key}`} className="border-b hover:bg-muted/5">
                  <td className="p-3 text-sm font-medium text-muted-foreground sticky left-0 z-10 bg-background border-r">{sub.label}</td>
                  {cards.map(card => {
                    const fee = getFeeValue(card, category.category, sub.key);
                    const isLowest = isLowestFee(fee, cards, category.category, sub.key);

                    return (
                      <td key={card.id} className={`p-3 text-center text-sm ${isLowest ? 'bg-green-50/50 font-bold text-green-700' : ''}`}>
                        {fee}
                        {isLowest && fee !== "N/A" && <span className="text-green-600 ml-1 inline-block">✓</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          ))}
          {/* Add basic benefits row */}
          <tr className="bg-primary/5">
            <td colSpan={cards.length + 1} className="p-2 px-3 font-bold text-primary text-sm sticky left-0 z-10 bg-primary/5">
              সুবিধাসমূহ
            </td>
          </tr>
          <tr>
            <td className="p-3 text-sm font-medium text-muted-foreground sticky left-0 z-10 bg-background border-r">টপ বেনিফিট</td>
            {cards.map(card => (
              <td key={card.id} className="p-3 text-center text-xs align-top">
                <ul className="text-left space-y-1 list-disc pl-4">
                  {card.benefits?.slice(0, 3).map((b, i) => (
                    <li key={i}>{b.text}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Compare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Get initial values from URL params
  const urlCategory = searchParams.get("category") || "all";
  const urlSearch = searchParams.get("search") || "";
  const urlBank = searchParams.get("bank") || "all";

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedBank, setSelectedBank] = useState(urlBank);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState("popularity");
  const [annualFeeFilter, setAnnualFeeFilter] = useState("all");
  const [incomeFilter, setIncomeFilter] = useState("all");

  // Sync state with URL params on mount and URL change
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSearchQuery(urlSearch);
    setSelectedBank(urlBank);
  }, [urlCategory, urlSearch, urlBank]);

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedBank, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cardsData, banksData] = await Promise.all([
        fetchCreditCards({
          category: selectedCategory,
          bankId: selectedBank,
          search: searchQuery,
        }),
        fetchBanks(),
      ]);
      setCards(cardsData);
      setBanks(banksData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to count benefits/rewards value
  const getRewardsScore = (card: CreditCard): number => {
    let score = 0;
    // More benefits = higher score
    score += (card.benefits?.length || 0) * 10;
    // Badge gives bonus points
    if (card.badge) score += 20;
    // Waived annual fee is a reward
    if (card.annual_fee_waived) score += 15;
    return score;
  };

  // Apply client-side filters and sorting
  const filteredCards = useMemo(() => {
    let result = cards.filter(card => {
      // Annual fee filter
      if (annualFeeFilter !== "all") {
        const feeAmount = parseFeeAmount(card.annual_fee);
        const isWaived = card.annual_fee_waived;

        if (annualFeeFilter === "free") {
          if (feeAmount > 0 && !isWaived) return false;
        } else if (annualFeeFilter === "0-2000") {
          if (feeAmount > 2000 && !isWaived) return false;
        } else if (annualFeeFilter === "2000-5000") {
          if (feeAmount < 2000 || feeAmount > 5000) return false;
        } else if (annualFeeFilter === "5000+") {
          if (feeAmount < 5000) return false;
        }
      }

      // Income filter
      if (incomeFilter !== "all") {
        const minIncomeRequired = parseIncomeAmount(card.min_income);
        const userIncome = parseInt(incomeFilter, 10);
        if (minIncomeRequired > userIncome) return false;
      }

      return true;
    });

    // Apply sorting
    if (sortBy === "fee-low") {
      result = [...result].sort((a, b) => {
        const feeA = a.annual_fee_waived ? 0 : parseFeeAmount(a.annual_fee);
        const feeB = b.annual_fee_waived ? 0 : parseFeeAmount(b.annual_fee);
        return feeA - feeB;
      });
    } else if (sortBy === "fee-high") {
      result = [...result].sort((a, b) => {
        const feeA = a.annual_fee_waived ? 0 : parseFeeAmount(a.annual_fee);
        const feeB = b.annual_fee_waived ? 0 : parseFeeAmount(b.annual_fee);
        return feeB - feeA;
      });
    } else if (sortBy === "income-low") {
      result = [...result].sort((a, b) => {
        const incomeA = parseIncomeAmount(a.min_income);
        const incomeB = parseIncomeAmount(b.min_income);
        return incomeA - incomeB;
      });
    } else if (sortBy === "rewards") {
      result = [...result].sort((a, b) => {
        return getRewardsScore(b) - getRewardsScore(a);
      });
    }
    // "popularity" keeps the default order from the database

    return result;
  }, [cards, annualFeeFilter, incomeFilter, sortBy]);

  const toggleCompare = (id: string) => {
    setCompareList(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBank("all");
    setSearchQuery("");
    setAnnualFeeFilter("all");
    setIncomeFilter("all");
    setSearchParams({});
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedBank !== "all" ? 1 : 0) +
    (annualFeeFilter !== "all" ? 1 : 0) +
    (incomeFilter !== "all" ? 1 : 0);

  // Transform card data for CreditCardListing component
  const transformCard = (card: CreditCard) => ({
    id: card.id,
    bank: card.banks?.name || "Unknown Bank",
    name: card.name,
    category: card.category || "",
    annualFee: card.annual_fee || "N/A",
    annualFeeNote: card.annual_fee_note || "",
    annualFeeStrikethrough: card.annual_fee_waived || false,
    benefits: card.benefits.slice(0, 2).map(b => ({ icon: b.icon, text: b.text })),
    badge: card.badge || undefined,
    image: card.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
  });

  // Get full card objects for comparison
  const selectedCards = cards.filter(card => compareList.includes(card.id));

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(item => item !== id));
    if (compareList.length <= 1) setShowCompareModal(false);
  };

  return (
    <>
      <SEOHead
        title="ক্রেডিট কার্ড তুলনা | BankBujhi"
        description="২০+ ব্যাংকের কার্ড পাশাপাশি তুলনা করুন—ফি, ক্যাশব্যাক ও সুবিধা এক নজরে।"
        image="https://bankbujhi.lovable.app/og/og-compare.jpg"
        path="/compare"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
          {/* Breadcrumb */}
          <PageBreadcrumb
            items={[{ label: "ক্রেডিট কার্ড" }]}
            className="mb-4 sm:mb-6"
          />

          {/* Page Heading */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">ক্রেডিট কার্ড তুলনা করুন</h1>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">
                ২–৪টি কার্ড নির্বাচন করে পাশাপাশি তুলনা করুন—ফি, ক্যাশব্যাক ও সুবিধা এক নজরে।
              </p>
            </div>

            {/* Trust Note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg w-fit">
              <MaterialIcon name="verified" className="text-primary text-sm" />
              তথ্যসূত্র: সংশ্লিষ্ট ব্যাংকের অফিসিয়াল ওয়েবসাইট
            </div>

            {/* Mobile: Filter toggle and sort */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 bg-card px-4 py-2.5 rounded-xl border border-primary/10 text-sm font-medium"
              >
                <MaterialIcon name="tune" className="text-primary" />
                ফিল্টার
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2 bg-card p-2 rounded-xl border border-primary/10 flex-1 sm:flex-none">
                <span className="text-xs sm:text-sm font-medium pl-2 hidden sm:inline">সাজান:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-xs sm:text-sm font-bold focus:ring-0 text-primary cursor-pointer flex-1 sm:flex-none"
                >
                  <option value="popularity">জনপ্রিয়তা</option>
                  <option value="fee-low">ফি (কম-বেশি)</option>
                  <option value="fee-high">ফি (বেশি-কম)</option>
                  <option value="income-low">কম আয়ে যোগ্য</option>
                  <option value="rewards">সেরা রিওয়ার্ড</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Navigation & Filters */}
            <aside className={`w-full lg:w-72 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="lg:sticky lg:top-24 flex flex-col gap-4 sm:gap-6">
                <div className="bg-card rounded-2xl border border-primary/10 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold">ফিল্টার</h3>
                    <button
                      onClick={clearFilters}
                      className="text-primary text-xs font-bold uppercase tracking-wider hover:underline"
                    >
                      সব মুছুন
                    </button>
                  </div>

                  {/* Bank Filter */}
                  <div className="mb-4">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                      ব্যাংক
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-background border border-primary/10 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="all">সব ব্যাংক</option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.id}>{bank.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                      ক্যাটাগরি
                    </label>
                    <div className="flex flex-col gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl cursor-pointer transition-colors text-left ${selectedCategory === cat.value
                            ? "bg-primary/5 border border-primary/20"
                            : "hover:bg-background border border-transparent"
                            }`}
                        >
                          <span className="text-xs sm:text-sm font-semibold">{cat.label}</span>
                          {selectedCategory === cat.value && (
                            <MaterialIcon name="check" className="text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Annual Fee Filter */}
                  <div className="mb-4">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                      বার্ষিক ফি
                    </label>
                    <div className="flex flex-col gap-1.5">
                      {annualFeeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setAnnualFeeFilter(option.value)}
                          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors text-left ${annualFeeFilter === option.value
                            ? "bg-primary/5 border border-primary/20"
                            : "hover:bg-background border border-transparent"
                            }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{option.label}</span>
                          {annualFeeFilter === option.value && (
                            <MaterialIcon name="check" className="text-primary text-sm" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minimum Income Filter */}
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                      আপনার মাসিক আয়
                    </label>
                    <p className="text-xs text-muted-foreground mb-2">
                      আপনার জন্য যোগ্য কার্ড দেখুন
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {incomeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setIncomeFilter(option.value)}
                          className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors text-left ${incomeFilter === option.value
                            ? "bg-primary/5 border border-primary/20"
                            : "hover:bg-background border border-transparent"
                            }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{option.label}</span>
                          {incomeFilter === option.value && (
                            <MaterialIcon name="check" className="text-primary text-sm" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Help Card */}
                <div className="hidden sm:block bg-primary rounded-2xl p-5 sm:p-6 text-primary-foreground overflow-hidden relative">
                  <div className="relative z-10">
                    <h4 className="font-bold text-base sm:text-lg mb-2">কার্ড বাছতে সাহায্য দরকার?</h4>
                    <p className="text-primary-foreground/80 text-xs sm:text-sm mb-4">
                      আমাদের সহজ কুইজে আপনার জন্য সঠিক কার্ড খুঁজুন।
                    </p>
                    <Link to="/quiz">
                      <Button variant="secondary" className="font-bold text-sm">
                        কুইজ শুরু করুন
                      </Button>
                    </Link>
                  </div>
                  <MaterialIcon
                    name="quiz"
                    className="absolute -bottom-4 -right-4 text-primary-foreground/10 text-8xl sm:text-9xl"
                  />
                </div>
              </div>
            </aside>

            {/* Results Content Area */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-bold text-muted-foreground">
                  <span className="text-foreground">{filteredCards.length}টি কার্ড</span> পাওয়া গেছে
                </p>
              </div>

              {/* Card List */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {loading ? (
                  // Loading skeletons
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-card border border-primary/10 rounded-2xl p-5">
                      <div className="flex gap-6">
                        <Skeleton className="w-52 h-32 rounded-xl" />
                        <div className="flex-1 space-y-3">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : filteredCards.length === 0 ? (
                  <div className="text-center py-12">
                    <MaterialIcon name="credit_card_off" className="text-5xl text-muted-foreground mb-4" />
                    <p className="text-lg font-bold mb-2">কোনো কার্ড পাওয়া যায়নি</p>
                    <p className="text-muted-foreground mb-4">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
                    <Button onClick={clearFilters}>ফিল্টার মুছুন</Button>
                  </div>
                ) : (
                  filteredCards.map((card) => (
                    <CreditCardListing
                      key={card.id}
                      card={transformCard(card)}
                      isComparing={compareList.includes(card.id)}
                      onToggleCompare={() => toggleCompare(card.id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Compare Bar - Fixed at bottom */}
          {compareList.length > 0 && (
            <div className="fixed bottom-16 md:bottom-4 left-4 right-4 z-40 flex justify-center">
              <div className="bg-foreground text-background rounded-full px-6 py-3 shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {selectedCards.map(c => (
                      <img key={c.id} src={c.image_url} className="w-8 h-8 rounded-full border-2 border-background object-cover bg-white" alt="" />
                    ))}
                  </div>
                  <span className="font-bold text-sm">{compareList.length}টি কার্ড নির্বাচিত</span>
                </div>
                <div className="h-4 w-px bg-background/20"></div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCompareList([])}
                    className="text-sm font-medium hover:text-red-300 transition-colors"
                  >
                    মুছুন
                  </button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-full px-4 font-bold"
                    disabled={compareList.length < 2}
                    onClick={() => setShowCompareModal(true)}
                  >
                    তুলনা করুন
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* New Compare Modal with FeeComparisonTable */}
          <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
            <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
              <DialogHeader className="p-4 sm:p-6 border-b shrink-0">
                <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <MaterialIcon name="compare_arrows" className="text-primary" />
                  পাশাপাশি তুলনা
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedCards.length}টি কার্ডের বিস্তারিত তুলনা
                </p>
              </DialogHeader>

              <ScrollArea className="flex-1">
                <div className="p-4 sm:p-6">
                  {selectedCards.length > 0 && (
                    <FeeComparisonTable cards={selectedCards} />
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-muted/20 shrink-0 flex justify-end">
                <Button onClick={() => setShowCompareModal(false)}>বন্ধ করুন</Button>
              </div>
            </DialogContent>
          </Dialog>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default Compare;
