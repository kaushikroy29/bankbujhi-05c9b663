import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SearchBar from "@/components/ui/SearchBar";
import BankCard from "@/components/cards/BankCard";

const banks = [
  { id: 1, name: "City Bank", code: "City", cardCount: 12, loanProducts: 5, color: "bg-green-800" },
  { id: 2, name: "BRAC Bank", code: "BRAC", cardCount: 15, loanProducts: 8, color: "bg-red-700" },
  { id: 3, name: "Eastern Bank", code: "EBL", cardCount: 10, loanProducts: 6, color: "bg-blue-900" },
  { id: 4, name: "Standard Chartered", code: "SCB", cardCount: 18, loanProducts: 7, color: "bg-teal-700" },
  { id: 5, name: "Dutch Bangla Bank", code: "DBBL", cardCount: 8, loanProducts: 4, color: "bg-orange-700" },
  { id: 6, name: "Mutual Trust Bank", code: "MTB", cardCount: 9, loanProducts: 5, color: "bg-red-800" },
  { id: 7, name: "HSBC Bangladesh", code: "HSBC", cardCount: 14, loanProducts: 6, color: "bg-red-600" },
  { id: 8, name: "Prime Bank", code: "Prime", cardCount: 11, loanProducts: 7, color: "bg-blue-700" },
  { id: 9, name: "United Commercial Bank", code: "UCB", cardCount: 7, loanProducts: 4, color: "bg-purple-800" },
  { id: 10, name: "Islami Bank", code: "IBBL", cardCount: 6, loanProducts: 5, color: "bg-green-700" },
  { id: 11, name: "Bank Asia", code: "BAL", cardCount: 8, loanProducts: 4, color: "bg-blue-800" },
  { id: 12, name: "NCC Bank", code: "NCC", cardCount: 5, loanProducts: 3, color: "bg-indigo-700" },
];

const Banks = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanks = banks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="text-2xl sm:text-3xl font-black text-primary">{banks.length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Partner Banks</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">50+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Credit Cards</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">30+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Loan Products</div>
          </div>
          <div className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">20+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">FDR Options</div>
          </div>
        </div>

        {/* Bank Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredBanks.map((bank) => (
            <BankCard key={bank.id} bank={bank} />
          ))}
        </div>

        {filteredBanks.length === 0 && (
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
