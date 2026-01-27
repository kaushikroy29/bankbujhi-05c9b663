import { Link, useLocation } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

const MobileNav = ({ isOpen, onClose, links }: MobileNavProps) => {
  const location = useLocation();

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
            <ul className="space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                      onClick={onClose}
                    >
                      <MaterialIcon name={link.icon} className="text-xl" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Tools Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-4 mb-3">
                টুলস
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/eligibility"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    <MaterialIcon name="fact_check" className="text-xl" />
                    যোগ্যতা যাচাই
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quiz"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    <MaterialIcon name="quiz" className="text-xl" />
                    কার্ড কুইজ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-4 mb-3">
                অ্যাকাউন্ট
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    <MaterialIcon name="dashboard" className="text-xl" />
                    ড্যাশবোর্ড
                  </Link>
                </li>
                <li>
                  <Link
                    to="/premium"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    <MaterialIcon name="workspace_premium" className="text-xl text-accent" />
                    <span>প্রিমিয়াম</span>
                    <span className="ml-auto bg-accent/20 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full">নতুন</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-3">
            <Link
              to="/signup"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl"
              onClick={onClose}
            >
              <MaterialIcon name="person_add" className="text-lg" />
              ফ্রি সাইন আপ
            </Link>
            <Link
              to="/help"
              className="flex items-center justify-center gap-2 w-full border border-primary/20 text-foreground font-medium py-3 px-4 rounded-xl hover:bg-muted transition-colors"
              onClick={onClose}
            >
              <MaterialIcon name="help" className="text-lg text-primary" />
              সাহায্য কেন্দ্র
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
