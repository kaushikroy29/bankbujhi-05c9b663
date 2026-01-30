import React from 'react';
import { CreditCard } from '@/lib/api/banks';

interface FeeComparisonTableProps {
    cards: CreditCard[];
}

const FeeComparisonTable: React.FC<FeeComparisonTableProps> = ({ cards }) => {
    const feeCategories = [
        {
            category: 'annual',
            label_bn: 'বার্ষিক ফি',
            subcategories: [
                { key: 'fee', label: 'ফি' }, // Changed from 'issuance' to 'fee' based on interface
                { key: 'renewal_fee', label: 'নবায়ন ফি' },
                // 'supplementary' is not in the interface, skipping or need to add
            ]
        },
        {
            category: 'transaction',
            label_bn: 'লেনদেন ফি',
            subcategories: [
                { key: 'cash_advance', label: 'নগদ উত্তোলন' },
                { key: 'foreign_currency', label: 'বিদেশী মুদ্রা' },
                { key: 'balance_transfer', label: 'ব্যালেন্স ট্রান্সফার' }
            ]
        },
        {
            category: 'penalty',
            label_bn: 'জরিমানা ফি',
            subcategories: [
                { key: 'late_payment', label: 'দেরিতে পরিশোধ' },
                { key: 'over_limit', label: 'লিমিট ওভার' },
                { key: 'returned_payment', label: 'রিটার্ন পেমেন্ট' }
            ]
        }
    ];

    const getFeeValue = (card: CreditCard, category: string, subKey: string) => {
        if (!card.fees_detailed) return '-';
        // @ts-ignore - Dynamic access to fee categories
        const categoryData = card.fees_detailed[category];
        if (!categoryData) return '-';
        // @ts-ignore
        return categoryData[subKey] || '-';
    };

    // Helper to determine if a fee is "lowest" (simple string comparison for now, improved later)
    const isLowestFee = (value: string, allCards: CreditCard[], category: string, subKey: string) => {
        // This is a placeholder logic. Real logic needs parsing "BDT 500" etc.
        return false;
    };

    return (
        <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-4 text-left bg-muted/50 border-b font-semibold text-muted-foreground w-1/4">ফি এর ধরন</th>
                        {cards.map(card => (
                            <th key={card.id} className="p-4 text-center bg-muted/50 border-b min-w-[200px]">
                                <div className="flex flex-col items-center gap-3">
                                    {card.image_url ? (
                                        <img src={card.image_url} alt={card.name} className="h-16 object-contain" />
                                    ) : (
                                        <div className="h-16 w-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                                    )}
                                    <span className="text-sm font-bold text-gray-800">{card.name}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {feeCategories.map(category => (
                        <React.Fragment key={category.category}>
                            <tr className="bg-primary/5">
                                <td colSpan={cards.length + 1} className="p-3 font-bold text-primary border-b">
                                    {category.label_bn}
                                </td>
                            </tr>
                            {category.subcategories.map(sub => (
                                <tr key={`${category.category}-${sub.key}`} className="border-b last:border-b-0 hover:bg-gray-50/50">
                                    <td className="p-4 text-gray-600 font-medium">{sub.label}</td>
                                    {cards.map(card => {
                                        const fee = getFeeValue(card, category.category, sub.key);
                                        return (
                                            <td key={card.id} className="p-4 text-center text-gray-700">
                                                {fee}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeeComparisonTable;
