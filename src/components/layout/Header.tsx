import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "হোম" },
  { href: "/credit-cards", label: "ক্রেডিট কার্ড" },
  { href: "/compare", label: "তুলনা" },
  { href: "/guides", label: "গাইড" },
  { href: "/loans", label: "ক্যালকুলেটর" },
  { href: "/banks", label: "ব্যাংক" },
];

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-card/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between whitespace-nowrap max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={`${link.href}-${index}`}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Login Button */}
            <Link to="/signup" className="hidden sm:block">
              <Button variant="ghost" className="h-10 px-4 text-sm font-semibold">
                লগইন
              </Button>
            </Link>

            {/* Sign Up Button */}
            <Link to="/signup" className="hidden sm:block">
              <Button className="h-10 px-4 text-sm font-bold shadow-sm">
                সাইন আপ
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary"
              onClick={() => setIsMobileNavOpen(true)}
            >
              <MaterialIcon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileNavOpen} 
        onClose={() => setIsMobileNavOpen(false)}
        links={navLinks}
      />
    </>
  );
};

export default Header;
