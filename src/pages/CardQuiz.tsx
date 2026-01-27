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
    question: "What will you primarily use your credit card for?",
    description: "Select your main spending category",
    icon: "credit_card",
    options: [
      { value: "travel", label: "Travel & Flights", icon: "flight", description: "Booking flights, hotels, vacation expenses" },
      { value: "shopping", label: "Shopping & Retail", icon: "shopping_bag", description: "Online and in-store purchases" },
      { value: "dining", label: "Dining & Entertainment", icon: "restaurant", description: "Restaurants, movies, events" },
      { value: "bills", label: "Bills & Utilities", icon: "receipt_long", description: "Monthly bills, subscriptions, groceries" },
    ],
  },
  {
    id: "monthly_spend",
    question: "How much do you typically spend per month?",
    description: "This helps us find cards with the best rewards for your spending",
    icon: "account_balance_wallet",
    options: [
      { value: "low", label: "Under ৳30,000", icon: "savings", description: "Essential spending only" },
      { value: "medium", label: "৳30,000 - ৳75,000", icon: "payments", description: "Regular lifestyle expenses" },
      { value: "high", label: "৳75,000 - ৳1,50,000", icon: "account_balance", description: "Premium lifestyle" },
      { value: "premium", label: "Above ৳1,50,000", icon: "diamond", description: "High-volume spending" },
    ],
  },
  {
    id: "income",
    question: "What is your monthly income range?",
    description: "This determines which cards you're eligible for",
    icon: "monetization_on",
    options: [
      { value: "entry", label: "৳20,000 - ৳40,000", icon: "trending_up", description: "Entry-level cards available" },
      { value: "mid", label: "৳40,000 - ৳75,000", icon: "show_chart", description: "Standard to premium cards" },
      { value: "high", label: "৳75,000 - ৳1,50,000", icon: "insights", description: "Premium cards with more benefits" },
      { value: "premium", label: "Above ৳1,50,000", icon: "workspace_premium", description: "All cards including elite tier" },
    ],
  },
  {
    id: "employment",
    question: "What is your employment type?",
    description: "Different cards have different eligibility criteria",
    icon: "work",
    options: [
      { value: "salaried", label: "Salaried Employee", icon: "badge", description: "Working for a company" },
      { value: "self_employed", label: "Self-Employed", icon: "person", description: "Freelancer or professional" },
      { value: "business", label: "Business Owner", icon: "store", description: "Own a business or company" },
      { value: "other", label: "Other", icon: "more_horiz", description: "Student, retired, etc." },
    ],
  },
  {
    id: "reward_preference",
    question: "What type of rewards do you prefer?",
    description: "Choose what matters most to you",
    icon: "redeem",
    options: [
      { value: "cashback", label: "Cashback", icon: "savings", description: "Get money back on purchases" },
      { value: "points", label: "Reward Points", icon: "stars", description: "Earn points for gift cards & vouchers" },
      { value: "travel", label: "Travel Benefits", icon: "flight_takeoff", description: "Lounge access, miles, travel perks" },
      { value: "discounts", label: "Discounts & Offers", icon: "local_offer", description: "Partner discounts and deals" },
    ],
  },
  {
    id: "annual_fee",
    question: "What's your preference for annual fees?",
    description: "Higher fee cards typically offer more benefits",
    icon: "payments",
    options: [
      { value: "free", label: "No Annual Fee", icon: "money_off", description: "Free cards only" },
      { value: "low", label: "Up to ৳3,000", icon: "paid", description: "Budget-friendly premium cards" },
      { value: "medium", label: "৳3,000 - ৳10,000", icon: "credit_score", description: "Good balance of fee vs benefits" },
      { value: "high", label: "Any Amount", icon: "diamond", description: "Best benefits regardless of fee" },
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
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <QuizResults answers={answers} onRestart={handleRestart} />
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  return (
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
                  Back
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  Question {currentStep + 1} of {quizQuestions.length}
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
  );
};

export default CardQuiz;
