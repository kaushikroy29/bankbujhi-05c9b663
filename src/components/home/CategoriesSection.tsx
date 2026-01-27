import { Link } from "react-router-dom";
import CategoryCard from "@/components/features/CategoryCard";
import MaterialIcon from "@/components/ui/MaterialIcon";

const categories = [
  {
    icon: "account_balance_wallet",
    bgIcon: "payments",
    title: "ক্যাশব্যাক কার্ড",
    description: "প্রতিদিনের কেনাকাটা, খাবার ও বিলে টাকা ফেরত পান।",
    variant: "primary" as const,
    categoryFilter: "Cashback & Rewards",
  },
  {
    icon: "airplane_ticket",
    bgIcon: "flight_takeoff",
    title: "ট্রাভেল ও লাউঞ্জ",
    description: "বিমানবন্দরে লাউঞ্জ অ্যাক্সেস ও ভ্রমণে বিশেষ সুবিধা পান।",
    variant: "accent" as const,
    categoryFilter: "Premium Travel & Rewards",
  },
  {
    icon: "shopping_bag",
    bgIcon: "shopping_basket",
    title: "শপিং ডিল",
    description: "সেরা ব্র্যান্ড ও অনলাইন শপে এক্সক্লুসিভ ছাড় উপভোগ করুন।",
    variant: "primary" as const,
    categoryFilter: "Shopping & Utility Payments",
  },
];

const CategoriesSection = () => {
  return (
    <section className="container-padding py-12 md:py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground">
            ক্যাটাগরি অনুযায়ী খুঁজুন
          </h2>
          <div className="h-1.5 w-16 md:w-20 bg-accent mt-2 rounded-full" />
        </div>
        <Link 
          to="/compare" 
          className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
        >
          সব দেখুন <MaterialIcon name="arrow_forward" className="text-sm" />
        </Link>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            icon={category.icon}
            bgIcon={category.bgIcon}
            title={category.title}
            description={category.description}
            variant={category.variant}
            categoryFilter={category.categoryFilter}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
