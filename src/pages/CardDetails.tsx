import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import { fetchCreditCard, type CreditCard } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CreditCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCard();
    }
  }, [id]);

  const loadCard = async () => {
    setLoading(true);
    try {
      const data = await fetchCreditCard(id!);
      setCard(data);
    } catch (error) {
      console.error("Error loading card:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
            <div className="container mx-auto px-4 py-6 md:py-10">
              <Skeleton className="h-4 w-48 mb-6" />
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <Skeleton className="w-full md:w-72 h-44 rounded-2xl" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

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

  const bankName = card.banks?.name || "Unknown Bank";

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
                    src={card.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"} 
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
                  <span className="text-sm font-bold text-muted-foreground">{bankName}</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-black mb-2">{card.name}</h1>
                <p className="text-muted-foreground mb-4">{card.category}</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className={cn(
                    "text-3xl font-black",
                    card.annual_fee === "Free" || card.annual_fee === "৳0" 
                      ? "text-primary" 
                      : "text-foreground"
                  )}>
                    {card.annual_fee || "N/A"}
                  </span>
                  <span className="text-sm text-muted-foreground">{card.annual_fee_note}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="font-bold" asChild>
                    <a href={card.apply_url || "#"} target="_blank" rel="noopener noreferrer">
                      <MaterialIcon name="open_in_new" className="text-lg mr-1" />
                      Apply Now
                    </a>
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
                {card.benefits.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No benefits information available
                  </div>
                ) : (
                  card.benefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="bg-card border border-primary/10 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="size-12 md:size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <MaterialIcon name={benefit.icon || "check"} className="text-2xl md:text-3xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{benefit.text}</h3>
                          {benefit.description && (
                            <p className="text-muted-foreground text-sm md:text-base">{benefit.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Fees Tab */}
            <TabsContent value="fees" className="mt-0">
              <div className="bg-card border border-primary/10 rounded-xl overflow-hidden">
                <div className="divide-y divide-primary/10">
                  {Object.keys(card.fees).length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No fee information available
                    </div>
                  ) : (
                    Object.entries(card.fees).map(([key, value]) => (
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
                    ))
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <div className="flex gap-3">
                  <MaterialIcon name="info" className="text-accent text-xl shrink-0" />
                  <div>
                    <p className="font-bold text-sm mb-1">Fee Waiver Tip</p>
                    <p className="text-muted-foreground text-sm">
                      Annual fees are often waived if you spend a minimum amount per year. Contact the bank for details.
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
                      <span className="font-bold">{card.min_income || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age Range</span>
                      <span className="font-bold">
                        {card.min_age && card.max_age 
                          ? `${card.min_age} - ${card.max_age} years`
                          : "N/A"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credit Score</span>
                      <span className="font-bold text-primary">{card.credit_score || "N/A"}</span>
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
                    {card.employment_types && card.employment_types.length > 0 ? (
                      card.employment_types.map((type, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground">Not specified</span>
                    )}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="bg-card border border-primary/10 rounded-xl p-4 md:p-6 md:col-span-2">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <MaterialIcon name="description" className="text-primary" />
                    Required Documents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {card.required_documents && card.required_documents.length > 0 ? (
                      card.required_documents.map((doc, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                        >
                          <MaterialIcon name="check_circle" className="text-primary text-lg" />
                          <span className="text-sm font-medium">{doc}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground col-span-2">
                        Contact bank for document requirements
                      </div>
                    )}
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
