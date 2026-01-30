import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import SEOHead from "@/components/seo/SEOHead";
import { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Input } from "@/components/ui/input";

const glossary = [
    {
        bengali: "এফডিআর",
        english: "FDR (Fixed Deposit Receipt)",
        definition: "নির্দিষ্ট সময়ের জন্য টাকা জমা রাখার স্কিম, যেখানে মেয়াদ শেষে মুনাফা পাওয়া যায়।"
    },
    {
        bengali: "ডিপিএস",
        english: "DPS (Deposit Pension Scheme)",
        definition: "মাসিক কিস্তিতে সঞ্চয় করার পরিকল্পনা, যা নির্দিষ্ট সময় পর মুনাফাসহ ফেরত পাওয়া যায়।"
    },
    {
        bengali: "ক্যাশব্যাক",
        english: "Cashback",
        definition: "কার্ড বা ডিজিটাল পেমেন্টে কেনাকাটার পর খরচের একটি নির্দিষ্ট অংশ ফেরত পাওয়া।"
    },
    {
        bengali: "ইএমআই",
        english: "EMI (Equated Monthly Installment)",
        definition: "কোনো পণ্য কিনে বা লোন নিয়ে প্রতি মাসে সমান কিস্তিতে পরিশোধ করার প্রক্রিয়া।"
    },
    {
        bengali: "ক্রেডিট স্কোর",
        english: "Credit Score",
        definition: "ঋণ বা ক্রেডিট কার্ড পাওয়ার যোগ্যতা নির্ধারণকারী একটি সংখ্যা, যা গ্রাহকের অতীত লেনদেনের ওপর ভিত্তি করে তৈরি হয়।"
    },
    {
        bengali: "এনুয়াল ফি",
        english: "Annual Fee",
        definition: "ক্রেডিট কার্ড ব্যবহারের জন্য ব্যাংককে বাৎসরিক যে ফি দিতে হয়।"
    },
    {
        bengali: "ইন্টারেস্ট রেট",
        english: "Interest Rate",
        definition: "ঋণ বা জমার ওপর শতকরা হারে কত টাকা সুদ দিতে বা পাওয়া যাবে তার হার।"
    },
    {
        bengali: "মর্টগেজ",
        english: "Mortgage",
        definition: "জমি বা বাড়ি বন্ধক রেখে ব্যাংক থেকে ঋণ নেওয়ার প্রক্রিয়া।"
    },
    {
        bengali: "ওভারড্রাফট",
        english: "Overdraft",
        definition: "অ্যাকাউন্টে জমানো টাকার চেয়ে বেশি টাকা তোলার সুবিধা (সাধারণত চলতি হিসাবে প্রযোজ্য)।"
    },
    {
        bengali: "কেওয়াইসি",
        english: "KYC (Know Your Customer)",
        definition: "গ্রাহকের পরিচয় যাচাই করার প্রক্রিয়া (যেমন এনআইডি, ছবি, ঠিকানা যাচাই)।"
    },
    {
        bengali: "routing number",
        english: "Routing Number",
        definition: "নয় সংখ্যার একটি কোড যা নির্দিষ্ট ব্যাংক এবং শাখাকে চিহ্নিত করতে ব্যবহৃত হয়।"
    },
    {
        bengali: "SWIFT কোড",
        english: "SWIFT Code",
        definition: "আন্তর্জাতিক লেনদেনের জন্য ব্যবহৃত ব্যাংকের পরিচিতি কোড।"
    }
];

const Glossary = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredGlossary = glossary.filter(item =>
        item.bengali.includes(searchTerm) ||
        item.english.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <SEOHead
                title="আর্থিক শব্দকোষ (Glossary) - BankBujhi"
                description="ব্যাংকিং ও ফাইন্যান্সের কঠিন শব্দগুলোর সহজ বাংলা অর্থ ও ব্যাখ্যা জানুন।"
                path="/glossary"
            />
            <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-muted/10">
                <Header />

                <main className="flex-1 container-padding py-8 md:py-12 pb-20 md:pb-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                                শব্দকোষ
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black text-foreground mt-4 mb-4">
                                আর্থিক পরিভাষা
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                ব্যাংকিং জগতের কঠিন শব্দগুলো সহজ বাংলায় বুঝুন
                            </p>

                            <div className="mt-8 relative max-w-md mx-auto">
                                <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="শব্দ খুঁজুন (যেমন: EMI, FDR)..."
                                    className="pl-10 bg-card"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {filteredGlossary.length > 0 ? (
                                filteredGlossary.map((item, index) => (
                                    <div key={index} className="bg-card rounded-xl border border-primary/10 p-5 hover:border-primary/30 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                                            <h3 className="text-xl font-bold text-primary">{item.bengali}</h3>
                                            <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                                {item.english}
                                            </span>
                                        </div>
                                        <p className="text-foreground/90 leading-relaxed">
                                            {item.definition}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-muted-foreground">
                                    কোনো শব্দ পাওয়া যায়নি
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default Glossary;
