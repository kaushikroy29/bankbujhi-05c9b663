import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";

const values = [
  {
    icon: "visibility",
    title: "স্বচ্ছতা",
    description: "সব ফি, হার ও শর্ত স্পষ্টভাবে দেখাই। কোনো গোপন খরচ নেই।",
  },
  {
    icon: "balance",
    title: "নিরপেক্ষতা",
    description: "আমরা কোনো ব্যাংকের পক্ষে নই। শুধুমাত্র তথ্য দিয়ে সাহায্য করি।",
  },
  {
    icon: "language",
    title: "সহজ ভাষা",
    description: "জটিল আর্থিক বিষয় সহজ বাংলায় বোঝাই।",
  },
  {
    icon: "update",
    title: "নির্ভুলতা",
    description: "ব্যাংকের অফিসিয়াল তথ্য থেকে নিয়মিত আপডেট করা হয়।",
  },
];

const About = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-10 sm:py-16">
          <div className="max-w-[1000px] mx-auto px-4 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-foreground mb-4">
              BankBujhi কেন তৈরি হলো?
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              বাংলাদেশে ক্রেডিট কার্ড, লোন বা সেভিংস নিয়ে সঠিক তথ্য পাওয়া কঠিন। 
              বিভিন্ন ব্যাংকের ওয়েবসাইটে ছড়িয়ে থাকা জটিল তথ্য একসাথে তুলনা করা প্রায় অসম্ভব।
              BankBujhi এই সমস্যা সমাধানে তৈরি।
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-10 sm:py-16 max-w-[1000px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">আমাদের লক্ষ্য</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  বাংলাদেশের সাধারণ মানুষদের জন্য আর্থিক সিদ্ধান্ত নেওয়া সহজ করা। 
                  কোন ক্রেডিট কার্ড ভালো? কোন ব্যাংকে FDR রেট বেশি? কোন লোনে সুদ কম?
                </p>
                <p>
                  এসব প্রশ্নের উত্তর খুঁজতে গিয়ে মানুষ হয়রান হয়। আমরা চাই এক জায়গায় সব তথ্য থাকুক—
                  সহজ বাংলায়, নিরপেক্ষভাবে।
                </p>
                <p className="font-semibold text-foreground">
                  আমরা কোনো ব্যাংকের এজেন্ট বা বিক্রয় প্রতিনিধি নই। আমরা শুধু তথ্য দিই।
                </p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-primary/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MaterialIcon name="verified" className="text-primary" />
                আমাদের প্রতিশ্রুতি
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MaterialIcon name="check_circle" className="text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">সব তথ্য ব্যাংকের অফিসিয়াল ওয়েবসাইট থেকে সংগ্রহ করা</span>
                </li>
                <li className="flex items-start gap-3">
                  <MaterialIcon name="check_circle" className="text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">কোনো ব্যাংককে প্রাধান্য দেওয়া হয় না</span>
                </li>
                <li className="flex items-start gap-3">
                  <MaterialIcon name="check_circle" className="text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">ব্যবহারকারীদের কাছ থেকে কোনো টাকা নেওয়া হয় না</span>
                </li>
                <li className="flex items-start gap-3">
                  <MaterialIcon name="check_circle" className="text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">ব্যাংক লগইন বা পাসওয়ার্ড চাওয়া হয় না</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-10 sm:py-16 bg-muted/30">
          <div className="max-w-[1000px] mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">আমাদের মূল্যবোধ</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card p-4 sm:p-5 rounded-xl border border-primary/10 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MaterialIcon name={value.icon} className="text-primary text-xl" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base mb-1">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-10 sm:py-16 max-w-[1000px] mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">আমরা কীভাবে কাজ করি</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MaterialIcon name="cloud_download" className="text-primary text-2xl" />
              </div>
              <h3 className="font-bold mb-2">তথ্য সংগ্রহ</h3>
              <p className="text-sm text-muted-foreground">
                ব্যাংকের অফিসিয়াল ওয়েবসাইট থেকে সব প্রোডাক্টের তথ্য সংগ্রহ করি
              </p>
            </div>
            <div className="text-center">
              <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MaterialIcon name="compare_arrows" className="text-primary text-2xl" />
              </div>
              <h3 className="font-bold mb-2">তুলনা সহজ করা</h3>
              <p className="text-sm text-muted-foreground">
                জটিল তথ্য সহজ করে পাশাপাশি তুলনার সুযোগ দিই
              </p>
            </div>
            <div className="text-center">
              <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MaterialIcon name="update" className="text-primary text-2xl" />
              </div>
              <h3 className="font-bold mb-2">নিয়মিত আপডেট</h3>
              <p className="text-sm text-muted-foreground">
                ফি, রেট ও শর্ত পরিবর্তন হলে দ্রুত আপডেট করি
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 sm:py-14 bg-primary text-primary-foreground">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">সঠিক আর্থিক সিদ্ধান্ত নিতে প্রস্তুত?</h2>
            <p className="text-sm sm:text-base opacity-90 mb-6 max-w-xl mx-auto">
              এখনই কার্ড তুলনা করুন অথবা আপনার যোগ্যতা যাচাই করুন
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/compare"
                className="bg-white text-primary px-6 py-2.5 rounded-lg font-bold hover:bg-white/90 transition-colors text-sm"
              >
                কার্ড তুলনা করুন
              </Link>
              <Link
                to="/eligibility"
                className="border-2 border-white text-white px-6 py-2.5 rounded-lg font-bold hover:bg-white/10 transition-colors text-sm"
              >
                যোগ্যতা যাচাই করুন
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default About;
