import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CardBenefit {
  icon: string;
  text: string;
}

interface CompareCard {
  id: string;
  bank: string;
  name: string;
  category: string;
  annualFee: string;
  annualFeeNote: string;
  interestRate?: string;
  minIncome?: string;
  image: string;
  benefits: CardBenefit[];
}

interface CompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cards: CompareCard[];
  onRemoveCard: (id: string) => void;
}

const CompareRow = ({ 
  label, 
  values, 
  highlight = false 
}: { 
  label: string; 
  values: (string | React.ReactNode)[]; 
  highlight?: boolean;
}) => (
  <div className={cn(
    "grid gap-4 py-3 border-b border-primary/10",
    highlight && "bg-primary/5"
  )} style={{ gridTemplateColumns: `140px repeat(${values.length}, 1fr)` }}>
    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-4 flex items-center">
      {label}
    </div>
    {values.map((value, i) => (
      <div key={i} className="text-sm font-medium px-2">
        {value}
      </div>
    ))}
  </div>
);

const CompareModal = ({ open, onOpenChange, cards, onRemoveCard }: CompareModalProps) => {
  if (cards.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-primary/10">
          <DialogTitle className="text-xl font-black flex items-center gap-2">
            <MaterialIcon name="compare_arrows" className="text-primary" />
            Compare Cards ({cards.length})
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Card Headers */}
          <div 
            className="grid gap-4 p-4 bg-muted/30 sticky top-0 z-10 border-b border-primary/10"
            style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
          >
            <div />
            {cards.map((card) => (
              <div key={card.id} className="relative">
                <button
                  onClick={() => onRemoveCard(card.id)}
                  className="absolute -top-1 -right-1 size-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors z-10"
                >
                  <MaterialIcon name="close" className="text-sm" />
                </button>
                <div className="bg-card rounded-xl p-3 border border-primary/10">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-muted">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-primary mb-1">{card.bank}</p>
                  <h3 className="font-bold text-sm leading-tight line-clamp-2">{card.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{card.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          <div className="min-w-max">
            <CompareRow 
              label="Annual Fee" 
              values={cards.map((card) => (
                <span className={cn(
                  "font-black text-lg",
                  (card.annualFee === "Free" || card.annualFee === "৳0") && "text-primary"
                )}>
                  {card.annualFee}
                </span>
              ))}
              highlight
            />
            <CompareRow 
              label="Fee Note" 
              values={cards.map((card) => card.annualFeeNote || "—")}
            />
            <CompareRow 
              label="Interest Rate" 
              values={cards.map((card) => card.interestRate || "—")}
              highlight
            />
            <CompareRow 
              label="Min. Income" 
              values={cards.map((card) => card.minIncome || "—")}
            />
            
            {/* Benefits Section */}
            <div className="py-4 px-4 border-b border-primary/10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Key Benefits
              </p>
              <div 
                className="grid gap-4"
                style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
              >
                <div />
                {cards.map((card) => (
                  <div key={card.id} className="space-y-2">
                    {card.benefits.slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="size-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          <MaterialIcon name={benefit.icon} className="text-primary text-sm" />
                        </div>
                        <span className="text-xs font-medium leading-tight">{benefit.text}</span>
                      </div>
                    ))}
                    {card.benefits.length === 0 && (
                      <span className="text-xs text-muted-foreground">No benefits listed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div 
          className="p-4 border-t border-primary/10 bg-muted/30 grid gap-4"
          style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
        >
          <div className="flex items-center">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
          {cards.map((card) => (
            <Link key={card.id} to={`/cards/${card.id}`}>
              <Button className="w-full font-bold">
                View Details
              </Button>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
