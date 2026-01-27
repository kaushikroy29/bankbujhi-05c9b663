import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import SEOHead from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { fetchCreditCards, fetchBanks, type CreditCard, type Bank } from "@/lib/api/banks";
import { cn } from "@/lib/utils";

// Fee ranges for filtering
const feeRanges = [
  { id: "free", label: "ফ্রি", min: 0, max: 0 },
  { id: "low", label: "৳1 - ৳2,000", min: 1, max: 2000 },
  { id: "mid", label: "৳2,001 - ৳5,000", min: 2001, max: 5000 },
  { id: "high", label: "৳5,001+", min: 5001, max: Infinity },
];

// Card types
const cardTypes = [
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "amex", label: "American Express" },
];

// Parse annual fee string to number
const parseAnnualFee = (fee: string | null): number => {
  if (!fee) return 0;
  const match = fee.replace(/,/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// Check if card has cashback benefit
const hasCashback = (card: CreditCard): boolean => {
  const categoryLower = card.category?.toLowerCase() || "";
  const benefitsText = card.benefits.map(b => b.text.toLowerCase()).join(" ");
  return categoryLower.includes("cashback") || benefitsText.includes("cashback");
};

// Get primary benefit text
const getPrimaryBenefit = (card: CreditCard): string => {
  if (card.benefits.length > 0) {
    return card.benefits[0].text;
  }
  return card.category || "Credit Card";
};

const CreditCards = () => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Filter states
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [selectedFeeRanges, setSelectedFeeRanges] = useState<string[]>([]);
  const [cashbackOnly, setCashbackOnly] = useState(false);
  const [selectedCardTypes, setSelectedCardTypes] = useState<string[]>([]);
  const [isIslamicOnly, setIsIslamicOnly] = useState<boolean | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cardsData, banksData] = await Promise.all([
        fetchCreditCards(),
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

  // Filter cards
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Bank filter
      if (selectedBanks.length > 0 && card.bank_id && !selectedBanks.includes(card.bank_id)) {
        return false;
      }

      // Fee range filter
      if (selectedFeeRanges.length > 0) {
        const fee = parseAnnualFee(card.annual_fee);
        const inRange = selectedFeeRanges.some((rangeId) => {
          const range = feeRanges.find((r) => r.id === rangeId);
          if (!range) return false;
          return fee >= range.min && fee <= range.max;
        });
        if (!inRange) return false;
      }

      // Cashback filter
      if (cashbackOnly && !hasCashback(card)) {
        return false;
      }

      // Card type filter (check card name for type)
      if (selectedCardTypes.length > 0) {
        const nameLower = card.name.toLowerCase();
        const matchesType = selectedCardTypes.some((type) => nameLower.includes(type));
        if (!matchesType) return false;
      }

      // Islamic filter
      if (isIslamicOnly !== null) {
        const nameLower = card.name.toLowerCase();
        const categoryLower = card.category?.toLowerCase() || "";
        const isIslamic = nameLower.includes("islamic") || categoryLower.includes("islamic") || nameLower.includes("shariah");
        if (isIslamicOnly && !isIslamic) return false;
        if (!isIslamicOnly && isIslamic) return false;
      }

      return true;
    });
  }, [cards, selectedBanks, selectedFeeRanges, cashbackOnly, selectedCardTypes, isIslamicOnly]);

  // Toggle bank filter
  const toggleBank = (bankId: string) => {
    setSelectedBanks((prev) =>
      prev.includes(bankId) ? prev.filter((id) => id !== bankId) : [...prev, bankId]
    );
  };

  // Toggle fee range filter
  const toggleFeeRange = (rangeId: string) => {
    setSelectedFeeRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]
    );
  };

  // Toggle card type filter
  const toggleCardType = (typeId: string) => {
    setSelectedCardTypes((prev) =>
      prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]
    );
  };

  // Toggle compare
  const toggleCompare = (cardId: string) => {
    setCompareList((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      }
      if (prev.length >= 3) {
        return prev; // Max 3 cards
      }
      return [...prev, cardId];
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBanks([]);
    setSelectedFeeRanges([]);
    setCashbackOnly(false);
    setSelectedCardTypes([]);
    setIsIslamicOnly(null);
  };

  const hasActiveFilters = selectedBanks.length > 0 || selectedFeeRanges.length > 0 || cashbackOnly || selectedCardTypes.length > 0 || isIslamicOnly !== null;

  // Filter sidebar content
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full justify-start text-destructive">
          <MaterialIcon name="clear" className="mr-2" />
          ফিল্টার সাফ করুন
        </Button>
      )}

      {/* Bank Filter */}
      <div>
        <h4 className="font-bold text-foreground mb-3 text-sm">ব্যাংক</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {banks.map((bank) => (
            <div key={bank.id} className="flex items-center space-x-2">
              <Checkbox
                id={`bank-${bank.id}`}
                checked={selectedBanks.includes(bank.id)}
                onCheckedChange={() => toggleBank(bank.id)}
              />
              <Label htmlFor={`bank-${bank.id}`} className="text-sm cursor-pointer">
                {bank.name_bn || bank.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Fee Filter */}
      <div>
        <h4 className="font-bold text-foreground mb-3 text-sm">বার্ষিক ফি</h4>
        <div className="space-y-2">
          {feeRanges.map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox
                id={`fee-${range.id}`}
                checked={selectedFeeRanges.includes(range.id)}
                onCheckedChange={() => toggleFeeRange(range.id)}
              />
              <Label htmlFor={`fee-${range.id}`} className="text-sm cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Cashback Filter */}
      <div>
        <h4 className="font-bold text-foreground mb-3 text-sm">ক্যাশব্যাক</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cashback"
            checked={cashbackOnly}
            onCheckedChange={(checked) => setCashbackOnly(checked as boolean)}
          />
          <Label htmlFor="cashback" className="text-sm cursor-pointer">
            শুধুমাত্র ক্যাশব্যাক কার্ড
          </Label>
        </div>
      </div>

      {/* Card Type Filter */}
      <div>
        <h4 className="font-bold text-foreground mb-3 text-sm">কার্ড টাইপ</h4>
        <div className="space-y-2">
          {cardTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type.id}`}
                checked={selectedCardTypes.includes(type.id)}
                onCheckedChange={() => toggleCardType(type.id)}
              />
              <Label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Islamic/Conventional Filter */}
      <div>
        <h4 className="font-bold text-foreground mb-3 text-sm">ধরন</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="islamic"
              checked={isIslamicOnly === true}
              onCheckedChange={(checked) => setIsIslamicOnly(checked ? true : null)}
            />
            <Label htmlFor="islamic" className="text-sm cursor-pointer">
              ইসলামিক
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="conventional"
              checked={isIslamicOnly === false}
              onCheckedChange={(checked) => setIsIslamicOnly(checked ? false : null)}
            />
            <Label htmlFor="conventional" className="text-sm cursor-pointer">
              প্রচলিত
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEOHead
        title="বাংলাদেশের ক্রেডিট কার্ডসমূহ | BankBujhi"
        description="বাংলাদেশের সব ব্যাংকের ক্রেডিট কার্ড দেখুন ও তুলনা করুন। ফি, ক্যাশব্যাক ও সুবিধা বিশ্লেষণ।"
        path="/credit-cards"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <div className="container-padding py-8 md:py-12">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                  বাংলাদেশের ক্রেডিট কার্ডসমূহ
                </h1>
                <p className="text-muted-foreground mt-2">
                  {loading ? "লোড হচ্ছে..." : `${filteredCards.length}টি কার্ড পাওয়া গেছে`}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 shrink-0">
                  <Card className="sticky top-24 bg-card border-primary/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <MaterialIcon name="filter_list" className="text-primary" />
                        <h3 className="font-bold text-foreground">ফিল্টার</h3>
                      </div>
                      <FilterContent />
                    </CardContent>
                  </Card>
                </aside>

                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full gap-2 border-primary/20">
                        <MaterialIcon name="filter_list" />
                        ফিল্টার করুন
                        {hasActiveFilters && (
                          <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                            {selectedBanks.length + selectedFeeRanges.length + selectedCardTypes.length + (cashbackOnly ? 1 : 0) + (isIslamicOnly !== null ? 1 : 0)}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 bg-card">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <MaterialIcon name="filter_list" className="text-primary" />
                          ফিল্টার
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Card Grid */}
                <div className="flex-1">
                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-72 rounded-xl" />
                      ))}
                    </div>
                  ) : filteredCards.length === 0 ? (
                    // Empty State
                    <Card className="bg-card border-primary/10">
                      <CardContent className="p-12 text-center">
                        <MaterialIcon name="credit_card_off" className="text-5xl text-muted-foreground mb-4" />
                        <h3 className="font-bold text-lg text-foreground mb-2">
                          আপনার ফিল্টারের সাথে কোনো কার্ড পাওয়া যায়নি
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
                        </p>
                        <Button variant="outline" onClick={clearFilters}>
                          ফিল্টার সাফ করুন
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredCards.map((card) => (
                        <Card
                          key={card.id}
                          className="bg-card border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
                        >
                          <CardContent className="p-5 flex flex-col h-full">
                            {/* Bank Logo & Badge */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {card.banks?.logo_url ? (
                                  <img
                                    src={card.banks.logo_url}
                                    alt={card.banks.name}
                                    className="w-10 h-10 object-contain rounded"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                                    <MaterialIcon name="account_balance" className="text-muted-foreground" />
                                  </div>
                                )}
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    {card.banks?.name_bn || card.banks?.name || "Bank"}
                                  </p>
                                </div>
                              </div>
                              {card.badge && (
                                <span className="bg-accent/20 text-accent text-[10px] font-bold px-2 py-1 rounded-full">
                                  {card.badge}
                                </span>
                              )}
                            </div>

                            {/* Card Name */}
                            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                              {card.name}
                            </h3>

                            {/* Details */}
                            <div className="space-y-2 py-3 border-t border-b border-primary/10 mb-4 flex-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">বার্ষিক ফি</span>
                                <span className="font-semibold text-foreground">
                                  {card.annual_fee || "তথ্য নেই"}
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <MaterialIcon name="check_circle" className="text-primary text-sm mt-0.5" />
                                <span className="text-sm text-muted-foreground line-clamp-2">
                                  {getPrimaryBenefit(card)}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className={cn(
                                  "flex-1 text-xs font-semibold gap-1",
                                  compareList.includes(card.id)
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-primary/30 text-primary hover:bg-primary/5"
                                )}
                                onClick={() => toggleCompare(card.id)}
                                disabled={!compareList.includes(card.id) && compareList.length >= 3}
                              >
                                <MaterialIcon name={compareList.includes(card.id) ? "check" : "add"} className="text-sm" />
                                তুলনায় যোগ করুন
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 text-xs font-semibold"
                                asChild
                              >
                                <Link to={`/cards/${card.id}`}>বিস্তারিত</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Compare Bar */}
              {compareList.length > 0 && (
                <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-40">
                  <Card className="bg-primary text-primary-foreground shadow-xl border-0">
                    <CardContent className="p-4 flex items-center gap-4">
                      <span className="font-semibold">
                        {compareList.length}টি কার্ড নির্বাচিত
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="font-bold"
                        asChild
                      >
                        <Link to={`/compare?cards=${compareList.join(",")}`}>
                          তুলনা করুন
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={() => setCompareList([])}
                      >
                        <MaterialIcon name="close" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
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

export default CreditCards;
