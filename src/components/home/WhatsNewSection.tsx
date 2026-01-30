import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

// Mock data for recent updates - in real app this would come from API
const recentUpdates = [
    {
        id: "1",
        type: 'fee_increase',
        title_bn: "⚠️ সিটি ব্যাংক Amex Gold এর ফি বৃদ্ধি",
        message_bn: "বার্ষিক ফি ৳৫,০০০ থেকে বেড়ে ৳৬,০০০ হয়েছে। কার্যকর: ১ ফেব্রুয়ারি ২০২৫",
        severity: 'critical',
        created_at: new Date('2025-01-20'),
        product_id: "amex-gold"
    },
    {
        id: "2",
        type: 'new_benefit',
        title_bn: "🎉 নতুন সুবিধা যুক্ত হয়েছে",
        message_bn: "EBL Visa Platinum এ এখন Uber-এ ১০% ক্যাশব্যাক পাবেন",
        severity: 'info',
        created_at: new Date('2025-01-18'),
        product_id: "ebl-visa-plat"
    },
    {
        id: "3",
        type: 'new_card',
        title_bn: "🆕 BRAC Bank নতুন কার্ড লঞ্চ করেছে",
        message_bn: "BRAC Green Card - পরিবেশবান্ধব, ২% ক্যাশব্যাক",
        severity: 'info',
        created_at: new Date('2025-01-15'),
        product_id: "brac-green"
    }
];

const WhatsNewSection = () => {
    return (
        <section className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-b border-primary/10">
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary/10 p-2 rounded-full">
                    <MaterialIcon name="notifications_active" className="text-primary text-xl sm:text-2xl" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">সাম্প্রতিক আপডেট</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentUpdates.map(update => (
                    <div key={update.id} className={`
            p-4 rounded-xl border-l-4 shadow-sm bg-card hover:shadow-md transition-shadow
            ${update.severity === 'critical' ? 'border-red-500' : 'border-blue-500'}
          `}>
                        <div className="flex flex-col h-full justify-between gap-4">
                            <div>
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-bold text-sm sm:text-base leading-snug">{update.title_bn}</h3>
                                    {update.severity === 'critical' && (
                                        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                            জরুরী
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{update.message_bn}</p>
                                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground/80">
                                    <MaterialIcon name="schedule" className="text-[14px]" />
                                    <span>
                                        {format(update.created_at, "d MMMM yyyy", { locale: bn })}
                                    </span>
                                </div>
                            </div>

                            <Link to={`/cards`}>
                                <Button size="sm" variant="outline" className="w-full text-xs font-bold h-8">
                                    বিস্তারিত দেখুন
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatsNewSection;
