import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: number;
  name: string;
  tagline: string;
  price: number;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
}

interface PricingCardProps {
  plan: Plan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <div
      className={`relative bg-card rounded-2xl border ${
        plan.popular ? "border-primary shadow-xl scale-105" : "border-primary/10"
      } p-8 flex flex-col`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
          Most Popular
        </div>
      )}

      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {plan.tagline}
      </div>
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-black text-foreground">৳{plan.price}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

      <Button
        className={`w-full mb-6 ${
          plan.popular ? "" : "bg-muted text-foreground hover:bg-muted/80"
        }`}
        variant={plan.popular ? "default" : "secondary"}
      >
        {plan.cta}
      </Button>

      <div className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <div key={feature.name} className="flex items-center gap-2">
            <MaterialIcon
              name={feature.included ? "check_circle" : "cancel"}
              className={feature.included ? "text-primary" : "text-muted-foreground/50"}
            />
            <span
              className={`text-sm ${
                feature.included ? "text-foreground" : "text-muted-foreground/50"
              }`}
            >
              {feature.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
