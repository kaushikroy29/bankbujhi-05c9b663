import MaterialIcon from "@/components/ui/MaterialIcon";

const steps = [
  {
    icon: "search",
    title: "১. খুঁজুন",
    description: "আপনার চাহিদা অনুযায়ী কার্ড বা লোন খুঁজুন",
  },
  {
    icon: "compare_arrows",
    title: "২. তুলনা করুন",
    description: "সুদের হার, ফি ও সুবিধা তুলনা করুন",
  },
  {
    icon: "verified_user",
    title: "৩. আবেদন করুন",
    description: "সরাসরি ব্যাংকে আবেদন করুন",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="container-padding py-12 md:py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
            কীভাবে কাজ করে
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-foreground mt-4">
            ৩টি সহজ ধাপে সেরা কার্ড খুঁজুন
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 md:left-auto md:-top-4 size-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-black shadow-md">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="size-16 md:size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <MaterialIcon name={step.icon} className="text-3xl md:text-4xl" />
              </div>

              {/* Content */}
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>

              {/* Connector Line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent -z-10" style={{ width: 'calc(100% - 5rem)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
