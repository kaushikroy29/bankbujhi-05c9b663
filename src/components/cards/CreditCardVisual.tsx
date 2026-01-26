import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface CreditCardVisualProps {
  variant?: "dark" | "green";
  label: string;
  className?: string;
}

const CreditCardVisual = ({ 
  variant = "dark", 
  label,
  className 
}: CreditCardVisualProps) => {
  const gradientClass = variant === "dark" 
    ? "from-gray-900 to-gray-700" 
    : "from-primary to-[#1b4d1e]";

  return (
    <div 
      className={cn(
        "w-full sm:w-48 h-32 rounded-xl p-4 flex flex-col justify-between text-white shadow-md relative overflow-hidden bg-gradient-to-br",
        gradientClass,
        className
      )}
    >
      {/* Contactless Icon */}
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <MaterialIcon name="contactless" className="text-4xl" />
      </div>

      {/* Card Label */}
      <p className="text-[10px] font-bold tracking-widest opacity-80 uppercase">
        {label}
      </p>

      {/* Card Bottom */}
      <div className="flex justify-between items-end">
        {/* Chip */}
        <div className="size-8 bg-accent/40 rounded-sm" />
        {/* Card Network Logo */}
        <div className="text-right">
          <div className="size-8 ml-auto bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CreditCardVisual;
