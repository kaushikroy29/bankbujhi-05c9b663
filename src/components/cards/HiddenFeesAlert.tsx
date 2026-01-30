import MaterialIcon from "@/components/ui/MaterialIcon";
import { type CreditCard } from "@/lib/api/banks";

const HiddenFeesAlert = ({ card }: { card: CreditCard }) => {
    // Define potential hidden fees based on card properties or fees object
    // detailed parsing logic can be expanded here based on actual data structure

    const hiddenFees = [
        {
            type: 'cash_advance',
            label: 'নগদ উত্তোলনে উচ্চ সুদ',
            warning: 'ATM থেকে টাকা তুললে ২.৫% - ৩% ফি + প্রতিদিন সুদ লাগবে',
            severity: 'high',
            condition: true // Always show for credit cards as this is standard
        },
        {
            type: 'foreign_markup',
            label: 'বিদেশী লেনদেনে অতিরিক্ত খরচ',
            warning: 'বিদেশে বা বিদেশী ওয়েবসাইটে কার্ড ব্যবহারে ৩% + ১% সরকারি ট্যাক্স',
            severity: 'medium',
            condition: card.category && (card.category.includes('Travel') || card.category.includes('International'))
        },
        {
            type: 'minimum_payment_trap',
            label: 'মিনিমাম পেমেন্ট ফাঁদ',
            warning: 'মিনিমাম পরিশোধ করলে বাকি টাকার ওপর ২০-৩০% বার্ষিক সুদ লাগবে',
            severity: 'high',
            condition: true
        }
    ];

    // Filter fees based on condition if needed, for now just showing relevant ones
    const activeFees = hiddenFees.filter(fee => fee.condition);

    if (activeFees.length === 0) return null;

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-2 mb-3">
                <MaterialIcon name="warning" className="text-amber-600" />
                <h4 className="font-semibold text-amber-900">লুকানো খরচ সম্পর্কে সতর্ক থাকুন</h4>
            </div>

            <ul className="space-y-3">
                {activeFees.map(fee => (
                    <li key={fee.type} className="flex items-start gap-3 bg-white/50 p-2 rounded-md">
                        <span className="text-amber-600 text-lg mt-0.5">⚠️</span>
                        <div>
                            <p className="font-medium text-sm text-amber-900">{fee.label}</p>
                            <p className="text-xs text-amber-700/80 mt-0.5">{fee.warning}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HiddenFeesAlert;
