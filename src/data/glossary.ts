export interface GlossaryTerm {
    id: string;
    term: string;
    termEn: string; // English term for searching
    definition: string;
    example: string;
    category: 'banking' | 'cards' | 'loans' | 'investing' | 'general';
}

export const glossaryTerms: GlossaryTerm[] = [
    {
        id: 'apr',
        term: 'এপিআর (APR)',
        termEn: 'APR Annual Percentage Rate',
        definition: 'আপনার ঋণের ওপর বাৎসরিক কত শতাংশ সুদ এবং ফি দিতে হবে তার সঠিক হিসাব। শুধুমাত্র সুদের হার নয়, এর সাথে প্রসেসিং ফি এবং অন্যান্য চার্জও যুক্ত থাকে।',
        example: 'যদি কোনো লোনের সুদের হার ১০% হয় কিন্তু এপিআর ১২% হয়, তার মানে বাকি ২% হলো বিভিন্ন ফি বাবদ খরচ।',
        category: 'loans'
    },
    {
        id: 'credit-score',
        term: 'ক্রেডিট স্কোর (CIB Score)',
        termEn: 'Credit Score CIB',
        definition: 'আপনার ঋণ পরিশোধের ইতিহাসের ওপর ভিত্তি করে দেওয়া একটি নম্বর। এটি ব্যাংককে জানায় আপনি কতটা বিশ্বস্ত ঋণগ্রহীতা।',
        example: 'আপনার স্কোর ৭৫০+ হলে আপনি সহজে এবং কম সুদে লোন পেতে পারেন।',
        category: 'general'
    },
    {
        id: 'emi',
        term: 'ইএমআই (EMI)',
        termEn: 'EMI Equated Monthly Installment',
        definition: 'প্রতি মাসে নির্দিষ্ট পরিমাণ টাকা যা আপনাকে লোন পরিশোধের জন্য দিতে হয়। এতে আসল এবং সুদ দুই-ই অন্তর্ভুক্ত থাকে।',
        example: '১ লাখ টাকা লোন নিলে প্রতি মাসে যদি ৮,০০০ টাকা করে ১২ মাস দিতে হয়, তবে এই ৮,০০০ টাকাই হলো ইএমআই।',
        category: 'loans'
    },
    {
        id: 'fdr',
        term: 'এফডিআর (FDR)',
        termEn: 'FDR Fixed Deposit Receipt',
        definition: 'নির্দিষ্ট সময়ের জন্য ব্যাংকে টাকা জমা রাখা, যার বিনিময়ে ব্যাংক আপনাকে নির্দিষ্ট হারে মুনাফা দেয়। মেয়াদের আগে টাকা তুললে মুনাফা কম পাওয়া যায়।',
        example: '১ লাখ টাকা ১ বছরের জন্য জমা রাখলেন ১০% সুদে। ১ বছর পর ১ লাখ ১০ হাজার টাকা পাবেন।',
        category: 'investing'
    },
    {
        id: 'compound-interest',
        term: 'চক্রবৃদ্ধি সুদ (Compound Interest)',
        termEn: 'Compound Interest',
        definition: 'আসলের ওপর সুদ, এবং সেই সুদের ওপর আবার সুদ—এভাবেই চক্রবৃদ্ধি সুদ কাজ করে। দীর্ঘমেয়াদে এটি আপনার সঞ্চয় অনেক বাড়িয়ে দিতে পারে, আবার ঋণের ক্ষেত্রে ঋণের বোঝা বাড়িয়ে দিতে পারে।',
        example: '১০,০০০ টাকা ১০% চক্রবৃদ্ধি সুদে রাখলে ২য় বছরে আপনি ১১,০০০ টাকার ওপর সুদ পাবেন, শুধু ১০,০০০ টাকার ওপর নয়।',
        category: 'general'
    },
    {
        id: 'collateral',
        term: 'জামানত (Collateral)',
        termEn: 'Collateral Security',
        definition: 'লোন নেওয়ার সময় ব্যাংকের কাছে যে সম্পত্তি (যেমন জমি, সোনা, এফডিআর) বন্ধক রাখা হয়। লোন শোধ না করলে ব্যাংক এটি বিক্রি করে টাকা আদায় করতে পারে।',
        example: 'হোম লোন নেওয়ার সময় আপনার কেনা বাড়িটিই ব্যাংকের কাছে জামানত হিসেবে থাকে।',
        category: 'loans'
    },
    {
        id: 'grace-period',
        term: 'গ্রেস পিরিয়ড (Grace Period)',
        termEn: 'Grace Period',
        definition: 'ক্রেডিট কার্ড দিয়ে কেনাকাটা করার পর থেকে বিল পরিশোধের শেষ তারিখ পর্যন্ত সময়কাল, যার জন্য কোনো সুদ দিতে হয় না। সাধারণত এটি ৪৫ দিন পর্যন্ত হতে পারে।',
        example: '১ তারিখে কেনাকাটা করলে এবং বিলের শেষ তারিখ ৪৫ দিন পরে হলে, এই সময়ে কোনো সুদ লাগবে না।',
        category: 'cards'
    },
    {
        id: 'minimum-due',
        term: 'মিনিমাম ডিউ (Minimum Due)',
        termEn: 'Minimum Due Payment',
        definition: 'ক্রেডিট কার্ড বিলের ন্যূনতম অংশ যা পরিশোধ করলে আপনাকে ডিফল্টার করা হবে না, তবে বাকি টাকার ওপর সুদ চার্জ করা হবে।',
        example: '২০,০০০ টাকা বিলে যদি ৫০০ টাকা মিনিমাম ডিউ দেন, তবে বাকি ১৯,৫০০ টাকার ওপর চড়া সুদ গুণতে হবে।',
        category: 'cards'
    },
    {
        id: 'inflation',
        term: 'মুদ্রাস্ফীতি (Inflation)',
        termEn: 'Inflation',
        definition: 'সময়ের সাথে সাথে জিনিসপত্রের দাম বেড়ে যাওয়া এবং টাকার মান কমে যাওয়া।',
        example: 'আজ যে জিনিস ১০০ টাকায় পাচ্ছেন, ১ বছর পর তা কিনতে ১০৮ টাকা লাগলে মুদ্রাস্ফীতি ৮%।',
        category: 'general'
    },
    {
        id: 'kyc',
        term: 'কেওয়াইসি (KYC)',
        termEn: 'KYC Know Your Customer',
        definition: 'ব্যাংক হিসাব বা লোন নেওয়ার সময় গ্রাহকের পরিচয় নিশ্চিত করার প্রক্রিয়া (যেমন এনআইডি, ছবি, ঠিকানা যাচাই)।',
        example: 'ব্যাংকে অ্যাকাউন্ট খুলতে গেলে এনআইডি জমা দেওয়া কেওয়াইসি প্রক্রিয়ার অংশ।',
        category: 'banking'
    },
    {
        id: 'annual-fee',
        term: 'বার্ষিক ফি (Annual Fee)',
        termEn: 'Annual Fee',
        definition: 'ক্রেডিট কার্ড ব্যবহারের জন্য ব্যাংককে বছরে একবার যে চার্জ দিতে হয়। অনেক কার্ডে ১৮-২০টি লেনদেন করলে এটি মওকুফ (Waived) করা হয়।',
        example: 'আপনার কার্ডের ফি ২,০০০ টাকা, কিন্তু বছরে ১৮টি লেনদেন করলে ব্যাংক তা ফেরত দেয়।',
        category: 'cards'
    },
    {
        id: 'dual-currency',
        term: 'ডুয়াল কারেন্সি (Dual Currency)',
        termEn: 'Dual Currency',
        definition: 'যে কার্ড দিয়ে দেশীয় মুদ্রার (টাকা) পাশাপাশি বৈদেশিক মুদ্রা (যেমন ডলার) খরচ করা যায়। এর জন্য পাসপোর্টে ডলার এন্ডোর্সমেন্ট থাকা বাধ্যতামূলক।',
        example: 'বিদেশে গেলে বা বিদেশি ওয়েবসাইট থেকে কিছু কিনতে এই সুবিধা লাগে।',
        category: 'cards'
    },
    {
        id: 'endorsement',
        term: 'এন্ডোর্সমেন্ট (Endorsement)',
        termEn: 'Passport Endorsement',
        definition: 'বিদেশে ব্যবহারের জন্য পাসপোর্টে ব্যাংক কর্তৃক নির্দিষ্ট পরিমাণ ডলার ব্যবহারের অনুমতি সিল। বর্তমানে বছরে সর্বোচ্চ ১২,০০০ ডলার খরচ করা যায়।',
        example: 'পাসপোর্টে ব্যাংকের সিল ছাড়া ডলার খরচ করা যায় না।',
        category: 'banking'
    },
    {
        id: 'excise-duty',
        term: 'আবগারি শুল্ক (Excise Duty)',
        termEn: 'Excise Duty Tax',
        definition: 'ব্যাংক একাউন্টে নির্দিষ্ট পরিমাণ (যেমন ১ লাখ বা ৫ লাখ) টাকার বেশি স্থিতি থাকলে সরকার কর্তৃক বছরে একবার কর্তনকৃত কর।',
        example: 'বছরের কোনো সময়ে একাউন্টে ১ লাখ টাকা থাকলে ১৫০ টাকা আবগারি শুল্ক কাটা হয়।',
        category: 'banking'
    },
    {
        id: 'tin',
        term: 'টিন (TIN/eTIN)',
        termEn: 'TIN Tax Identification Number',
        definition: 'Tax Identification Number। করদাতা শনাক্তকরণ নম্বর। ৫ লাখ টাকার বেশি সঞ্চয়পত্র কেনা বা ক্রেডিট কার্ড নেওয়ার জন্য এটি বাধ্যতামূলক।',
        example: 'ক্রেডিট কার্ড পেতে হলে এখন রিটার্ন জমার প্রমাণপত্র (PSR) লাগে।',
        category: 'general'
    },
    {
        id: 'dps',
        term: 'ডিপিএস (DPS)',
        termEn: 'DPS Deposit Pension Scheme',
        definition: 'Deposit Pension Scheme। প্রতি মাসে নির্দিষ্ট পরিমাণ টাকা জমা করে মেয়াদ শেষে মুনাফাসহ ফেরত পাওয়ার স্কিম।',
        example: 'প্রতি মাসে ৩,০০০ টাকা করে ৫ বছর জমালে মেয়াদ শেষে ২.৫ লাখ টাকা পাবেন।',
        category: 'investing'
    },
    {
        id: 'cbs',
        term: 'সিবিএস (Core Banking)',
        termEn: 'CBS Core Banking Solution',
        definition: 'এক শাখার একাউন্ট দিয়ে অন্য যেকোনো শাখা থেকে লেনদেন করার সুবিধা।',
        example: 'আপনার একাউন্ট ঢাকায় হলেও আপনি চট্টগ্রাম শাখা থেকে টাকা তুলতে পারবেন।',
        category: 'banking'
    },
    {
        id: 'contactless',
        term: 'কন্ট্যাক্টলেস (Contactless/NFC)',
        termEn: 'NFC Contactless Payment',
        definition: 'কার্ড মেশিনে না ঢুকিয়ে শুধু স্পর্শ করে পেমেন্ট করার প্রযুক্তি। এটি দ্রুত এবং ৫০০০ টাকা পর্যন্ত পিন ছাড়া পেমেন্ট করা যায়।',
        example: 'সুপারশপে কার্ড মেশিনে ট্যাপ করলেই পেমেন্ট হয়ে যায়।',
        category: 'cards'
    },
    {
        id: 'lounge',
        term: 'লাউঞ্জ সুবিধা (Lounge Access)',
        termEn: 'Airport Lounge Access',
        definition: 'বিমানবন্দরে যাত্রীদের বিশ্রামের জন্য বিশেষ কক্ষ। প্রিমিয়াম কার্ডধারীরা বিনামূল্যে বলাকা বা আন্তর্জাতিক লাউঞ্জে খাবার ও বিশ্রামের সুবিধা পান।',
        example: 'ফ্লাইটের আগে বলাকা লাউঞ্জে ফ্রি বুফে খেতে পারবেন।',
        category: 'cards'
    },
    {
        id: 'supplementary',
        term: 'সাপ্লিমেন্টারি কার্ড (Supplementary Card)',
        termEn: 'Supplementary Card Add-on',
        definition: 'মূল কার্ডধারীর লিমিট ব্যবহার করে পরিবারের অন্য সদস্যদের জন্য ইস্যু করা অতিরিক্ত কার্ড। সাধারণত প্রথম ১-২টি ফ্রি থাকে।',
        example: 'আপনি আপনার স্ত্রীর জন্য একটি সাপ্লিমেন্টারি কার্ড নিতে পারেন।',
        category: 'cards'
    },
    {
        id: 'routing',
        term: 'রাউটিং নাম্বার (Routing Number)',
        termEn: 'Routing Number',
        definition: '৯ সংখ্যার একটি কোড যা নির্দিষ্ট ব্যাংক ও শাখাকে নির্দেশ করে। এক ব্যাংক থেকে অন্য ব্যাংকে টাকা পাঠাতে (EFT/BEFTN) এটি লাগে।',
        example: 'চেক বইয়ের পাতায় রাউটিং নাম্বার লেখা থাকে।',
        category: 'banking'
    },
    {
        id: 'beftn',
        term: 'বিএফটিএন (BEFTN)',
        termEn: 'BEFTN Electronic Funds Transfer',
        definition: 'এক ব্যাংকের একাউন্ট থেকে অন্য ব্যাংকে ইলেকট্রনিক উপায়ে টাকা পাঠানোর মাধ্যম। সময় লাগে ১-২ দিন।',
        example: 'স্যালারি সাধারণত BEFTN এর মাধ্যমে একাউন্টে আসে।',
        category: 'banking'
    },
    {
        id: 'rtgs',
        term: 'আরটিজিএস (RTGS)',
        termEn: 'RTGS Real Time Gross Settlement',
        definition: 'বড় অংকের টাকা (১ লাখ বা তার বেশি) তাৎক্ষণিকভাবে অন্য ব্যাংকে পাঠানোর ব্যবস্থা।',
        example: 'জমি রেজিস্ট্রেশনের টাকা বা ব্যবসায়িক পেমেন্ট দ্রুত পাঠাতে এটি ব্যবহার হয়।',
        category: 'banking'
    },
    {
        id: 'pos',
        term: 'পস মেশিন (POS Terminal)',
        termEn: 'POS Point of Sale',
        definition: 'দোকানে কার্ড সোয়াইপ বা ট্যাপ করার মেশিন (Point of Sale)।',
        example: 'শপিং শেষে কাউন্টারে যে মেশিনে কার্ড দেন, সেটিই POS।',
        category: 'banking'
    },
    {
        id: 'agent',
        term: 'এজেন্ট ব্যাংকিং (Agent Banking)',
        termEn: 'Agent Banking',
        definition: 'শাখা নেই এমন এলাকায় এজন্টের মাধ্যমে ব্যাংকিং সেবা পৌঁছে দেয়া।',
        example: 'গ্রামের বাজারে ব্যাংকের বুথ যেখানে টাকা জমা ও তোলা যায়।',
        category: 'banking'
    },
    {
        id: 'green-pin',
        term: 'গ্রিন পিন (Green PIN)',
        termEn: 'Green PIN',
        definition: 'কাগজের পিন-এর বদলে এসএমএস বা এটিএম দিয়ে নিজেই পিন সেট করার পরিবেশবান্ধব ব্যবস্থা।',
        example: 'নতুন কার্ড পেলে ফোনেই পিন সেট করে নিতে পারেন।',
        category: 'cards'
    }
];
