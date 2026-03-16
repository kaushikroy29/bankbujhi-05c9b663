import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { cn } from "@/lib/utils";
import { fetchCreditCard, type CreditCard } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import { FeeBreakdown } from "@/components/cards/FeeBreakdown";
import HiddenFeesAlert from "@/components/cards/HiddenFeesAlert";
import WatchlistButton from "@/components/ui/WatchlistButton";
import SEOHead from "@/components/seo/SEOHead";
import SocialShare from "@/components/ui/SocialShare";
import SafeApplyGate from "@/components/cards/SafeApplyGate";
import SuitabilityChecker from "@/components/cards/SuitabilityChecker";
import HiddenTruthsPanel from "@/components/cards/HiddenTruthsPanel";
import { useLanguage } from "@/contexts/LanguageContext";

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CreditCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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
    // ... (Existing logic kept or could be moved to util if reused)
    // For brevity, keeping logical structure but using the same list
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
      if (incomeNum >= 75000) {
        // High income requirement warning
        points.push(`যাদের আয় ${t('taka_symbol')}${incomeNum.toLocaleString()}-এর কম`);
      }
    }

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
              <Button>{t('btn_view_all')}</Button>
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
    <>
      <SEOHead
        title={`${card.name} | ${t('site_title')}`}
        description={`${bankName}-এর ${card.name} ক্রেডিট কার্ডের সুবিধা, ফি ও যোগ্যতা দেখুন।`}
        path={`/cards/${id}`}
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pb-20 md:pb-0">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
            <div className="container mx-auto px-4 py-6 md:py-10">
              <PageBreadcrumb
                items={[
                  { label: t('nav_cards'), href: "/compare" },
                  { label: card.name }
                ]}
                className="mb-6"
              />

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                {/* Card Image - Enhanced Presentation */}
                <div className="w-full md:w-80 shrink-0 relative group perspective-1000">
                  <div className="relative aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-1">
                    <img
                      src={card.image_url || "/placeholder-card.png"}
                      alt={card.name}
                      className="w-full h-full object-cover bg-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-card.png";
                      }}
                    />
                    {/* Glossy Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-white/10 to-transparent opacity-50 pointer-events-none" />
                  </div>
                  
                  {/* Reflection/Shadow underneath */}
                  <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-xl rounded-full" />
                </div>

                {/* Card Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    {card.badge && (
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                        {card.badge}
                      </span>
                    )}
                    <span className="text-sm font-bold text-muted-foreground bg-background/50 px-2 py-1 rounded-md border border-border/50">
                      {bankName}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight leading-tight">
                    {card.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6 font-medium">
                    {card.category}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                    {card.apply_url ? (
                      <Button size="lg" className="font-bold" onClick={() => document.getElementById('suitability')?.scrollIntoView({ behavior: 'smooth' })}>
                        <MaterialIcon name="visibility" className="text-lg mr-1" />
                        {t('btn_details')}
                      </Button>
                    ) : (
                      <Button size="lg" className="font-bold" asChild>
                        <Link to="/eligibility">
                          <MaterialIcon name="fact_check" className="text-lg mr-1" />
                          {t('btn_eligibility')}
                        </Link>
                      </Button>
                    )}
                    <WatchlistButton
                      productType="credit_card"
                      productId={card.id}
                      variant="default"
                    />
                    <Button size="lg" variant="outline" className="font-bold border-primary text-primary hover:bg-primary/5" asChild>
                      <Link to="/calculator/emi">
                        <MaterialIcon name="calculate" className="text-lg mr-1" />
                        {t('btn_emi')}
                      </Link>
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t">
                    <SocialShare title={`${bankName}-এর ${card.name} ক্রেডিট কার্ডের বিস্তারিত BankBujhi-তে দেখুন`} />
                    <Button variant="ghost" className="font-bold text-muted-foreground" asChild>
                      <Link to="/compare">
                        <MaterialIcon name="compare_arrows" className="text-lg mr-1" />
                        {t('btn_compare')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">

            {/* SUITABILITY CHECKER - FIRST THING as per UX Rules */}
            <section className="scroll-mt-20" id="suitability">
              <SuitabilityChecker card={card} />
            </section>

            {/* Quick Info */}
            <section className="bg-card border border-primary/10 rounded-xl p-5 md:p-6 shadow-sm">
              <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
                <MaterialIcon name="info" className="text-primary text-2xl" />
                {t('card_features')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{t('card_annual_fee')}</p>
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
                  <p className="text-xs text-muted-foreground mb-1">{t('card_interest_rate')}</p>
                  <p className="text-xl font-black text-foreground">
                    {card.interest_rate || "N/A"}
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{t('card_rewards')}</p>
                  <p className="text-xl font-black text-primary">
                    {card.benefits.length > 0 ? "আছে" : "নেই"}
                  </p>
                </div>
              </div>
            </section>

            {/* HIDDEN TRUTHS PANEL */}
            <section>
              <HiddenTruthsPanel card={card} />
            </section>

            {/* Benefits */}
            <section className="bg-card border border-primary/10 rounded-xl p-5 md:p-6">
              <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
                <MaterialIcon name="stars" className="text-primary text-2xl" />
                {t('card_features')}
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

            {/* Good For / Not Good For */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Section: Who is this card good for */}
              <section className="bg-green-50/50 border border-green-200 rounded-xl p-5 md:p-6">
                <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2 text-green-800">
                  <MaterialIcon name="person_check" className="text-green-600 text-2xl" />
                  {t('card_good_for')}
                </h2>
                <ul className="space-y-3">
                  {getGoodForPoints(card).map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <MaterialIcon name="check_circle" className="text-green-600 text-lg shrink-0 mt-0.5" />
                      <span className="text-green-900/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section: Who should avoid this card */}
              <section className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 md:p-6">
                <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2 text-destructive">
                  <MaterialIcon name="cancel" className="text-destructive text-2xl" />
                  {t('card_bad_for')}
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
            </div>

            {/* Eligibility */}
            <section className="bg-card border border-primary/10 rounded-xl p-5 md:p-6">
              <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
                <MaterialIcon name="verified_user" className="text-primary text-2xl" />
                {t('card_eligibility')}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-sm mb-3 text-muted-foreground">প্রয়োজনীয় শর্ত</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('card_min_income')}</span>
                      <span className="font-bold text-sm">{card.min_income || "উল্লেখ নেই"}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm">{t('card_age')}</span>
                      <span className="font-bold text-sm">
                        {card.min_age && card.max_age
                          ? `${card.min_age} - ${card.max_age} বছর`
                          : "উল্লেখ নেই"
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-3 text-muted-foreground">{t('card_employment')}</h3>
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
                  <h3 className="font-bold text-sm mb-3 text-muted-foreground">{t('card_documents')}</h3>
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

            {/* Fee Breakdown */}
            {card.fees_detailed && (
              <section className="mb-8">
                <FeeBreakdown fees={card.fees_detailed} />
              </section>
            )}

            {/* Hidden Fees Alert - High Level Warning */}
            <HiddenFeesAlert card={card} />

            {/* Source & Disclaimer */}
            <section className="bg-muted/30 border border-primary/10 rounded-xl p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <strong>{t('card_last_updated')}:</strong> {lastUpdated}
                  </p>
                  {bankUrl && (
                    <p className="text-sm text-muted-foreground">
                      <strong>{t('card_source')}:</strong>{" "}
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
                    {t('card_disclaimer')}
                  </p>
                </div>
              </div>
            </section>

            {/* CTA - Safe Apply at Bottom */}
            <section className="bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
              <h3 className="font-bold text-lg mb-2">সব তথ্য দেখেছেন?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                আপনি যদি ফি এবং শর্তাবলী সম্পর্কে নিশ্চিত হন, তবে আবেদন করতে পারেন
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {card.apply_url ? (
                  <SafeApplyGate product={card}>
                    <Button size="lg" className="font-bold bg-green-600 hover:bg-green-700">
                      <MaterialIcon name="open_in_new" className="text-lg mr-1" />
                      {t('btn_apply')}
                    </Button>
                  </SafeApplyGate>
                ) : (
                  <Link to="/eligibility">
                    <Button className="font-bold">
                      <MaterialIcon name="fact_check" className="text-lg mr-1" />
                      {t('btn_eligibility')}
                    </Button>
                  </Link>
                )}

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
    </>
  );
};

export default CardDetails;
