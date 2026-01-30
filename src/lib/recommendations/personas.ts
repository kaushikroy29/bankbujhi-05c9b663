
export interface Persona {
    id: string;
    title: string;
    icon: string;
    description: string;
    criteria: {
        min_income?: number; // Monthly income in BDT
        max_annual_fee?: number;
        age_range?: [number, number];
        preferred_benefits: string[];
    };
    recommended_types: string[]; // e.g., 'Student', 'Travel', etc.
}

export const userPersonas: Record<string, Persona> = {
    student: {
        id: "student",
        title: "ছাত্র/ছাত্রী (Student)",
        icon: "school", // Material Icon name
        description: "কম খরচে এবং স্টুডেন্ট অফার সহ কার্ড খুঁজছেন",
        criteria: {
            min_income: 0,
            max_annual_fee: 1000,
            age_range: [18, 25],
            preferred_benefits: ["low_fee", "online_shopping", "food"]
        },
        recommended_types: ["Student", "Entry Level", "Low Fee"]
    },

    salaried_professional: {
        id: "salaried",
        title: "চাকরিজীবী (Professional)",
        icon: "business_center",
        description: "দৈনন্দিন খরচ এবং ইএমআই সুবিধার জন্য",
        criteria: {
            min_income: 30000,
            preferred_benefits: ["cashback", "fuel", "emi", "grocery"]
        },
        recommended_types: ["Standard", "Cashback", "Rewards"]
    },

    frequent_traveler: {
        id: "traveler",
        title: "ভ্রমণপ্রিয় (Traveler)",
        icon: "flight",
        description: "লাউঞ্জ এক্সেস এবং এয়ারলাইন অফার চাই",
        criteria: {
            min_income: 60000,
            preferred_benefits: ["lounge", "air_ticket", "hotel", "foreign_currency"]
        },
        recommended_types: ["Travel", "Premium", "Airlines"]
    },

    shopper: {
        id: "shopper",
        title: "শপিং প্রেমী (Shopper)",
        icon: "shopping_bag",
        description: "ডিসকাউন্ট এবং রিওয়ার্ড পয়েন্ট আমার পছন্দ",
        criteria: {
            preferred_benefits: ["shopping", "rewards", "dining", "beauty"]
        },
        recommended_types: ["Shopping", "Lifestyle", "Rewards"]
    },

    business_owner: {
        id: "business",
        title: "ব্যবসায়ী (Business Owner)",
        icon: "store",
        description: "উচ্চ লিমিট এবং ব্যবসায়িক খরচের সুবিধা",
        criteria: {
            min_income: 100000,
            preferred_benefits: ["high_limit", "business_lounge", "expense_tracking"]
        },
        recommended_types: ["Business", "Corporate", "Premium"]
    },

    premium_seeker: {
        id: "premium",
        title: "প্রিমিয়াম ব্যবহারকারী (Premium)",
        icon: "diamond",
        description: "এক্সক্লুসিভ লাইফস্টাইল এবং কনসিয়ার্জ সেবা",
        criteria: {
            min_income: 150000,
            preferred_benefits: ["unlimited_lounge", "concierge", "golf", "fine_dining"]
        },
        recommended_types: ["Elite", "Premium", "Signature", "World"]
    }
};
