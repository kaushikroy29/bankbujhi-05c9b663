import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";

const HeroSection = () => {
  return (
    <section className="container-padding py-12 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-8 md:p-16 lg:p-20 flex flex-col items-center justify-center text-center gap-8 min-h-[400px] md:min-h-[500px]">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 size-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 size-96 bg-accent/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground">
            বাংলাদেশের সেরা ক্রেডিট কার্ড
            <br className="hidden sm:block" />
            <span className="text-primary">খুঁজুন ও তুলনা করুন</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            সহজ Bangla ভাষায় ফি, ক্যাশব্যাক, সুবিধা ও যোগ্যতা বুঝুন
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button size="lg" className="flex-1 font-bold text-base h-12 gap-2" asChild>
            <Link to="/compare">
              <MaterialIcon name="credit_card" className="text-xl" />
              কার্ড দেখুন
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="flex-1 font-bold text-base h-12 gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
            asChild
          >
            <Link to="/compare">
              <MaterialIcon name="compare_arrows" className="text-xl" />
              কার্ড তুলনা করুন
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
