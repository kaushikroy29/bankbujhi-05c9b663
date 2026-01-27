import { Link } from "react-router-dom";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";

const HeroSection = () => {
  return (
    <section className="container-padding py-8 md:py-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 p-6 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center gap-6 min-h-[480px]">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-64 bg-accent/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-3 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-foreground">
            বাংলাদেশের ব্যাংক ও ক্রেডিট কার্ড—
            <br className="hidden sm:block" />
            <span className="text-primary">সহজ করে তুলনা করুন</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto">
            সব ফি, ক্যাশব্যাক ও সুবিধা এক জায়গায়—সহজ Bangla ভাষায়
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <Button size="lg" className="flex-1 font-bold text-base gap-2" asChild>
            <Link to="/compare">
              <MaterialIcon name="compare_arrows" className="text-xl" />
              ক্রেডিট কার্ড তুলনা করুন
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="flex-1 font-bold text-base gap-2 border-primary text-primary hover:bg-primary/5" asChild>
            <Link to="/eligibility">
              <MaterialIcon name="verified_user" className="text-xl" />
              যোগ্যতা যাচাই করুন
            </Link>
          </Button>
        </div>

        {/* Search Bar */}
        <SearchBar 
          variant="hero" 
          placeholder="ব্যাংক বা ক্যাটাগরি খুঁজুন..." 
          className="relative z-10"
        />

        {/* Trust Strip */}
        <div className="relative z-10 flex flex-col items-center gap-2 mt-2">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MaterialIcon name="verified" className="text-primary text-base" />
              তথ্য সংগ্রহ করা হয় ব্যাংকের অফিসিয়াল ওয়েবসাইট থেকে
            </span>
            <span className="hidden sm:inline text-muted-foreground/50">•</span>
            <span className="flex items-center gap-1.5">
              <MaterialIcon name="update" className="text-primary text-base" />
              নিয়মিত আপডেট করা হয়
            </span>
          </div>
        </div>

        {/* Partner Banks */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 relative z-10 mt-2">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest w-full text-muted-foreground">
            পার্টনার ব্যাংকসমূহ
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
            {["City Bank", "EBL", "BRAC Bank", "Standard Chartered", "HSBC", "DBBL"].map((bank) => (
              <div key={bank} className="px-3 py-1.5 bg-card rounded-lg border border-primary/10 shadow-sm">
                <span className="text-xs sm:text-sm font-semibold text-foreground">{bank}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
