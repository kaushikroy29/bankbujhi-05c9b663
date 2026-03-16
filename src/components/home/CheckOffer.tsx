import { useState } from "react";
import { analyzeText } from "../../services/openclaw";
import AnalysisResult from "../AnalysisResult";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

export default function CheckOffer() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function handleAnalyze() {
        if (!text.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const res = await analyzeText(text);
            setResult(res);
        } catch (e) {
            setResult({
                routing: { status: "error" },
                system_message: "Unable to reach analysis service. Make sure the backend is running."
            });
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.metaKey) {
            handleAnalyze();
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Check a Bank Offer
                </CardTitle>
                <CardDescription>
                    Paste any bank offer, SMS, or promotion text to prevent hidden charges and understand the real deal.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    rows={5}
                    className="text-base resize-none"
                    placeholder="Example: 'Get 50% discount on dining at X Hotel with your City Bank Amex card...'"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <div className="flex justify-end">
                    <Button
                        onClick={handleAnalyze}
                        disabled={loading || !text.trim()}
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                Analyze Offer
                            </>
                        )}
                    </Button>
                </div>

                {result && (
                    <div className="mt-6">
                        <AnalysisResult
                            status={result.routing.status}
                            markdown={result.presentation}
                            systemMessage={result.system_message}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
