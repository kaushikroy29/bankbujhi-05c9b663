import { cn } from "@/lib/utils";

interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
}

const MaterialIcon = ({ 
  name, 
  className, 
  filled = false,
  weight = 400 
}: MaterialIconProps) => {
  const fillValue = filled ? 1 : 0;
  
  return (
    <span 
      className={cn("material-symbols-outlined", className)}
      style={{
        fontVariationSettings: `'FILL' ${fillValue}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
      }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;
