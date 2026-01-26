import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: string;
  bgIcon: string;
  title: string;
  description: string;
  variant?: "primary" | "accent";
  className?: string;
}

const CategoryCard = ({ 
  icon, 
  bgIcon, 
  title, 
  description, 
  variant = "primary",
  className 
}: CategoryCardProps) => {
  const isAccent = variant === "accent";
  
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-primary/10 bg-card p-8 transition-all hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      {/* Background Icon */}
      <div className="absolute top-0 right-0 p-4">
        <MaterialIcon 
          name={bgIcon} 
          className={cn(
            "text-6xl transition-all",
            isAccent 
              ? "text-accent/10 group-hover:text-accent/20" 
              : "text-primary/10 group-hover:text-primary/20"
          )} 
        />
      </div>

      <div className="flex flex-col gap-4">
        {/* Icon */}
        <div className={cn(
          "size-12 rounded-lg flex items-center justify-center",
          isAccent 
            ? "bg-accent/10 text-accent" 
            : "bg-primary/10 text-primary"
        )}>
          <MaterialIcon name={icon} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Link */}
        <button className="mt-2 text-primary font-bold text-sm flex items-center gap-2">
          Explore <MaterialIcon name="open_in_new" className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
