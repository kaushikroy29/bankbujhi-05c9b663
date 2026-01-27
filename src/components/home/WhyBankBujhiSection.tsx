import { Card, CardContent } from "@/components/ui/card";
import MaterialIcon from "@/components/ui/MaterialIcon";

const features = [
  {
    icon: "translate",
    title: "সহজ Bangla ব্যাখ্যা",
    description: "জটিল ব্যাংকিং টার্ম সহজ বাংলায় বোঝানো হয়",
  },
  {
    icon: "balance",
    title: "নিরপেক্ষ তুলনা",
    description: "কোনো ব্যাংকের পক্ষপাত ছাড়াই সৎ তুলনা",
  },
  {
    icon: "location_on",
    title: "বাংলাদেশি ব্যাংক ভিত্তিক তথ্য",
    description: "শুধুমাত্র বাংলাদেশের ব্যাংকগুলোর আপডেট তথ্য",
  },
];

const WhyBankBujhiSection = () => {
  return (
    <section className="container-padding py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
            কেন BankBujhi?
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-primary/10 text-center">
              <CardContent className="p-8 flex flex-col items-center gap-4">
                {/* Icon */}
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MaterialIcon name={feature.icon} className="text-3xl text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBankBujhiSection;
