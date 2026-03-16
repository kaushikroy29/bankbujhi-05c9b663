import React, { useState } from 'react';

export default function ResultCard({ badge, title, children, footer }: { badge: string; title: string; children: React.ReactNode; footer?: React.ReactNode; }) {
  const [submitted, setSubmitted] = useState(false);

  async function sendFeedback(value: "helpful" | "partial" | "confusing") {
    setSubmitted(true);
    try {
        // Map badge to technical agent name
        let agent = "General";
        if (badge.includes("FeeGuard")) agent = "FeeGuard";
        if (badge.includes("Circular")) agent = "CircularAI";
        if (badge.includes("RateWatch")) agent = "RateWatch";

        await fetch("http://localhost:3001/api/public/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                sentiment: value,
                agent: agent
            })
        });
    } catch (e) {
        // Silent fail is fine for feedback
        console.error("Feedback failed", e);
    }
  }

  return (
    <div className="bb-card">
      <div className="bb-card-header">
        <span className="bb-badge">{badge}</span>
        <h2>{title}</h2>
      </div>
      <div className="bb-card-body">{children}</div>
      <div className="bb-card-footer">
        <div className="mb-2 flex items-center gap-2">
            {!submitted ? (
                <>
                <span className="feedback-label text-sm text-gray-500 font-medium">Was this helpful?</span>
                <div className="feedback-buttons flex gap-1">
                    <button onClick={() => sendFeedback("helpful")} title="Helpful" className="hover:scale-110 transition-transform">👍</button>
                    <button onClick={() => sendFeedback("partial")} title="Somewhat" className="hover:scale-110 transition-transform">🤔</button>
                    <button onClick={() => sendFeedback("confusing")} title="Confusing" className="hover:scale-110 transition-transform">👎</button>
                </div>
                </>
            ) : (
                <span className="feedback-thanks text-sm text-green-600 font-medium">Thanks — this helps us improve 🙏</span>
            )}
        </div>
        {footer}
      </div>
    </div>
  );
}
