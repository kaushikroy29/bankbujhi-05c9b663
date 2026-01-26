import StatCard from "@/components/features/StatCard";

const stats = [
  {
    icon: "credit_card",
    label: "Cards Listed",
    value: "100+",
    isPrimary: false,
  },
  {
    icon: "account_balance",
    label: "Partner Banks",
    value: "20+",
    isPrimary: false,
  },
  {
    icon: "volunteer_activism",
    label: "Service Fee",
    value: "Free Forever",
    isPrimary: true,
  },
];

const StatsSection = () => {
  return (
    <section className="container-padding py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
