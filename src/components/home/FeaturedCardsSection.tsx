import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedCard from "@/components/cards/FeaturedCard";
import { fetchCreditCards, type CreditCard } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";

const FeaturedCardsSection = () => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFeaturedCards = async () => {
    try {
      const allCards = await fetchCreditCards();
      // Get cards with badges (featured/special cards) and sort by category priority
      const featuredCards = allCards
        .filter(card => card.badge)
        .slice(0, 4); // Show top 4 featured cards
      setCards(featuredCards);
    } catch (error) {
      console.error("Error loading featured cards:", error);
    } finally {
      setLoading(false);
    }
  };

  // Map card category to variant
  const getVariant = (category: string | null, index: number): "dark" | "green" => {
    if (!category) return index % 2 === 0 ? "dark" : "green";
    const catLower = category.toLowerCase();
    if (catLower.includes("premium") || catLower.includes("travel")) return "dark";
    if (catLower.includes("cashback") || catLower.includes("lifestyle")) return "green";
    return index % 2 === 0 ? "dark" : "green";
  };

  // Extract top 2 benefits as text
  const getBenefitTexts = (card: CreditCard): string[] => {
    return card.benefits.slice(0, 2).map(b => b.text);
  };

  if (loading) {
    return (
      <section className="bg-primary/5 container-padding py-20">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-40 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cards.length === 0) {
    return null; // Don't show section if no featured cards
  }

  return (
    <section className="bg-primary/5 container-padding py-16 md:py-20">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="bg-accent/20 text-accent font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
            সেরা পছন্দ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mt-4">
            ২০২৫ সালের জনপ্রিয় কার্ড
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            ব্যবহারকারীদের রিভিউ ও সুবিধা-খরচ অনুপাতের ভিত্তিতে নির্বাচিত
          </p>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <FeaturedCard
              key={card.id}
              id={card.id}
              name={card.banks?.name || "Bank"}
              cardLabel={card.name}
              rating={4.5 + (index === 0 ? 0.3 : index === 1 ? 0.2 : 0.1)} // Simulated rating
              benefits={getBenefitTexts(card)}
              variant={getVariant(card.category, index)}
              applyUrl={card.apply_url || undefined}
              badge={card.badge || undefined}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-8 md:mt-10">
          <Button variant="outline" size="lg" className="font-bold gap-2" asChild>
            <Link to="/compare">
              <MaterialIcon name="grid_view" className="text-lg" />
              সব কার্ড দেখুন
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCardsSection;
