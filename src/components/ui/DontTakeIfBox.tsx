
import React from 'react';
import { cn } from "@/lib/utils";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface DontTakeIfRule {
    condition: string;
    reason: string;
}

export interface DontTakeIfBoxProps {
    rules: DontTakeIfRule[];
    alternativeLink?: string;
    className?: string;
}

const DontTakeIfBox = ({
    rules,
    alternativeLink = "/quiz",
    className
}: DontTakeIfBoxProps) => {
    if (!rules || rules.length === 0) return null;

    return (
        <div className={cn("border border-red-200 rounded-lg overflow-hidden bg-white shadow-sm", className)}>
            <div className="bg-red-50 px-4 py-3 border-b border-red-100 flex items-center gap-2">
                <MaterialIcon name="cancel" className="text-red-600" filled />
                <h3 className="font-bold text-red-900">এই প্রডাক্ট নেবেন না যদি...</h3>
            </div>

            <div className="p-4 space-y-4">
                {rules.map((rule, index) => (
                    <div key={index} className="flex gap-3 items-start group">
                        <MaterialIcon
                            name="block"
                            className="text-red-400 mt-0.5 group-hover:text-red-600 transition-colors"
                            style={{ fontSize: '20px' }}
                        />
                        <div className="space-y-1">
                            <p className="font-bold text-gray-900 text-sm leading-tight">
                                {rule.condition}
                            </p>
                            <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 mt-1 inline-block">
                                <span className="font-medium text-xs text-gray-400 uppercase tracking-wider mr-1">কারণ:</span>
                                {rule.reason}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 text-center">
                <Button variant="link" asChild className="text-indigo-600 hover:text-indigo-800 p-0 h-auto font-medium">
                    <Link to={alternativeLink} className="flex items-center gap-1">
                        আপনার জন্য উপযুক্ত বিকল্প দেখুন
                        <MaterialIcon name="arrow_forward" className="text-lg" />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default DontTakeIfBox;
