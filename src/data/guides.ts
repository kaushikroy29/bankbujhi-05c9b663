export interface Article {
    id: string;
    title: string;
    titleEn?: string;
    category: string;
    date?: string;
    readTime: string;
    image?: string;
    excerpt?: string;
    content?: string; // Markdown or HTML content
    isFeatured?: boolean;
}

export const articles: Article[] = [
    // From Guides.tsx
    {
        id: "credit-card-basics",
        title: "ক্রেডিট কার্ড কী এবং কীভাবে কাজ করে?",
        titleEn: "What is a credit card?",
        category: "শুরু করুন",
        date: "জানুয়ারি ২০২৫",
        readTime: "৫ মিনিট",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
        excerpt: "ক্রেডিট কার্ড কী, এটা কীভাবে কাজ করে এবং আপনার জন্য উপযুক্ত কিনা—সহজ বাংলায় জানুন।",
        content: `
      <h2>ক্রেডিট কার্ড কী?</h2>
      <p>ক্রেডিট কার্ড হলো ব্যাংক বা আর্থিক প্রতিষ্ঠান কর্তৃক ইস্যু করা একটি পেমেন্ট কার্ড, যা আপনাকে বাকিতে কেনাকাটা করার সুবিধা দেয়। এটি মূলত একটি স্বল্পমেয়াদী ঋণ।</p>
      
      <h3>কীভাবে কাজ করে?</h3>
      <p>যখন আপনি ক্রেডিট কার্ড দিয়ে কিছু কেনেন, ব্যাংক আপনার হয়ে বিক্রেতাকে টাকা পরিশোধ করে। মাস শেষে ব্যাংক আপনাকে একটি বিল পাঠায়। নির্দিষ্ট তারিখের মধ্যে বিল পরিশোধ করলে কোনো সুদ দিতে হয় না।</p>
      
      <h3>প্রধান সুবিধাসমূহ:</h3>
      <ul>
        <li>১. বাকিতে কেনাকাটা (৪৫ দিন পর্যন্ত সুদহীন)</li>
        <li>২. ইএমআই (EMI) সুবিধা</li>
        <li>৩. রিওয়ার্ড পয়েন্ট এবং ক্যাশব্যাক</li>
        <li>৪. ডিসকাউন্ট অফার</li>
      </ul>
    `
    },
    {
        id: "interest-rates-explained",
        title: "সুদ কীভাবে কাজ করে? (APR বোঝা)",
        titleEn: "Understanding interest rates",
        category: "শুরু করুন",
        date: "জানুয়ারি ২০২৫",
        readTime: "৭ মিনিট",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
        excerpt: "ক্রেডিট কার্ডে সুদ কীভাবে গণনা হয়, কবে চার্জ হয় এবং কীভাবে এড়ানো যায়।",
        content: \`
        <h2>ইন্টারেস্ট বা সুদ কী?</h2>
        <p>ক্রেডিট কার্ডের সুদ (Interest) হলো সেই ফি যা আপনাকে ব্যাংককে দিতে হয় যখন আপনি নির্ধারিত সময়ের মধ্যে বিল পরিশোধ করেন না। এটিকে এপিআর (APR) বা বার্ষিক শতাংশ হারও বলা হয়।</p>

        <h3>কখন সুদ চার্জ করা হয়?</h3>
        <p>সাধারণত দুটি ক্ষেত্রে সুদ প্রযুক্ত হয়:</p>
        <ul>
            <li>১. <strong>বিল দেরিতে দিলে:</strong> শেষ তারিখের মধ্যে পুরো বিল পরিশোধ না করলে।</li>
            <li>২. <strong>নগদ উত্তোলন করলে:</strong> এটিএম থেকে ক্রেডিট কার্ড দিয়ে টাকা তুললে প্রথম দিন থেকেই সুদ গণনা শুরু হয়।</li>
        </ul>

        <h3>কীভাবে সুদ এড়াবেন?</h3>
        <p>সবচেয়ে সহজ উপায় হলো প্রতি মাসে "টোটাল ডিউ" (Total Due) তারিখের আগেই পরিশোধ করা। শুধু "মিনিমাম ডিউ" দিলে বাকি টাকার ওপর সুদ দিতে হবে।</p>
        \`
    },
    {
        id: "minimum-payment-trap",
        title: "মিনিমাম পেমেন্টের ফাঁদ",
        titleEn: "The minimum payment trap",
        category: "টিপস",
        date: "জানুয়ারি ২০২৫",
        readTime: "৬ মিনিট",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
        excerpt: "শুধু মিনিমাম পেমেন্ট দিলে কী হয়? কেন এটা আপনার জন্য ক্ষতিকর এবং কীভাবে এড়াবেন।",
        content: \`
        <h2>মিনিমাম পেমেন্ট কী?</h2>
        <p>আপনার মাসিক বিলের একটি খুব ছোট অংশ (সাধারণত ২-৫%) ব্যাংক আপনাকে পরিশোধ করার অপশন দেয়, যাতে আপনি ডিফল্টার না হন। একে মিনিমাম পেমেন্ট বলে।</p>

        <h3>কেন এটি একটি ফাঁদ?</h3>
        <p>যখন আপনি শুধু মিনিমাম পেমেন্ট দেন, তখন:</p>
        <ol>
            <li>বাকি টাকার ওপর উচ্চ হারে (২০-২৭%) সুদ যুক্ত হতে থাকে।</li>
            <li>আপনার ঋণ পরিশোধ করতে বছরের পর বছর লেগে যেতে পারে।</li>
            <li>শেষ পর্যন্ত আপনি আসল ঋণের দ্বিগুণ বা তিনগুণ টাকা ব্যাংককে দিয়ে ফেলেন।</li>
        </ol>

        <div class="bg-red-50 p-4 rounded-lg my-4 border border-red-100">
            <strong>পরামর্শ:</strong> সর্বদা চেষ্টা করুন পুরো বিল পরিশোধ করার। যদি সম্ভব না হয়, তবে মিনিমামের চেয়ে যত বেশি সম্ভব দিন।
        </div>
        \`
    },
    {
        id: "islamic-credit-cards",
        title: "ইসলামিক ক্রেডিট কার্ড কি হালাল?",
        titleEn: "Are Islamic credit cards halal?",
        category: "ইসলামিক ব্যাংকিং",
        date: "জানুয়ারি ২০২৫",
        readTime: "৮ মিনিট",
        image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=250&fit=crop",
        excerpt: "ইসলামিক ক্রেডিট কার্ড কীভাবে কাজ করে, প্রচলিত কার্ডের সাথে পার্থক্য কী এবং শরীয়াহ সম্মত কিনা।",
        content: \`
        <h2>উজরাহ (Ujrah) ভিত্তিক কার্ড</h2>
        <p>বেশিরভাগ ইসলামিক ব্যাংক 'উজরাহ' বা সেবার বিনিময়ে ফি মডেলে কাজ করে। এখানে ব্যাংক আপনাকে ঋণ দিয়ে সুদ নেয় না, বরং কার্ড ব্যবহারের সুযোগ দেয়ার জন্য একটি নির্দিষ্ট ফি নেয়।</p>

        <h3>প্রচলিত কার্ডের সাথে পার্থক্য</h3>
        <table class="w-full border-collapse border border-gray-200 my-4 text-sm">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border border-gray-200 p-2">বৈশিষ্ট্য</th>
                    <th class="border border-gray-200 p-2">প্রচলিত কার্ড</th>
                    <th class="border border-gray-200 p-2">ইসলামিক কার্ড</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border border-gray-200 p-2">আয়</td>
                    <td class="border border-gray-200 p-2">সুদ (Interest)</td>
                    <td class="border border-gray-200 p-2">ফি / চার্জ</td>
                </tr>
                <tr>
                    <td class="border border-gray-200 p-2">দেরিতে ফি</td>
                    <td class="border border-gray-200 p-2">ব্যাংকের আয়</td>
                    <td class="border border-gray-200 p-2">দাতব্য (Charity) ফান্ডে যায়</td>
                </tr>
            </tbody>
        </table>

        <p>ইসলামিক কার্ডে হারাম পণ্য (যেমন মদ, জুয়া) কেনাকাটা নিষিদ্ধ থাকে এবং অনেক ব্যাংক দেরিতে পরিশোধের ফি নিজেরা না নিয়ে চ্যারিটিতে দান করে দেয়।</p>
        \`
    },
    {
        id: "choosing-first-card",
        title: "প্রথম ক্রেডিট কার্ড: কোনটা বাছবেন?",
        titleEn: "Choosing your first credit card",
        category: "শুরু করুন",
        date: "জানুয়ারি ২০২৫",
        readTime: "৫ মিনিট",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
        excerpt: "নতুনদের জন্য কোন ধরনের কার্ড ভালো, কী দেখে বাছবেন এবং কোন ভুলগুলো এড়াবেন।",
        content: "Content coming soon..."
    },
    {
        id: "cib-report",
        title: "CIB রিপোর্ট কী? কেন গুরুত্বপূর্ণ?",
        titleEn: "Understanding CIB reports",
        category: "ক্রেডিট স্কোর",
        date: "জানুয়ারি ২০২৫",
        readTime: "৬ মিনিট",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
        excerpt: "বাংলাদেশে ক্রেডিট রিপোর্ট কীভাবে কাজ করে এবং লোন বা কার্ড পেতে এর ভূমিকা কী।",
        content: "Content coming soon..."
    },

    // From FinancialTips.tsx (converted to flat structure)
    {
        id: "build-credit-history-bd",
        title: "বাংলাদেশে ক্রেডিট ইতিহাস তৈরির পূর্ণাঙ্গ গাইড",
        category: "ক্রেডিট স্কোর",
        readTime: "১২ মিনিট",
        excerpt: "লোন এবং কার্ড দ্রুত অনুমোদনের জন্য একটি ভালো ক্রেডিট স্কোর তৈরি এবং বজায় রাখার বিষয়ে আপনার যা জানা প্রয়োজন সব কিছু।",
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1554224155-9c100647818f?w=400&h=250&fit=crop", // Added placeholder
        content: "Content coming soon..."
    },
    {
        id: "first-card-selection-bd",
        title: "বাংলাদেশে আপনার প্রথম ক্রেডিট কার্ড কীভাবে বেছে নেবেন",
        category: "ক্রেডিট কার্ড",
        readTime: "৫ মিনিট",
        excerpt: "প্রথমবার কার্ড নেওয়ার সময় যে বিষয়গুলো খেয়াল রাখা জরুরি।",
        content: "Content coming soon..."
    },
    {
        id: "maximize-cashback",
        title: "ক্যাশব্যাক রিওয়ার্ড বাড়ান: একটি পূর্ণাঙ্গ গাইড",
        category: "ক্রেডিট কার্ড",
        readTime: "৬ মিনিট",
        excerpt: "সঠিক কার্ড ব্যবহার করে কীভাবে সর্বোচ্চ ক্যাশব্যাক পাবেন।",
        content: "Content coming soon..."
    },
    {
        id: "best-fdr-rates-2024",
        title: "বাংলাদেশে ২০২৪ সালের সেরা এফডিআর (FDR) রেট",
        category: "সেভিংস ও এফডিআর",
        readTime: "৫ মিনিট",
        excerpt: "বর্তমানে কোন ব্যাংকে এফডিআর রেট সবচেয়ে বেশি?",
        content: "Content coming soon..."
    },
    {
        id: "dps-vs-fdr",
        title: "ডিপিএস বনাম এফডিআর: আপনার জন্য কোনটি ভালো?",
        category: "সেভিংস ও এফডিআর",
        readTime: "৪ মিনিট",
        excerpt: "মাসিক জমা নাকি এককালীন জমা? জেনে নিন আপনার জন্য কোনটি উপযুক্ত।",
        content: "Content coming soon..."
    },
    {
        id: "personal-loan-eligibility",
        title: "পার্সোনাল লোন পাওয়ার যোগ্যতা: ব্যাংকগুলো কী দেখে",
        category: "পার্সোনাল লোন",
        readTime: "৬ মিনিট",
        excerpt: "লোন আবেদনের আগে যে বিষয়গুলো নিশ্চিত করা প্রয়োজন।",
        content: "Content coming soon..."
    },
    {
        id: "50-30-20-rule",
        title: "৫০/৩০/২০ নিয়ম: নতুনদের জন্য সহজ বাজেট পরিকল্পনা",
        category: "বাজেট ব্যবস্থাপনা",
        readTime: "৪ মিনিট",
        excerpt: "আয় ব্যয়ের হিসাব রাখার একটি সহজ এবং কার্যকরী পদ্ধতি।",
        content: "Content coming soon..."
    }
];

export const getArticleById = (id: string) => articles.find(a => a.id === id || String(a.id) === id);
export const getArticlesByCategory = (category: string) => articles.filter(a => a.category === category);
