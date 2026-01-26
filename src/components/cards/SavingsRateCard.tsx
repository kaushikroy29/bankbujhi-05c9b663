import { Button } from "@/components/ui/button";

interface SavingsRate {
  id: number;
  bank: string;
  bankCode: string;
  interestRate: number;
  compounding: string;
  taxAdjusted: number;
  bgColor: string;
}

interface SavingsRateCardProps {
  rate: SavingsRate;
}

const SavingsRateCard = ({ rate }: SavingsRateCardProps) => {
  return (
    <tr className="border-b border-primary/5 hover:bg-muted/30 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${rate.bgColor} rounded-lg flex items-center justify-center`}>
            <span className="text-white text-xs font-bold">{rate.bankCode}</span>
          </div>
          <span className="font-semibold">{rate.bank}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-lg font-bold text-primary">{rate.interestRate}%</span>
        <span className="text-sm text-muted-foreground ml-1">p.a.</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm">{rate.compounding}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-muted-foreground">{rate.taxAdjusted}%</span>
      </td>
      <td className="px-6 py-4">
        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Start Saving
        </Button>
      </td>
    </tr>
  );
};

export default SavingsRateCard;
