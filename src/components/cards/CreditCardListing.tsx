import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import WatchlistButton from "@/components/ui/WatchlistButton";

interface CardBenefit {
  icon: string;
  text: string;
}

interface CreditCard {
  id: string;
  bank: string;
  name: string;
  category: string;
  annualFee: string;
  annualFeeNote: string;
  annualFeeStrikethrough?: boolean;
  benefits: CardBenefit[];
  badge?: string;
  image: string;
}

interface CreditCardListingProps {
  card: CreditCard;
  isComparing: boolean;
  onToggleCompare: () => void;
}

const CreditCardListing = ({ card, isComparing, onToggleCompare }: CreditCardListingProps) => {
  return (
    <div className="bg-card border border-primary/10 rounded-2xl p-4 sm:p-5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group relative">
      <div className="flex flex-col gap-4">
        {/* Mobile: Header with badge and bank */}
        <div className="flex items-start justify-between md:hidden">
          <div className="flex items-center gap-2 flex-wrap">
            {card.badge && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                {card.badge}
              </span>
            )}
            <span className="text-sm font-bold text-muted-foreground">{card.bank}</span>
          </div>
          <div className="text-right">
            <span className={cn(
              "text-xl font-black",
              card.annualFee === "Free" || card.annualFee === "৳0"
                ? "text-primary"
                : "text-foreground"
            )}>
              {card.annualFee}
            </span>
            <span className={cn(
              "block text-[10px] font-bold text-muted-foreground uppercase",
              card.annualFeeStrikethrough && "line-through"
            )}>
              {card.annualFeeNote}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Card Image */}
          <div className="w-full sm:w-44 md:w-52 h-28 sm:h-32 bg-muted rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
            <img
              className="w-full h-full object-cover"
              src={card.image}
              alt={card.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Mobile Watchlist Button Overlay */}
            <div className="absolute top-2 right-2 md:hidden">
              <WatchlistButton
                productType="credit_card"
                productId={card.id}
                variant="icon"
                className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Card Details */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Desktop: Header with badge and fee */}
            <div className="hidden md:flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {card.badge && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                      {card.badge}
                    </span>
                  )}
                  <p className="text-sm font-bold text-muted-foreground">{card.bank}</p>
                </div>
                <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">
                  <Link to={`/cards/${card.id}`}>
                    {card.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{card.category}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className={cn(
                  "text-2xl font-black",
                  card.annualFee === "Free" || card.annualFee === "৳0"
                    ? "text-primary"
                    : "text-foreground"
                )}>
                  {card.annualFee}
                </span>
                <span className={cn(
                  "text-[10px] font-bold text-muted-foreground uppercase tracking-widest",
                  card.annualFeeStrikethrough && "line-through"
                )}>
                  {card.annualFeeNote}
                </span>
              </div>
            </div>

            {/* Mobile: Card name and category */}
            <div className="md:hidden mb-3">
              <h3 className="text-lg font-black leading-tight">
                <Link to={`/cards/${card.id}`}>
                  {card.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">{card.category}</p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {card.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="size-7 sm:size-8 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors flex items-center justify-center text-primary shrink-0">
                    <MaterialIcon name={benefit.icon} className="text-base sm:text-lg" />
                  </div>
                  <p className="text-sm font-medium truncate text-muted-foreground group-hover:text-foreground transition-colors">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex w-48 flex-col justify-between border-l border-primary/10 pl-6 gap-2">
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer select-none group/check">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={isComparing}
                    onChange={onToggleCompare}
                  />
                  <div className={cn(
                    "size-5 rounded border-2 transition-all flex items-center justify-center",
                    isComparing
                      ? "bg-primary border-primary"
                      : "border-primary/20"
                  )}>
                    {isComparing && (
                      <MaterialIcon name="check" className="text-primary-foreground text-sm" />
                    )}
                  </div>
                </div>
                <span className={cn(
                  "text-sm font-bold transition-colors",
                  isComparing ? "text-primary" : "group-hover/check:text-primary"
                )}>
                  {isComparing ? "Compared" : "Compare"}
                </span>
              </label>

              <div className="flex items-center gap-2">
                <WatchlistButton
                  productType="credit_card"
                  productId={card.id}
                  variant="icon"
                  className="bg-muted/50 hover:bg-primary/10"
                />
                <span className="text-xs font-bold text-muted-foreground">Watchlist</span>
              </div>
            </div>

            <Link to={`/cards/${card.id}`}>
              <Button className="w-full font-bold shadow-sm group-hover:shadow-md transition-all">
                View Details
                <MaterialIcon name="arrow_forward" className="ml-2 text-lg" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Actions - Mobile */}
        <div className="flex md:hidden items-center gap-3 pt-3 border-t border-primary/10">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isComparing}
                onChange={onToggleCompare}
              />
              <div className={cn(
                "size-5 rounded border-2 transition-all flex items-center justify-center",
                isComparing
                  ? "bg-primary border-primary"
                  : "border-primary/20"
              )}>
                {isComparing && (
                  <MaterialIcon name="check" className="text-primary-foreground text-sm" />
                )}
              </div>
            </div>
            <span className={cn(
              "text-sm font-bold",
              isComparing ? "text-primary" : "text-muted-foreground"
            )}>
              Compare
            </span>
          </label>
          <Link to={`/cards/${card.id}`} className="flex-1">
            <Button className="w-full font-bold h-10 shadow-sm">
              View Details
              <MaterialIcon name="arrow_forward" className="ml-2 text-lg" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreditCardListing;
