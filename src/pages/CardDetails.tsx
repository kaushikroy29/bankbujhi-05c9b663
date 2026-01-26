import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

// Mock data - in production this would come from an API
const creditCards = [
  {
    id: "1",
    bank: "City Bank",
    name: "American Express Cashback Card",
    category: "Lifestyle & Daily Essentials",
    annualFee: "Free",
    annualFeeNote: "Annual Fee",
    benefits: [
      { icon: "local_mall", text: "1% Cashback on all groceries", description: "Earn 1% cashback on every grocery purchase at partner stores including Shwapno, Agora, and Meena Bazaar." },
      { icon: "flight_takeoff", text: "Airport Lounge Access", description: "Complimentary access to 1000+ airport lounges worldwide through Priority Pass." },
      { icon: "restaurant", text: "Dining Discounts", description: "Get up to 20% off at 200+ partner restaurants across Bangladesh." },
      { icon: "movie", text: "Entertainment Perks", description: "Buy 1 Get 1 Free on movie tickets at Star Cineplex every Friday." },
    ],
    fees: {
      annual: "Free (Lifetime)",
      supplementary: "৳500/year",
      latePayment: "৳500 or 5% of minimum due",
      cashAdvance: "2.5% or minimum ৳500",
      foreignTransaction: "2.5% of transaction amount",
      cardReplacement: "৳300",
      statementCopy: "৳100 per copy",
    },
    eligibility: {
      minIncome: "৳30,000/month",
      minAge: 21,
      maxAge: 60,
      employmentType: ["Salaried", "Self-employed", "Business Owner"],
      documents: ["NID/Passport", "Income Proof", "Bank Statement (3 months)", "Passport Size Photo"],
      creditScore: "Good to Excellent",
    },
    badge: "Top Rated",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChJn49OYUwsQijWezZmLPBBn7NRLhhgQYtGq0GZYK09qbbkGLGhWHXX4Q4EQScZhmpsjPmpAs2YILFyipRk3T3PB5mpBBltNgY8F4fZ-IJWdWMFYLwDfMLm7owKEUzkvmcnqOTXvBb3BTxlLfeXa-Fy6WqbCmP7GB2YEvmy14T3c1JZ42QdlyJkKotjnrz-8mHVdAGYvOkwS9DbVv4m4VQ2bIkRF9vABePrHVSvnw-c3mGQYCWleLr-BEH1OWWKjoS_tKp2B61bP8",
  },
  {
    id: "2",
    bank: "BRAC Bank",
    name: "VISA Signature Card",
    category: "Premium Travel & Rewards",
    annualFee: "৳0",
    annualFeeNote: "৳5,000 (Waived 1st Year)",
    benefits: [
      { icon: "restaurant", text: "Buy 1 Get 1 at 100+ Dinings", description: "Enjoy BOGO offers at over 100 premium restaurants including Mainland China, Nando's, and Pizza Hut." },
      { icon: "hotel", text: "15% Discount on top hotels", description: "Get 15% off at partner hotels including Radisson, Le Méridien, and Pan Pacific." },
      { icon: "flight", text: "Travel Insurance", description: "Complimentary travel insurance up to $500,000 coverage when booking flights with your card." },
      { icon: "spa", text: "Spa & Wellness", description: "20% off at partner spas and wellness centers across Dhaka and Chittagong." },
    ],
    fees: {
      annual: "৳5,000 (Waived 1st Year)",
      supplementary: "৳2,500/year",
      latePayment: "৳750 or 5% of minimum due",
      cashAdvance: "3% or minimum ৳750",
      foreignTransaction: "2% of transaction amount",
      cardReplacement: "৳500",
      statementCopy: "৳150 per copy",
    },
    eligibility: {
      minIncome: "৳75,000/month",
      minAge: 25,
      maxAge: 55,
      employmentType: ["Salaried (Executive+)", "Business Owner"],
      documents: ["NID/Passport", "Salary Certificate", "Bank Statement (6 months)", "TIN Certificate", "Passport Size Photo"],
      creditScore: "Excellent",
    },
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
      { icon: "bolt", text: "5% Reward on utility bills", description: "Earn 5% reward points on all utility bill payments including electricity, gas, and water." },
      { icon: "movie", text: "Buy 1 Get 1 Cineplex Tickets", description: "Get BOGO movie tickets at Star Cineplex and Blockbuster Cinemas every weekend." },
      { icon: "shopping_cart", text: "Online Shopping Cashback", description: "3% cashback on online shopping at Daraz, Evaly, and other partner e-commerce sites." },
      { icon: "local_gas_station", text: "Fuel Surcharge Waiver", description: "1% fuel surcharge waiver at all fuel stations across Bangladesh." },
    ],
    fees: {
      annual: "Free (Lifetime)",
      supplementary: "Free",
      latePayment: "৳400 or 4% of minimum due",
      cashAdvance: "2% or minimum ৳400",
      foreignTransaction: "3% of transaction amount",
      cardReplacement: "৳250",
      statementCopy: "৳75 per copy",
    },
    eligibility: {
      minIncome: "৳25,000/month",
      minAge: 18,
      maxAge: 65,
      employmentType: ["Salaried", "Self-employed", "Student (with guarantor)"],
      documents: ["NID/Passport", "Income Proof or Guarantor Letter", "Bank Statement (3 months)", "Passport Size Photo"],
      creditScore: "Fair to Good",
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf7qTA98WGNaYJzckTNPG1m-1qeJ8ohCneNWbiojCOKY4FcZQLXOWOnTQppDjZgDNasG5Go33HYxkZ_d8_j8SNr3ixDjvN89fgMW-uMTTTgVojncNYOuylm5f97RLHT3_VTsyUU3kYBjk_ZiZlbAuNNGXy2vRDE2CvDuRBJXv-X_V-bIC8S6rCzp6TDhrBzg3leMi7hRq0UWzR4iwC8WGOhMQL5Zg1D0MzVEpM5rPIY6EMli4X8DMvFCA9iIy7AX_OSYIk4hQml-0",
  },
];

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const card = creditCards.find((c) => c.id === id);

  if (!card) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <MaterialIcon name="credit_card_off" className="text-6xl text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Card Not Found</h1>
            <p className="text-muted-foreground mb-6">The card you're looking for doesn't exist.</p>
            <Link to="/compare">
              <Button>Browse All Cards</Button>
            </Link>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
          <div className="container mx-auto px-4 py-6 md:py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <MaterialIcon name="chevron_right" className="text-base" />
              <Link to="/compare" className="hover:text-primary transition-colors">Credit Cards</Link>
              <MaterialIcon name="chevron_right" className="text-base" />
              <span className="text-foreground font-medium truncate">{card.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Card Image */}
              <div className="w-full md:w-72 shrink-0">
                <div className="relative aspect-[1.6/1] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              {/* Card Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {card.badge && (
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                      {card.badge}
                    </span>
                  )}
                  <span className="text-sm font-bold text-muted-foreground">{card.bank}</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-black mb-2">{card.name}</h1>
                <p className="text-muted-foreground mb-4">{card.category}</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className={cn(
                    "text-3xl font-black",
                    card.annualFee === "Free" || card.annualFee === "৳0" 
                      ? "text-primary" 
                      : "text-foreground"
                  )}>
                    {card.annualFee}
                  </span>
                  <span className="text-sm text-muted-foreground">{card.annualFeeNote}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="font-bold">
                    <MaterialIcon name="open_in_new" className="text-lg mr-1" />
                    Apply Now
                  </Button>
                  <Button size="lg" variant="outline" className="font-bold">
                    <MaterialIcon name="compare_arrows" className="text-lg mr-1" />
                    Add to Compare
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="container mx-auto px-4 py-6 md:py-10">
          <Tabs defaultValue="benefits" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-3 mb-6 h-12">
              <TabsTrigger value="benefits" className="font-bold text-sm md:text-base">
                <MaterialIcon name="star" className="text-lg mr-1.5 hidden sm:inline" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="fees" className="font-bold text-sm md:text-base">
                <MaterialIcon name="payments" className="text-lg mr-1.5 hidden sm:inline" />
                Fees
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="font-bold text-sm md:text-base">
                <MaterialIcon name="verified_user" className="text-lg mr-1.5 hidden sm:inline" />
                Eligibility
              </TabsTrigger>
            </TabsList>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="mt-0">
              <div className="grid gap-4 md:gap-6">
                {card.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-card border border-primary/10 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="size-12 md:size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MaterialIcon name={benefit.icon} className="text-2xl md:text-3xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{benefit.text}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Fees Tab */}
            <TabsContent value="fees" className="mt-0">
              <div className="bg-card border border-primary/10 rounded-xl overflow-hidden">
                <div className="divide-y divide-primary/10">
                  {Object.entries(card.fees).map(([key, value]) => (
                    <div 
                      key={key}
                      className="flex justify-between items-center p-4 md:p-5 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={cn(
                        "font-bold",
                        value.toLowerCase().includes("free") ? "text-primary" : "text-foreground"
                      )}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <div className="flex gap-3">
                  <MaterialIcon name="info" className="text-accent text-xl shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1">Fee Waiver Tip</p>
                    <p className="text-muted-foreground text-sm">
                      Annual fees are often waived if you spend a minimum amount per year. Contact the bank for details on fee waiver conditions.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Eligibility Tab */}
            <TabsContent value="eligibility" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Income & Age */}
                <div className="bg-card border border-primary/10 rounded-xl p-4 md:p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <MaterialIcon name="account_balance_wallet" className="text-primary" />
                    Income & Age Requirements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minimum Income</span>
                      <span className="font-bold">{card.eligibility.minIncome}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age Range</span>
                      <span className="font-bold">{card.eligibility.minAge} - {card.eligibility.maxAge} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credit Score</span>
                      <span className="font-bold text-primary">{card.eligibility.creditScore}</span>
                    </div>
                  </div>
                </div>

                {/* Employment Type */}
                <div className="bg-card border border-primary/10 rounded-xl p-4 md:p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <MaterialIcon name="work" className="text-primary" />
                    Employment Type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {card.eligibility.employmentType.map((type, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="bg-card border border-primary/10 rounded-xl p-4 md:p-6 md:col-span-2">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <MaterialIcon name="description" className="text-primary" />
                    Required Documents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {card.eligibility.documents.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <MaterialIcon name="check_circle" className="text-primary text-lg" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 p-4 md:p-6 bg-primary/5 border border-primary/10 rounded-xl text-center">
                <h3 className="font-bold text-lg mb-2">Ready to Apply?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Check your eligibility instantly with our free eligibility checker
                </p>
                <Link to="/eligibility">
                  <Button className="font-bold">
                    <MaterialIcon name="fact_check" className="text-lg mr-1" />
                    Check Eligibility
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default CardDetails;
