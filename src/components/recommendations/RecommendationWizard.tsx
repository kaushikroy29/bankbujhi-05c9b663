import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { userPersonas } from "@/lib/recommendations/personas";
import { UserPreferences } from "@/lib/recommendations/matcher";
import { cn } from "@/lib/utils";

interface RecommendationWizardProps {
    onComplete: (prefs: UserPreferences) => void;
}

export const RecommendationWizard = ({ onComplete }: RecommendationWizardProps) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<UserPreferences>({
        monthlyIncome: 0,
        spendingPattern: {},
    });

    const handlePersonaSelect = (personaId: string) => {
        setFormData(prev => ({ ...prev, selectedPersonaId: personaId }));
        // Auto-fill income based on persona defaults if not set? 
        // For now, just advance
        setStep(2);
    };

    const handleIncomeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    const handleFinish = () => {
        onComplete(formData);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className={cn(
                            "h-2 flex-1 rounded-full transition-colors",
                            step >= i ? "bg-primary" : "bg-primary/20"
                        )}
                    />
                ))}
            </div>

            {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">আপনার প্রোফাইল নির্বাচন করুন</h2>
                        <p className="text-muted-foreground">আমরা আপনার প্রয়োজন অনুযায়ী সেরা কার্ড খুঁজে দেব</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.values(userPersonas).map((persona) => (
                            <button
                                key={persona.id}
                                onClick={() => handlePersonaSelect(persona.id)}
                                className="group relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-primary/10 hover:border-primary/60 hover:bg-primary/5 transition-all text-center"
                            >
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <MaterialIcon name={persona.icon} className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{persona.title}</h3>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <form onSubmit={handleIncomeSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">আপনার মাসিক আয় কত?</h2>
                        <p className="text-muted-foreground">সঠিক কার্ড সাজেশনের জন্য এটি প্রয়োজনীয়</p>
                    </div>

                    <div className="space-y-4 max-w-sm mx-auto">
                        <div className="space-y-2">
                            <Label htmlFor="income">মাসিক আয় (BDT)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground font-bold">৳</span>
                                <Input
                                    id="income"
                                    type="number"
                                    min="0"
                                    required
                                    placeholder="Example: 50000"
                                    className="pl-8 text-lg"
                                    value={formData.monthlyIncome || ""}
                                    onChange={(e) => setFormData({ ...formData, monthlyIncome: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>পেশা</Label>
                            <Select
                                value={formData.employmentType}
                                onValueChange={(val) => setFormData({ ...formData, employmentType: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="পেশা নির্বাচন করুন" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="private_service">বেসরকারি চাকরি</SelectItem>
                                    <SelectItem value="govt_service">সরকারি চাকরি</SelectItem>
                                    <SelectItem value="business">ব্যবসা</SelectItem>
                                    <SelectItem value="self_employed">ফ্রিল্যান্সার / পেশাজীবী</SelectItem>
                                    <SelectItem value="student">ছাত্র / ছাত্রী</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full font-bold text-lg h-12">
                            পরবর্তী ধাপ
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setStep(1)}
                        >
                            পেছনে যান
                        </Button>
                    </div>
                </form>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">মাসিক খরচের ধারণা</h2>
                        <p className="text-muted-foreground">আমরা হিসেব করে দেখব কোন কার্ডে আপনার লাভ বেশি</p>
                    </div>

                    <div className="grid gap-4 max-w-lg mx-auto">
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <Label className="flex items-center gap-2">
                                <MaterialIcon name="restaurant" className="text-primary" />
                                খাবার ও ডাইনিং
                            </Label>
                            <Input
                                type="number"
                                placeholder="৳"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    spendingPattern: { ...formData.spendingPattern, dining: parseInt(e.target.value) || 0 }
                                })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-center">
                            <Label className="flex items-center gap-2">
                                <MaterialIcon name="shopping_cart" className="text-primary" />
                                মুদি বাজার
                            </Label>
                            <Input
                                type="number"
                                placeholder="৳"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    spendingPattern: { ...formData.spendingPattern, groceries: parseInt(e.target.value) || 0 }
                                })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-center">
                            <Label className="flex items-center gap-2">
                                <MaterialIcon name="flight" className="text-primary" />
                                ভ্রমণ
                            </Label>
                            <Input
                                type="number"
                                placeholder="৳"
                                onChange={(e) => setFormData({
                                    ...formData,
                                    spendingPattern: { ...formData.spendingPattern, travel: parseInt(e.target.value) || 0 }
                                })}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 max-w-sm mx-auto pt-4">
                        <Button onClick={handleFinish} className="w-full font-bold text-lg h-12">
                            কার্ড দেখুন
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setStep(2)}
                        >
                            পেছনে যান
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
