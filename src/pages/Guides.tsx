import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SearchBar from "@/components/ui/SearchBar";
import ArticleCard from "@/components/cards/ArticleCard";

const categories = ["সব", "শুরু করুন", "ক্রেডিট স্কোর", "টিপস", "ইসলামিক ব্যাংকিং"];

const articles = [
  {
    id: 1,
    title: "ক্রেডিট কার্ড কী এবং কীভাবে কাজ করে?",
    titleEn: "What is a credit card?",
    category: "শুরু করুন",
    date: "জানুয়ারি ২০২৫",
    readTime: "৫ মিনিট",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    excerpt: "ক্রেডিট কার্ড কী, এটা কীভাবে কাজ করে এবং আপনার জন্য উপযুক্ত কিনা—সহজ বাংলায় জানুন।",
  },
  {
    id: 2,
    title: "সুদ কীভাবে কাজ করে? (APR বোঝা)",
    titleEn: "Understanding interest rates",
    category: "শুরু করুন",
    date: "জানুয়ারি ২০২৫",
    readTime: "৭ মিনিট",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    excerpt: "ক্রেডিট কার্ডে সুদ কীভাবে গণনা হয়, কবে চার্জ হয় এবং কীভাবে এড়ানো যায়।",
  },
  {
    id: 3,
    title: "মিনিমাম পেমেন্টের ফাঁদ",
    titleEn: "The minimum payment trap",
    category: "টিপস",
    date: "জানুয়ারি ২০২৫",
    readTime: "৬ মিনিট",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    excerpt: "শুধু মিনিমাম পেমেন্ট দিলে কী হয়? কেন এটা আপনার জন্য ক্ষতিকর এবং কীভাবে এড়াবেন।",
  },
  {
    id: 4,
    title: "ইসলামিক ক্রেডিট কার্ড কি হালাল?",
    titleEn: "Are Islamic credit cards halal?",
    category: "ইসলামিক ব্যাংকিং",
    date: "জানুয়ারি ২০২৫",
    readTime: "৮ মিনিট",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=250&fit=crop",
    excerpt: "ইসলামিক ক্রেডিট কার্ড কীভাবে কাজ করে, প্রচলিত কার্ডের সাথে পার্থক্য কী এবং শরীয়াহ সম্মত কিনা।",
  },
  {
    id: 5,
    title: "প্রথম ক্রেডিট কার্ড: কোনটা বাছবেন?",
    titleEn: "Choosing your first credit card",
    category: "শুরু করুন",
    date: "জানুয়ারি ২০২৫",
    readTime: "৫ মিনিট",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    excerpt: "নতুনদের জন্য কোন ধরনের কার্ড ভালো, কী দেখে বাছবেন এবং কোন ভুলগুলো এড়াবেন।",
  },
  {
    id: 6,
    title: "CIB রিপোর্ট কী? কেন গুরুত্বপূর্ণ?",
    titleEn: "Understanding CIB reports",
    category: "ক্রেডিট স্কোর",
    date: "জানুয়ারি ২০২৫",
    readTime: "৬ মিনিট",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
    excerpt: "বাংলাদেশে ক্রেডিট রিপোর্ট কীভাবে কাজ করে এবং লোন বা কার্ড পেতে এর ভূমিকা কী।",
  },
];

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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === category
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
  );
};

export default Guides;
