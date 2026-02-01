import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import { CreditCard } from "@/lib/api/banks";

interface HiddenTruthsPanelProps {
    card: CreditCard;
}

const HiddenTruthsPanel = ({ card }: HiddenTruthsPanelProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Dynamic data based on card type could be added here
    // For now, these are standard truths applicable to almost all BD credit cards
    const truths = [
        {
            title: "লুকানো সত্য ১: ক্যাশ অ্যাডভান্স",
            icon: "payments",
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            summary: "এটিএম থেকে টাকা তুললে বিশাল লস",
            details: (
                <div className="space-y-2 text-sm">
                    <p className="font-bold text-gray-800">এটিএম থেকে ৳১০,০০০ তুললে:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-1">
                        <li>উত্তোলন ফি: ~৳৩০০ বা ২.৫% (যেটা বেশি)</li>
                        <li>সুদ শুরু: <strong>টাকা তোলার দিন থেকেই</strong> (কোনো গ্রেস পিরিয়ড নেই!)</li>
                        <li>দৈনিক সুদ: ~৳১০ প্রতিদিন</li>
                    </ul>
                    <div className="bg-red-100 p-2 rounded text-xs font-bold text-red-800 mt-2">
                        মোট খরচ: ৳১০,০০০ এর জন্য মাসে ~৳৬০০ গচ্চা!
                    </div>
                </div>
            )
        },
        {
            title: "লুকানো সত্য ২: ফরেন ট্রানজেকশন",
            icon: "public",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
            summary: "বিদেশে ব্যবহারে ডলার রেটের বাইরেও খরচ আছে",
            details: (
                <div className="space-y-2 text-sm">
                    <p className="font-bold text-gray-800">বিদেশে $100 (প্রায় ৳১২,০০০) খরচ করলে:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-1">
                        <li>ব্যাংক রেট মার্কআপ: ~১-২% বেশি</li>
                        <li>ক্রস কারেন্সি ফি: ৩% (৳৩৬০)</li>
                        <li>সরকারী ভ্যাট: ১৫% (ফি এর উপর)</li>
                    </ul>
                    <div className="bg-orange-100 p-2 rounded text-xs font-bold text-orange-800 mt-2">
                        মোট অতিরিক্ত খরচ: ব্যবহারের ৩.৫% - ৪% বেশি লাগে।
                    </div>
                </div>
            )
        },
        {
            title: "লুকানো সত্য ৩: লেট পেমেন্ট",
            icon: "timer_off",
            color: "text-slate-600",
            bgColor: "bg-slate-50",
            borderColor: "border-slate-200",
            summary: "১ দিন দেরি করলে কি হয়?",
            details: (
                <div className="space-y-2 text-sm">
                    <p className="font-bold text-gray-800">বিলের শেষ তারিখ মিস করলে:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-1">
                        <li>লেট ফি: ৳৫০০ - ৳১০০০</li>
                        <li>সুদ: পুরো বিলের উপর (আগের মাস থেকে!)</li>
                        <li>ক্রেডিট রিপোর্ট: CIB রিপোর্টে দাগ পড়বে (ভবিষ্যতে লোন পেতে সমস্যা হবে)</li>
                    </ul>
                </div>
            )
        }
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <MaterialIcon name="visibility" className="text-amber-400 text-2xl" />
                    <div className="text-left">
                        <h3 className="font-bold text-lg">ব্যাংকের লুকানো সত্য দেখুন</h3>
                        <p className="text-xs text-slate-300 opacity-90 group-hover:opacity-100">
                            যেসব খরচ বা শর্ত ব্যাংক আপনাকে সহজে বলে না
                        </p>
                    </div>
                </div>
                <MaterialIcon
                    name={isOpen ? "expand_less" : "expand_more"}
                    className={cn("text-2xl transition-transform duration-300", isOpen && "rotate-180")}
                />
            </button>

            <div className={cn(
                "grid gap-4 mt-4 transition-all duration-500 overflow-hidden",
                isOpen ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0 mt-0"
            )}>
                {truths.map((item, idx) => (
                    <Card key={idx} className={cn("border-l-4 shadow-sm", item.borderColor, item.bgColor)}>
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                <div className={cn("mt-1 p-2 rounded-full h-fit bg-white/50", item.color)}>
                                    <MaterialIcon name={item.icon} className="text-xl" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h4 className={cn("font-bold text-base", item.color)}>{item.title}</h4>
                                    <p className="text-sm font-medium text-gray-700 border-b border-black/5 pb-2 mb-2">
                                        {item.summary}
                                    </p>
                                    {item.details}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HiddenTruthsPanel;
