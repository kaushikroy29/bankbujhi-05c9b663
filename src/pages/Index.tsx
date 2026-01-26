import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCardsSection from "@/components/home/FeaturedCardsSection";

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedCardsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
