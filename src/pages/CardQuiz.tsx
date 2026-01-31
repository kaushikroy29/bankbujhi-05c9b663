import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResults from "@/components/quiz/QuizResults";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";

export interface QuizAnswer {
  questionId: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  icon: string;
  options: {
    value: string;
    label: string;
    icon: string;
    description?: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "primary_use",
    question: "আপনি মূলত কী ধরনের কাজে ক্রেডিট কার্ড ব্যবহার করবেন?",
    description: "আপনার প্রধান খরচের খাতটি সিলেক্ট করুন",
    icon: "credit_card",
    options: [
      { value: "travel", label: "ভ্রমণ ও এয়ার টিকিট", icon: "flight", description: "ফ্লাইট, হোটেল বুকিং এবং ভ্রমণের খরচ" },
      { value: "shopping", label: "শপিং ও রিটেইল", icon: "shopping_bag", description: "অনলাইন এবং দোকানে কেনাকাটা" },
      { value: "dining", label: "ডাইনিং ও বিনোদন", icon: "restaurant", description: "রেস্তোরাঁ, সিনেমা এবং বিভিন্ন অনুষ্ঠান" },
      { value: "bills", label: "বিল ও ইউটিলিটি", icon: "receipt_long", description: "মাসিক বিল, সাবস্ক্রিপশন এবং গ্রোসারি কেনাকাটা" },
    ],
  },
  {
    id: "monthly_spend",
    question: "আপনি মাসে সাধারণত কত টাকা খরচ করেন?",
    description: "এটি আপনার খরচের ধরন আনুযায়ী সেরা রিওয়ার্ড যুক্ত কার্ড খুঁজে পেতে সাহায্য করবে",
    icon: "account_balance_wallet",
    options: [
      { value: "low", label: "৩০,০০০ টাকার নিচে", icon: "savings", description: "শুধুমাত্র প্রয়োজনীয় খরচপাতি" },
      { value: "medium", label: "৩০,০০০ - ৭৫,০০০ টাকা", icon: "payments", description: "নিয়মিত জীবনমানের খরচ" },
      { value: "high", label: "৭৫,০০০ - ১,৫০,০০০ টাকা", icon: "account_balance", description: "প্রিমিয়াম জীবনমান" },
      { value: "premium", label: "১,৫০,০০০ টাকার উপরে", icon: "diamond", description: "অধিক পরিমাণে খরচ" },
    ],
  },
  {
    id: "income",
    question: "আপনার মাসিক আয়ের পরিসীমা কত?",
    description: "এটি আপনি কোন কার্ডগুলোর যোগ্য তা নির্ধারণ করে",
    icon: "monetization_on",
    options: [
      { value: "entry", label: "২০,০০০ - ৪০,০০০ টাকা", icon: "trending_up", description: "এন্ট্রি-লেভেল কার্ড পাওয়া যাবে" },
      { value: "mid", label: "৪০,০০০ - ৭৫,০০০ টাকা", icon: "show_chart", description: "স্ট্যান্ডার্ড থেকে প্রিমিয়াম কার্ড" },
      { value: "high", label: "৭৫,০০০ - ১,৫০,০০০ টাকা", icon: "insights", description: "অধিক সুবিধাযুক্ত প্রিমিয়াম কার্ড" },
      { value: "premium", label: "১,৫০,০০০ টাকার উপরে", icon: "workspace_premium", description: "এলিট টিয়ারসহ সব কার্ড" },
    ],
  },
  {
    id: "employment",
    question: "আপনি বর্তমানে কী করছেন?",
    description: "একেক কার্ডের জন্য একেক রকম যোগ্যতার প্রয়োজন হয়",
    icon: "work",
    options: [
      { value: "salaried", label: "চাকরিজীবী", icon: "badge", description: "কোনো প্রতিষ্ঠানে কাজ করছেন" },
      { value: "self_employed", label: "পেশাজীবী", icon: "person", description: "ফ্রিল্যান্সার বা পেশাজীবী" },
      { value: "business", label: "ব্যবসায়ী", icon: "store", description: "নিজের ব্যবসা বা কোম্পানি আছে" },
      { value: "other", label: "অন্যান্য", icon: "more_horiz", description: "শিক্ষার্থী, অবসরপ্রাপ্ত ইত্যাদি" },
    ],
  },
  {
    id: "reward_preference",
    question: "আপনি কোন ধরনের রিওয়ার্ড পছন্দ করেন?",
    description: "আপনার কাছে যা সবচেয়ে গুরুত্বপূর্ণ তা বেছে নিন",
    icon: "redeem",
    options: [
      { value: "cashback", label: "ক্যাশব্যাক", icon: "savings", description: "কেনাকাটার ওপর টাকা ফেরত পান" },
      { value: "points", label: "রিওয়ার্ড পয়েন্ট", icon: "stars", description: "গিফট কার্ড বা ভাউচারের জন্য পয়েন্ট অর্জন করুন" },
      { value: "travel", label: "ভ্রমণ সুবিধা", icon: "flight_takeoff", description: "লাউঞ্জ অ্যাক্সেস, মাইলস এবং অন্যান্য সুবিধা" },
      { value: "discounts", label: "ডিসকাউন্ট ও অফার", icon: "local_offer", description: "পার্টনারদের থেকে বিশেষ ডিসকাউন্ট এবং ডিল" },
    ],
  },
  {
    id: "annual_fee",
    question: "বার্ষিক ফি-র ব্যাপারে আপনার পছন্দ কোনটি?",
    description: "বেশি ফি-র কার্ডগুলোতে সাধারণত বেশি সুবিধা থাকে",
    icon: "payments",
    options: [
      { value: "free", label: "বার্ষিক ফি নেই", icon: "money_off", description: "শুধুমাত্র ফ্রি কার্ড" },
      { value: "low", label: "৩,০০০ টাকা পর্যন্ত", icon: "paid", description: "সাশ্রয়ী প্রিমিয়াম কার্ড" },
      { value: "medium", label: "৩,০০০ - ১০,০০০ টাকা", icon: "credit_score", description: "ফি এবং সুবিধার ভালো ভারসাম্য" },
      { value: "high", label: "যেকোনো পরিমাণ", icon: "diamond", description: "ফির চিন্তা না করে সেরা সব সুবিধা" },
    ],
  },
];

const CardQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  const currentQuestion = quizQuestions[currentStep];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);

    if (existingIndex >= 0) {
      newAnswers[existingIndex].value = value;
    } else {
      newAnswers.push({ questionId: currentQuestion.id, value });
    }

    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentStep(0);
    setShowResults(false);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion?.id)?.value;
  };

  if (showResults) {
    return (
      <>
        <SEOHead
          title="কার্ড কুইজ | BankBujhi"
          description="৩০ সেকেন্ডে সেরা কার্ড খুঁজুন। আপনার জন্য উপযুক্ত ক্রেডিট কার্ড সুপারিশ।"
          image="https://bankbujhi.lovable.app/og/og-quiz.jpg"
          path="/quiz"
        />
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1 pb-20 md:pb-0">
            <QuizResults answers={answers} onRestart={handleRestart} />
          </main>
          <Footer />
          <BottomNav />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="কার্ড কুইজ | BankBujhi"
        description="৩০ সেকেন্ডে সেরা কার্ড খুঁজুন। আপনার জন্য উপযুক্ত ক্রেডিট কার্ড সুপারিশ।"
        image="https://bankbujhi.lovable.app/og/og-quiz.jpg"
        path="/quiz"
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pb-20 md:pb-0">
          {/* Progress Header */}
          <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
            <div className="container mx-auto px-4 py-6">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={currentStep === 0 ? () => navigate(-1) : handleBack}
                    className="gap-1"
                  >
                    <MaterialIcon name="arrow_back" className="text-lg" />
                    পিছনে
                  </Button>
                  <span className="text-sm font-medium text-muted-foreground">
                    প্রশ্ন {currentStep + 1} / {quizQuestions.length}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </section>

          {/* Question Section */}
          <section className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-2xl mx-auto">
              <QuizQuestion
                question={currentQuestion}
                selectedValue={getCurrentAnswer()}
                onSelect={handleAnswer}
              />
            </div>
          </section>
        </main>

        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default CardQuiz;
