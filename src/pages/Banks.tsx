import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SearchBar from "@/components/ui/SearchBar";
import BankCard from "@/components/cards/BankCard";
import { fetchBanks, type Bank } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface BankWithCounts extends Bank {
  cardCount: number;
  loanProducts: number;
}

const Banks = () => {
  const [banks, setBanks] = useState<BankWithCounts[]>([]);
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
      // Fetch banks with product counts
      const banksData = await fetchBanks();
      
      // Get counts for each bank
      const banksWithCounts = await Promise.all(
        banksData.map(async (bank) => {
          const [cardsResult, loansResult] = await Promise.all([
            supabase.from('credit_cards').select('id', { count: 'exact', head: true }).eq('bank_id', bank.id),
            supabase.from('loan_products').select('id', { count: 'exact', head: true }).eq('bank_id', bank.id),
          ]);
          return {
            ...bank,
            cardCount: cardsResult.count || 0,
            loanProducts: loansResult.count || 0,
          };
        })
      );
      
      setBanks(banksWithCounts);
      
      // Get overall stats
      const [totalCards, totalLoans, totalSavings] = await Promise.all([
        supabase.from('credit_cards').select('id', { count: 'exact', head: true }),
        supabase.from('loan_products').select('id', { count: 'exact', head: true }),
        supabase.from('savings_rates').select('id', { count: 'exact', head: true }),
      ]);
      
      setStats({
        banks: banksWithCounts.length,
        cards: totalCards.count || 0,
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
      (bank.swift_code?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Generate a consistent color based on bank type
  const getBankColor = (type: string) => {
    const colors: Record<string, string> = {
      commercial: "bg-green-800",
      foreign: "bg-blue-800",
      islamic: "bg-emerald-700",
      specialized: "bg-purple-800",
    };
    return colors[type] || "bg-gray-700";
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Page Heading */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-2">
            Bank <span className="text-primary">Partners</span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">
            Explore all our partner banks in Bangladesh. Compare their credit cards, loans, and savings products.
            <span className="hidden sm:block mt-1 font-bengali">
              বাংলাদেশের শীর্ষ ব্যাংকগুলোর প্রোডাক্ট তুলনা করুন।
            </span>
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8 max-w-md">
          <SearchBar
            placeholder="Search banks by name..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.banks}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Partner Banks</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.cards}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Credit Cards</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.loans}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Loan Products</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">
              {loading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.fdr}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">FDR Options</div>
          </div>
        </div>

        {/* Bank Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card p-4 rounded-xl border border-primary/10">
                <Skeleton className="w-16 h-16 rounded-xl mb-4" />
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredBanks.map((bank) => (
              <BankCard 
                key={bank.id} 
                bank={{
                  id: typeof bank.id === 'string' ? parseInt(bank.id.substring(0, 8), 16) : 1,
                  name: bank.name,
                  code: bank.swift_code?.substring(0, 4) || bank.name.substring(0, 4).toUpperCase(),
                  cardCount: bank.cardCount,
                  loanProducts: bank.loanProducts,
                  color: getBankColor(bank.type),
                }} 
              />
            ))}
          </div>
        )}

        {!loading && filteredBanks.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <MaterialIcon name="search_off" className="text-5xl sm:text-6xl text-muted-foreground mb-4" />
            <p className="text-base sm:text-lg text-muted-foreground">No banks found matching "{searchQuery}"</p>
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Banks;
