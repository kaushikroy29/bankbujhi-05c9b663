import MaterialIcon from "@/components/ui/MaterialIcon";

const TrustSection = () => {
  const lastUpdated = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="container-padding py-12 md:py-16 bg-muted/50">
      <div className="max-w-3xl mx-auto text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
          <MaterialIcon name="verified" className="text-primary" />
          <span className="text-sm font-semibold text-primary">বিশ্বস্ত তথ্য</span>
        </div>

        {/* Disclaimer Text */}
        <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-6">
          BankBujhi কোনো ব্যাংক নয়। আমরা তথ্যভিত্তিক তুলনা ও গাইড প্রদান করি।
        </p>

        {/* Last Updated */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MaterialIcon name="update" className="text-sm" />
          <span className="text-sm">সর্বশেষ আপডেট: {lastUpdated}</span>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
