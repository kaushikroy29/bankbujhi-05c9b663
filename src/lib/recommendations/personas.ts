export interface UserPersona {
    id: string;
    title: string;
    icon: string;
    description: string;
    criteria: {
        min_income?: number; // Monthly income in BDT
        max_annual_fee?: number; // Max willing to pay
        age_range?: [number, number];
        preferred_benefits: string[];
        spending_categories: string[];
    };
    recommended_types?: string[]; // e.g., 'student', 'travel', 'cashback'
}

export const userPersonas: Record<string, UserPersona> = {
    student: {
        id: 'student',
        title: "ছাত্র/ছাত্রী",
        icon: "school",
        description: "যাদের আয় কম বা নেই, কিন্তু সুবিধা প্রয়োজন",
        criteria: {
            min_income: 0,
            max_annual_fee: 1000,
            age_range: [18, 25],
            preferred_benefits: ["কম বার্ষিক ফি", "অনলাইন শপিং ডিসকাউন্ট", "ফুড ডেলিভারি অফার"],
            spending_categories: ["dining", "online_shopping"]
        },
        recommended_types: ['student', 'entry', 'prepaid']
    },

    salaried_professional: {
        id: 'salaried_professional',
        title: "চাকরিজীবী",
        icon: "business_center",
        description: "নিয়মিত আয় আছে এবং দৈনন্দিন খরচে সাশ্রয় চান",
        criteria: {
            min_income: 30000,
            preferred_benefits: ["ক্যাশব্যাক", "পেট্রোল ডিসকাউন্ট", "ইএমআই সুবিধা"],
            spending_categories: ["groceries", "bills", "fuel"]
        },
        recommended_types: ['shopping', 'cashback', 'lifestyle']
    },

    frequent_traveler: {
        id: 'frequent_traveler',
        title: "ভ্রমণপ্রিয়",
        icon: "flight",
        description: "যারা প্রায়ই বিদেশ ভ্রমণ করেন এবং এয়ারপোর্ট সুবিধা চান",
        criteria: {
            min_income: 60000,
            preferred_benefits: ["লাউঞ্জ এক্সেস", "এয়ারলাইন মাইলেজ", "হোটেল ডিসকাউন্ট", "ডুয়াল কারেন্সি"],
            spending_categories: ["travel", "dining"]
        },
        recommended_types: ['travel', 'premium', 'dual_currency']
    },

    shopper: {
        id: 'shopper',
        title: "শপিং প্রেমী",
        icon: "shopping_bag",
        description: "কেনাকাটায় সেরা ডিসকাউন্ট এবং রিওয়ার্ড পয়েন্ট খুঁজছেন",
        criteria: {
            preferred_benefits: ["শপিং ক্যাশব্যাক", "রিওয়ার্ড পয়েন্ট", "ব্র্যান্ড অফার"],
            spending_categories: ["shopping", "online_shopping"]
        },
        recommended_types: ['shopping', 'rewards']
    },

    business_owner: {
        id: 'business_owner',
        title: "ব্যবসায়ী",
        icon: "store",
        description: "ব্যবসার খরচে সুবিধা এবং উচ্চ ক্রেডিট লিমিট প্রয়োজন",
        criteria: {
            min_income: 100000,
            preferred_benefits: ["বিজনেস লাউঞ্জ", "উচ্চ লিমিট", "এক্সপেন্স ট্র্যাকিং"],
            spending_categories: ["business", "travel", "bills"]
        },
        recommended_types: ['premium', 'business']
    },

    premium_seeker: {
        id: 'premium_seeker',
        title: "প্রিমিয়াম গ্রাহক",
        icon: "diamond",
        description: "সর্বোচ্চ সুবিধা এবং এক্সক্লুসিভ অফার চান",
        criteria: {
            min_income: 150000,
            preferred_benefits: ["আনলিমিটেড লাউঞ্জ", "কনসিয়ার্জ সেবা", "গলফ সুবিধা", "ফাইভ স্টার হোটেল"],
            spending_categories: ["luxury", "travel", "fine_dining"]
        },
        recommended_types: ['premium', 'signature', 'infinite']
    }
};
