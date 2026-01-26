import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";

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
    <>
      {/* Desktop View - Table Row */}
      <tr className="hidden md:table-row border-b border-primary/5 hover:bg-muted/30 transition-colors">
        <td className="px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${rate.bgColor} rounded-lg flex items-center justify-center shrink-0`}>
              <span className="text-white text-xs font-bold">{rate.bankCode}</span>
            </div>
            <span className="font-semibold">{rate.bank}</span>
          </div>
        </td>
        <td className="px-4 lg:px-6 py-4">
          <span className="text-lg font-bold text-primary">{rate.interestRate}%</span>
          <span className="text-sm text-muted-foreground ml-1">p.a.</span>
        </td>
        <td className="px-4 lg:px-6 py-4">
          <span className="text-sm">{rate.compounding}</span>
        </td>
        <td className="px-4 lg:px-6 py-4">
          <span className="text-sm font-semibold text-muted-foreground">{rate.taxAdjusted}%</span>
        </td>
        <td className="px-4 lg:px-6 py-4">
          <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Start Saving
          </Button>
        </td>
      </tr>

      {/* Mobile View - Card */}
      <tr className="md:hidden">
        <td colSpan={5} className="p-0">
          <div className="bg-card border-b border-primary/10 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${rate.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">{rate.bankCode}</span>
                </div>
                <div>
                  <h4 className="font-bold">{rate.bank}</h4>
                  <span className="text-sm text-muted-foreground">{rate.compounding}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-primary">{rate.interestRate}%</div>
                <div className="text-xs text-muted-foreground">p.a.</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-primary/10">
              <div className="flex items-center gap-2 text-sm">
                <MaterialIcon name="info" className="text-muted-foreground text-sm" />
                <span className="text-muted-foreground">Tax-adjusted: </span>
                <span className="font-semibold">{rate.taxAdjusted}%</span>
              </div>
              <Button size="sm" className="h-9">
                Start Saving
              </Button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default SavingsRateCard;
