import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { fetchCreditCards, type CreditCard } from "@/lib/api/banks";
import { cn } from "@/lib/utils";
import type { QuizAnswer } from "@/pages/CardQuiz";

interface QuizResultsProps {
  answers: QuizAnswer[];
  onRestart: () => void;
}

interface ScoredCard extends CreditCard {
  score: number;
  matchReasons: string[];
}

const QuizResults = ({ answers, onRestart }: QuizResultsProps) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<ScoredCard[]>([]);

  const getAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value;
  };

  useEffect(() => {
    loadAndScoreCards();
  }, []);

  const loadAndScoreCards = async () => {
    setLoading(true);
    try {
      const cards = await fetchCreditCards();
      const scoredCards = scoreCards(cards);
      setRecommendations(scoredCards.slice(0, 5)); // Top 5 recommendations
    } catch (error) {
      console.error("Error loading cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const scoreCards = (cards: CreditCard[]): ScoredCard[] => {
    const primaryUse = getAnswer("primary_use");
    const monthlySpend = getAnswer("monthly_spend");
    const income = getAnswer("income");
    const employment = getAnswer("employment");
    const rewardPref = getAnswer("reward_preference");
    const annualFeePref = getAnswer("annual_fee");

    return cards.map(card => {
      let score = 0;
      const matchReasons: string[] = [];

      // Score based on primary use matching category
      const categoryLower = (card.category || "").toLowerCase();
      if (primaryUse === "travel" && (categoryLower.includes("travel") || categoryLower.includes("premium"))) {
        score += 25;
        matchReasons.push("Great for travel rewards");
      }
      if (primaryUse === "shopping" && (categoryLower.includes("shopping") || categoryLower.includes("lifestyle"))) {
        score += 25;
        matchReasons.push("Excellent shopping benefits");
      }
      if (primaryUse === "dining" && (categoryLower.includes("lifestyle") || categoryLower.includes("entertainment"))) {
        score += 25;
        matchReasons.push("Dining & entertainment perks");
      }
      if (primaryUse === "bills" && (categoryLower.includes("cashback") || categoryLower.includes("utility"))) {
        score += 25;
        matchReasons.push("Bill payment rewards");
      }

      // Score based on income eligibility
      const minIncomeStr = card.min_income || "";
      const minIncomeMatch = minIncomeStr.match(/[\d,]+/);
      const minIncomeNum = minIncomeMatch ? parseInt(minIncomeMatch[0].replace(/,/g, "")) : 0;
      
      let userIncomeMin = 0;
      if (income === "entry") userIncomeMin = 20000;
      if (income === "mid") userIncomeMin = 40000;
      if (income === "high") userIncomeMin = 75000;
      if (income === "premium") userIncomeMin = 150000;

      if (userIncomeMin >= minIncomeNum) {
        score += 20;
        matchReasons.push("Matches your income eligibility");
      } else {
        score -= 30; // Penalize cards user can't get
      }

      // Score based on employment type
      if (card.employment_types && card.employment_types.length > 0) {
        const empTypes = card.employment_types.map(e => e.toLowerCase());
        if (employment === "salaried" && empTypes.some(e => e.includes("salaried"))) {
          score += 15;
        }
        if (employment === "self_employed" && empTypes.some(e => e.includes("self"))) {
          score += 15;
        }
        if (employment === "business" && empTypes.some(e => e.includes("business"))) {
          score += 15;
        }
      }

      // Score based on reward preference
      const benefitsText = card.benefits.map(b => `${b.text} ${b.description || ""}`).join(" ").toLowerCase();
      if (rewardPref === "cashback" && (benefitsText.includes("cashback") || categoryLower.includes("cashback"))) {
        score += 20;
        matchReasons.push("Offers cashback rewards");
      }
      if (rewardPref === "points" && benefitsText.includes("point")) {
        score += 20;
        matchReasons.push("Reward points program");
      }
      if (rewardPref === "travel" && (benefitsText.includes("lounge") || benefitsText.includes("travel"))) {
        score += 20;
        matchReasons.push("Travel benefits included");
      }
      if (rewardPref === "discounts" && (benefitsText.includes("discount") || benefitsText.includes("off"))) {
        score += 20;
        matchReasons.push("Great partner discounts");
      }

      // Score based on annual fee preference
      const annualFee = card.annual_fee || "";
      const feeMatch = annualFee.match(/[\d,]+/);
      const feeNum = feeMatch ? parseInt(feeMatch[0].replace(/,/g, "")) : 0;
      const isFree = annualFee.toLowerCase().includes("free") || feeNum === 0;

      if (annualFeePref === "free" && isFree) {
        score += 20;
        matchReasons.push("No annual fee");
      } else if (annualFeePref === "free" && !isFree) {
        score -= 20;
      }
      if (annualFeePref === "low" && feeNum <= 3000) {
        score += 15;
        matchReasons.push("Low annual fee");
      }
      if (annualFeePref === "medium" && feeNum <= 10000) {
        score += 10;
      }
      if (annualFeePref === "high") {
        // No penalty for high fee preference
        if (feeNum > 10000) {
          score += 10;
          matchReasons.push("Premium card with top-tier benefits");
        }
      }

      // Bonus for spending level matching card tier
      if (monthlySpend === "premium" && categoryLower.includes("premium")) {
        score += 15;
        matchReasons.push("Matches your spending level");
      }
      if (monthlySpend === "high" && (categoryLower.includes("premium") || categoryLower.includes("lifestyle"))) {
        score += 10;
      }
      if (monthlySpend === "low" && categoryLower.includes("entry")) {
        score += 15;
        matchReasons.push("Perfect for your spending level");
      }

      // Badge bonus
      if (card.badge) {
        score += 5;
      }

      return {
        ...card,
        score,
        matchReasons: [...new Set(matchReasons)].slice(0, 3), // Unique reasons, max 3
      };
    }).sort((a, b) => b.score - a.score);
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="h-16 w-16 rounded-2xl mx-auto mb-4" />
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-40 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary mb-4">
            <MaterialIcon name="auto_awesome" className="text-3xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-2">
            Your Perfect Cards
          </h1>
          <p className="text-muted-foreground">
            Based on your preferences, here are our top recommendations
          </p>
        </div>

        {/* Recommendation Cards */}
        <div className="space-y-4 mb-8">
          {recommendations.map((card, index) => (
            <div
              key={card.id}
              className={cn(
                "relative bg-card border rounded-xl p-4 md:p-6 transition-all hover:shadow-lg",
                index === 0 ? "border-primary/50 ring-2 ring-primary/20" : "border-border"
              )}
            >
              {/* Rank Badge */}
              <div className={cn(
                "absolute -top-3 -left-3 size-8 rounded-full flex items-center justify-center text-sm font-bold",
                index === 0 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                #{index + 1}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Card Image */}
                <div className="w-full md:w-40 shrink-0">
                  <div className="relative aspect-[1.6/1] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={card.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300"}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary text-primary-foreground">
                          Best Match
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {card.banks?.name}
                      </p>
                      <h3 className="font-bold text-lg">{card.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-bold",
                        card.annual_fee?.toLowerCase().includes("free") || card.annual_fee === "৳0"
                          ? "text-primary"
                          : "text-foreground"
                      )}>
                        {card.annual_fee || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">Annual Fee</p>
                    </div>
                  </div>

                  {/* Match Reasons */}
                  {card.matchReasons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {card.matchReasons.map((reason, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          <MaterialIcon name="check" className="text-xs" />
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quick Benefits */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.benefits.slice(0, 2).map((benefit, i) => (
                      <span
                        key={i}
                        className="text-xs text-muted-foreground flex items-center gap-1"
                      >
                        <MaterialIcon name={benefit.icon || "check"} className="text-sm text-primary" />
                        {benefit.text}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" asChild>
                      <Link to={`/cards/${card.id}`}>
                        View Details
                      </Link>
                    </Button>
                    {card.apply_url ? (
                      <Button size="sm" variant="outline" asChild>
                        <a href={card.apply_url} target="_blank" rel="noopener noreferrer">
                          <MaterialIcon name="open_in_new" className="text-sm mr-1" />
                          Apply Now
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/eligibility">
                          Check Eligibility
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={onRestart} className="gap-2">
            <MaterialIcon name="refresh" className="text-lg" />
            Retake Quiz
          </Button>
          <Button asChild className="gap-2">
            <Link to="/compare">
              <MaterialIcon name="compare_arrows" className="text-lg" />
              Compare All Cards
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;
