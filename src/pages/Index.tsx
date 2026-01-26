import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCardsSection from "@/components/home/FeaturedCardsSection";

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedCardsSection />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
