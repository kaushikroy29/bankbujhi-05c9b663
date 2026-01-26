import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CreditCardVisual from "@/components/cards/CreditCardVisual";

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
    tag: "Best for Groceries",
    benefit: "12% ছাড়",
    score: 750,
  },
  {
    id: 2,
    bank: "BRAC Bank",
    name: "World Mastercard",
    tag: "Best for Travel",
    benefit: "Buy 1 Get 1",
    score: null,
  },
];

const menuItems = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "credit_card", label: "My Cards", active: false },
  { icon: "bookmark", label: "Saved", active: false },
  { icon: "history", label: "Applications", active: false },
  { icon: "settings", label: "Settings", active: false },
];

const Dashboard = () => {
  const [profileCompletion] = useState(65);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-primary/10 p-6 sticky top-24">
              {/* Profile */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MaterialIcon name="person" className="text-4xl text-primary" />
                </div>
                <h3 className="font-bold">Welcome Back!</h3>
                <p className="text-sm text-muted-foreground">user@example.com</p>
              </div>

              {/* Profile Completion */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="font-bold text-primary">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      item.active
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
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Saved Cards */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Saved Cards</h2>
                <Button variant="outline" size="sm" className="text-primary border-primary">
                  <MaterialIcon name="visibility" className="mr-1" />
                  সবগুলো দেখুন
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-card rounded-xl border border-primary/10 p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className={`${card.color} rounded-lg p-4 mb-4`}>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-white text-xs font-bold uppercase">{card.bank}</span>
                      </div>
                      <div className="text-white/80 text-sm tracking-widest mb-2">
                        **** **** **** {card.lastFour}
                      </div>
                      <div className="text-white text-xs">{card.name}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        বিস্তারিত
                      </Button>
                      <Button size="sm" className="flex-1 text-xs">
                        আবেদন করুন
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase">{rec.tag}</span>
                        <h3 className="font-bold mt-1">{rec.bank}</h3>
                        <p className="text-sm text-muted-foreground">{rec.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{rec.benefit}</div>
                        {rec.score && (
                          <div className="text-xs text-muted-foreground">{rec.score} GOOD</div>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "add_card", label: "Add Card" },
                  { icon: "compare_arrows", label: "Compare" },
                  { icon: "calculate", label: "EMI Calc" },
                  { icon: "support_agent", label: "Support" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="bg-card p-4 rounded-xl border border-primary/10 text-center hover:bg-primary/5 transition-colors"
                  >
                    <MaterialIcon name={action.icon} className="text-3xl text-primary mb-2" />
                    <span className="text-sm font-medium block">{action.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
