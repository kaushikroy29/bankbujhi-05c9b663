
import { CreditCard } from "@/lib/api/banks";

/**
 * Parses a currency string like "1,000" or "৳500" into a number
 */
export const parseAmount = (amountStr: string | null | undefined): number => {
    if (!amountStr) return 0;
    // Remove all non-numeric characters except decimal point
    const numericStr = amountStr.replace(/[^0-9.]/g, "");
    const value = parseFloat(numericStr);
    return isNaN(value) ? 0 : value;
};

/**
 * Estimates the cashback rate for a card.
 * In a real scenario, this would parse detailed benefits.
 * For now, we return a default or extract from description if possible.
 */
export const getCashbackRate = (card: CreditCard): number => {
    // If we had a structured cashback field, we'd use it.
    // For now, let's look for "cashback" in benefits and try to extract a %
    if (card.benefits) {
        for (const benefit of card.benefits) {
            if (!benefit.text) continue;
            const text = benefit.text.toLowerCase();
            if (text.includes("cashback") || text.includes("cash back")) {
                const match = text.match(/(\d+(\.\d+)?)%/);
                if (match) {
                    return parseFloat(match[1]);
                }
            }
        }
    }

    // Default fallback (conservative estimate)
    return 0.5;
};
