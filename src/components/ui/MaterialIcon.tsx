import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  filled?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
}

const MaterialIcon = forwardRef<HTMLSpanElement, MaterialIconProps>(
  ({ name, className, filled = false, weight = 400, ...props }, ref) => {
    const fillValue = filled ? 1 : 0;
    
    return (
      <span 
        ref={ref}
        className={cn("material-symbols-outlined", className)}
        style={{
          fontVariationSettings: `'FILL' ${fillValue}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
        }}
        {...props}
      >
        {name}
      </span>
    );
  }
);

MaterialIcon.displayName = "MaterialIcon";

export default MaterialIcon;
