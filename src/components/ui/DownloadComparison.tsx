import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import jsPDF from "jspdf";


interface DownloadComparisonProps {
    title: string;
    headers: string[];
    data: (string | number)[][];
    fileName?: string;
    disabled?: boolean;
}

const DownloadComparison = ({
    title,
    headers,
    data,
    fileName = "comparison.pdf",
    disabled = false
}: DownloadComparisonProps) => {

    const handleDownload = async () => {
        // Create a temporary hidden container for the table
        const printContainer = document.createElement("div");
        printContainer.style.position = "absolute";
        printContainer.style.left = "-9999px";
        printContainer.style.top = "0";
        printContainer.style.width = "800px"; // Fixed width for A4 like scaling
        printContainer.style.background = "#fff";
        printContainer.style.padding = "40px";
        printContainer.style.color = "#000";
        // Explicitly set font family to ensure system fonts are picked up
        printContainer.style.fontFamily = "'Noto Sans Bengali', sans-serif";

        // Construct HTML content
        const tableHtml = `
            <div style="font-family: 'Noto Sans Bengali', sans-serif;">
                <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #16a34a;">BankBujhi Comparison</h1>
                <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">${title}</h2>
                <div style="margin-bottom: 20px; font-size: 12px; color: #666;">Generated on: ${new Date().toLocaleDateString()}</div>
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            ${headers.map(h => `<th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left; font-weight: bold;">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map((row, i) => `
                            <tr style="background-color: ${i % 2 === 0 ? '#fff' : '#f9fafb'};">
                                ${row.map(cell => `<td style="border: 1px solid #e5e7eb; padding: 10px;">${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div style="margin-top: 30px; font-size: 10px; color: #999; text-align: center;">
                    www.bankbujhi.lovable.app
                </div>
            </div>
        `;

        printContainer.innerHTML = tableHtml;
        document.body.appendChild(printContainer);

        try {
            // Dynamically import html2canvas to optimize initial bundle
            const html2canvas = (await import('html2canvas')).default;

            const canvas = await html2canvas(printContainer, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(fileName);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("PDF জেনারেট করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
        } finally {
            document.body.removeChild(printContainer);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={disabled}
            className="gap-2"
        >
            <MaterialIcon name="download" />
            PDF ডাউনলোড
        </Button>
    );
};

export default DownloadComparison;
