
import React from 'react';
import { cn } from "@/lib/utils";
import MaterialIcon from "@/components/ui/MaterialIcon";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

export interface TrustScoreProps {
    score: number;
    breakdown?: {
        feeTransparency: number;
        recentChanges: number;
        userReports: number;
        regulatoryCompliance: number;
    };
    compact?: boolean;
    className?: string;
    showLabel?: boolean;
}

const getTrustLevelConfig = (score: number) => {
    if (score >= 90) return {
        label: "অত্যন্ত নির্ভরযোগ্য",
        color: "bg-green-600",
        textColor: "text-green-600",
        borderColor: "border-green-200",
        bgColor: "bg-green-50",
        icon: "verified_user"
    };
    if (score >= 70) return {
        label: "নির্ভরযোগ্য",
        color: "bg-blue-600",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
        bgColor: "bg-blue-50",
        icon: "thumb_up"
    };
    if (score >= 50) return {
        label: "সতর্ক থাকুন",
        color: "bg-amber-500",
        textColor: "text-amber-600",
        borderColor: "border-amber-200",
        bgColor: "bg-amber-50",
        icon: "warning"
    };
    return {
        label: "উচ্চ ঝুঁকিপূর্ণ",
        color: "bg-red-600",
        textColor: "text-red-600",
        borderColor: "border-red-200",
        bgColor: "bg-red-50",
        icon: "report_problem"
    };
};

const TrustScoreBadge = ({
    score,
    breakdown = {
        feeTransparency: 0,
        recentChanges: 0,
        userReports: 0,
        regulatoryCompliance: 0
    },
    compact = false,
    className,
    showLabel = true
}: TrustScoreProps) => {
    const config = getTrustLevelConfig(score);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className={cn(
                    "flex items-center gap-2 rounded-full border transition-all hover:opacity-90 active:scale-95",
                    config.borderColor,
                    config.bgColor,
                    compact ? "px-2 py-1" : "px-3 py-1.5",
                    className
                )}>
                    <div className="flex items-center gap-1.5">
                        <span className={cn("font-black flex items-center gap-1", config.textColor, compact ? "text-xs" : "text-sm")}>
                            <MaterialIcon name={config.icon} className={compact ? "text-sm" : "text-base"} />
                            Trust Score: {score}/100
                        </span>
                    </div>
                    {showLabel && !compact && (
                        <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full bg-white bg-opacity-60",
                            config.textColor
                        )}>
                            {config.label}
                        </span>
                    )}
                    <MaterialIcon name="expand_more" className={cn("text-muted-foreground", compact ? "text-sm" : "text-base")} />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 overflow-hidden shadow-xl" align="start">
                <div className={cn("p-4 border-b flex items-center justify-between", config.bgColor)}>
                    <div>
                        <h4 className={cn("font-bold text-lg flex items-center gap-2", config.textColor)}>
                            <MaterialIcon name="shield" />
                            Trust Score
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium mt-1">
                            BankBujhi নিরপেক্ষ রেটিং সিস্টেম
                        </p>
                    </div>
                    <div className={cn("text-2xl font-black", config.textColor)}>
                        {score}
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-muted-foreground">ফি স্বচ্ছতা</span>
                                <span className="font-bold">{breakdown.feeTransparency}%</span>
                            </div>
                            <Progress value={breakdown.feeTransparency} className="h-2" />
                            <p className="text-[10px] text-muted-foreground">সব ফি স্পষ্টভাবে উল্লেখ আছে কিনা</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-muted-foreground">সাম্প্রতিক পরিবর্তন</span>
                                <span className="font-bold">{breakdown.recentChanges}%</span>
                            </div>
                            <Progress value={breakdown.recentChanges} className="h-2" />
                            <p className="text-[10px] text-muted-foreground">গত ৬ মাসে ফি বাড়ানো হয়েছে কিনা</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-muted-foreground">ব্যবহারকারী রিপোর্ট</span>
                                <span className="font-bold">{breakdown.userReports}%</span>
                            </div>
                            <Progress value={breakdown.userReports} className="h-2" />
                            <p className="text-[10px] text-muted-foreground">গ্রাহক অভিযোগ এবং সমাধান হার</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-muted-foreground">নিয়ন্ত্রক সম্মতি</span>
                                <span className="font-bold text-green-600">{breakdown.regulatoryCompliance}%</span>
                            </div>
                            <Progress value={breakdown.regulatoryCompliance} className="h-2 bg-green-100" indicatorClassName="bg-green-600" />
                            <p className="text-[10px] text-muted-foreground">বাংলাদেশ ব্যাংকের নিয়ম মানা হচ্ছে</p>
                        </div>
                    </div>

                    <div className="pt-2 border-t mt-2">
                        <p className="text-xs text-center text-muted-foreground">
                            সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TrustScoreBadge;
