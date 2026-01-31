import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/cards/PricingCard";

const plans = [
  {
    id: 1,
    name: "বেসিক",
    tagline: "আজীবন ফ্রি",
    price: 0,
    description: "সকলের জন্য প্রয়োজনীয় সব তুলনামূলক সরঞ্জাম।",
    features: [
      { name: "মানসম্মত কার্ড তুলনা", included: true },
      { name: "বিজ্ঞাপন-মুক্ত অভিজ্ঞতা", included: false },
      { name: "এক্সক্লুসিভ প্রি-অ্যাপ্রুভড অফার", included: false },
      { name: "প্রায়োরিটি সাপোর্ট", included: false },
      { name: "আর্থিক পরামর্শ", included: false },
    ],
    cta: "শুরু করুন",
    popular: false,
  },
  {
    id: 2,
    name: "প্রো",
    tagline: "উন্নতি ও সঠিক সিদ্ধান্ত",
    price: 499,
    description: "সচেতন গ্রাহকদের জন্য আরও গভীর বিশ্লেষণ।",
    features: [
      { name: "মানসম্মত কার্ড তুলনা", included: true },
      { name: "বিজ্ঞাপন-মুক্ত অভিজ্ঞতা", included: true },
      { name: "এক্সক্লুসিভ প্রি-অ্যাপ্রুভড অফার", included: true },
      { name: "প্রায়োরিটি সাপোর্ট", included: true },
      { name: "আর্থিক পরামর্শ", included: false },
    ],
    cta: "প্রো-তে আপগ্রেড করুন",
    popular: true,
  },
  {
    id: 3,
    name: "এলিট",
    tagline: "প্রিমিয়াম সম্পদ ব্যবস্থাপনা",
    price: 999,
    description: "ব্যক্তিগতকৃত উচ্চ-স্তরের আর্থিক ব্যবস্থাপনা।",
    features: [
      { name: "মানসম্মত কার্ড তুলনা", included: true },
      { name: "বিজ্ঞাপন-মুক্ত অভিজ্ঞতা", included: true },
      { name: "এক্সক্লুসিভ প্রি-অ্যাপ্রুভড অফার", included: true },
      { name: "২৪/৭ ভিআইপি সাপোর্ট", included: true },
      { name: "১-অন-১ ব্যক্তিগত পরামর্শক", included: true },
    ],
    cta: "এলিট মেম্বার হন",
    popular: false,
  },
];

const comparisonFeatures = [
  { name: "সাপোর্ট অগ্রাধিকার", basic: "মানসম্মত", pro: "উচ্চ", elite: "২৪/৭ ভিআইপি" },
  { name: "বিজ্ঞাপন-মুক্ত অভিজ্ঞতা", basic: "নেই", pro: "সাধারণ (Basic)", elite: "পুরো অ্যাক্সেস" },
  { name: "আর্থিক পরামর্শ", basic: "নিজেই করার টুলসমূহ", pro: "উন্নত পরিকল্পনা টুলসমূহ", elite: "১-অন-১ ব্যক্তিগত পরামর্শক" },
  { name: "এক্সক্লুসিভ ইভেন্ট", basic: "—", pro: "—", elite: "এলিট মেম্বারদের জন্য ইভেন্ট" },
];

const Premium = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4 font-bengali">
              প্রিমিয়াম অভিজ্ঞতা
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-6">
              উন্নত করুন আপনার <span className="text-primary">আর্থিক যাত্রা</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 font-bengali">
              আপনার আর্থিক যাত্রাকে আরও উন্নত করুন। ব্যাংকবুঝি প্রিমিয়াম মেম্বারশিপের সাথে পান এক্সক্লুসিভ টুলস,
              প্রায়োরিটি সাপোর্ট এবং প্রি-অ্যাপ্রুভড অফার।
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button size="lg" className="font-bold">
                প্ল্যানগুলো দেখুন
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary">
                এটি যেভাবে কাজ করে
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">মেম্বারশিপের সুবিধাগুলোর তুলনা</h2>
              <p className="text-muted-foreground font-bengali">
                সঠিক সিদ্ধান্ত নিতে আমাদের বাংলাদেশী কমিউনিটির জন্য বিস্তারিত সুবিধার বিবরণ।
              </p>
            </div>

            <div className="bg-card rounded-xl border border-primary/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/10 bg-muted/50">
                      <th className="text-left px-6 py-4 font-bold">সুবিধা</th>
                      <th className="text-center px-6 py-4 font-bold">বেসিক</th>
                      <th className="text-center px-6 py-4 font-bold text-primary">প্রো (Pro)</th>
                      <th className="text-center px-6 py-4 font-bold">এলিট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, index) => (
                      <tr key={feature.name} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                        <td className="px-6 py-4 font-medium">{feature.name}</td>
                        <td className="px-6 py-4 text-center text-muted-foreground text-sm">{feature.basic}</td>
                        <td className="px-6 py-4 text-center text-sm">{feature.pro}</td>
                        <td className="px-6 py-4 text-center text-primary font-medium text-sm">{feature.elite}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">আজই আপনার যাত্রা শুরু করুন</h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto font-bengali">
              সঠিক আর্থিক সিদ্ধান্ত নিতে ব্যাংকবুঝি ব্যবহারকারী হাজার হাজার সচেতন মানুষের সাথে আপনিও যোগ দিন।
            </p>
            <Button size="lg" variant="secondary" className="font-bold">
              এখনই আপগ্রেড করুন
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Premium;
