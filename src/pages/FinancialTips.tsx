import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";

const tips = [
  {
    category: "Credit Cards",
    icon: "credit_card",
    articles: [
      { title: "How to Choose Your First Credit Card in Bangladesh", readTime: "5 min" },
      { title: "Understanding Credit Card Interest Rates", readTime: "4 min" },
      { title: "Maximize Cashback Rewards: A Complete Guide", readTime: "6 min" },
      { title: "Avoiding Common Credit Card Mistakes", readTime: "4 min" },
    ],
  },
  {
    category: "Savings & FDR",
    icon: "savings",
    articles: [
      { title: "Best FDR Rates in Bangladesh 2024", readTime: "5 min" },
      { title: "DPS vs FDR: Which is Better for You?", readTime: "4 min" },
      { title: "Emergency Fund: How Much Should You Save?", readTime: "3 min" },
      { title: "Compound Interest: The Power of Time", readTime: "5 min" },
    ],
  },
  {
    category: "Personal Loans",
    icon: "account_balance",
    articles: [
      { title: "Personal Loan Eligibility: What Banks Look For", readTime: "6 min" },
      { title: "Fixed vs Floating Interest Rates Explained", readTime: "4 min" },
      { title: "How to Improve Your Loan Approval Chances", readTime: "5 min" },
      { title: "Debt Consolidation: Is It Right for You?", readTime: "5 min" },
    ],
  },
  {
    category: "Budgeting",
    icon: "pie_chart",
    articles: [
      { title: "50/30/20 Rule: Simple Budgeting for Beginners", readTime: "4 min" },
      { title: "Tracking Expenses: Apps vs Spreadsheets", readTime: "3 min" },
      { title: "Living Below Your Means in Dhaka", readTime: "5 min" },
      { title: "Monthly Budget Template for Bangladeshis", readTime: "4 min" },
    ],
  },
];

const featuredTip = {
  title: "Complete Guide to Building Credit History in Bangladesh",
  description: "Everything you need to know about establishing and maintaining a good credit score for better loan and card approvals.",
  readTime: "12 min read",
  category: "Credit Score",
};

const FinancialTips = () => {
  return (
    <>
      <SEOHead 
        title="আর্থিক পরামর্শ | BankBujhi"
        description="স্মার্ট আর্থিক সিদ্ধান্তের টিপস। ক্রেডিট কার্ড থেকে সেভিংস—সব বিষয়ে পরামর্শ।"
        path="/tips"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumb */}
        <PageBreadcrumb 
          items={[{ label: "আর্থিক পরামর্শ" }]} 
          className="mb-6"
        />

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Financial <span className="text-primary">Tips & Guides</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert advice to help you make smarter financial decisions. From credit cards to savings, we've got you covered.
          </p>
        </div>

        {/* Featured Article */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
            <span className="text-sm text-muted-foreground">{featuredTip.category}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{featuredTip.title}</h2>
          <p className="text-muted-foreground mb-4">{featuredTip.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MaterialIcon name="schedule" className="text-sm" />
              {featuredTip.readTime}
            </span>
            <button className="text-primary font-semibold flex items-center gap-1 hover:underline">
              Read Article
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>

        {/* Tips by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((category) => (
            <div
              key={category.category}
              className="bg-card border border-primary/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MaterialIcon name={category.icon} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold">{category.category}</h3>
              </div>
              <ul className="space-y-3">
                {category.articles.map((article) => (
                  <li key={article.title}>
                    <button className="w-full text-left group flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                      <MaterialIcon name="article" className="text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {article.title}
                        </p>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                      <MaterialIcon name="arrow_forward" className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-primary rounded-2xl p-8 text-center mt-12 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-3">Get Weekly Financial Tips</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter and receive expert tips directly in your inbox every week.
          </p>
          <Link
            to="/newsletter"
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors"
          >
            Subscribe Now
            <MaterialIcon name="mail" />
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
    </>
  );
};

export default FinancialTips;
