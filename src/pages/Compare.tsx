import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreditCardListing from "@/components/cards/CreditCardListing";
import CompareModal from "@/components/cards/CompareModal";
import { fetchCreditCards, fetchBanks, type CreditCard, type Bank } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Lifestyle & Daily Essentials", label: "Lifestyle & Daily" },
  { value: "Premium Travel & Rewards", label: "Travel & Rewards" },
  { value: "Shopping & Utility Payments", label: "Shopping & Utility" },
  { value: "Cashback & Rewards", label: "Cashback" },
  { value: "Entry Level", label: "Entry Level" },
  { value: "Premium Rewards", label: "Premium" },
];

const annualFeeOptions = [
  { value: "all", label: "Any Fee" },
  { value: "free", label: "Free (৳0)" },
  { value: "0-2000", label: "Up to ৳2,000" },
  { value: "2000-5000", label: "৳2,000 - ৳5,000" },
  { value: "5000+", label: "৳5,000+" },
];

const incomeOptions = [
  { value: "all", label: "Any Income" },
  { value: "25000", label: "৳25,000+" },
  { value: "50000", label: "৳50,000+" },
  { value: "75000", label: "৳75,000+" },
  { value: "100000", label: "৳1,00,000+" },
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

  // Transform card data for CompareModal component
  const transformCardForCompare = (card: CreditCard) => ({
    id: card.id,
    bank: card.banks?.name || "Unknown Bank",
    name: card.name,
    category: card.category || "",
    annualFee: card.annual_fee || "N/A",
    annualFeeNote: card.annual_fee_note || "",
    interestRate: card.interest_rate || undefined,
    minIncome: card.min_income || undefined,
    creditScore: card.credit_score || undefined,
    minAge: card.min_age || undefined,
    maxAge: card.max_age || undefined,
    requiredDocuments: card.required_documents || undefined,
    employmentTypes: card.employment_types || undefined,
    fees: card.fees || undefined,
    image: card.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    benefits: card.benefits.map(b => ({ icon: b.icon, text: b.text })),
  });

  const cardsForCompare = cards
    .filter(card => compareList.includes(card.id))
    .map(transformCardForCompare);

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(item => item !== id));
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Link to="/" className="text-muted-foreground text-xs sm:text-sm font-medium hover:underline">Home</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-xs sm:text-sm font-medium">Credit Cards</span>
        </div>

        {/* Page Heading */}
        <div className="mb-6 sm:mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Credit Card Search</h1>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              Finding the best matches for your wallet in Bangladesh
            </p>
          </div>
          
          {/* Mobile: Filter toggle and sort */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-card px-4 py-2.5 rounded-xl border border-primary/10 text-sm font-medium"
            >
              <MaterialIcon name="tune" className="text-primary" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 bg-card p-2 rounded-xl border border-primary/10 flex-1 sm:flex-none">
              <span className="text-xs sm:text-sm font-medium pl-2 hidden sm:inline">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-xs sm:text-sm font-bold focus:ring-0 text-primary cursor-pointer flex-1 sm:flex-none"
              >
                <option value="popularity">Popularity</option>
                <option value="fee-low">Annual Fee (Low-High)</option>
                <option value="rewards">Highest Rewards</option>
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
                  <h3 className="text-base sm:text-lg font-bold">Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-primary text-xs font-bold uppercase tracking-wider hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Bank Filter */}
                <div className="mb-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                    Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-background border border-primary/10 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Banks</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                    Category
                  </label>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl cursor-pointer transition-colors text-left ${
                          selectedCategory === cat.value
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
                    Annual Fee
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {annualFeeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setAnnualFeeFilter(option.value)}
                        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors text-left ${
                          annualFeeFilter === option.value
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
                    Your Monthly Income
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Show cards you're eligible for
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {incomeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setIncomeFilter(option.value)}
                        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors text-left ${
                          incomeFilter === option.value
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
                  <h4 className="font-bold text-base sm:text-lg mb-2">Need Help Choosing?</h4>
                  <p className="text-primary-foreground/80 text-xs sm:text-sm mb-4">
                    Our financial experts are here to help you pick the right card.
                  </p>
                  <Link to="/eligibility">
                    <Button variant="secondary" className="font-bold text-sm">
                      Check Eligibility
                    </Button>
                  </Link>
                </div>
                <MaterialIcon 
                  name="help" 
                  className="absolute -bottom-4 -right-4 text-primary-foreground/10 text-8xl sm:text-9xl" 
                />
              </div>
            </div>
          </aside>

          {/* Results Content Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-bold text-muted-foreground">
                SHOWING <span className="text-foreground">{filteredCards.length} CARDS</span> MATCHING YOUR CRITERIA
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
                  <p className="text-lg font-bold mb-2">No cards found</p>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
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
          <div className="fixed bottom-16 md:bottom-4 left-4 right-4 bg-card border border-primary/20 rounded-xl p-4 shadow-lg z-40">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MaterialIcon name="compare_arrows" className="text-primary text-xl" />
                <span className="font-bold">{compareList.length} cards selected</span>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setCompareList([])}>
                  Clear
                </Button>
                <Button 
                  disabled={compareList.length < 2}
                  onClick={() => setShowCompareModal(true)}
                >
                  Compare Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Compare Modal */}
        <CompareModal
          open={showCompareModal}
          onOpenChange={setShowCompareModal}
          cards={cardsForCompare}
          onRemoveCard={handleRemoveFromCompare}
        />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Compare;
