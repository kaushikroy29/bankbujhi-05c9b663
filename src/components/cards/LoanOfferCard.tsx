import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoanOffer {
  id: string; // Changed from number to string for UUID
  bank: string;
  bankCode: string;
  interestRate: number;
  processingFee: string;
  processingFeeNote: string;
  totalRepayment: number;
  badge: string;
  isPremium: boolean;
  bgColor: string;
}

interface LoanOfferCardProps {
  offer: LoanOffer;
}

const LoanOfferCard = ({ offer }: LoanOfferCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  return (
    <tr
      className={cn(
        "bg-card border rounded-xl group hover:shadow-md transition-shadow",
        offer.isPremium
          ? "border-2 border-accent/30"
          : "border-primary/10"
      )}
    >
      <td className="px-6 py-8 rounded-l-xl relative">
        {offer.isPremium && (
          <div className="absolute top-0 left-0 bg-accent text-foreground text-[9px] font-black px-3 py-1 rounded-br-lg uppercase tracking-widest">
            Premium Choice
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <div className={cn(
              "w-full h-full flex items-center justify-center text-white text-[10px] font-bold",
              offer.bgColor
            )}>
              {offer.bankCode}
            </div>
          </div>
          <div>
            <p className="font-bold text-lg">{offer.bank}</p>
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
              offer.isPremium
                ? "bg-accent/20 text-accent"
                : "bg-primary/20 text-primary"
            )}>
              {offer.badge}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-8">
        <p className="text-xl font-black">
          {offer.interestRate}%
          <span className="text-xs font-normal text-muted-foreground ml-1">p.a.</span>
        </p>
      </td>
      <td className="px-6 py-8">
        <p className="font-semibold">{offer.processingFee}</p>
        <p className="text-[10px] text-muted-foreground">{offer.processingFeeNote}</p>
      </td>
      <td className="px-6 py-8">
        <p className="text-lg font-bold">৳ {formatCurrency(offer.totalRepayment)}</p>
      </td>
      <td className="px-6 py-8 rounded-r-xl">
        <Link to={`/loans/${offer.id}`}>
          <Button className="w-full font-bold shadow-sm group-hover:shadow-md transition-all">
            বিস্তারিত দেখুন
            <MaterialIcon name="arrow_forward" className="ml-2 text-lg" />
          </Button>
        </Link>
      </td>
    </tr>
  );
};

export default LoanOfferCard;
