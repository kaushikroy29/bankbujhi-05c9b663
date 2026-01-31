import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/seo/SEOHead";

const terms = [
    {
        term: "Annual Fee (বার্ষিক ফি)",
        definition: "ক্রেডিট কার্ড ব্যবহারের জন্য ব্যাংককে বছরে একবার যে চার্জ দিতে হয়। অনেক কার্ডে ১৮-২০টি লেনদেন করলে এটি মওকুফ (Waived) করা হয়।"
    },
    {
        term: "EMI (কিস্তি)",
        definition: "Equated Monthly Installment। কোনো বড় কেনাকাটার মূল্য একবারে পরিশোধ না করে মাসভিত্তিক ছোট ভাগে (৩-৩৬ মাস) পরিশোধ করার সুবিধা। সাধারণত ০% ইন্টারেস্টে এটি পাওয়া যায়।"
    },
    {
        term: "Dual Currency (ডুয়াল কারেন্সি)",
        definition: "যে কার্ড দিয়ে দেশীয় মুদ্রার (টাকা) পাশাপাশি বৈদেশিক মুদ্রা (যেমন ডলার) খরচ করা যায়। এর জন্য পাসপোর্টে ডলার এন্ডোর্সমেন্ট থাকা বাধ্যতামূলক।"
    },
    {
        term: "Endorsement (এন্ডোর্সমেন্ট)",
        definition: "বিদেশে ব্যবহারের জন্য পাসপোর্টে ব্যাংক কর্তৃক নির্দিষ্ট পরিমাণ ডলার ব্যবহারের অনুমতি সিল। বর্তমানে বছরে সর্বোচ্চ ১২,০০০ ডলার খরচ করা যায় (SAARC এবং Non-SAARC দেশ মিলিয়ে)।"
    },
    {
        term: "CIB Score (সিআইবি রিপোর্ট)",
        definition: "Credit Information Bureau রিপোর্ট। আপনার পূর্ববর্তী ঋণের ইতিহাস। এটি খারাপ হলে বা বকেয়া থাকলে নতুন লোন বা কার্ড পাওয়া যায় না।"
    },
    {
        term: "Excise Duty (আবগারি শুল্ক)",
        definition: "ব্যাংক একাউন্টে নির্দিষ্ট পরিমাণ (যেমন ১ লাখ বা ৫ লাখ) টাকার বেশি স্থিতি থাকলে সরকার কর্তৃক বছরে একবার কর্তনকৃত কর।"
    },
    {
        term: "TIN / ETIN (টিন সার্টিফিকেট)",
        definition: "Tax Identification Number। করদাতা শনাক্তকরণ নম্বর। ৫ লাখ টাকার বেশি সঞ্চয়পত্র কেনা বা ক্রেডিট কার্ড নেওয়ার জন্য এটি বাধ্যতামূলক।"
    },
    {
        term: "FDR (ফিক্সড ডিপোজিট)",
        definition: "Fixed Deposit Receipt। নির্দিষ্ট সময়ের জন্য (যেমন ১ বছর) ব্যাংকে টাকা জমা রাখা, যার বিনিময়ে ব্যাংক নির্দিষ্ট হারে মুনাফা দেয়।"
    },
    {
        term: "DPS (ডিপিএস)",
        definition: "Deposit Pension Scheme। প্রতি মাসে নির্দিষ্ট পরিমাণ টাকা জমা করে মেয়াদ বা সঞ্চয় স্কিম। ৫ বা ১০ বছর মেয়াদী হয়।"
    },
    {
        term: "CBS (কোর ব্যাংকিং)",
        definition: "Core Banking Solution। এক শাখার একাউন্ট দিয়ে অন্য যেকোনো শাখা থেকে লেনদেন করার সুবিধা।"
    },
    {
        term: "NFC / Contactless (কন্ট্যাক্টলেস)",
        definition: "কার্ড মেশিনে না ঢুকিয়ে শুধু স্পর্শ করে পেমেন্ট করার প্রযুক্তি। এটি দ্রুত এবং নিরাপদ।"
    },
    {
        term: "Lounge Access (লাউঞ্জ সুবিধা)",
        definition: "বিমানবন্দরে যাত্রীদের বিশ্রামের জন্য বিশেষ কক্ষ। প্রিমিয়াম কার্ডধারীরা বিনামূল্যে বলাকা বা আন্তর্জাতিক লাউঞ্জে খাবার ও বিশ্রামের সুবিধা পান।"
    },
    {
        term: "Supplementary Card (সাপ্লিমেন্টারি কার্ড)",
        definition: "মূল কার্ডধারীর লিমিট ব্যবহার করে পরিবারের অন্য সদস্যদের জন্য ইস্যু করা অতিরিক্ত কার্ড। সাধারণত প্রথম ১-২টি ফ্রি থাকে।"
    },
    {
        term: "Cheque Book (চেক বই)",
        definition: "ব্যাংক অ্যাকাউন্টের টাকা উত্তোলনের জন্য ব্যবহৃত ছাপানো কাগজের বই। কিছু ক্রেডিট কার্ডের সাথেও চেক বই সুবিধা থাকে, যা দিয়ে 'একাউন্ট পেয়ি' চেক ইস্যু করা যায়।"
    },
    {
        term: "Routing Number (রাউটিং নাম্বার)",
        definition: "৯ সংখ্যার একটি কোড যা নির্দিষ্ট ব্যাংক ও শাখাকে নির্দেশ করে। এক ব্যাংক থেকে অন্য ব্যাংকে টাকা পাঠাতে (EFT/BEFTN) এটি লাগে।"
    },
    {
        term: "BEFTN (বিএফটিএন)",
        definition: "Bangladesh Electronic Funds Transfer Network। এক ব্যাংকের একাউন্ট থেকে অন্য ব্যাংকে ইলেকট্রনিক উপায়ে টাকা পাঠানোর মাধ্যম।"
    },
    {
        term: "RTGS (আরটিজিএস)",
        definition: "Real Time Gross Settlement। বড় অংকের টাকা (১ লাখ বা তার বেশি) তাৎক্ষণিকভাবে অন্য ব্যাংকে পাঠানোর ব্যবস্থা।"
    },
    {
        term: "POS Terminal (পস মেশিন)",
        definition: "দোকানে কার্ড সোয়াইপ বা ট্যাপ করার মেশিন (Point of Sale)।"
    },
    {
        term: "Charge Card (চার্জ কার্ড)",
        definition: "যে কার্ডে কোনো নির্দিষ্ট ক্রেডিট লিমিট থাকে না, তবে মাস শেষে পুরো বিল পরিশোধ করতে হয়। এতে কিস্তি সুবিধা থাকে না (যেমন: সাধারণ অ্যামেক্স কার্ড)।"
    },
    {
        term: "MFS (মোবাইল ব্যাংকিং)",
        definition: "Mobile Financial Services। যেমন বিকাশ, নগদ, রকেট। মোবাইল ফোনের মাধ্যমে অর্থ লেনদেন সেবা।"
    },
    {
        term: "Agent Banking (এজেন্ট ব্যাংকিং)",
        definition: "শাখা নেই এমন এলাকায় এজন্টের মাধ্যমে ব্যাংকিং সেবা পৌঁছে দেয়া।"
    },
    {
        term: "Green PIN (গ্রিন পিন)",
        definition: "কাগজের পিন-এর বদলে এসএমএস বা এটিএম দিয়ে নিজেই পিন সেট করার পরিবেশবান্ধব ব্যবস্থা।"
    }
];

const Glossary = () => {
    return (
        <>
            <SEOHead
                title="ব্যাংকিং শব্দকোষ | BankBujhi Glossary"
                description="ব্যাংকিং ও ফাইন্যান্সের কঠিন শব্দগুলোর সহজ বাংলা অর্থ জানুন।"
                path="/glossary"
            />
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-4xl mx-auto w-full">
                    <PageBreadcrumb items={[{ label: "শব্দকোষ" }]} className="mb-6" />

                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black mb-3">ব্যাংকিং শব্দকোষ</h1>
                        <p className="text-muted-foreground">
                            ব্যাংকিং জগতের কঠিন শব্দগুলোর সহজ বাংলা ব্যাখ্যা।
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <Accordion type="single" collapsible className="w-full">
                            {terms.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border border-primary/10 rounded-xl mb-3 px-4 bg-card">
                                    <AccordionTrigger className="text-left font-bold text-lg py-4 hover:no-underline hover:text-primary transition-colors">
                                        {item.term}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-4">
                                        {item.definition}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Glossary;
