import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-3 text-primary", className)}>
      <div className={sizeClasses[size]}>
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_bankbujhi)">
            <path
              clipRule="evenodd"
              d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="clip0_bankbujhi">
              <rect fill="white" height="48" width="48" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {showText && (
        <h2 className={cn(
          "font-black leading-tight tracking-tight text-foreground",
          textSizeClasses[size]
        )}>
          BankBujhi
        </h2>
      )}
    </div>
  );
};

export default Logo;
