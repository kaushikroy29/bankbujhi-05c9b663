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
    title: "Credit Cards",
    description: "Help with comparing and applying for credit cards",
    link: "/guides",
  },
  {
    icon: "savings",
    title: "Savings & FDR",
    description: "Questions about savings rates and deposits",
    link: "/savings",
  },
  {
    icon: "account_balance",
    title: "Loans",
    description: "Personal loan comparisons and eligibility",
    link: "/loans",
  },
  {
    icon: "person",
    title: "Account Issues",
    description: "Help with your BankBujhi account",
    link: "/contact",
  },
];

const faqs = [
  {
    question: "How does BankBujhi make money?",
    answer: "BankBujhi earns a referral commission from banks when users apply for products through our platform. This doesn't affect our recommendations - we always show you the best options based on your needs, not on which banks pay us more.",
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes, we take your privacy seriously. We use bank-grade encryption to protect your data and never sell your personal information to third parties. Read our Privacy Policy for full details.",
  },
  {
    question: "How accurate is the information on BankBujhi?",
    answer: "We update our data regularly by working directly with banks and monitoring their official websites. However, terms can change quickly, so we always recommend confirming details directly with the bank before applying.",
  },
  {
    question: "Can BankBujhi guarantee my loan or card approval?",
    answer: "No, we cannot guarantee approval. We provide tools to help you understand your eligibility, but the final decision is always made by the bank based on their own criteria.",
  },
  {
    question: "How do I apply for a credit card through BankBujhi?",
    answer: "Simply find the card you want on our comparison page, click 'Apply Now', and you'll be redirected to the bank's official application page. We don't process applications directly.",
  },
  {
    question: "Is BankBujhi affiliated with any specific bank?",
    answer: "No, we are an independent comparison platform. We work with multiple banks but are not owned by or exclusively affiliated with any single financial institution.",
  },
  {
    question: "How can I contact BankBujhi for support?",
    answer: "You can reach us through our Contact page, email us at support@bankbujhi.com, or call our helpline at +880-1XXX-XXXXXX during business hours (9 AM - 6 PM, Sunday-Thursday).",
  },
  {
    question: "Do I need an account to use BankBujhi?",
    answer: "No account is needed to compare products. However, creating a free account lets you save favorites, track applications, and receive personalized recommendations.",
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
            How Can We <span className="text-primary">Help?</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
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
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
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
          <h2 className="text-2xl font-bold mb-3">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our support team is ready to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              <MaterialIcon name="mail" />
              Contact Us
            </Link>
            <a
              href="tel:+8801XXXXXXXXX"
              className="inline-flex items-center justify-center gap-2 bg-card border border-primary/20 text-foreground px-6 py-3 rounded-lg font-bold hover:bg-muted transition-colors"
            >
              <MaterialIcon name="phone" />
              Call Helpline
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
