import StatCard from "@/components/features/StatCard";

const stats = [
  {
    icon: "credit_card",
    label: "কার্ড তালিকাভুক্ত",
    value: "১০০+",
    isPrimary: false,
  },
  {
    icon: "account_balance",
    label: "পার্টনার ব্যাংক",
    value: "২০+",
    isPrimary: false,
  },
  {
    icon: "volunteer_activism",
    label: "সার্ভিস ফি",
    value: "সম্পূর্ণ বিনামূল্যে",
    isPrimary: true,
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
