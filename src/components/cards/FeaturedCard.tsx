import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";
import CreditCardVisual from "./CreditCardVisual";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeaturedCardProps {
  id: string;
  name: string;
  cardLabel: string;
  rating: number;
  benefits: string[];
  variant?: "dark" | "green";
  applyUrl?: string;
  badge?: string;
  className?: string;
}

const FeaturedCard = ({ 
  id,
  name, 
  cardLabel, 
  rating, 
  benefits, 
  variant = "dark",
  applyUrl,
  badge,
  className 
}: FeaturedCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 shadow-lg border border-primary/10 flex flex-col sm:flex-row gap-6",
        className
      )}
    >
      {/* Card Visual */}
      <CreditCardVisual variant={variant} label={cardLabel} />

      {/* Card Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Badge */}
          {badge && (
            <span className="inline-block px-2 py-0.5 bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
              {badge}
            </span>
          )}
          
          {/* Name and Rating */}
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-lg text-foreground">{name}</h4>
            <span className="flex items-center text-accent text-xs font-bold">
              <MaterialIcon name="star" className="text-xs" /> {rating.toFixed(1)}
            </span>
          </div>

          {/* Benefits */}
          <ul className="text-xs text-muted-foreground space-y-1 mb-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-1">
                <MaterialIcon 
                  name="check_circle" 
                  className="text-[14px] text-primary" 
                />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 text-xs font-bold shadow-sm group-hover:shadow-md transition-all"
            asChild
          >
            <Link to={`/cards/${id}`}>
              Details <MaterialIcon name="arrow_forward" className="ml-1 text-xs" />
            </Link>
          </Button>
          {applyUrl ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs font-bold border-primary text-primary hover:bg-primary/5"
              asChild
            >
              <a href={applyUrl} target="_blank" rel="noopener noreferrer">Apply</a>
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs font-bold border-primary text-primary hover:bg-primary/5"
              asChild
            >
              <Link to="/eligibility">Apply</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
