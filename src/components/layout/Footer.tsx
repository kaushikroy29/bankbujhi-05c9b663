import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/10 container-padding py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Logo size="sm" />

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-primary/5 text-center">
          <p className="text-sm text-muted-foreground">
            © BankBujhi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
