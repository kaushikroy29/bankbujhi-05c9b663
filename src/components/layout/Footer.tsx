import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";

const companyLinks = [
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/team", label: "টিম" },
  { href: "/careers", label: "ক্যারিয়ার" },
  { href: "/contact", label: "যোগাযোগ" },
];

const toolLinks = [
  { href: "/eligibility", label: "যোগ্যতা যাচাই" },
  { href: "/quiz", label: "কার্ড কুইজ" },
  { href: "/compare", label: "কার্ড তুলনা" },
  { href: "/loans", label: "লোন ক্যালকুলেটর" },
  { href: "/savings", label: "সেভিংস ক্যালকুলেটর" },
];

const resourceLinks = [
  { href: "/guides", label: "ক্রেডিট কার্ড গাইড" },
  { href: "/banks", label: "ব্যাংক ডিরেক্টরি" },
  { href: "/tips", label: "আর্থিক পরামর্শ" },
  { href: "/help", label: "সাহায্য কেন্দ্র" },
];

const socialLinks = [
  { icon: "mail", href: "mailto:contact@bankbujhi.com", label: "Email" },
  { icon: "public", href: "https://facebook.com/bankbujhi", label: "Facebook" },
  { icon: "send", href: "https://t.me/bankbujhi", label: "Telegram" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/10 container-padding py-10 md:py-12">
      {/* Disclaimer Banner */}
      <div className="bg-muted/50 border border-primary/10 rounded-xl p-4 mb-10">
        <div className="flex items-start gap-3">
          <MaterialIcon name="info" className="text-primary text-xl shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">গুরুত্বপূর্ণ বিজ্ঞপ্তি</p>
            <p>
              BankBujhi কোনো ব্যাংক বা আর্থিক প্রতিষ্ঠান নয়। আমরা শুধুমাত্র তথ্য প্রদান করি।
              সকল তথ্য সংশ্লিষ্ট ব্যাংকের অফিসিয়াল ওয়েবসাইট থেকে সংগ্রহ করা হয়।
              আবেদনের আগে ব্যাংকের সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 mb-10">
        {/* Brand Column */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <div className="mb-4">
            <Logo size="sm" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            বাংলাদেশের ভোক্তাদের সঠিক আর্থিক সিদ্ধান্ত নিতে সাহায্য করছি নিরপেক্ষ তথ্য ও তুলনার মাধ্যমে।
          </p>
        </div>

        {/* Tools Links */}
        <div>
          <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-widest">
            টুলস
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {toolLinks.map((link) => (
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
          <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-widest">
            রিসোর্স
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
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

        {/* Company Links */}
        <div>
          <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-widest">
            কোম্পানি
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
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

        {/* Connect */}
        <div>
          <h4 className="font-bold text-foreground mb-4 uppercase text-xs tracking-widest">
            যোগাযোগ
          </h4>

          <ul className="space-y-3 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <MaterialIcon name="call" className="text-primary text-lg" />
              <span>+৮৮০ ১XXX-XXXXXX</span>
            </li>
            <li className="flex items-start gap-2">
              <MaterialIcon name="email" className="text-primary text-lg" />
              <span>info@bankbujhi.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MaterialIcon name="location_on" className="text-primary text-lg" />
              <span>ঢাকা, বাংলাদেশ</span>
            </li>
            <li className="flex items-start gap-2">
              <MaterialIcon name="schedule" className="text-primary text-lg" />
              <span>সকাল ৯টা - সন্ধ্যা ৬টা<br />(শনি-বৃহস্পতিবার)</span>
            </li>
          </ul>

          <div className="flex gap-3 mb-4">
            <a
              href="https://facebook.com/bankbujhi"
              target="_blank"
              rel="noopener noreferrer"
              className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <MaterialIcon name="facebook" className="text-lg" />
            </a>
            <a
              href="https://twitter.com/bankbujhi"
              target="_blank"
              rel="noopener noreferrer"
              className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <MaterialIcon name="public" className="text-lg" />
            </a>
            <a
              href="https://linkedin.com/company/bankbujhi"
              target="_blank"
              rel="noopener noreferrer"
              className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <MaterialIcon name="business" className="text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="pt-6 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground text-center md:text-left">
          © ২০২৫ BankBujhi। সর্বস্বত্ব সংরক্ষিত। বাংলাদেশে নিবন্ধিত।
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary">গোপনীয়তা নীতি</Link>
          <Link to="/terms" className="hover:text-primary">ব্যবহারের শর্তাবলী</Link>
          <Link to="/help" className="hover:text-primary">সাহায্য</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
