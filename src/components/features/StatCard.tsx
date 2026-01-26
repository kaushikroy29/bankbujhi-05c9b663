import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  isPrimary?: boolean;
  className?: string;
}

const StatCard = ({ icon, label, value, isPrimary = false, className }: StatCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-5 rounded-xl p-8 bg-card border border-primary/10 shadow-sm group hover:border-primary/40 transition-all",
        className
      )}
    >
      <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
        <MaterialIcon name={icon} className="text-3xl" />
      </div>
      <div>
        <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider">
          {label}
        </p>
        <p className={cn(
          "text-3xl font-black",
          isPrimary ? "text-primary" : "text-foreground"
        )}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
