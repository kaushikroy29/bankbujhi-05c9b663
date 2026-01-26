import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CreditCardListing from "@/components/cards/CreditCardListing";

const filterCategories = [
  { icon: "account_balance", label: "Bank Name" },
  { icon: "credit_card", label: "Card Type", isActive: true },
  { icon: "featured_seasonal_and_gifts", label: "Rewards" },
  { icon: "currency_exchange", label: "Income Level" },
];

const creditCards = [
  {
    id: "1",
    bank: "City Bank",
    name: "American Express Cashback Card",
    category: "Lifestyle & Daily Essentials",
    annualFee: "Free",
    annualFeeNote: "Annual Fee",
    benefits: [
      { icon: "local_mall", text: "1% Cashback on all groceries" },
      { icon: "flight_takeoff", text: "Airport Lounge Access" },
    ],
    badge: "Top Rated",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChJn49OYUwsQijWezZmLPBBn7NRLhhgQYtGq0GZYK09qbbkGLGhWHXX4Q4EQScZhmpsjPmpAs2YILFyipRk3T3PB5mpBBltNgY8F4fZ-IJWdWMFYLwDfMLm7owKEUzkvmcnqOTXvBb3BTxlLfeXa-Fy6WqbCmP7GB2YEvmy14T3c1JZ42QdlyJkKotjnrz-8mHVdAGYvOkwS9DbVv4m4VQ2bIkRF9vABePrHVSvnw-c3mGQYCWleLr-BEH1OWWKjoS_tKp2B61bP8",
  },
  {
    id: "2",
    bank: "BRAC Bank",
    name: "VISA Signature Card",
    category: "Premium Travel & Rewards",
    annualFee: "৳0",
    annualFeeNote: "৳5,000",
    annualFeeStrikethrough: true,
    benefits: [
      { icon: "restaurant", text: "Buy 1 Get 1 at 100+ Dinings" },
      { icon: "hotel", text: "15% Discount on top hotels" },
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmUARpGFpmotra-SYHvfXNkjeaDanbaO5mdJ-LxYMPDYtBGLYF64nhPhaHAMPZeOxQYAoWXi8nniKbTrIzHOvqqhxfTMcyvU8pNc_EkbIljuiwuOkOjL0afyNepQpZnL0VxBsJ7IlbQ9rDr4EOan_oGn55__8LVUB0hhlvmLZkPY_qG1iHupJYH3t5hbPAFCeaQEGE39jf2Ib4pLVBZYFDanXgVmH4ekRiWNSrUu1HO47EBsQXshLfdW-YuPYskSZeBmIBLnHRhb8",
  },
  {
    id: "3",
    bank: "Standard Chartered",
    name: "Mastercard Platinum Card",
    category: "Shopping & Utility Payments",
    annualFee: "Free",
    annualFeeNote: "Lifetime Free",
    benefits: [
      { icon: "bolt", text: "5% Reward on utility bills" },
      { icon: "movie", text: "Buy 1 Get 1 Cineplex Tickets" },
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf7qTA98WGNaYJzckTNPG1m-1qeJ8ohCneNWbiojCOKY4FcZQLXOWOnTQppDjZgDNasG5Go33HYxkZ_d8_j8SNr3ixDjvN89fgMW-uMTTTgVojncNYOuylm5f97RLHT3_VTsyUU3kYBjk_ZiZlbAuNNGXy2vRDE2CvDuRBJXv-X_V-bIC8S6rCzp6TDhrBzg3leMi7hRq0UWzR4iwC8WGOhMQL5Zg1D0MzVEpM5rPIY6EMli4X8DMvFCA9iIy7AX_OSYIk4hQml-0",
  },
];

const selectedFilters = ["No Annual Fee", "Cashback"];

const Compare = () => {
  const [compareList, setCompareList] = useState<string[]>(["2"]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCompare = (id: string) => {
    setCompareList(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
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
              {selectedFilters.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedFilters.length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 bg-card p-2 rounded-xl border border-primary/10 flex-1 sm:flex-none">
              <span className="text-xs sm:text-sm font-medium pl-2 hidden sm:inline">Sort by:</span>
              <select className="bg-transparent border-none text-xs sm:text-sm font-bold focus:ring-0 text-primary cursor-pointer flex-1 sm:flex-none">
                <option>Popularity</option>
                <option>Lowest Interest</option>
                <option>Highest Rewards</option>
                <option>Annual Fee (Low-High)</option>
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
                  <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">
                    Clear All
                  </button>
                </div>

                {/* Selected Filters Section */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 sm:mb-3">
                    Selected Filters
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filter) => (
                      <button
                        key={filter}
                        className="flex items-center gap-1 bg-primary/10 text-primary px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold group"
                      >
                        {filter}
                        <MaterialIcon name="close" className="text-sm group-hover:scale-110" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Categories */}
                <div className="flex flex-col gap-2">
                  {filterCategories.map((cat) => (
                    <div
                      key={cat.label}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl cursor-pointer transition-colors ${
                        cat.isActive
                          ? "bg-primary/5 border border-primary/20"
                          : "hover:bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <MaterialIcon name={cat.icon} className="text-primary text-lg sm:text-xl" />
                        <span className="text-xs sm:text-sm font-semibold">{cat.label}</span>
                      </div>
                      <MaterialIcon 
                        name={cat.isActive ? "expand_less" : "expand_more"} 
                        className={cat.isActive ? "text-primary" : "text-muted-foreground"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Card - Hidden on mobile when filters shown */}
              <div className="hidden sm:block bg-primary rounded-2xl p-5 sm:p-6 text-primary-foreground overflow-hidden relative">
                <div className="relative z-10">
                  <h4 className="font-bold text-base sm:text-lg mb-2">Need Help Choosing?</h4>
                  <p className="text-primary-foreground/80 text-xs sm:text-sm mb-4">
                    Our financial experts are here to help you pick the right card.
                  </p>
                  <Button variant="secondary" className="font-bold text-sm">
                    Chat with Guru
                  </Button>
                </div>
                <MaterialIcon 
                  name="warning" 
                  className="absolute -bottom-4 -right-4 text-primary-foreground/10 text-8xl sm:text-9xl" 
                />
              </div>
            </div>
          </aside>

          {/* Results Content Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-bold text-muted-foreground">
                SHOWING <span className="text-foreground">{creditCards.length} CARDS</span> MATCHING YOUR CRITERIA
              </p>
            </div>

            {/* Card List */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {creditCards.map((card) => (
                <CreditCardListing
                  key={card.id}
                  card={card}
                  isComparing={compareList.includes(card.id)}
                  onToggleCompare={() => toggleCompare(card.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Compare;
