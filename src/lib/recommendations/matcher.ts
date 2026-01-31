import { CreditCard } from "@/lib/api/banks";

export interface UserProfile {
    monthly_income: number;
    age?: number;
    employment_type?: string;
    spending_pattern?: {
        groceries?: number;
        fuel?: number;
        dining?: number;
        travel?: number;
        online_shopping?: number;
        bills?: number;
    };
    priorities: string[]; // e.g., 'low_fee', 'lounge', 'cashback'
    preferred_persona?: string; // e.g., 'student', 'traveler'
}

export interface CardRecommendation {
    card: CreditCard;
    score: number;
    match_percentage: number;
    reasons: string[];
    annual_net_value?: number;
}

// Helper to parse "৳৫০,০০০" or "BDT 50,000" to number
export const parseAmount = (amountStr: string | undefined): number => {
    if (!amountStr) return 0;
    // Remove non-numeric chars except for digits
    const cleanStr = amountStr.replace(/[^\d]/g, '');
    return parseInt(cleanStr, 10) || 0;
};

export function findBestCards(userProfile: UserProfile, allCards: CreditCard[]): CardRecommendation[] {
    return allCards
        .map(card => {
            let score = 0;
            const reasons: string[] = [];
            const cardCategory = (card.category || "").toLowerCase();
            const benefitsText = card.benefits.map(b => `${b.text} ${b.description || ""}`).join(" ").toLowerCase();

            // 1. Eligibility Check (Income)
            const cardMinIncome = parseAmount(card.min_income);
            if (userProfile.monthly_income >= cardMinIncome) {
                score += 20; // Base score for being eligible
                reasons.push("Income requirement met");
            } else {
                score -= 50; // Heavy penalty if not eligible
                // We still return it but with low score, maybe UI filters it out or shows as "Ineligible"
            }

            // 2. Persona / User Type Match
            if (userProfile.preferred_persona) {
                // Simple keyword matching for now
                if (userProfile.preferred_persona === 'student' && (cardCategory.includes('student') || cardCategory.includes('entry'))) {
                    score += 25;
                    reasons.push("Perfect for Students");
                }
                if (userProfile.preferred_persona === 'traveler' && (cardCategory.includes('travel') || benefitsText.includes('lounge') || benefitsText.includes('air'))) {
                    score += 25;
                    reasons.push("Great Travel Benefits");
                }
                if (userProfile.preferred_persona === 'shopper' && (cardCategory.includes('shopping') || benefitsText.includes('discount'))) {
                    score += 25;
                    reasons.push("Top Shopping Card");
                }
            }

            // 3. Priorities Match
            if (userProfile.priorities.includes('lounge') && (benefitsText.includes('lounge') || benefitsText.includes('launche'))) {
                score += 20;
                reasons.push("Includes Lounge Access");
            }
            if (userProfile.priorities.includes('cashback') && (benefitsText.includes('cashback') || cardCategory.includes('cashback'))) {
                score += 20;
                reasons.push("High Cashback");
            }
            if (userProfile.priorities.includes('low_fee')) {
                const fee = parseAmount(card.annual_fee);
                if (fee === 0 || card.annual_fee?.toLowerCase().includes('free')) {
                    score += 25;
                    reasons.push("No Annual Fee");
                } else if (fee <= 3000) {
                    score += 15;
                    reasons.push("Low Annual Fee");
                }
            }

            // 4. Employment Type Match (Bonus)
            if (userProfile.employment_type && card.employment_types && card.employment_types.length > 0) {
                const empMatch = card.employment_types.some(type =>
                    type.toLowerCase().includes(userProfile.employment_type!.toLowerCase())
                );
                if (empMatch) {
                    score += 10;
                }
            }

            // Normalize score
            const matchPercentage = Math.min(100, Math.max(0, score));

            return {
                card,
                score,
                match_percentage: matchPercentage,
                reasons: [...new Set(reasons)].slice(0, 3) // Top 3 unique reasons
            };

        })
        .filter(rec => rec.score > 0) // Filter out clearly bad matches
        .sort((a, b) => b.score - a.score);
}
