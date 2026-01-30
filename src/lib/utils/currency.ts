export const formatBDT = (amount: number | string): string => {
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;

    if (isNaN(num)) return '৳০';

    // Bangladeshi number system (lacks/crores) logic can be complex for exact placement of commas
    // standard 'bn-BD' locale usually handles the commas (2,3,2 pattern)
    // But we want text suffixes for large numbers as requested?
    // The user request example showed:
    // if (num >= 10000000) return `৳${(num / 10000000).toFixed(2)} কোটি`;
    // Let's stick to the user's requested logic for suffixes, but fallback to 'bn-BD' locale for smaller.

    if (num >= 10000000) {
        return `৳${(num / 10000000).toFixed(2)} কোটি`;
    } else if (num >= 100000) {
        return `৳${(num / 100000).toFixed(2)} লাখ`;
    }
    // User asked for thousands too, but usually thousands are just written with commas.
    // 1,500 is better than 1.5 thousand in UI usually, unless space is tight.
    // The user prompt had: `else if (num >= 1000) return ... হাজার`
    // I will implement as requested.
    else if (num >= 1000) {
        const thousands = num / 1000;
        // If it's a clean thousand like 5000 -> 5 হাজার
        // If 5500 -> 5.50 হাজার
        return `৳${thousands.toFixed(thousands % 1 === 0 ? 0 : 2)} হাজার`;
    }

    return `৳${num.toLocaleString('bn-BD')}`;
};
