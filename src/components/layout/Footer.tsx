import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/about", label: "Our Team" },
  { href: "/about", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/guides", label: "Credit Card Guide" },
  { href: "/banks", label: "Bank Directory" },
  { href: "/guides", label: "Financial Tips" },
  { href: "/contact", label: "Help Center" },
];

const socialLinks = [
  { icon: "social_leaderboard", href: "#" },
  { icon: "alternate_email", href: "#" },
  { icon: "share", href: "#" },
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
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
          <a href="#" className="hover:text-primary">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
