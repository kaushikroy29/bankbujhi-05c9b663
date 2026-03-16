
import { useState } from "react";

export default function AdminAnalyze() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [mode, setMode] = useState<"text" | "pdf">("text");

  async function runAnalysis() {
    setLoading(true);
    setResult(null);

    try {
      let res;
      
      if (mode === "text") {
        res = await fetch("http://localhost:3001/api/admin/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });
      } else {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("context", "circular"); // Default for files

        res = await fetch("http://localhost:3001/api/upload", {
          method: "POST",
          body: formData
        });
      }

      const data = await res.json();
      setResult(data.preview);
    } catch (error) {
      console.error("Analysis failed", error);
      setResult({ error: "Failed to connect to backend" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Admin – Analyze Content</h2>
        <div className="bg-gray-100 p-1 rounded-lg flex text-sm">
            <button 
                onClick={() => { setMode("text"); setResult(null); }}
                className={`px-3 py-1 rounded-md transition-all ${mode === "text" ? "bg-white shadow text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"}`}
            >
                Raw Text
            </button>
            <button 
                onClick={() => { setMode("pdf"); setResult(null); }}
                className={`px-3 py-1 rounded-md transition-all ${mode === "pdf" ? "bg-white shadow text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"}`}
            >
                Upload PDF
            </button>
        </div>
      </div>
      
      {mode === "text" ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Paste Raw Content
          </label>
          <textarea
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Paste raw bank text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      ) : (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Upload Document (PDF)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                <input 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <p className="mt-2 text-xs text-gray-500">Only PDF files supported for now.</p>
            </div>
            {file && (
                <div className="text-sm text-green-600 font-medium">
                    Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </div>
            )}
        </div>
      )}

      <div className="flex gap-4">
        <button 
          onClick={runAnalysis} 
          disabled={loading || (mode === "text" ? !text : !file)}
          className={`px-4 py-2 rounded-lg font-medium text-white transition-colors
            ${loading || (mode === "text" ? !text : !file)
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "Analyzing..." : `Analyze ${mode === "pdf" ? "PDF" : "Text"}`}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Analysis Result</h3>
          <pre className="text-xs overflow-auto whitespace-pre-wrap font-mono text-gray-800">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}
