
import { useState } from "react";
import AnalysisResult from "../components/AnalysisResult";
import { analyzeText } from "../services/openclaw";


type Mode = "offer" | "rule" | "rate";

export default function IntelligencePage() {
    const [mode, setMode] = useState<Mode>("offer");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function runAnalysis() {
        setLoading(true);
        setResult(null);

        try {
            // In the real implementation, we'd extract the "preview" from the API response
            const res = await analyzeText(text);
            setResult(res.preview); // API returns { status: "analyzed", preview: Envelope }
        } catch {
            setResult({
                routing: { status: "error" },
                system_message: "Unable to analyze right now. Please try again later."
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col">


            <div className="flex-1 container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 items-start">

                    {/* Left Panel: Input */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unconfuse Your Banking</h1>
                            <p className="text-gray-600">
                                Paste bank text. We explain what it actually means.
                            </p>
                        </div>

                        {/* Mode Tabs */}
                        <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg w-fit">
                            <button
                                onClick={() => setMode("offer")}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "offer" ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                Check an Offer
                            </button>
                            <button
                                onClick={() => setMode("rule")}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "rule" ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                Understand a Rule
                            </button>
                            <button
                                onClick={() => setMode("rate")}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "rate" ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                Check Rates
                            </button>
                        </div>

                        <div className="space-y-4">
                            <textarea
                                rows={10}
                                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none font-mono text-sm"
                                placeholder={
                                    mode === "offer"
                                        ? "Paste offer, SMS, or ad text here..."
                                        : mode === "rule"
                                            ? "Paste circular or notice text here..."
                                            : "Paste interest rate or fee table here..."
                                }
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <button
                                disabled={!text || loading}
                                onClick={runAnalysis}
                                className={`w-full py-3 rounded-lg font-medium text-white transition-colors flex justify-center items-center
                                ${!text || loading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </span>
                                ) : "Analyze Text"}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4 bg-blue-50 py-2 rounded-md border border-blue-100">
                                <span>🧪 Public Beta</span>
                                <span>•</span>
                                <span>Educational Use Only</span>
                                <span>•</span>
                                <span>No Financial Advice</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Result */}
                    <div className="min-h-[400px]">
                        {result ? (
                            <AnalysisResult
                                status={result.routing?.status}
                                markdown={result.presentation}
                                systemMessage={result.system_message}
                                mode={mode}
                            />
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl p-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-lg font-medium">Results will appear here</p>
                                <p className="text-sm">Your simple summary is just a click away.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>


        </div>
    );
}
