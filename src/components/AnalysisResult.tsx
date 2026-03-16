import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ResultCard from './cards/ResultCard';

interface AnalysisResultProps {
  status: "success" | "low_confidence" | "ambiguous" | "data_missing" | "error";
  markdown?: string;
  systemMessage?: string;
  mode: "offer" | "rule" | "rate";
}

export default function AnalysisResult({ status, markdown, systemMessage, mode }: AnalysisResultProps) {
  
  // 1. Handle Low Confidence / Error States
  if (status === "low_confidence" || status === "ambiguous" || status === "data_missing" || status === "error") {
    return (
      <div className="bb-card bg-amber-50 border-amber-200">
        <div className="bb-card-header">
           <h3 className="text-amber-900 font-bold text-lg">🤔 We need a bit more context</h3>
        </div>
        <div className="bb-card-body">
            <p className="text-amber-800 mb-4">
                This text mentions banking terms but doesn’t include:
            </p>
            <ul className="list-disc list-inside text-amber-800 space-y-1 ml-2 mb-4">
                <li>Whether this is an offer, rate, or rule</li>
                <li>Any specific numbers or conditions</li>
            </ul>
            <p className="text-amber-800 font-semibold">Try pasting:</p>
            <ul className="list-disc list-inside text-amber-800 space-y-1 ml-2">
                <li>The full SMS / ad text</li>
                <li>The rate table</li>
                <li>The circular paragraph</li>
            </ul>
        </div>
      </div>
    );
  }

  if (!markdown) return null;

  // 2. Standardize Labels (String Replacement)
  let content = markdown;

  const replacements: Record<string, string> = {
    // FeeGuard
    "Headline": "⚠️ The Catch",
    "Cost": "💸 What It Really Costs",
    "How to Avoid": "👀 What to Watch For",
    "Verdict": "🏷️ BankBujhi Verdict",
    
    // Circular AI
    "What happened": "🧐 What changed?",
    "Who does this affect": "👥 Who should care?",
    "Details": "📌 Key points",
    "BankBujhi Take": "💡 BankBujhi Take",

    // RateWatch
    "Analysis": "📈 What changed",
    "Consumer Impact": "👤 What this means for you"
  };

  // Naive replacement for headers (## Header or **Header**)
  Object.entries(replacements).forEach(([oldTerm, newTerm]) => {
    // Matches: ## Header, ### Header, **Header**, **Header**:
    const regex = new RegExp(`^(\\s*#{1,6}\\s*|\\s*\\*\\*\\s*)${oldTerm}(:|\\s*\\*\\*)?`, 'gmi');
    content = content.replace(regex, `### ${newTerm}`);
  });

  // 3. Extract Title & Clean Content
  // We'll try to find the first H1/H2 as the title, or use a default.
  let title = "Analysis Result";
  
  // Simple extraction: find first line starting with #
  const titleMatch = content.match(/^#+\s+(.*)$/m);
  if (titleMatch) {
    title = titleMatch[1];
    // Remove the title from the body to avoid duplication
    content = content.replace(titleMatch[0], '');
  } else {
    // Fallback: Use the mode to generate a title
    if (mode === 'offer') title = "Offer Analysis";
    if (mode === 'rule') title = "Circular Summary";
    if (mode === 'rate') title = "Rate Update";
  }

  // 4. Determine Badge
  let badge = "BankBujhi Intelligence";
  if (mode === 'offer') badge = "FeeGuard™";
  if (mode === 'rule') badge = "Circular AI";
  if (mode === 'rate') badge = "RateWatch";

  // 5. Footer
  const footer = (
    <div>
       BankBujhi explains what bank text usually means in practice. Always confirm with the official source.
    </div>
  );

  return (
    <ResultCard badge={badge} title={title} footer={footer}>
      <div className="prose prose-sm max-w-none prose-slate">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
        </ReactMarkdown>
      </div>
    </ResultCard>
  );
}
