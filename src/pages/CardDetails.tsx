import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
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

  // Determine who this card is good for based on category and benefits
  const getGoodForPoints = (card: CreditCard): string[] => {
    const points: string[] = [];
    const category = (card.category || "").toLowerCase();
    const benefitsText = card.benefits.map(b => `${b.text} ${b.description || ""}`).join(" ").toLowerCase();

    if (category.includes("travel") || benefitsText.includes("lounge")) {
      points.push("যারা নিয়মিত বিমানে ভ্রমণ করেন এবং লাউঞ্জ সুবিধা চান");
    }
    if (category.includes("cashback") || benefitsText.includes("cashback")) {
      points.push("যারা প্রতিদিনের খরচে টাকা ফেরত পেতে চান");
    }
    if (category.includes("shopping") || benefitsText.includes("discount")) {
      points.push("যারা নিয়মিত শপিং করেন এবং ডিসকাউন্ট চান");
    }
    if (category.includes("premium") || category.includes("elite")) {
      points.push("যাদের উচ্চ আয় এবং প্রিমিয়াম লাইফস্টাইল সুবিধা প্রয়োজন");
    }
    if (category.includes("entry") || category.includes("beginner")) {
      points.push("যারা প্রথমবার ক্রেডিট কার্ড নিচ্ছেন");
    }
    if (benefitsText.includes("dining") || benefitsText.includes("restaurant")) {
      points.push("যারা রেস্তোরাঁয় খেতে পছন্দ করেন");
    }

    // Default points if none matched
    if (points.length === 0) {
      points.push("যারা একটি নির্ভরযোগ্য ক্রেডিট কার্ড খুঁজছেন");
    }

    return points.slice(0, 3);
  };

  // Determine who should avoid this card
  const getNotGoodForPoints = (card: CreditCard): string[] => {
    const points: string[] = [];
    const annualFee = card.annual_fee || "";
    const feeMatch = annualFee.match(/[\d,]+/);
    const feeNum = feeMatch ? parseInt(feeMatch[0].replace(/,/g, "")) : 0;
    const category = (card.category || "").toLowerCase();

    if (feeNum > 5000) {
      points.push("যাদের বাজেট সীমিত এবং উচ্চ বার্ষিক ফি দিতে অনিচ্ছুক");
    }
    if (category.includes("premium") || category.includes("elite")) {
      points.push("যাদের মাসিক খরচ কম এবং প্রিমিয়াম সুবিধা ব্যবহার করবেন না");
    }
    if (card.min_income) {
      const incomeMatch = card.min_income.match(/[\d,]+/);
      const incomeNum = incomeMatch ? parseInt(incomeMatch[0].replace(/,/g, "")) : 0;
      if (incomeNum >= 100000) {
        points.push("যাদের আয় ন্যূনতম প্রয়োজনীয়তার চেয়ে কম");
      }
    }

    // Default if none matched
    if (points.length === 0) {
      points.push("যারা শুধুমাত্র বিনামূল্যে কার্ড খুঁজছেন");
    }

    return points.slice(0, 2);
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
            <h1 className="text-2xl font-bold mb-2">কার্ড পাওয়া যায়নি</h1>
            <p className="text-muted-foreground mb-6">আপনি যে কার্ডটি খুঁজছেন সেটি বিদ্যমান নেই।</p>
            <Link to="/compare">
              <Button>সব কার্ড দেখুন</Button>
            </Link>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const bankName = card.banks?.name || "Unknown Bank";
  const bankUrl = card.banks?.website_url || null;
  const lastUpdated = new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
          <div className="container mx-auto px-4 py-6 md:py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
              <MaterialIcon name="chevron_right" className="text-base" />
              <Link to="/compare" className="hover:text-primary transition-colors">ক্রেডিট কার্ড</Link>
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

                <div className="flex flex-wrap gap-3">
                  {card.apply_url ? (
                    <Button size="lg" className="font-bold" asChild>
                      <a href={card.apply_url} target="_blank" rel="noopener noreferrer">
                        <MaterialIcon name="open_in_new" className="text-lg mr-1" />
                        এখনই আবেদন করুন
                      </a>
                    </Button>
                  ) : (
                    <Button size="lg" className="font-bold" asChild>
                      <Link to="/eligibility">
                        <MaterialIcon name="fact_check" className="text-lg mr-1" />
                        যোগ্যতা যাচাই করুন
                      </Link>
                    </Button>
                  )}
                  <Button size="lg" variant="outline" className="font-bold" asChild>
                    <Link to="/compare">
                      <MaterialIcon name="compare_arrows" className="text-lg mr-1" />
                      অন্য কার্ড তুলনা করুন
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-6 md:py-10 space-y-8">
          
          {/* Section 1: Who is this card good for */}
          <section className="bg-card border border-primary/10 rounded-xl p-5 md:p-6">
            <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <MaterialIcon name="person_check" className="text-primary text-2xl" />
              এই কার্ডটি কার জন্য ভালো
            </h2>
            <ul className="space-y-3">
              {getGoodForPoints(card).map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <MaterialIcon name="check_circle" className="text-primary text-lg shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2: Quick Info */}
          <section className="bg-card border border-primary/10 rounded-xl p-5 md:p-6">
            <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <MaterialIcon name="info" className="text-primary text-2xl" />
              এক নজরে তথ্য
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">বার্ষিক ফি</p>
                <p className={cn(
                  "text-xl font-black",
                  card.annual_fee?.toLowerCase().includes("free") || card.annual_fee === "৳0" 
                    ? "text-primary" 
                    : "text-foreground"
                )}>
                  {card.annual_fee || "N/A"}
                </p>
                {card.annual_fee_note && (
                  <p className="text-xs text-muted-foreground mt-1">{card.annual_fee_note}</p>
                )}
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">সুদের হার (APR)</p>
                <p className="text-xl font-black text-foreground">
                  {card.interest_rate || "N/A"}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">ক্যাশব্যাক / রিওয়ার্ড</p>
                <p className="text-xl font-black text-primary">
                  {card.benefits.length > 0 ? "আছে" : "নেই"}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Benefits */}
          <section className="bg-card border border-primary/10 rounded-xl p-5 md:p-6">
            <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <MaterialIcon name="stars" className="text-primary text-2xl" />
              সুবিধাসমূহ
            </h2>
            {card.benefits.length === 0 ? (
              <p className="text-muted-foreground">সুবিধার তথ্য পাওয়া যায়নি</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {card.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MaterialIcon name={benefit.icon || "check"} className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm mb-0.5">{benefit.text}</h3>
                      {benefit.description && (
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 4: Who should avoid this card */}
          <section className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 md:p-6">
            <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <MaterialIcon name="warning" className="text-destructive text-2xl" />
              যাদের জন্য ভালো না
            </h2>
            <ul className="space-y-3">
              {getNotGoodForPoints(card).map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <MaterialIcon name="cancel" className="text-destructive text-lg shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5: Eligibility */}
          <section className="bg-card border border-primary/10 rounded-xl p-5 md:p-6">
            <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <MaterialIcon name="verified_user" className="text-primary text-2xl" />
              যোগ্যতা
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-sm mb-3 text-muted-foreground">প্রয়োজনীয় শর্ত</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">ন্যূনতম আয়</span>
                    <span className="font-bold text-sm">{card.min_income || "উল্লেখ নেই"}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">বয়স</span>
                    <span className="font-bold text-sm">
                      {card.min_age && card.max_age 
                        ? `${card.min_age} - ${card.max_age} বছর`
                        : "উল্লেখ নেই"
                      }
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm">ক্রেডিট স্কোর</span>
                    <span className="font-bold text-sm text-primary">{card.credit_score || "উল্লেখ নেই"}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-3 text-muted-foreground">চাকরির ধরন</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.employment_types && card.employment_types.length > 0 ? (
                    card.employment_types.map((type, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {type}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">উল্লেখ নেই</span>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-3 text-muted-foreground">প্রয়োজনীয় কাগজপত্র</h3>
                <div className="space-y-1.5">
                  {card.required_documents && card.required_documents.length > 0 ? (
                    card.required_documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <MaterialIcon name="description" className="text-primary text-sm" />
                        <span className="text-muted-foreground">{doc}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">ব্যাংকের সাথে যোগাযোগ করুন</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Important Fees & Risks */}
          <section className="bg-accent/5 border border-accent/20 rounded-xl p-5 md:p-6">
            <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <MaterialIcon name="warning_amber" className="text-accent text-2xl" />
              আবেদন করার আগে জানুন
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                {Object.keys(card.fees).length > 0 ? (
                  Object.entries(card.fees).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-background rounded-lg">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="font-bold text-sm">{value}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">ফি'র তথ্য পাওয়া যায়নি</p>
                )}
              </div>
              <div className="bg-background rounded-lg p-4">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <MaterialIcon name="lightbulb" className="text-accent" />
                  গুরুত্বপূর্ণ পরামর্শ
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <MaterialIcon name="arrow_right" className="text-accent text-sm mt-0.5" />
                    প্রতি মাসে পুরো বিল পরিশোধ করুন—সুদ এড়াতে
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon name="arrow_right" className="text-accent text-sm mt-0.5" />
                    শুধু মিনিমাম পে করলে সুদের জালে আটকে যাবেন
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon name="arrow_right" className="text-accent text-sm mt-0.5" />
                    লেট পেমেন্ট আপনার ক্রেডিট স্কোর কমায়
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Source & Disclaimer */}
          <section className="bg-muted/30 border border-primary/10 rounded-xl p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  <strong>সর্বশেষ আপডেট:</strong> {lastUpdated}
                </p>
                {bankUrl && (
                  <p className="text-sm text-muted-foreground">
                    <strong>তথ্যসূত্র:</strong>{" "}
                    <a 
                      href={bankUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {bankName} অফিসিয়াল ওয়েবসাইট
                    </a>
                  </p>
                )}
              </div>
              <div className="flex items-start gap-2 p-3 bg-background rounded-lg md:max-w-sm">
                <MaterialIcon name="info" className="text-primary text-lg shrink-0" />
                <p className="text-xs text-muted-foreground">
                  BankBujhi কোনো ব্যাংক নয়। আমরা শুধুমাত্র তথ্য প্রদান করি। 
                  আবেদনের আগে ব্যাংকের সাথে সরাসরি যোগাযোগ করুন।
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
            <h3 className="font-bold text-lg mb-2">আবেদন করতে প্রস্তুত?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              প্রথমে আপনার যোগ্যতা যাচাই করে নিন
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/eligibility">
                <Button className="font-bold">
                  <MaterialIcon name="fact_check" className="text-lg mr-1" />
                  যোগ্যতা যাচাই করুন
                </Button>
              </Link>
              <Link to="/quiz">
                <Button variant="outline" className="font-bold">
                  <MaterialIcon name="quiz" className="text-lg mr-1" />
                  কার্ড কুইজ নিন
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default CardDetails;
