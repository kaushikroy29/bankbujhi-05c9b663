import FeaturedCard from "@/components/cards/FeaturedCard";

const featuredCards = [
  {
    id: "city-bank-amex",
    name: "City Bank Amex",
    cardLabel: "Platinum Rewards",
    rating: 4.8,
    benefits: ["5% Cashback on Groceries", "Free Lounge Access"],
    variant: "dark" as const,
    applyUrl: "https://thecitybank.com/credit-cards",
  },
  {
    id: "ebl-skybanking",
    name: "EBL Skybanking",
    cardLabel: "Travel Elite",
    rating: 4.7,
    benefits: ["BOGO at Top Hotels", "Zero Annual Fee (Year 1)"],
    variant: "green" as const,
    applyUrl: "https://ebl.com.bd/personal/cards",
  },
];

const FeaturedCardsSection = () => {
  return (
    <section className="bg-primary/5 container-padding py-20">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-accent/20 text-accent font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
            Top Recommendations
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-4">
            Featured Cards for 2024
          </h2>
          <p className="text-muted-foreground mt-2">
            Based on user reviews and benefit-to-cost ratio.
          </p>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCards.map((card) => (
            <FeaturedCard
              key={card.id}
              id={card.id}
              name={card.name}
              cardLabel={card.cardLabel}
              rating={card.rating}
              benefits={card.benefits}
              variant={card.variant}
              applyUrl={card.applyUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCardsSection;
