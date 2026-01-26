import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/cards/PricingCard";

const plans = [
  {
    id: 1,
    name: "Basic",
    tagline: "Free Forever",
    price: 0,
    description: "Essential comparison tools for everyone.",
    features: [
      { name: "Standard Card Comparison", included: true },
      { name: "Ad-free Experience", included: false },
      { name: "Exclusive Pre-approved Offers", included: false },
      { name: "Priority Support", included: false },
      { name: "Financial Advisory", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    tagline: "Growth Plan",
    price: 499,
    description: "Better insights for savvy consumers.",
    features: [
      { name: "Standard Card Comparison", included: true },
      { name: "Ad-free Experience", included: true },
      { name: "Exclusive Pre-approved Offers", included: true },
      { name: "Priority Support", included: true },
      { name: "Financial Advisory", included: false },
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    id: 3,
    name: "Elite",
    tagline: "Premium Wealth",
    price: 999,
    description: "Personalized high-end financial management.",
    features: [
      { name: "Standard Card Comparison", included: true },
      { name: "Ad-free Experience", included: true },
      { name: "Exclusive Pre-approved Offers", included: true },
      { name: "24/7 VIP Support", included: true },
      { name: "1-on-1 Personal Advisor", included: true },
    ],
    cta: "Go Elite",
    popular: false,
  },
];

const comparisonFeatures = [
  { name: "Priority Support", basic: "Standard", pro: "High", elite: "24/7 VIP" },
  { name: "Ad-free Experience", basic: "None", pro: "Basic", elite: "Premium Access" },
  { name: "Financial Advisory", basic: "Self-service Tools Only", pro: "Advanced Planning Tools", elite: "1-on-1 Personal Advisor" },
  { name: "Exclusive Events", basic: "—", pro: "—", elite: "Elite Member Events" },
];

const Premium = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
              Premium Experience
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-6">
              Elevate Your <span className="text-primary">Financial Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              <span className="font-bengali">আপনার আর্থিক যাত্রাকে আরও উন্নত করুন।</span> Unlock exclusive tools, 
              priority support, and pre-approved offers with BankBujhi Premium.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button size="lg" className="font-bold">
                Explore Plans
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary">
                How it works
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Compare Membership Benefits</h2>
              <p className="text-muted-foreground">
                Detailed feature breakdown for our Bangladeshi community to make informed decisions.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/10 bg-muted/50">
                      <th className="text-left px-6 py-4 font-bold">Features</th>
                      <th className="text-center px-6 py-4 font-bold">Basic</th>
                      <th className="text-center px-6 py-4 font-bold text-primary">Pro</th>
                      <th className="text-center px-6 py-4 font-bold">Elite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={feature.name} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="px-6 py-4 font-medium">{feature.name}</td>
                        <td className="px-6 py-4 text-center text-muted-foreground text-sm">{feature.basic}</td>
                        <td className="px-6 py-4 text-center text-sm">{feature.pro}</td>
                        <td className="px-6 py-4 text-center text-primary font-medium text-sm">{feature.elite}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start your journey today</h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Join thousands of smart consumers in Bangladesh using BankBujhi to make better financial decisions.
            </p>
            <Button size="lg" variant="secondary" className="font-bold">
              Upgrade Now
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Premium;
