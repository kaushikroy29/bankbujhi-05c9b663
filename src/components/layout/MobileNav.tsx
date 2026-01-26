import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}

const MobileNav = ({ isOpen, onClose, links }: MobileNavProps) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card z-50 shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Logo size="sm" />
            <button 
              onClick={onClose}
              className="size-10 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            >
              <MaterialIcon name="close" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground font-semibold hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Link
              to="/compare"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg"
              onClick={onClose}
            >
              Compare Now
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
