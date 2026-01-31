import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import { UserProfile } from "@/lib/recommendations/matcher";

export interface QuizAnswer {
  questionId: string;
  value: string;
}

export interface QuizQuestionType {
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

const quizQuestions: QuizQuestionType[] = [
  {
    id: "primary_use",
    question: "আপনি মূলত কী ধরনের কাজে ক্রেডিট কার্ড ব্যবহার করবেন?",
    description: "আপনার প্রধান খরচের খাতটি সিলেক্ট করুন",
    icon: "credit_card",
    options: [
      { value: "travel", label: "ভ্রমণ ও এয়ার টিকিট", icon: "flight", description: "ফ্লাইট, হোটেল বুকিং এবং ভ্রমণের খরচ" },
      { value: "shopping", label: "শপিং ও রিটেইল", icon: "shopping_bag", description: "অনলাইন এবং দোকানে কেনাকাটা" },
      { value: "dining", label: "ডাইনিং ও বিনোদন", icon: "restaurant", description: "রেস্তোরাঁ, সিনেমা এবং বিভিন্ন অনুষ্ঠান" },
      { value: "daily", label: "தினందిన খরচ", icon: "receipt_long", description: "মাসিক বিল, সাবস্ক্রিপশন এবং গ্রোসারি" },
    ],
  },
  {
    id: "income",
    question: "আপনার মাসিক আয়ের পরিসীমা কত?",
    description: "এটি আপনি কোন কার্ডগুলোর যোগ্য তা নির্ধারণ করে",
    icon: "monetization_on",
    options: [
      { value: "20000", label: "২০,০০০ - ৪০,০০০ টাকা", icon: "trending_up", description: "এন্ট্রি-লেভেল কার্ড পাওয়া যাবে" },
      { value: "40000", label: "৪০,০০০ - ৭৫,০০০ টাকা", icon: "show_chart", description: "স্ট্যান্ডার্ড থেকে প্রিমিয়াম কার্ড" },
      { value: "75000", label: "৭৫,০০০ - ১,৫০,০০০ টাকা", icon: "insights", description: "অধিক সুবিধাযুক্ত প্রিমিয়াম কার্ড" },
      { value: "150000", label: "১,৫০,০০০ টাকার উপরে", icon: "workspace_premium", description: "এলিট টিয়ারসহ সব কার্ড" },
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
      { value: "student", label: "ছাত্র / ছাত্রী", icon: "school", description: "শিক্ষার্থী" },
    ],
  },
  {
    id: "reward_preference",
    question: "আপনি কোন ধরনের রিওয়ার্ড পছন্দ করেন?",
    description: "আপনার কাছে যা সবচেয়ে গুরুত্বপূর্ণ তা বেছে নিন",
    icon: "redeem",
    options: [
      { value: "cashback", label: "ক্যাশব্যাক", icon: "savings", description: "কেনাকাটার ওপর টাকা ফেরত পান" },
      { value: "lounge", label: "এয়ারপোর্ট লাউঞ্জ", icon: "flight_takeoff", description: "ফ্রি বলাকা বা ইন্টারন্যাশনল লাউঞ্জ" },
      { value: "points", label: "গিফট ভাউচার / পয়েন্ট", icon: "stars", description: "পয়েন্ট জমিয়ে গিফট ভাউচার" },
      { value: "discounts", label: "শপিং ডিসকাউন্ট", icon: "local_offer", description: "লাইফস্টাইল এবং ডাইনিং ডিসকাউন্ট" },
    ],
  },
  {
    id: "annual_fee",
    question: "বার্ষিক ফি-র ব্যাপারে আপনার পছন্দ কোনটি?",
    description: "বেশি ফি-র কার্ডগুলোতে সাধারণত বেশি সুবিধা থাকে",
    icon: "payments",
    options: [
      { value: "free", label: "বার্ষিক ফি নেই", icon: "money_off", description: "শুধুমাত্র ফ্রি কার্ড" },
      { value: "low", label: "কম ফি (৩০০০ পর্যন্ত)", icon: "paid", description: "সাশ্রয়ী কার্ড" },
      { value: "any", label: "ফি সমস্যা না", icon: "diamond", description: "সুবিধাই আমার কাছে মুখ্য" },
    ],
  },
];

const CardQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

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

    // Auto-advance
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 400);
  };

  const finishQuiz = (finalAnswers: QuizAnswer[]) => {
    // Convert answers to UserProfile
    const getVal = (id: string) => finalAnswers.find(a => a.questionId === id)?.value;

    const profile: UserProfile = {
      monthly_income: parseInt(getVal('income') || "0"),
      employment_type: getVal('employment'),
      priorities: [],
      preferred_persona: isStudent(getVal('employment')) ? 'student' : undefined
    };

    // Map priorities
    const rewardPref = getVal('reward_preference');
    if (rewardPref) profile.priorities.push(rewardPref);

    const feePref = getVal('annual_fee');
    if (feePref === 'free' || feePref === 'low') profile.priorities.push('low_fee');

    const usage = getVal('primary_use');
    if (usage === 'travel') profile.priorities.push('travel');
    if (usage === 'shopping') profile.priorities.push('shopping');

    navigate("/recommendations", { state: { profile } });
  };

  const isStudent = (empType?: string) => empType === 'student';

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion?.id)?.value;
  };

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
              {currentQuestion && (
                <QuizQuestion
                  question={currentQuestion}
                  selectedValue={getCurrentAnswer()}
                  onSelect={handleAnswer}
                />
              )}
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
