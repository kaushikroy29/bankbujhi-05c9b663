import StatCard from "@/components/features/StatCard";
import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: "account_balance",
      label: t('stats_banks'),
      value: "৫০+",
      isPrimary: false,
    },
    {
      icon: "credit_card",
      label: t('stats_cards'),
      value: "২০০+",
      isPrimary: false,
    },
    {
      icon: "volunteer_activism",
      label: t('stats_free'),
      value: "১০০%",
      isPrimary: true,
    },
    {
      icon: "sentiment_satisfied",
      label: t('stats_users'),
      value: "৫,০০০+",
      isPrimary: false,
    },
  ];

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
