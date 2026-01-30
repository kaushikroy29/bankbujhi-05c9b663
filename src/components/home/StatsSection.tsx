import StatCard from "@/components/features/StatCard";

const stats = [
  {
    icon: "account_balance",
    label: "ব্যাংক ও আর্থিক প্রতিষ্ঠান",
    value: "৫০+",
    isPrimary: false,
  },
  {
    icon: "credit_card",
    label: "ক্রেডিট কার্ড অপশন",
    value: "২০০+",
    isPrimary: false,
  },
  {
    icon: "volunteer_activism",
    label: "বিনামূল্যে সেবা",
    value: "১০০%",
    isPrimary: true,
  },
  {
    icon: "sentiment_satisfied",
    label: "সন্তুষ্ট ব্যবহারকারী",
    value: "৫,০০০+",
    isPrimary: false,
  },
];

const StatsSection = () => {
  return (
    <section className="container-padding py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            isPrimary={stat.isPrimary}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
