import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { fetchBanks, fetchCreditCards, type Bank, type CreditCard } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface BankWithDetails extends Bank {
  cardCount: number;
  loanProducts: number;
  bestCard?: CreditCard;
}

const Banks = () => {
  const [banks, setBanks] = useState<BankWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    banks: 0,
    cards: 0,
    loans: 0,
    fdr: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch banks and all cards
      const [banksData, allCards] = await Promise.all([
        fetchBanks(),
        fetchCreditCards(),
      ]);
      
      // Get counts and best card for each bank
      const banksWithDetails = await Promise.all(
        banksData.map(async (bank) => {
          const [loansResult] = await Promise.all([
            supabase.from('loan_products').select('id', { count: 'exact', head: true }).eq('bank_id', bank.id),
          ]);
          
          // Find cards for this bank and get the best one (with badge or highest benefits)
          const bankCards = allCards.filter(c => c.bank_id === bank.id);
          const bestCard = bankCards.find(c => c.badge) || bankCards[0];
          
          return {
            ...bank,
            cardCount: bankCards.length,
            loanProducts: loansResult.count || 0,
            bestCard,
          };
        })
      );
      
      setBanks(banksWithDetails);
      
      // Get overall stats
      const [totalLoans, totalSavings] = await Promise.all([
        supabase.from('loan_products').select('id', { count: 'exact', head: true }),
        supabase.from('savings_rates').select('id', { count: 'exact', head: true }),
      ]);
      
      setStats({
        banks: banksWithDetails.length,
        cards: allCards.length,
        loans: totalLoans.count || 0,
        fdr: totalSavings.count || 0,
      });
    } catch (error) {
      console.error("Error loading banks:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bank.name_bn?.includes(searchQuery)) ||
      (bank.swift_code?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Generate a consistent color based on bank type
  const getBankColor = (type: string) => {
    const colors: Record<string, string> = {
      commercial: "from-green-700 to-green-900",
      foreign: "from-blue-700 to-blue-900",
      islamic: "from-emerald-600 to-emerald-800",
      specialized: "from-purple-700 to-purple-900",
    };
    return colors[type] || "from-gray-700 to-gray-900";
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumb */}
        <PageBreadcrumb 
          items={[{ label: "ব্যাংক ডিরেক্টরি" }]} 
          className="mb-6"
        />

        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-foreground mb-2">
            ব্যাংক <span className="text-primary">ডিরেক্টরি</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            বাংলাদেশের শীর্ষ ব্যাংকগুলোর ক্রেডিট কার্ড, লোন ও সেভিংস প্রোডাক্ট তুলনা করুন।
          </p>
        </div>

        {/* Trust Note */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg w-fit mb-6">
          <MaterialIcon name="info" className="text-primary text-sm" />
          আমরা কোনো ব্যাংকের মালিকানাধীন নই। নিরপেক্ষ তথ্য প্রদান করি।
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8 max-w-md">
          <SearchBar
            placeholder="ব্যাংক খুঁজুন..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.banks}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">পার্টনার ব্যাংক</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.cards}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">ক্রেডিট কার্ড</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.loans}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">লোন প্রোডাক্ট</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.fdr}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">এফডিআর অপশন</div>
          </div>
        </div>

        {/* Bank Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card p-5 rounded-xl border border-primary/10">
                <Skeleton className="w-14 h-14 rounded-xl mb-4" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBanks.map((bank) => (
              <div 
                key={bank.id} 
                className="bg-card rounded-xl border border-primary/10 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Bank Header */}
                <div className={`bg-gradient-to-r ${getBankColor(bank.type)} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <MaterialIcon name="account_balance" className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{bank.name}</h3>
                      {bank.name_bn && (
                        <p className="text-white/80 text-sm">{bank.name_bn}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bank Info */}
                <div className="p-4">
                  {/* Product Counts */}
                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <MaterialIcon name="credit_card" className="text-primary text-lg" />
                      <span className="font-bold">{bank.cardCount}</span>
                      <span className="text-muted-foreground">কার্ড</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MaterialIcon name="payments" className="text-primary text-lg" />
                      <span className="font-bold">{bank.loanProducts}</span>
                      <span className="text-muted-foreground">লোন</span>
                    </div>
                  </div>

                  {/* Best Card Highlight */}
                  {bank.bestCard && (
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-4">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                        সেরা কার্ড
                      </p>
                      <p className="font-semibold text-sm">{bank.bestCard.name}</p>
                      {bank.bestCard.badge && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-accent/20 text-accent text-xs font-bold rounded-full">
                          {bank.bestCard.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <Button 
                    variant="outline" 
                    className="w-full font-bold gap-2"
                    asChild
                  >
                    <Link to={`/compare?bank=${bank.id}`}>
                      <MaterialIcon name="visibility" className="text-lg" />
                      এই ব্যাংকের সব কার্ড দেখুন
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBanks.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <MaterialIcon name="search_off" className="text-5xl sm:text-6xl text-muted-foreground mb-4" />
            <p className="text-base sm:text-lg text-muted-foreground">
              "{searchQuery}" দিয়ে কোনো ব্যাংক পাওয়া যায়নি
            </p>
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Banks;
