import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface Bank {
  id: number;
  name: string;
  code: string;
  cardCount: number;
  loanProducts: number;
  color: string;
}

interface BankCardProps {
  bank: Bank;
}

const BankCard = ({ bank }: BankCardProps) => {
  return (
    <Link
      to={`/compare?bank=${bank.code}`}
      className="group bg-card rounded-xl border border-primary/10 p-6 hover:shadow-lg hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 ${bank.color} rounded-xl flex items-center justify-center`}>
          <span className="text-white text-lg font-bold">{bank.code}</span>
        </div>
        <MaterialIcon
          name="arrow_forward"
          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
        />
      </div>

      <h3 className="font-bold text-lg mb-3">{bank.name}</h3>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MaterialIcon name="credit_card" className="text-sm" />
          <span>{bank.cardCount} Credit Cards</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MaterialIcon name="account_balance" className="text-sm" />
          <span>{bank.loanProducts} Loan Products</span>
        </div>
      </div>
    </Link>
  );
};

export default BankCard;
