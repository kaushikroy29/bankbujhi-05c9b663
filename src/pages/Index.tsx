import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCardsSection from "@/components/home/FeaturedCardsSection";
import WhyBankBujhiSection from "@/components/home/WhyBankBujhiSection";
import TrustSection from "@/components/home/TrustSection";
import SEOHead from "@/components/seo/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="বাংলাদেশের সেরা ক্রেডিট কার্ড খুঁজুন ও তুলনা করুন | BankBujhi"
        description="সহজ Bangla ভাষায় ফি, ক্যাশব্যাক, সুবিধা ও যোগ্যতা বুঝুন। বিনামূল্যে, নিরপেক্ষ তথ্য।"
        image="https://bankbujhi.lovable.app/og/og-home.jpg"
        path="/"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <HeroSection />
          <FeaturedCardsSection />
          <WhyBankBujhiSection />
          <TrustSection />
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default Index;
