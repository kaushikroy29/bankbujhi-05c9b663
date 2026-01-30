
import { useState, useEffect } from "react";
import { CreditCard, fetchCreditCards } from "@/lib/api/banks";
import { parseAmount, getCashbackRate } from "@/lib/calculator-utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, Calculator, CreditCard as CreditCardIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CreditCardCostCalculator = () => {
    const [monthlySpend, setMonthlySpend] = useState<number>(0);
    const [selectedCardId, setSelectedCardId] = useState<string>("");
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [loading, setLoading] = useState(true);

    const selectedCard = cards.find(c => c.id === selectedCardId) || null;

    useEffect(() => {
        const loadCards = async () => {
            try {
                const data = await fetchCreditCards();
                setCards(data);
            } catch (error) {
                console.error("Failed to load cards", error);
            } finally {
                setLoading(false);
            }
        };
        loadCards();
    }, []);

    const calculateAnnualCost = () => {
        if (!selectedCard) return { total_fee: 0, estimated_cashback: 0, net_cost: 0, worth_it: false };

        // Parse annual fee
        // Note: 'annual_fee' in CreditCard is string | null
        const annualFee = parseAmount(selectedCard.annual_fee);

        // Estimate cashback
        const cashbackRate = getCashbackRate(selectedCard);
        const annualCashback = (monthlySpend * 12) * (cashbackRate / 100);

        const netCost = annualFee - annualCashback;

        return {
            total_fee: annualFee,
            estimated_cashback: annualCashback,
            net_cost: netCost,
            worth_it: netCost <= 0 // If net cost is negative or zero, it's worth it (gain >= fee)
        };
    };

    const result = calculateAnnualCost();

    return (
        <Card className="w-full shadow-md border-primary/10">
            <CardHeader className="bg-muted/30 pb-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">কার্ড খরচ এবং লাভ ক্যালকুলেটর</CardTitle>
                </div>
                <CardDescription>
                    আপনার মাসিক খরচের উপর ভিত্তি করে কার্ডের বার্ষিক লাভ বা লোকসান হিসাব করুন।
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="monthly-spend">আপনার মাসিক খরচ (৳)</Label>
                        <Input
                            id="monthly-spend"
                            type="number"
                            placeholder="Example: 50000"
                            value={monthlySpend || ""}
                            onChange={(e) => setMonthlySpend(Number(e.target.value))}
                            className="w-full text-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>ক্রেডিট কার্ড সিলেক্ট করুন</Label>
                        <CardSelector
                            cards={cards}
                            loading={loading}
                            selectedId={selectedCardId}
                            onSelect={setSelectedCardId}
                        />
                    </div>
                </div>

                {selectedCard && (
                    <div className="mt-6 p-5 bg-muted/50 rounded-lg border border-border animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/60">
                            {selectedCard.image_url ? (
                                <img src={selectedCard.image_url} alt={selectedCard.name} className="h-10 w-16 object-contain rounded bg-white p-1 border" />
                            ) : (
                                <div className="h-10 w-16 bg-white rounded border flex items-center justify-center">
                                    <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                                </div>
                            )}
                            <div>
                                <h4 className="font-semibold text-sm md:text-base leading-tight">{selectedCard.name}</h4>
                                <p className="text-xs text-muted-foreground">আনুমানিক ক্যাশব্যাক হার: {getCashbackRate(selectedCard)}%</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">বার্ষিক ফি:</span>
                                <span className="font-medium text-red-600">
                                    - ৳{result.total_fee.toLocaleString('bn-BD')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">প্রাক্কলিত ক্যাশব্যাক (বছরে):</span>
                                <span className="font-medium text-green-600">
                                    + ৳{result.estimated_cashback.toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-border/60 text-base">
                                <span className="font-bold">নিট ফলাফল (বছরে):</span>
                                <span className={cn(
                                    "font-bold",
                                    result.worth_it ? "text-green-600" : "text-red-500"
                                )}>
                                    {result.worth_it ? "+" : "-"} ৳{Math.abs(result.net_cost).toLocaleString('bn-BD', { maximumFractionDigits: 0 })}
                                    {result.worth_it ? ' (লাভ)' : ' (খরচ)'}
                                </span>
                            </div>
                        </div>

                        {result.worth_it ? (
                            <div className="mt-4 flex gap-2 items-start text-sm text-green-700 bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                                <Check className="h-5 w-5 shrink-0" />
                                <p>
                                    এই কার্ডটি আপনার জন্য লাভজনক! ক্যাশব্যাক রিওয়ার্ড দিয়ে বার্ষিক ফি কভার হয়ে যাবে।
                                </p>
                            </div>
                        ) : (
                            <div className="mt-4 flex gap-2 items-start text-sm text-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                                <AlertTriangle className="h-5 w-5 shrink-0" />
                                <p>
                                    সতর্কতা: আপনার বর্তমান খরচে এই কার্ডের ফি বেশি হতে পারে। খরচ বাড়ান অথবা কম ফি-র কার্ড দেখুন।
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Internal Selector Component
interface CardSelectorProps {
    cards: CreditCard[];
    loading: boolean;
    selectedId: string;
    onSelect: (id: string) => void;
}

const CardSelector = ({ cards, loading, selectedId, onSelect }: CardSelectorProps) => {
    if (loading) {
        return <Button variant="outline" disabled className="w-full justify-start text-muted-foreground">লোডিং কার্ড...</Button>;
    }

    // Group cards by bank for better UX
    const groupedCards: Record<string, CreditCard[]> = {};
    cards.forEach(card => {
        const bankName = card.banks?.name || "Other Banks";
        if (!groupedCards[bankName]) groupedCards[bankName] = [];
        groupedCards[bankName].push(card);
    });

    return (
        <Select value={selectedId} onValueChange={onSelect}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="একটি কার্ড নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(groupedCards).map(([bankName, bankCards]) => (
                    <SelectGroup key={bankName}>
                        <SelectLabel>{bankName}</SelectLabel>
                        {bankCards.map(card => (
                            <SelectItem key={card.id} value={card.id}>
                                {card.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CreditCardCostCalculator;
