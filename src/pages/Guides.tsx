import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SearchBar from "@/components/ui/SearchBar";
import ArticleCard from "@/components/cards/ArticleCard";
import SEOHead from "@/components/seo/SEOHead";
import { articles } from "@/data/guides";

const categories = ["সব", "শুরু করুন", "ক্রেডিট স্কোর", "টিপস", "ইসলামিক ব্যাংকিং"];

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "সব" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="গাইড ও টিউটোরিয়াল | BankBujhi"
        description="আর্থিক বিষয়ে সহজ গাইড। ক্রেডিট কার্ড, লোন, সেভিংস নিয়ে বিশেষজ্ঞ পরামর্শ।"
        path="/guides"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
          {/* Breadcrumb */}
          <PageBreadcrumb
            items={[{ label: "গাইড" }]}
            className="mb-6"
          />

          {/* Hero */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-foreground mb-3">
              আর্থিক <span className="text-primary">শিক্ষা কেন্দ্র</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-4">
              ক্রেডিট কার্ড, লোন, সেভিংস নিয়ে সহজ বাংলায় শিখুন।
              জটিল আর্থিক বিষয়গুলো বোঝার জন্য বিশেষজ্ঞদের গাইড।
            </p>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-primary">
                <MaterialIcon name="verified" className="text-sm" /> বিশেষজ্ঞ যাচাইকৃত
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MaterialIcon name="article" className="text-sm" /> ৫০+ গাইড
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-6">
            <SearchBar
              placeholder="গাইড খুঁজুন..."
              onSearch={setSearchQuery}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-primary/10 text-muted-foreground hover:bg-muted"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Guides */}
          <div className="mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4">জনপ্রিয় গাইড</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* All Guides */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4">সব গাইড</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <MaterialIcon name="article" className="text-5xl text-muted-foreground mb-4" />
              <p className="text-muted-foreground">কোনো গাইড পাওয়া যায়নি</p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-12 bg-primary/5 rounded-xl p-6 sm:p-8 border border-primary/10 text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2">নতুন গাইড পেতে চান?</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              আমাদের নিউজলেটার সাবস্ক্রাইব করুন এবং নতুন আর্থিক টিপস সরাসরি ইনবক্সে পান।
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="flex-1 px-4 py-2.5 rounded-lg border border-primary/20 bg-card focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm">
                সাবস্ক্রাইব
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default Guides;
