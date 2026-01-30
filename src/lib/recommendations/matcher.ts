import { CreditCard } from "@/lib/api/banks";
import { Persona } from "./personas";

export interface UserPreferences {
    monthlyIncome: number;
    age?: number;
    employmentType?: string;
    selectedPersonaId?: string;
    spendingPattern?: {
        groceries?: number;
        fuel?: number;
        dining?: number;
        travel?: number;
        online?: number;
    };
}

export interface CardRecommendation {
    card: CreditCard;
    score: number;
    matchPercentage: number;
    reasons: string[];
    netValue?: number;
}

// Extract numeric value from string (e.g., "৳50,000" -> 50000)
function parseAmount(amountStr?: string | null): number {
    if (!amountStr) return 0;
    const matches = amountStr.match(/[\d,]+/);
    if (!matches) return 0;
    return parseInt(matches[0].replace(/,/g, ""), 10);
}

// Calculate estimated annual value based on spending
function calculateNetValue(card: CreditCard, prefs: UserPreferences): number {
    let benefitValue = 0;

    // Simple heuristic for now: 
    // - 1% general cashback estimate
    // - Bonus for matching categories

    const totalMonthlySpend = Object.values(prefs.spendingPattern || {}).reduce((a, b) => a + (b || 0), 0);
    const totalAnnualSpend = totalMonthlySpend * 12;

    // Base reward rate (conservative estimate)
    benefitValue += totalAnnualSpend * 0.005;

    // Spending bonuses
    const benefitsText = JSON.stringify(card.benefits).toLowerCase();

    if (prefs.spendingPattern?.travel && benefitsText.includes('travel')) {
        benefitValue += (prefs.spendingPattern.travel * 12) * 0.02; // Extra 2% on travel
    }

    if (prefs.spendingPattern?.dining && (benefitsText.includes('dining') || benefitsText.includes('food'))) {
        benefitValue += (prefs.spendingPattern.dining * 12) * 0.02; // Extra 2% on dining
    }

    if (prefs.spendingPattern?.groceries && benefitsText.includes('grocery')) {
        benefitValue += (prefs.spendingPattern.groceries * 12) * 0.01; // Extra 1% on groceries
    }

    // Subtract Annual Fee
    const annualFee = parseAmount(card.annual_fee);

    // If wafer condition met, fee is 0
    // (We'd need structured wafer logic to be precise, simplfying for now)
    // Assuming if spend > 5L, fee is waived for robust cards
    let effectiveFee = annualFee;
    if (totalAnnualSpend > 500000 && card.annual_fee_waived) {
        effectiveFee = 0;
    }

    return benefitValue - effectiveFee;
}

export function findBestCards(allCards: CreditCard[], prefs: UserPreferences, persona?: Persona): CardRecommendation[] {
    return allCards
        .map(card => {
            let score = 0;
            const reasons: string[] = [];

            // 1. Eligibility Check (Hard Filters)
            // Income
            const cardMinIncome = parseAmount(card.min_income);
            if (cardMinIncome > 0 && prefs.monthlyIncome < cardMinIncome) {
                return null; // Not eligible
            }

            // Age (if provided)
            if (prefs.age) {
                if (card.min_age && prefs.age < card.min_age) return null;
                if (card.max_age && prefs.age > card.max_age) return null;
            }

            // 2. Persona Matching
            if (persona) {
                // Category Match
                const cardCategory = (card.category || "").toLowerCase();
                const matchesType = persona.recommended_types.some(t => cardCategory.includes(t.toLowerCase()));
                if (matchesType) {
                    score += 30;
                    reasons.push(`Perfect for ${persona.title}`);
                }

                // Benefit Match
                const benefitsText = JSON.stringify(card.benefits).toLowerCase();
                let matchesBenefits = 0;
                persona.criteria.preferred_benefits.forEach(pb => {
                    if (benefitsText.includes(pb) || cardCategory.includes(pb)) {
                        matchesBenefits++;
                    }
                });

                if (matchesBenefits > 0) {
                    score += (matchesBenefits * 10);
                    reasons.push(`${matchesBenefits} key benefits match your needs`);
                }
            }

            // 3. Financial Value
            const netValue = calculateNetValue(card, prefs);
            if (netValue > 0) {
                score += Math.min(30, netValue / 1000); // Cap value score
                reasons.push("Positive estimated annual value");
            }

            // 4. Feature Matching (General)
            if (card.fees_detailed?.annual?.waived) {
                score += 10;
                reasons.push("Annual fee waiver available");
            }

            return {
                card,
                score,
                matchPercentage: Math.min(100, Math.round(score)),
                reasons: reasons.slice(0, 3), // Top 3 reasons
                netValue: Math.round(netValue)
            };
        })
        .filter((item): item is CardRecommendation => item !== null)
        .sort((a, b) => b.score - a.score);
}
