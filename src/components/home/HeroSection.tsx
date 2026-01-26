import SearchBar from "@/components/ui/SearchBar";

const HeroSection = () => {
  return (
    <section className="container-padding py-10 md:py-16">
      <div className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 md:p-16 flex flex-col items-center justify-center text-center gap-8 min-h-[500px]">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-64 bg-accent/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground">
            বাংলাদেশের সেরা ক্রেডিট কার্ড <br className="hidden md:block" />
            <span className="text-primary">খুঁজে নিন সহজেই</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            Find and compare the best credit cards in Bangladesh tailored to your lifestyle and
            income. Expert advice, zero cost.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          variant="hero" 
          placeholder="Search by bank or category..." 
          className="relative z-10"
        />

        {/* Trusted Partners */}
        <div className="flex flex-wrap justify-center items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <p className="text-xs font-bold uppercase tracking-widest w-full mb-2">
            Trusted by partners
          </p>
          <div className="h-6 w-20 bg-muted-foreground/30 rounded-sm" />
          <div className="h-6 w-24 bg-muted-foreground/30 rounded-sm" />
          <div className="h-6 w-16 bg-muted-foreground/30 rounded-sm" />
          <div className="h-6 w-28 bg-muted-foreground/30 rounded-sm" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
