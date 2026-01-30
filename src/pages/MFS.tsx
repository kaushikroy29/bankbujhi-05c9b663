import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import SEOHead from "@/components/seo/SEOHead";
import MaterialIcon from "@/components/ui/MaterialIcon";

const mfsProviders = [
    {
        name: "bKash",
        logo: "/logos/bkash.png",
        services: ["Send Money", "Cash Out", "Mobile Recharge", "Bill Payment"],
        cashout_charge: "১.৮৫%",
        max_daily_limit: "৳২৫,০০০"
    },
    {
        name: "Nagad",
        logo: "/logos/nagad.png",
        services: ["Send Money", "Cash Out", "Merchant Payment"],
        cashout_charge: "১৫ টাকা (প্রতি হাজারে)",
        max_daily_limit: "৳২৫,০০০"
    },
    {
        name: "Rocket",
        logo: "/logos/rocket.png",
        services: ["Send Money", "Cash Out", "Utility Bills"],
        cashout_charge: "১.৮%",
        max_daily_limit: "৳২৫,০০০"
    }
];

const MFS = () => {
    return (
        <>
            <SEOHead
                title="মোবাইল ব্যাংকিং সেবা (MFS) - বিকাশ, নগদ, রকেট | BankBujhi"
                description="বাংলাদেশের জনপ্রিয় মোবাইল ব্যাংকিং সেবাগুলোর চার্জ, লিমিট এবং সুবিধা তুলনা করুন।"
                path="/mfs"
            />
            <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-muted/10">
                <Header />

                <main className="flex-1 container-padding py-8 md:py-12 pb-20 md:pb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                                মোবাইল ব্যাংকিং সেবা (MFS)
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                বাংলাদেশের জনপ্রিয় মোবাইল ফিন্যান্সিয়াল সার্ভিসগুলোর বিস্তারিত তথ্য
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {mfsProviders.map((provider) => (
                                <div key={provider.name} className="bg-card rounded-xl border border-primary/10 shadow-sm p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-center h-20 mb-6 bg-muted/20 rounded-lg p-4">
                                        {/* Fallback to text if image fails or for now just use text with icon if logo missing, 
                        but code requested image path. Keep image but maybe add error handling or fallback visually if needed later.
                        For now just simple img tag. */}
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold">{provider.name}</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">ক্যাশআউট চার্জ</p>
                                            <p className="font-bold text-lg">{provider.cashout_charge}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">দৈনিক লিমিট</p>
                                            <p className="font-bold text-lg">{provider.max_daily_limit}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">সেবাসমূহ</p>
                                            <div className="flex flex-wrap gap-2">
                                                {provider.services.map((service) => (
                                                    <span key={service} className="text-xs bg-primary/5 text-primary-foreground text-primary px-2 py-1 rounded font-medium border border-primary/10">
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <MaterialIcon name="info" className="text-blue-600" />
                                গুরুত্বপূর্ণ তথ্য
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                মোবাইল ব্যাংকিং সেবার চার্জ এবং লিমিট যেকোনো সময় পরিবর্তন হতে পারে।
                                সর্বশেষ তথ্যের জন্য সংশ্লিষ্ট প্রোভাইডারের অফিসিয়াল ওয়েবসাইট বা অ্যাপ চেক করুন।
                                নিরাপত্তার স্বার্থে আপনার পিন নাম্বার কারো সাথে শেয়ার করবেন না।
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default MFS;
