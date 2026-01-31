import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEOHead from "@/components/seo/SEOHead";

const helpCategories = [
  {
    icon: "credit_card",
    title: "ক্রেডিট কার্ড",
    description: "কার্ড তুলনা এবং আবেদন সংক্রান্ত সাহায্য",
    link: "/guides",
  },
  {
    icon: "savings",
    title: "সেভিংস ও FDR",
    description: "সেভিংস রেট এবং ডিপোজিট সংক্রান্ত প্রশ্ন",
    link: "/savings",
  },
  {
    icon: "account_balance",
    title: "লোন",
    description: "পার্সোনাল লোন এবং যোগ্যতা যাচাই",
    link: "/loans",
  },
  {
    icon: "person",
    title: "অ্যাকাউন্ট",
    description: "আপনার অ্যাকাউন্ট সংক্রান্ত সমস্যা",
    link: "/contact",
  },
];

const faqs = [
  {
    question: "BankBujhi কি কোনো টাকা নেয়?",
    answer: "না, BankBujhi ব্যবহারকারীদের জন্য সম্পূর্ণ ফ্রি। আমরা ব্যাংক থেকে রেফারেল কমিশন পাই যখন কেউ আমাদের মাধ্যমে আবেদন করে। তবে এর ফলে আপনার ওপর কোনো অতিরিক্ত চার্জ পড়ে না।",
  },
  {
    question: "আমার ব্যক্তিগত তথ্য কি নিরাপদ?",
    answer: "হ্যাঁ, আমরা আপনার গোপনীয়তা গুরুত্বের সাথে নিই। আমরা ব্যাংক-গ্রেড এনক্রিপশন ব্যবহার করি এবং আপনার অনুমতি ছাড়া তথ্য শেয়ার করি না। বিস্তারিত জানতে আমাদের প্রাইভেসি পলিসি দেখুন।",
  },
  {
    question: "BankBujhi-র তথ্য কি সঠিক?",
    answer: "আমরা ব্যাংকের অফিসিয়াল ওয়েবসাইট থেকে নিয়মিত তথ্য আপডেট করি। তবে ব্যাংকের শর্তাবলী যেকোনো সময় পরিবর্তন হতে পারে, তাই আবেদনের আগে ব্যাংকের সাথে কথা বলে নেওয়ার পরামর্শ দিই।",
  },
  {
    question: "BankBujhi কি লোন বা কার্ড গ্যারান্টি দেয়?",
    answer: "না, আমরা গ্যারান্টি দিই না। আমরা শুধু আপনার যোগ্যতা যাচাই করতে সাহায্য করি। চূড়ান্ত সিদ্ধান্ত ব্যাংক বা আর্থিক প্রতিষ্ঠান নিয়ে থাকে।",
  },
  {
    question: "কিভাবে ক্রেডিট কার্ডের জন্য আবেদন করব?",
    answer: "আমাদের সাইটে কার্ড তুলনা করে 'আবেদন করুন' বাটনে ক্লিক করুন। আপনাকে সংশ্লিষ্ট ব্যাংকের সাইটে নিয়ে যাওয়া হবে।",
  },
  {
    question: "BankBujhi কি কোনো স্পেসিফিক ব্যাংকের?",
    answer: "না, আমরা একটি স্বাধীন তুলনা করার প্ল্যাটফর্ম। আমরা কোনো নির্দিষ্ট ব্যাংকের মালিকানাধীন নই।",
  },
  {
    question: "কিভাবে যোগাযোগ করব?",
    answer: "আমাদের কন্টাক্ট পেজ ভিজিট করুন অথবা ইমেইল করুন support@bankbujhi.com এ। এছাড়া কল করতে পারেন +880-1XXX-XXXXXX নম্বরে (রবি-বৃহস্পতি, সকাল ৯টা - সন্ধ্যা ৬টা)।",
  },
  {
    question: "অ্যাকাউন্ট খোলা কি জরুরি?",
    answer: "না, তুলনা করার জন্য অ্যাকাউন্ট বাধ্যতামূলক নয়। তবে অ্যাকাউন্ট থাকলে আপনি পছন্দের কার্ড সেভ করে রাখতে পারবেন।",
  },
];

const HelpCenter = () => {
  return (
    <>
      <SEOHead
        title="সাহায্য কেন্দ্র | BankBujhi"
        description="প্রায়শই জিজ্ঞাসিত প্রশ্ন ও সাপোর্ট। BankBujhi সম্পর্কে সব তথ্য এক জায়গায়।"
        path="/help"
      />
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">Home</Link>
            <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
            <span className="text-primary text-sm font-medium">Help Center</span>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              আমরা কিভাবে <span className="text-primary">সাহায্য করতে পারি?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              আপনার সাধারণ প্রশ্নের উত্তর খুঁজুন অথবা আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
            </p>
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {helpCategories.map((category) => (
              <Link
                key={category.title}
                to={category.link}
                className="bg-card border border-primary/10 rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MaterialIcon name={category.icon} className="text-primary text-xl" />
                </div>
                <h3 className="font-bold mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </Link>
            ))}
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-primary/10 rounded-xl px-5 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-primary/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">আরও সাহায্য প্রয়োজন?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              আমাদের সাপোর্ট টিম আপনার যেকোনো প্রশ্নের উত্তর দিতে প্রস্তুত।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                <MaterialIcon name="mail" />
                যোগাযোগ করুন
              </Link>
              <a
                href="tel:+8801XXXXXXXXX"
                className="inline-flex items-center justify-center gap-2 bg-card border border-primary/20 text-foreground px-6 py-3 rounded-lg font-bold hover:bg-muted transition-colors"
              >
                <MaterialIcon name="phone" />
                হেল্পলাইন কল করুন
              </a>
            </div>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default HelpCenter;
