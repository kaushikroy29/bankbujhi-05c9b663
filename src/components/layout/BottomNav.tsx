import { Link, useLocation } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/compare", icon: "credit_card", label: "Cards" },
  { href: "/loans", icon: "account_balance", label: "Loans" },
  { href: "/savings", icon: "savings", label: "Savings" },
  { href: "/dashboard", icon: "person", label: "Account" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/" && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
            <MaterialIcon 
                name={item.icon} 
                className={cn("text-xl", isActive && "scale-110")}
                filled={isActive}
              />
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-bold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
