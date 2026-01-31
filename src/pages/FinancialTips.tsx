import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Link } from "react-router-dom";
import SEOHead from "@/components/seo/SEOHead";

const tips = [
  {
    category: "ক্রেডিট কার্ড",
    icon: "credit_card",
    articles: [
      { title: "বাংলাদেশে আপনার প্রথম ক্রেডিট কার্ড কীভাবে বেছে নেবেন", readTime: "৫ মিনিট" },
      { title: "ক্রেডিট কার্ডের সুদের হার বুঝুন", readTime: "৪ মিনিট" },
      { title: "ক্যাশব্যাক রিওয়ার্ড বাড়ান: একটি পূর্ণাঙ্গ গাইড", readTime: "৬ মিনিট" },
      { title: "ক্রেডিট কার্ডে সচরাচর করা ভুলগুলো এড়িয়ে চলুন", readTime: "৪ মিনিট" },
    ],
  },
  {
    category: "সেভিংস ও এফডিআর",
    icon: "savings",
    articles: [
      { title: "বাংলাদেশে ২০২৪ সালের সেরা এফডিআর (FDR) রেট", readTime: "৫ মিনিট" },
      { title: "ডিপিএস বনাম এফডিআর: আপনার জন্য কোনটি ভালো?", readTime: "৪ মিনিট" },
      { title: "ইমার্জেন্সি ফান্ড: আপনার কত সঞ্চয় করা উচিত?", readTime: "৩ মিনিট" },
      { title: "চক্রবৃদ্ধি সুদ: সময়ের শক্তি", readTime: "৫ মিনিট" },
    ],
  },
  {
    category: "পার্সোনাল লোন",
    icon: "account_balance",
    articles: [
      { title: "পার্সোনাল লোন পাওয়ার যোগ্যতা: ব্যাংকগুলো কী দেখে", readTime: "৬ মিনিট" },
      { title: "ফিক্সড বনাম ফ্লোটিং সুদের হারের ব্যাখ্যা", readTime: "৪ মিনিট" },
      { title: "লোন অনুমোদনের সম্ভাবনা কীভাবে বাড়াবেন", readTime: "৫ মিনিট" },
      { title: "ঋণ সমন্বয়: এটি কি আপনার জন্য সঠিক?", readTime: "৫ মিনিট" },
    ],
  },
  {
    category: "বাজেট ব্যবস্থাপনা",
    icon: "pie_chart",
    articles: [
      { title: "৫০/৩০/২০ নিয়ম: নতুনদের জন্য সহজ বাজেট পরিকল্পনা", readTime: "৪ মিনিট" },
      { title: "খরচ ট্র্যাকিং: অ্যাপ বনাম স্প্রেডশিট", readTime: "৩ মিনিট" },
      { title: "ঢাকায় আয়ের মধ্যে স্বাচ্ছন্দ্যে জীবনযাপন", readTime: "৫ মিনিট" },
      { title: "বাংলাদেশিদের জন্য মাসিক বাজেট টেমপ্লেট", readTime: "৪ মিনিট" },
    ],
  },
];

const featuredTip = {
  title: "বাংলাদেশে ক্রেডিট ইতিহাস তৈরির পূর্ণাঙ্গ গাইড",
  description: "লোন এবং কার্ড দ্রুত অনুমোদনের জন্য একটি ভালো ক্রেডিট স্কোর তৈরি এবং বজায় রাখার বিষয়ে আপনার যা জানা প্রয়োজন সব কিছু।",
  readTime: "১২ মিনিট পড়ুন",
  category: "ক্রেডিট স্কোর",
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
              আর্থিক <span className="text-primary">পরামর্শ ও গাইড</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              আপনাকে স্মার্ট আর্থিক সিদ্ধান্ত নিতে সাহায্য করার জন্য বিশেষজ্ঞ পরামর্শ। ক্রেডিট কার্ড থেকে সেভিংস—সব বিষয়ে আমরা আছি আপনার পাশে।
            </p>
          </div>

          {/* Featured Article */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                সুপারিশকৃত
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
                আর্টিকেলটি পড়ুন
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
            <h2 className="text-2xl font-bold mb-3">সাপ্তাহিক আর্থিক পরামর্শ পান</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              আমাদের নিউজলেটার সাবস্ক্রাইব করুন এবং প্রতি সপ্তাহে আপনার ইনবক্সে সরাসরি বিশেষজ্ঞ পরামর্শ পান।
            </p>
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors"
            >
              সাবস্ক্রাইব করুন
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
