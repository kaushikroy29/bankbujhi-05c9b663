import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MobileNav from "./MobileNav";
import NotificationBell from "./NotificationBell";
import LanguageToggle from "./LanguageToggle";

const navLinks = [
  { href: "/compare", label: "কার্ড", icon: "credit_card" },
  { href: "/loans", label: "লোন", icon: "account_balance" },
  { href: "/savings", label: "সেভিংস", icon: "savings" },
  { href: "/mfs", label: "MFS", icon: "smartphone" },
  { href: "/glossary", label: "শব্দকোষ", icon: "menu_book" },
  { href: "/guides", label: "গাইড", icon: "article" },
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
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive
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
            {/* Compare CTA - Desktop only */}
            <Link to="/compare" className="hidden sm:block">
              <Button className="min-w-[84px] h-10 px-4 text-sm font-bold shadow-sm">
                তুলনা করুন
              </Button>
            </Link>

            {/* Notification Bell */}
            <NotificationBell />

            {/* Language Toggle - Hidden on very small screens */}
            {/* Language Toggle */}
            <LanguageToggle />

            {/* User Avatar - Desktop only */}
            <Link
              to="/dashboard"
              className="hidden md:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20 hover:border-primary transition-colors"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuACEbGTRBfMw99Qp0lE-ppdjKnDQQ0POIIfoS1GUE-ivf45IqxEBUrNdktDuAbjq3STzFDAOfb685uz9Jwj5aherHLvFVSjsnJYz72kzdxGxG7fWSLQjWLyQUyVt4gepCO2-uhN3jmawwaaaipFvTBtDnNPTSTjWY5eFt8UyWU5HYHmAvz6WRbVQmcyJJbrnehyZ2c5pyZmS-zd4jHRrM_YRYtlKDFvLEtHA1j1JnggVL9R5k_971hi74Lt_0bDntRAlgs-pxbx9Ms")`
              }}
            />

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
