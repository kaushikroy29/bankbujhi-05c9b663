import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";

const picks = [
  {
    id: 1,
    bank: " সিটি ব্যাংক",
    bankCode: "City",
    name: "আমেরিকান এক্সপ্রেস (Amex)",
    benefit: "৫% ক্যাশব্যাক",
    color: "bg-green-800",
  },
  {
    id: 2,
    bank: "ইস্টার্ন ব্যাংক",
    bankCode: "EBL",
    name: "ভিসা সিগনেচার (স্কাইলঞ্জ)",
    benefit: "এয়ারপোর্ট লাউঞ্জ অ্যাক্সেস",
    color: "bg-blue-900",
  },
  {
    id: 3,
    bank: "স্ট্যান্ডার্ড চার্টার্ড",
    bankCode: "SCB",
    name: "ভিসা প্ল্যাটিনাম",
    benefit: "ইলেকট্রনিক্সে ০% ইএমআই (EMI)",
    color: "bg-teal-700",
  },
];

const tips = [
  "সুদ এড়াতে সর্বদা আপনার ক্রেডিট কার্ডের বিল সম্পূর্ণ পরিশোধ করুন।",
  "দ্রুত রিওয়ার্ড পয়েন্ট জমা করতে আপনার কার্ড নিয়মিত কেনাকাটায় ব্যবহার করুন।",
  "তথ্যের সঠিকতা নিশ্চিত করতে প্রতি বছর আপনার সিআইবি (CIB) রিপোর্ট চেক করুন।",
];

const MonthlyPicks = () => {
  const currentMonth = new Date().toLocaleDateString("bn-BD", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-background">
      {/* Email Header */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary-foreground" />
            <span className="font-bold">BankBujhi.com</span>
          </Link>
          <span className="text-sm opacity-80">{currentMonth}-এর নিউজলেটার</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            মাসিক <span className="text-primary">সেরা পছন্দ</span>
          </h1>
          <p className="text-muted-foreground font-bengali">
            এই মাসের সেরা ক্রেডিট কার্ড অফারগুলোর জন্য আমাদের বিশেষ নির্বাচন
          </p>
        </div>

        {/* Featured Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MaterialIcon name="star" className="text-accent" />
            সেরা কার্ডসমূহ (Featured)
          </h2>
          <div className="space-y-4">
            {picks.map((card) => (
              <div
                key={card.id}
                className="bg-card rounded-xl border border-primary/10 p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div className={`${card.color} w-16 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                  <span className="text-white text-xs font-bold">{card.bankCode}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground uppercase">{card.bank}</div>
                  <div className="font-bold truncate">{card.name}</div>
                  <div className="text-sm text-primary">{card.benefit}</div>
                </div>
                <Button size="sm" variant="outline" className="shrink-0 border-primary text-primary" asChild>
                  <Link to="/compare">বিস্তারিত দেখুন</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/compare" className="text-primary font-semibold hover:underline">
              সবগুলো দেখুন →
            </Link>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-12 bg-primary/5 rounded-xl p-6 border border-primary/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MaterialIcon name="lightbulb" className="text-accent" />
            মাসিক পরামর্শ
          </h2>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <MaterialIcon name="check" className="text-primary shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-primary/10">
          <h3 className="text-lg font-bold mb-2">ব্যক্তিগত সুপারিশ পেতে চান?</h3>
          <p className="text-muted-foreground text-sm mb-4 font-bengali">
            আপনার খরচের অভ্যাসের সাথে সামঞ্জস্যপূর্ণ কার্ড পেতে প্রোফাইলটি সম্পূর্ণ করুন।
          </p>
          <Link to="/eligibility">
            <Button>যোগ্যতা পরীক্ষা করুন</Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-primary/10">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Logo className="w-6 h-6" />
            <span className="font-bold text-sm">BankBujhi.com</span>
          </Link>
          <p className="text-xs text-muted-foreground mb-4 font-bengali">
            বাংলাদেশে আপনার বিশ্বস্ত আর্থিক সঙ্গী
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <a href="mailto:contact@bankbujhi.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <MaterialIcon name="mail" />
            </a>
            <a href="https://facebook.com/bankbujhi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <MaterialIcon name="facebook" />
            </a>
            <a href="https://t.me/bankbujhi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Telegram">
              <MaterialIcon name="telegram" />
            </a>
          </div>
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary font-bengali">
            আনসাবস্ক্রাইব করুন
          </Link>
          <p className="text-xs text-muted-foreground mt-4">
            © BankBujhi.com. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MonthlyPicks;
