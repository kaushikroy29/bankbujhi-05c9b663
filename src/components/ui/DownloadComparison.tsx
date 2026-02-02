import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

    const handleDownload = () => {
        const doc = new jsPDF();

        // Add Bengali font support check or fallback
        // Note: Standard jsPDF doesn't support Bengali Unicode out of the box without custom fonts.
        // For now, we will use English text or transliterations where possible, 
        // or rely on the user understanding that Bangla might render incorrectly without a font pack.
        // Ideally we would load a base64 font here.

        doc.setFontSize(18);
        doc.text("BankBujhi Comparison", 14, 22);

        doc.setFontSize(11);
        doc.text(title, 14, 30);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 36);

        autoTable(doc, {
            startY: 44,
            head: [headers],
            body: data,
            theme: 'grid',
            headStyles: { fillColor: [22, 163, 74] }, // Primary color approx
            styles: { fontSize: 10 },
        });

        doc.save(fileName);
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
