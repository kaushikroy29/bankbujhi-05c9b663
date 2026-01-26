import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/compare", label: "Cards" },
  { href: "/loans", label: "Loans" },
  { href: "/savings", label: "Savings" },
  { href: "/banks", label: "Banks" },
  { href: "/guides", label: "Guides" },
  { href: "/eligibility", label: "Compare" },
];

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-card/80 backdrop-blur-md container-padding py-3">
        <div className="flex items-center justify-between whitespace-nowrap">
          {/* Logo */}
          <Link to="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-semibold hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Compare CTA */}
            <Link to="/compare">
              <Button className="hidden sm:flex min-w-[84px] h-10 px-4 text-sm font-bold shadow-sm">
                Compare Now
              </Button>
            </Link>

            {/* Language Toggle */}
            <button className="flex items-center gap-2 rounded-lg h-10 px-3 bg-primary/10 text-primary text-sm font-bold border border-primary/20">
              <MaterialIcon name="language" className="text-sm" />
              <span>EN/BN</span>
            </button>

            {/* User Avatar */}
            <div 
              className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
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
