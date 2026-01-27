import { cn } from "@/lib/utils";
import MaterialIcon from "@/components/ui/MaterialIcon";
import type { QuizQuestion as QuizQuestionType } from "@/pages/CardQuiz";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const QuizQuestion = ({ question, selectedValue, onSelect }: QuizQuestionProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Question Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary mb-4">
          <MaterialIcon name={question.icon} className="text-3xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-2">
          {question.question}
        </h1>
        {question.description && (
          <p className="text-muted-foreground">
            {question.description}
          </p>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid gap-3 md:gap-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={cn(
              "group w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200",
              "hover:border-primary hover:bg-primary/5 hover:shadow-md",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedValue === option.value
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card"
            )}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={cn(
                "shrink-0 size-12 rounded-xl flex items-center justify-center transition-colors",
                selectedValue === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
              )}>
                <MaterialIcon name={option.icon} className="text-2xl" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-bold text-lg mb-0.5 transition-colors",
                  selectedValue === option.value ? "text-primary" : "text-foreground"
                )}>
                  {option.label}
                </h3>
                {option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>

              {/* Check Icon */}
              <div className={cn(
                "shrink-0 size-6 rounded-full border-2 flex items-center justify-center transition-all",
                selectedValue === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30"
              )}>
                {selectedValue === option.value && (
                  <MaterialIcon name="check" className="text-sm" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
