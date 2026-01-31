import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const savedCards = [
  {
    id: 1,
    bank: "City Bank",
    bankCode: "City",
    name: "American Express",
    lastFour: "4291",
    color: "bg-green-800",
  },
  {
    id: 2,
    bank: "Eastern Bank",
    bankCode: "EBL",
    name: "Skybanking Visa",
    lastFour: "8820",
    color: "bg-blue-900",
  },
  {
    id: 3,
    bank: "Mutual Trust Bank",
    bankCode: "MTB",
    name: "Titanium Mastercard",
    lastFour: "1104",
    color: "bg-red-800",
  },
];

const recommendations = [
  {
    id: 1,
    bank: "Standard Chartered",
    name: "Visa Platinum",
    tag: "গ্রোসারি কেনাকাটায় সেরা",
    benefit: "12% ছাড়",
    score: 750,
  },
  {
    id: 2,
    bank: "BRAC Bank",
    name: "World Mastercard",
    tag: "ভ্রমণে সেরা",
    benefit: "Buy 1 Get 1",
    score: null,
  },
];

const menuItems = [
  { icon: "dashboard", label: "ড্যাশবোর্ড", active: true },
  { icon: "credit_card", label: "আমার কার্ড", active: false },
  { icon: "bookmark", label: "সংরক্ষিত", active: false },
  { icon: "history", label: "আবেদনসমূহ", active: false },
  { icon: "settings", label: "সেটিংস", active: false },
];

const Dashboard = () => {
  const [profileCompletion] = useState(65);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Mobile Profile Header */}
        <div className="lg:hidden mb-6">
          <div className="bg-card rounded-xl border border-primary/10 p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MaterialIcon name="person" className="text-2xl text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">স্বাগতম!</h3>
                <p className="text-sm text-muted-foreground truncate">user@example.com</p>
              </div>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg bg-muted"
              >
                <MaterialIcon name="menu" />
              </button>
            </div>

            {/* Profile Completion */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">প্রোফাইল সম্পন্ন</span>
                <span className="font-bold text-primary">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>

            {/* Mobile Menu - Collapsible */}
            {showSidebar && (
              <nav className="mt-4 pt-4 border-t border-primary/10 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${item.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <MaterialIcon name={item.icon} className="text-lg" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
                  <MaterialIcon name="logout" className="text-lg" />
                  <span className="font-medium text-sm">লগ আউট</span>
                </button>
              </nav>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-card rounded-xl border border-primary/10 p-6 sticky top-24">
              {/* Profile */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MaterialIcon name="person" className="text-4xl text-primary" />
                </div>
                <h3 className="font-bold">স্বাগতম!</h3>
                <p className="text-sm text-muted-foreground">user@example.com</p>
              </div>

              {/* Profile Completion */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">প্রোফাইল সম্পন্ন</span>
                  <span className="font-bold text-primary">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${item.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <MaterialIcon name={item.icon} className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-primary/10">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
                  <MaterialIcon name="logout" className="text-lg" />
                  <span className="font-medium">লগ আউট</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Quick Actions - Mobile first */}
            <section className="lg:order-last">
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">দ্রুত অ্যাকশন</h2>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { icon: "add_card", label: "কার্ড যোগ", href: "/compare" },
                  { icon: "compare_arrows", label: "তুলনা করুন", href: "/compare" },
                  { icon: "calculate", label: "ইএমআই ক্যালক", href: "/loans" },
                  { icon: "support_agent", label: "সহায়তা", href: "/contact" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center hover:bg-primary/5 transition-colors"
                  >
                    <MaterialIcon name={action.icon} className="text-xl sm:text-3xl text-primary mb-1 sm:mb-2" />
                    <span className="text-[10px] sm:text-sm font-medium block truncate">{action.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Saved Cards */}
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold">সংরক্ষিত কার্ড</h2>
                <Button variant="outline" size="sm" className="text-primary border-primary text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3" asChild>
                  <Link to="/compare">
                    <MaterialIcon name="visibility" className="mr-1 text-sm" />
                    <span className="hidden xs:inline">সবগুলো দেখুন</span>
                    <span className="xs:hidden">সব</span>
                  </Link>
                </Button>
              </div>

              {/* Horizontal scroll on mobile */}
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-card rounded-xl border border-primary/10 p-3 sm:p-4 hover:shadow-lg transition-shadow shrink-0 w-[260px] sm:w-auto"
                  >
                    <div className={`${card.color} rounded-lg p-3 sm:p-4 mb-3 sm:mb-4`}>
                      <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <span className="text-white text-[10px] sm:text-xs font-bold uppercase">{card.bank}</span>
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm tracking-widest mb-1 sm:mb-2">
                        **** **** **** {card.lastFour}
                      </div>
                      <div className="text-white text-[10px] sm:text-xs">{card.name}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-[10px] sm:text-xs h-8" asChild>
                        <Link to="/compare">বিস্তারিত</Link>
                      </Button>
                      <Button size="sm" className="flex-1 text-[10px] sm:text-xs h-8" asChild>
                        <Link to="/eligibility">আবেদন</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">আপনার জন্য সুপারিশকৃত</h2>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-card rounded-xl border border-primary/10 p-4 sm:p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-xs font-semibold text-primary uppercase">{rec.tag}</span>
                        <h3 className="font-bold mt-0.5 sm:mt-1 truncate">{rec.bank}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{rec.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg sm:text-2xl font-bold text-primary">{rec.benefit}</div>
                        {rec.score && (
                          <div className="text-[10px] sm:text-xs text-muted-foreground">{rec.score} ভালো (Score)</div>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="w-full h-9" asChild>
                      <Link to="/compare">বিস্তারিত দেখুন</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
