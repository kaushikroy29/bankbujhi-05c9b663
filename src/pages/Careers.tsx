import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const openPositions = [
  {
    title: "সিনিয়র ফুল-স্ট্যাক ডেভেলপার",
    department: "ইঞ্জিনিয়ারিং",
    location: "ঢাকা, বাংলাদেশ",
    type: "ফুল-টাইম",
    description: "React, Node.js এবং PostgreSQL ব্যবহার করে আমাদের তুলনা প্ল্যাটফর্মটি তৈরি ও পরিচালনা করুন।",
  },
  {
    title: "ফাইন্যান্সিয়াল কন্টেন্ট রাইটার",
    department: "কন্টেন্ট",
    location: "রিমোট",
    type: "ফুল-টাইম",
    description: "ক্রেডিট কার্ড, লোন এবং ব্যাংকিং পণ্য সম্পর্কে তথ্যপূর্ণ কন্টেন্ট তৈরি করুন।",
  },
  {
    title: "ব্যাংক পার্টনারশিপ ম্যানেজার",
    department: "বিজনেস ডেভেলপমেন্ট",
    location: "ঢাকা, বাংলাদেশ",
    type: "ফুল-টাইম",
    description: "ব্যাংক এবং আর্থিক প্রতিষ্ঠানগুলোর সাথে দীর্ঘস্থায়ী সম্পর্ক ও পার্টনারশিপ তৈরি করুন।",
  },
  {
    title: "ইউআই/ইউএক্স ডিজাইনার",
    department: "ডিজাইন",
    location: "ঢাকা / রিমোট",
    type: "ফুল-টাইম",
    description: "ব্যবহারকারীদের সহজ অভিজ্ঞতার জন্য উন্নত ও আধুনিক ইন্টারফেস ডিজাইন করুন।",
  },
];

const benefits = [
  { icon: "payments", title: "প্রতিযোগিতামূলক বেতন", description: "বাজারের সেরা স্যালারি প্যাকেজ" },
  { icon: "health_and_safety", title: "স্বাস্থ্য বীমা", description: "আপনার ও আপনার পরিবারের জন্য পূর্ণাঙ্গ চিকিৎসা সহায়তা" },
  { icon: "home_work", title: "ফ্লেক্সিবল কাজ", description: "হাইব্রিড এবং সুবিধাজনক কাজের সুযোগ" },
  { icon: "school", title: "লার্নিং বাজেট", description: "কোর্স এবং কনফারেন্সের জন্য বার্ষিক বাজেট" },
  { icon: "celebration", title: "টিম ইভেন্ট", description: "নিয়মিত টিম আউটিং এবং উৎসব উদযাপন" },
  { icon: "trending_up", title: "ক্যারিয়ার গ্রোথ", description: "ক্যারিয়ার উন্নতির স্পষ্ট নির্দেশনা ও সুযোগ" },
];

const Careers = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 font-bengali">
          <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">হোম</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-sm font-medium">ক্যারিয়ার</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            গড়ুন এক উন্নত <span className="text-primary">আর্থিক ভবিষ্যৎ</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-bengali">
            বাংলাদেশে আর্থিক তথ্যের সহজলভ্যতা নিশ্চিত করতে এবং লক্ষ লক্ষ মানুষকে সঠিক সিদ্ধান্ত নিতে সাহায্য করতে আমাদের মিশনে যোগ দিন।
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 font-bengali">কেন আমাদের সাথে কাজ করবেন?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card border border-primary/10 rounded-xl p-5 flex items-start gap-4"
              >
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MaterialIcon name={benefit.icon} className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 font-bengali">খালি পদসমূহ</h2>
          <div className="flex flex-col gap-4">
            {openPositions.map((job) => (
              <div
                key={job.title}
                className="bg-card border border-primary/10 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MaterialIcon name="business" className="text-sm" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MaterialIcon name="location_on" className="text-sm" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <MaterialIcon name="schedule" className="text-sm" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-3">{job.description}</p>
                  </div>
                  <Button className="shrink-0 font-bengali">
                    আবেদন করুন
                    <MaterialIcon name="arrow_forward" className="ml-2 px-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Position CTA */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center font-bengali">
          <h2 className="text-2xl font-bold mb-3">আপনার পছন্দের পদটি খুঁজে পাচ্ছেন না?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            আমরা সর্বদা নতুন ও মেধাবী মানুষদের সাথে পরিচিত হতে আগ্রহী। আপনার সিভি (Resume) আমাদের কাছে পাঠিয়ে রাখুন।
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            যোগাযোগ করুন
            <MaterialIcon name="mail" />
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Careers;
