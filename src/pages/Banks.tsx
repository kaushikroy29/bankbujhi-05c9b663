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
import SEOHead from "@/components/seo/SEOHead";
import TrustScoreBadge from "@/components/ui/TrustScoreBadge";
import { Badge } from "@/components/ui/badge";

interface BankWithDetails extends Bank {
  cardCount: number;
  loanProducts: number;
  bestCard?: CreditCard;
}

const Banks = () => {
  const [banks, setBanks] = useState<BankWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [stats, setStats] = useState({
    banks: 0,
    cards: 0,
    loans: 0,
    fdr: 0,
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch banks and all cards
      const [banksData, allCards] = await Promise.all([
        fetchBanks(),
        fetchCreditCards(),
      ]);

      // Filter to only include actual BANKS (exclude NBFIs/MFIs if they share the table, assuming 'bank' related types)
      // For this phase, we'll assume the API returns everything and we filter/categorize here or the API should change.
      // Based on typical data, we'll just show all for now but categorize them visually.

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
      (selectedType === "all" || bank.type.toLowerCase() === selectedType.toLowerCase()) &&
      (bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (bank.name_bn?.includes(searchQuery)) ||
        (bank.swift_code?.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Generate a consistent color based on bank type
  const getBankColor = (type: string) => {
    const colors: Record<string, string> = {
      commercial: "from-green-700 to-green-900",
      foreign: "from-blue-700 to-blue-900",
      islamic: "from-emerald-600 to-emerald-800",
      specialized: "from-purple-700 to-purple-900",
      state_owned: "from-teal-700 to-teal-900",
    };
    // Clean type string to match keys
    const normalizedType = type.toLowerCase().replace(' ', '_');
    return colors[normalizedType] || "from-gray-700 to-gray-900";
  };

  const bankTypes = [
    { id: "all", label: "সব ব্যাংক" },
    { id: "commercial", label: "বেসরকারি" },
    { id: "state_owned", label: "সরকারি" },
    { id: "islamic", label: "ইসলামি" },
    { id: "foreign", label: "বিদেশি" },
  ];

  return (
    <>
      <SEOHead
        title="ব্যাংক ডিরেক্টরি | BankBujhi"
        description="বাংলাদেশের সব ব্যাংকের তথ্য। ক্রেডিট কার্ড, লোন ও সেভিংস প্রোডাক্ট তুলনা করুন।"
        image="https://bankbujhi.lovable.app/og/og-banks.jpg"
        path="/banks"
      />
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
              ব্যাংক অফ বাংলাদেশ দ্বারা নিয়ন্ত্রিত ব্যাংকগুলোর তথ্য জানুন এবং তুলনা করুন।
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 space-y-4">
            <div className="max-w-md">
              <SearchBar
                placeholder="ব্যাংক খুঁজুন..."
                onSearch={setSearchQuery}
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {bankTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedType === type.id
                      ? "bg-primary text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {type.label}
                </button>
              ))}
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
                  className="bg-card rounded-xl border border-primary/10 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full"
                >
                  {/* Bank Header */}
                  <div className={`bg-gradient-to-r ${getBankColor(bank.type)} p-4 text-white relative`}>
                    <div className="absolute top-3 right-3">
                      {/* Hardcoded High Trust for Banks per design */}
                      <div className="bg-white/90 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <MaterialIcon name="verified_user" className="text-xs" />
                        High Trust
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm">
                        {bank.logo_url ? (
                          <img src={bank.logo_url} alt={bank.name} className="w-full h-full object-contain" />
                        ) : (
                          <MaterialIcon name="account_balance" className="text-2xl text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{bank.name}</h3>
                        {bank.name_bn && (
                          <p className="text-white/80 text-xs">{bank.name_bn}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Trust & Reg Info */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium capitalize">{bank.type.replace('_', ' ')}</span>
                    <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                      <MaterialIcon name="gavel" className="text-[10px]" />
                      Regulated by BB
                    </span>
                  </div>

                  {/* Services Body */}
                  <div className="p-4 flex-1">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-blue-50/50 p-2 rounded border border-blue-100 text-center">
                        <span className="block font-black text-lg text-blue-700">{bank.cardCount}</span>
                        <span className="text-[10px] text-blue-600 uppercase tracking-wide">Cards</span>
                      </div>
                      <div className="bg-emerald-50/50 p-2 rounded border border-emerald-100 text-center">
                        <span className="block font-black text-lg text-emerald-700">{bank.loanProducts}</span>
                        <span className="text-[10px] text-emerald-600 uppercase tracking-wide">Loans</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MaterialIcon name="check_circle" className="text-green-500 text-base" />
                        <span>Savings / Current Accounts</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MaterialIcon name="check_circle" className="text-green-500 text-base" />
                        <span>Fixed Deposits (FDR/DPS)</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-4 pt-0 mt-auto">
                    <Button
                      className="w-full font-bold gap-2 bg-slate-900 text-white hover:bg-slate-800"
                      asChild
                    >
                      <Link to={`/compare?bank=${bank.id}`}>
                        View Products
                        <MaterialIcon name="arrow_forward" className="text-lg" />
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
    </>
  );
};

export default Banks;
