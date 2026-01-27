import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Our Team" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/guides", label: "Credit Card Guide" },
  { href: "/banks", label: "Bank Directory" },
  { href: "/tips", label: "Financial Tips" },
  { href: "/help", label: "Help Center" },
];

const socialLinks = [
  { icon: "mail", href: "mailto:contact@bankbujhi.com", label: "Email" },
  { icon: "public", href: "https://facebook.com/bankbujhi", label: "Facebook" },
  { icon: "send", href: "https://t.me/bankbujhi", label: "Telegram" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/10 container-padding py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="mb-6">
            <Logo size="sm" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Helping Bangladeshi consumers make smarter financial decisions with data-driven comparisons.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest">
            Company
          </h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  to={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest">
            Resources
          </h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link 
                  to={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest">
            Connect
          </h4>
          <div className="flex gap-4 mb-6">
            {socialLinks.map((link) => (
              <a
                key={link.icon}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <MaterialIcon name={link.icon} className="text-lg" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © 2024 BankBujhi. All rights reserved. Registered in Bangladesh.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          <Link to="/help" className="hover:text-primary">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
