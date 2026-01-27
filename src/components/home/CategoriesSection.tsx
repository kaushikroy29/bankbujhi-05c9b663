import { Link } from "react-router-dom";
import CategoryCard from "@/components/features/CategoryCard";
import MaterialIcon from "@/components/ui/MaterialIcon";

const categories = [
  {
    icon: "account_balance_wallet",
    bgIcon: "payments",
    title: "Cashback Cards",
    description: "Get money back on your daily grocery, dining, and utility spends.",
    variant: "primary" as const,
    categoryFilter: "Cashback & Rewards",
  },
  {
    icon: "airplane_ticket",
    bgIcon: "flight_takeoff",
    title: "Travel & Lounge",
    description: "Unlock global lounge access and earn miles for your next adventure.",
    variant: "accent" as const,
    categoryFilter: "Premium Travel & Rewards",
  },
  {
    icon: "shopping_bag",
    bgIcon: "shopping_basket",
    title: "Shopping Deals",
    description: "Exclusive discounts on top retail brands and e-commerce platforms.",
    variant: "primary" as const,
    categoryFilter: "Shopping & Utility Payments",
  },
];

const CategoriesSection = () => {
  return (
    <section className="container-padding py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-foreground">
            Browse by Category
          </h2>
          <div className="h-1.5 w-20 bg-accent mt-2 rounded-full" />
        </div>
        <Link 
          to="/compare" 
          className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
        >
          View All <MaterialIcon name="arrow_forward" className="text-sm" />
        </Link>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
