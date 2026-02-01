import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { fetchCreditCards, type CreditCard } from "@/lib/api/banks";
import { cn } from "@/lib/utils";
import type { QuizAnswer } from "@/pages/CardQuiz";
import { findBestCards, type UserProfile, type CardRecommendation } from "@/lib/recommendations/matcher";

interface QuizResultsProps {
  answers: QuizAnswer[];
  onRestart: () => void;
}

const QuizResults = ({ answers, onRestart }: QuizResultsProps) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<CardRecommendation[]>([]);

  const getAnswer = useCallback((questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value;
  }, [answers]);

  const loadAndScoreCards = useCallback(async () => {
    setLoading(true);
    try {
      const cards = await fetchCreditCards();

      // Map quiz answers to UserProfile
      const primaryUse = getAnswer("primary_use");
      const incomeAnswer = getAnswer("income");
      const employmentAnswer = getAnswer("employment");
      const rewardAnswer = getAnswer("reward_preference");
      const feeAnswer = getAnswer("annual_fee");

      // 1. Income Mapping
      let income = 0;
      if (incomeAnswer === "entry") income = 25000;
      else if (incomeAnswer === "mid") income = 50000;
      else if (incomeAnswer === "high") income = 100000;
      else if (incomeAnswer === "premium") income = 200000;

      // 2. Priorities Mapping
      const priorities: string[] = [];
      if (rewardAnswer === "cashback") priorities.push("cashback");
      if (rewardAnswer === "travel") priorities.push("lounge");
      if (rewardAnswer === "discounts") priorities.push("discount");
      if (feeAnswer === "free" || feeAnswer === "low") priorities.push("low_fee");

      // 3. Persona Mapping
      let persona = "";
      if (primaryUse === "travel") persona = "traveler";
      if (primaryUse === "shopping") persona = "shopper";
      if (employmentAnswer === "student") persona = "student";

      const userProfile: UserProfile = {
        monthly_income: income,
        priorities: priorities,
        employment_type: employmentAnswer,
        preferred_persona: persona
      };

      const results = findBestCards(userProfile, cards);
      setRecommendations(results.slice(0, 5)); // Top 5 recommendations

    } catch (error) {
      console.error("Error loading cards:", error);
    } finally {
      setLoading(false);
    }
  }, [getAnswer]);

  useEffect(() => {
    loadAndScoreCards();
  }, [loadAndScoreCards]);

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
            আপনার জন্য সেরা কার্ড
          </h1>
          <p className="text-muted-foreground">
            আপনার উত্তরের ভিত্তিতে আমরা এই কার্ডগুলো নির্বাচন করেছি
          </p>
        </div>

        {/* Recommendation Cards */}
        {recommendations.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">দুঃখিত, আপনার যোগ্যতার সাথে মানানসই কোনো কার্ড খুঁজে পাওয়া যায়নি।</p>
            <Button onClick={onRestart} className="mt-4">আবার চেষ্টা করুন</Button>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {recommendations.map((rec, index) => {
              const card = rec.card;
              return (
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
                          <p className="text-xs text-muted-foreground">বার্ষিক ফি</p>
                        </div>
                      </div>

                      {/* Match Reasons */}
                      {rec.reasons.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {rec.reasons.map((reason, i) => (
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

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" asChild>
                          <Link to={`/cards/${card.id}`}>
                            বিস্তারিত দেখুন
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to="/compare">তুলনা করুন</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={onRestart} className="gap-2">
            <MaterialIcon name="refresh" className="text-lg" />
            আবার শুরু করুন
          </Button>
          <Button asChild className="gap-2">
            <Link to="/compare">
              <MaterialIcon name="compare_arrows" className="text-lg" />
              সব কার্ড দেখুন
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;
