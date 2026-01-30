import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCardsSection from "@/components/home/FeaturedCardsSection";
import QuizCTASection from "@/components/home/QuizCTASection";
import WhatsNewSection from "@/components/home/WhatsNewSection";
import SEOHead from "@/components/seo/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead
        title="ব্যাংক ও ক্রেডিট কার্ড তুলনা করুন - BankBujhi বাংলাদেশ"
        description="বাংলাদেশের সব ব্যাংকের ক্রেডিট কার্ড, লোন, এফডিআর ও সঞ্চয় স্কিম এক জায়গায় তুলনা করুন। বিনামূল্যে, নিরপেক্ষ তথ্য।"
        image="https://bankbujhi.lovable.app/og/og-home.jpg"
        path="/"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <HeroSection />
          <WhatsNewSection />
          <StatsSection />
          <HowItWorksSection />
          <CategoriesSection />
          <FeaturedCardsSection />
          <QuizCTASection />
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default Index;
