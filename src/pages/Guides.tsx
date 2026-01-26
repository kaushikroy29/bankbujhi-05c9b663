import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SearchBar from "@/components/ui/SearchBar";
import ArticleCard from "@/components/cards/ArticleCard";

const categories = ["All", "Beginners", "Credit Score", "Tips", "Islamic Banking", "Investments"];

const articles = [
  {
    id: 1,
    title: "How to choose your first credit card",
    category: "Beginners",
    date: "Oct 24, 2023",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    excerpt: "A comprehensive guide for beginners to select the right credit card based on their spending habits and lifestyle.",
  },
  {
    id: 2,
    title: "Understanding CIB reports in Bangladesh",
    category: "Credit Score",
    date: "Oct 18, 2023",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    excerpt: "Learn how Credit Information Bureau (CIB) reports work and why they matter for your financial health.",
  },
  {
    id: 3,
    title: "5 Tips for Islamic Banking",
    category: "Islamic Banking",
    date: "Oct 12, 2023",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=250&fit=crop",
    excerpt: "Discover how Shariah-compliant banking works and the benefits it offers for ethical financial management.",
  },
  {
    id: 4,
    title: "Maximize your credit card rewards",
    category: "Tips",
    date: "Oct 8, 2023",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    excerpt: "Strategic tips to earn more points, cashback, and miles from your everyday purchases.",
  },
  {
    id: 5,
    title: "FDR vs. Savings Account: Which is better?",
    category: "Investments",
    date: "Oct 5, 2023",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
    excerpt: "Compare fixed deposits with high-interest savings accounts to find the best option for your money.",
  },
  {
    id: 6,
    title: "Building credit history from scratch",
    category: "Beginners",
    date: "Oct 1, 2023",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    excerpt: "Step-by-step guide for young professionals to establish a solid credit history in Bangladesh.",
  },
];

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-4">
            Knowledge <span className="text-primary">Center</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            BankBujhi simplifies finance for you. Expert advice to help you navigate the Bangladeshi financial landscape.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-primary">
              <MaterialIcon name="verified" className="text-sm" /> Expert Verified
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <MaterialIcon name="article" className="text-sm" /> 50+ Guides
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar
            placeholder="Search for guides..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-primary/10 text-muted-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-6">Latest Financial Guides</h2>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <MaterialIcon name="article" className="text-6xl text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No guides found matching your criteria</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 text-center">
          <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest financial tips and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-primary/20 bg-card focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
