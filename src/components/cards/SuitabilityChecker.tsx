import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { CreditCard } from "@/lib/api/banks";
import { formatBDT } from "@/lib/utils/currency";

interface SuitabilityCheckerProps {
    card: CreditCard;
}

const SuitabilityChecker = ({ card }: SuitabilityCheckerProps) => {
    const [income, setIncome] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [occupation, setOccupation] = useState<string>("");
    const [result, setResult] = useState<"suitable" | "unsuitable" | "warning" | null>(null);
    const [reasons, setReasons] = useState<string[]>([]);

    const checkSuitability = () => {
        const reasonsList: string[] = [];
        let isDisqualified = false;
        let isWarning = false;

        const incomeNum = parseInt(income);
        const ageNum = parseInt(age);

        // 1. Check Income
        const cardMinIncome = card.min_income ? parseInt(card.min_income.replace(/[\D]/g, "")) : 0;
        if (incomeNum < cardMinIncome) {
            reasonsList.push(`আপনার আয় (৳${incomeNum.toLocaleString()}) এই কার্ডের ন্যূনতম আয় (৳${cardMinIncome.toLocaleString()}) এর চেয়ে কম।`);
            isDisqualified = true;
        }

        // 2. Check Age
        const minAge = card.min_age || 21;
        const maxAge = card.max_age || 60;
        if (ageNum < minAge || ageNum > maxAge) {
            reasonsList.push(`আপনার বয়স (${ageNum}) এই কার্ডের সীমার (${minAge}-${maxAge} বছর) বাইরে।`);
            isDisqualified = true;
        }

        // 3. Check Occupation (Basic logic)
        // If card specifies 'Salaried only' and user is 'Student', etc.
        // For now, simpler logic based on typical exclusions
        if (occupation === "student" && cardMinIncome > 0) {
            reasonsList.push("ছাত্রদের জন্য সাধারণত ইনকাম সোর্স দেখানো কঠিন হতে পারে।");
            isWarning = true;
        }

        // 4. Annual Fee Warning for Low Income
        const fee = card.annual_fee ? parseInt(card.annual_fee.replace(/[\D]/g, "")) : 0;
        if (fee > 5000 && incomeNum < 50000) {
            reasonsList.push(`আপনার আয়ের তুলনায় এই কার্ডের বার্ষিক ফি (৳${fee.toLocaleString()}) অনেক বেশি।`);
            isWarning = true;
        }

        setReasons(reasonsList);
        if (isDisqualified) setResult("unsuitable");
        else if (isWarning) setResult("warning");
        else setResult("suitable");
    };

    if (result) {
        return (
            <Card className={`border-2 ${result === "suitable" ? "border-green-100 bg-green-50/50" :
                    result === "unsuitable" ? "border-red-100 bg-red-50/50" :
                        "border-amber-100 bg-amber-50/50"
                }`}>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full shrink-0 ${result === "suitable" ? "bg-green-100 text-green-600" :
                                result === "unsuitable" ? "bg-red-100 text-red-600" :
                                    "bg-amber-100 text-amber-600"
                            }`}>
                            <MaterialIcon
                                name={result === "suitable" ? "check_circle" : result === "unsuitable" ? "cancel" : "warning"}
                                className="text-2xl"
                            />
                        </div>
                        <div className="space-y-3 flex-1">
                            <div>
                                <h3 className={`font-bold text-lg mb-1 ${result === "suitable" ? "text-green-800" :
                                        result === "unsuitable" ? "text-red-800" :
                                            "text-amber-800"
                                    }`}>
                                    {result === "suitable" ? "এই কার্ডটি আপনার জন্য উপযুক্ত!" :
                                        result === "unsuitable" ? "এই কার্ডটি আপনার জন্য উপযুক্ত নয়" :
                                            "কিছু বিষয়ে সতর্কতা প্রয়োজন"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {result === "suitable"
                                        ? "আপনার প্রোফাইল এই কার্ডের যোগ্যতার সাথে মিলছে।"
                                        : "নিচের কারণগুলো বিবেচনা করুন:"}
                                </p>
                            </div>

                            {reasons.length > 0 && (
                                <ul className="space-y-2 bg-white/50 p-3 rounded-lg border border-black/5">
                                    {reasons.map((r, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm font-medium opacity-90">
                                            <MaterialIcon name="arrow_right" className="mt-0.5 opacity-50" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setResult(null)}
                                className="mt-2 bg-white hover:bg-white/80"
                            >
                                আবার যাচাই করুন
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <MaterialIcon name="fact_check" className="text-primary" />
                    কার্ডটি কি আপনার জন্য? যাচাই করুন
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>আপনার মাসিক আয়</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">৳</span>
                            <Input
                                type="number"
                                placeholder="50000"
                                className="pl-8"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>বয়স</Label>
                        <Input
                            type="number"
                            placeholder="25"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>পেশা</Label>
                        <Select onValueChange={setOccupation}>
                            <SelectTrigger>
                                <SelectValue placeholder="নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="salaried">চাকরিজীবী</SelectItem>
                                <SelectItem value="business">ব্যবসায়ী</SelectItem>
                                <SelectItem value="professional">প্রফেশনাল (ডাক্তার/ইঞ্জিনিয়ার)</SelectItem>
                                <SelectItem value="student">ছাত্র/ছাত্রী</SelectItem>
                                <SelectItem value="homemaker">গৃহিনী</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button
                    className="w-full font-bold"
                    onClick={checkSuitability}
                    disabled={!income || !age || !occupation}
                >
                    যাচাই করুন
                </Button>
            </CardContent>
        </Card>
    );
};

export default SuitabilityChecker;
