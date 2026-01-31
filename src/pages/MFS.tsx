import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SEOHead from "@/components/seo/SEOHead";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SocialShare from "@/components/ui/SocialShare";

const mfsProviders = [
    {
        name: "bkash",
        displayName: "bKash",
        logoColor: "bg-[#E2136E]",
        services: ["Send Money", "Cash Out", "Mobile Recharge", "Bill Payment", "Merchant Pay", "Add Money"],
        cashout_charge: "১.৮৫% (অ্যাপ)",
        send_money: "ফ্রি (৫টি প্রিয় নাম্বারে)",
        limit: "৳২৫,০০০ (দৈনিক)",
        features: ["সেভিংস স্কিম", "লোন সুবিধা", "পে-লেটার"]
    },
    {
        name: "nagad",
        displayName: "Nagad",
        logoColor: "bg-[#F7941D]",
        services: ["Send Money", "Cash Out", "Bill Payment", "Islamic Wallet"],
        cashout_charge: "১.১৪% (অ্যাপ - ভ্যাট সহ)",
        send_money: "ফ্রি",
        limit: "৳২৫,০০০ (দৈনিক)",
        features: ["ইসলামিক একাউন্ট", "মুনাফা সুবিধা"]
    },
    {
        name: "rocket",
        displayName: "Rocket",
        logoColor: "bg-[#8C298F]",
        services: ["Cash Out", "Bill Pay", "Salary", "Remittance"],
        cashout_charge: "১.৮% (এটিএম)",
        send_money: "চার্জ প্রযোজ্য",
        limit: "৳২৫,০০০ (দৈনিক)",
        features: ["DBBL এটিএম সুবিধা", "ব্যাপক নেটওয়ার্ক"]
    },
    {
        name: "upay",
        displayName: "Upay",
        logoColor: "bg-[#00A1DF]",
        services: ["Cash Out", "Bill Pay", "Traffic Fine"],
        cashout_charge: "১.৪%",
        send_money: "ফ্রি",
        limit: "৳২৫,০০০ (দৈনিক)",
        features: ["লোয়েস্ট ক্যাশলআউট", "মাল্টি-ওয়ালেট"]
    }
];

const MFS = () => {
    return (
        <>
            <SEOHead
                title="মোবাইল ব্যাংকিং তুলনা | MFS Comparison Bangladesh"
                description="বিকাশ, নগদ, রকেট ও উপায়-এর চার্জ ও সুবিধা তুলনা করুন এক নজরে।"
                path="/mfs"
            />
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-7xl mx-auto w-full">
                    <PageBreadcrumb items={[{ label: "মোবাইল ব্যাংকিং (MFS)" }]} className="mb-6" />

                    {/* Hero */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            <MaterialIcon name="smartphone" />
                            ডিজিটাল বাংলাদেশ
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                            মোবাইল ব্যাংকিং তুলনা
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            বিকাশ, নগদ, রকেট নাকি উপায়? চার্জ, লিমিট ও সুবিধা দেখে সেরাটি বেছে নিন।
                        </p>
                        <div className="flex justify-center border-t border-b py-4">
                            <SocialShare title="বিকাশ, নগদ, রকেট ও উপায়-এর চার্জ ও সুবিধা তুলনা করুন BankBujhi-তে" />
                        </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mfsProviders.map((provider) => (
                            <div key={provider.name} className="bg-card border border-primary/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                {/* Header */}
                                <div className={`h-24 ${provider.logoColor} relative flex items-center justify-center`}>
                                    <h3 className="text-white text-3xl font-black tracking-tighter">{provider.displayName}</h3>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-6">
                                    {/* Cash Out */}
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">ক্যাশ আউট চার্জ</p>
                                        <p className="text-xl font-bold">{provider.cashout_charge}</p>
                                    </div>

                                    {/* Send Money */}
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">সেন্ড মানি</p>
                                        <p className="text-base font-semibold">{provider.send_money}</p>
                                    </div>

                                    {/* Limit */}
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">লেনদেন সীমা</p>
                                        <p className="text-base font-semibold">{provider.limit}</p>
                                    </div>

                                    {/* Features */}
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-3">টপ ফিচার</p>
                                        <ul className="space-y-2">
                                            {provider.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm">
                                                    <MaterialIcon name="check_circle" className="text-green-500 text-sm" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center">সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>
                        <div className="space-y-4">
                            <div className="bg-card border border-primary/10 rounded-xl p-6">
                                <h3 className="font-bold mb-2">সবচেয়ে কম ক্যাশ আউট চার্জ কোনটির?</h3>
                                <p className="text-muted-foreground text-sm">অ্যাপ ব্যবহার করলে নগদ (১.১৪%) এবং উপায় (১.৪%) এর চার্জ বিকাশের (১.৮৫%) তুলনায় কম।</p>
                            </div>
                            <div className="bg-card border border-primary/10 rounded-xl p-6">
                                <h3 className="font-bold mb-2">কোন অ্যাপ দিয়ে ব্যাংকে টাকা পাঠানো যায়?</h3>
                                <p className="text-muted-foreground text-sm">বিকাশ এবং রকেট দিয়ে সরাসরি ব্যাংক একাউন্টে টাকা পাঠানো বা আনা সবচেয়ে সহজ। এছাড়া এখন সব MFS থেকেই বিনিময় (Binimoy) ব্যবহার করে টাকা লেনদেন করা যায়।</p>
                            </div>
                        </div>
                    </div>

                </main>
                <Footer />
            </div>
        </>
    );
};

export default MFS;
