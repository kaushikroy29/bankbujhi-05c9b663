
// Mock service for frontend demo - replace with real API call later
export async function analyzeText(text: string): Promise<any> {
  // Use the public safe endpoint
  const response = await fetch("http://localhost:3001/api/public/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
        text,
        context: "unknown" 
    })
  });

  return await response.json();
}
