import MaterialIcon from "@/components/ui/MaterialIcon";
import { type CreditCard } from "@/lib/api/banks";

const HiddenFeesAlert = ({ card }: { card: CreditCard }) => {
    // Define all potential hidden fees with conditions
    const hiddenFees = [
        {
            type: 'cash_advance',
            label: 'নগদ উত্তোলনে উচ্চ সুদ',
            warning: 'ATM থেকে টাকা তুললে ২.৫% - ৩% ফি + প্রতিদিন সুদ লাগবে। জরুরি না হলে এড়িয়ে চলুন।',
            severity: 'high',
            condition: true // Applies to almost all credit cards
        },
        {
            type: 'minimum_payment_trap',
            label: 'মিনিমাম পেমেন্ট ফাঁদ',
            warning: 'মিনিমাম পরিশোধ করলে বাকি টাকার ওপর ২০-৩০% বার্ষিক সুদ লাগবে।',
            severity: 'high',
            condition: true
        },
        {
            type: 'foreign_markup',
            label: 'বিদেশী লেনদেনে অতিরিক্ত খরচ',
            warning: 'বিদেশে বা বিদেশী ওয়েবসাইটে কার্ড ব্যবহারে ৩% + ১% সরকারি ট্যাক্স (মোট ৪% খরচ)।',
            severity: 'medium',
            condition: card.category && (
                card.category.includes('Travel') ||
                card.category.includes('International') ||
                card.category.includes('Dual Currency')
            )
        },
        {
            type: 'annual_fee',
            label: 'বার্ষিক ফি',
            warning: 'প্রথম বছর মাফ থাকলেও পরের বছর থেকে পুরো ফি দিতে হবে (যদি না শর্ত পূরণ করেন)।',
            severity: 'medium',
            condition: !card.annual_fee_waived
        },
        {
            type: 'late_payment',
            label: 'দেরিতে বিল দিলে',
            warning: 'জরিমানা ছাড়াও আপনার ক্রেডিট স্কোর কমে যাবে এবং অতিরিক্ত সুদ গুনতে হবে।',
            severity: 'high',
            condition: true
        }
    ];

    // Filter active fees
    const activeFees = hiddenFees.filter(fee => fee.condition);

    if (activeFees.length === 0) return null;

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden mt-6">
            <div className="bg-amber-100/50 px-4 py-3 border-b border-amber-200 flex items-center gap-2">
                <MaterialIcon name="warning" className="text-amber-600" />
                <h4 className="font-bold text-amber-900">সতর্কতা: এই প্রডাক্টে লুকানো খরচ আছে</h4>
            </div>

            <ul className="divide-y divide-amber-100">
                {activeFees.map((fee, index) => (
                    <li key={fee.type} className="flex items-start gap-3 p-3 hover:bg-amber-50/80 transition-colors">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-sm text-amber-900">{fee.label}</p>
                                {fee.severity === 'high' && (
                                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">HIGH RISK</span>
                                )}
                            </div>
                            <p className="text-sm text-amber-800/90 mt-1 leading-snug">{fee.warning}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <button className="w-full text-center py-2 text-xs font-medium text-amber-700 hover:text-amber-900 hover:bg-amber-100 transition-colors border-t border-amber-200">
                বিস্তারিত ফি ব্রেকডাউন দেখুন
            </button>
        </div>
    );
};

export default HiddenFeesAlert;
