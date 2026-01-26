import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SearchBar from "@/components/ui/SearchBar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    id: "1",
    question: "কিভাবে আমি ক্রেডিট কার্ডের জন্য আবেদন করব?",
    answer: "ক্রেডিট কার্ড আবেদনের জন্য প্রথমে আমাদের প্ল্যাটফর্মে কার্ডগুলো তুলনা করুন। আপনার পছন্দের কার্ডটি বেছে নিয়ে \"আবেদন করুন\" বাটনে ক্লিক করলে সরাসরি ব্যাংকের পোর্টাল অথবা আমাদের প্রতিনিধির মাধ্যমে আবেদন প্রক্রিয়া শুরু করতে পারবেন।",
  },
  {
    id: "2",
    question: "আমার ব্যক্তিগত তথ্য কি এখানে নিরাপদ?",
    answer: "হ্যাঁ, আপনার নিরাপত্তা আমাদের প্রথম অগ্রাধিকার। আমরা ব্যাংক-গ্রেড এনক্রিপশন ব্যবহার করি এবং আপনার সম্মতি ছাড়া কোন তথ্য তৃতীয় পক্ষের সাথে শেয়ার করি না। বিস্তারিত জানতে আমাদের প্রাইভেসি পলিসি দেখুন।",
  },
  {
    id: "3",
    question: "আমি কি ক্রেডিট কার্ড পাওয়ার যোগ্য?",
    answer: "সাধারণত ১৮ বছরের ঊর্ধ্বে বাংলাদেশী নাগরিক যাদের নিয়মিত আয়ের উৎস আছে তারা ক্রেডিট কার্ডের জন্য আবেদন করতে পারেন। আপনার আয়ের পরিমাণ ও ক্রেডিট স্কোরের ভিত্তিতে যোগ্যতার মানদণ্ড ভিন্ন হতে পারে।",
  },
  {
    id: "4",
    question: "সার্ভিস ফি বা লুকানো চার্জ আছে কি?",
    answer: "BankBujhi গ্রাহকদের জন্য সম্পূর্ণ ফ্রি। আমরা কার্ড বা লোনের তুলনামূলক তথ্য প্রদানের জন্য কোন চার্জ নিই না। তবে ব্যাংক তাদের নিজস্ব বার্ষিক ফি বা চার্জ আরোপ করতে পারে যা আমরা স্পষ্টভাবে উল্লেখ করে থাকি।",
  },
];

const Contact = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-4">
            Help Center & <span className="text-primary">Customer Support</span>
          </h1>
          <p className="text-xl text-muted-foreground font-bengali">
            আমরা কিভাবে আপনাকে সাহায্য করতে পারি?
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar
            placeholder="আপনার সমস্যাটি সার্চ করুন (উদাঃ ক্রেডিট কার্ড আবেদন, নিরাপত্তা)"
            onSearch={setSearchQuery}
            variant="hero"
          />
        </div>

        {/* Popular Topics */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <span className="text-sm text-muted-foreground">পপুলার টপিক:</span>
          {["কার্ড আবেদন", "সিকিউরিটি", "এফডিআর", "রেট"].map((topic) => (
            <button
              key={topic}
              className="px-3 py-1 text-sm bg-card border border-primary/10 rounded-full hover:bg-primary/10 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 font-bengali">সাধারণ জিজ্ঞাসাসমূহ (FAQs)</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card border border-primary/10 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left font-semibold font-bengali hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-bengali pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-6">
            <Button variant="outline" className="border-primary text-primary">
              আরও দেখুন
            </Button>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center font-bengali">সরাসরি যোগাযোগ করুন</h2>
          <p className="text-center text-muted-foreground mb-8 font-bengali">
            আমাদের সাপোর্ট টিম আপনাকে সাহায্য করার জন্য সদা প্রস্তুত।
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="chat" className="text-primary text-xl" />
              </div>
              <h3 className="font-bold mb-2">Live Chat Now</h3>
              <p className="text-sm text-muted-foreground">Instant support</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="mail" className="text-primary text-xl" />
              </div>
              <h3 className="font-bold mb-2 font-bengali">ইমেইল করুন</h3>
              <p className="text-sm text-primary">support@bankbujhi.com</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="call" className="text-primary text-xl" />
              </div>
              <h3 className="font-bold mb-2 font-bengali">কল করুন</h3>
              <p className="text-sm text-muted-foreground">+880 1234-567890</p>
              <p className="text-xs text-muted-foreground">Sat-Thu: 10 AM - 8 PM</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="location_on" className="text-primary text-xl" />
              </div>
              <h3 className="font-bold mb-2 font-bengali">অফিস ঠিকানা</h3>
              <p className="text-sm text-muted-foreground">Gulshan-1, Dhaka</p>
            </div>
          </div>
        </div>

        {/* Feedback CTA */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
          <h3 className="text-xl font-bold mb-2 font-bengali">আপনার মতামত দিন</h3>
          <p className="text-muted-foreground mb-6 font-bengali">
            আমাদের সার্ভিস কেমন লাগছে? আপনার মূল্যবান পরামর্শ আমাদের আরও উন্নতি করতে সাহায্য করবে।
          </p>
          <Button className="bg-primary text-primary-foreground font-bengali">
            <MaterialIcon name="rate_review" className="mr-2" />
            মতামত দিন (Feedback)
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
