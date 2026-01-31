import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/button";

const Calculators = () => {
    interface Tool {
        id: string;
        title: string;
        description: string;
        icon: string;
        link: string;
        color: string;
        bgColor: string;
        badge?: string;
    }

    const tools: Tool[] = [
        {
            id: "credit-card-payoff",
            title: "ক্রেডিট কার্ড বিল ক্যালকুলেটর",
            description: "আপনার বকেয়া বিল পরিশোধ করতে কত সময় লাগবে এবং কত টাকা সুদ দিতে হবে তা হিসাব করুন।",
            icon: "credit_score",
            link: "/tools/calculator",
            color: "text-blue-600",
            bgColor: "bg-blue-100/50"
        },
        {
            id: "emi-calculator",
            title: "EMI ক্যালকুলেটর",
            description: "লোনের মাসিক কিস্তি (EMI) এবং মোট সুদের পরিমাণ সহজেই হিসাব করুন।",
            icon: "calculate",
            link: "/calculator/emi",
            color: "text-green-600",
            bgColor: "bg-green-100/50"
        },
        {
            id: "fdr-calculator",
            title: "FDR মুনাফা ক্যালকুলেটর",
            description: "মেয়াদ শেষে আপনার ফিক্সড ডিপোজিট (FDR) থেকে কত লাভ পাবেন তা দেখুন।",
            icon: "savings",
            link: "/calculator/fdr",
            color: "text-purple-600",
            bgColor: "bg-purple-100/50"
        }
    ];

    return (
        <>
            <SEOHead
                title="ফিন্যান্সিয়াল ক্যালকুলেটর ও টুলস | BankBujhi"
                description="বিনামূল্যে ব্যবহার করুন আমাদের ক্রেডিট কার্ড বিল, EMI এবং অন্যান্য আর্থিক ক্যালকুলেটর।"
                path="/tools"
            />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
                    <PageBreadcrumb items={[{ label: "টুলস" }]} className="mb-6" />

                    <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl font-black mb-4">
                            আর্থিক <span className="text-primary">ক্যালকুলেটর</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            জটিল হিসাব সহজ করতে আমাদের স্মার্ট টুলস ব্যবহার করুন। সঠিক সিদ্ধান্ত নিতে আমরা আছি আপনার পাশে।
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {tools.map((tool) => (
                            <div key={tool.id} className="bg-card border border-primary/10 rounded-2xl p-6 hover:shadow-lg transition-all group relative overflow-hidden">
                                <div className={`mb-6 p-4 w-16 h-16 rounded-2xl flex items-center justify-center ${tool.bgColor}`}>
                                    <MaterialIcon name={tool.icon} className={`text-3xl ${tool.color}`} />
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 line-clamp-2">
                                    {tool.description}
                                </p>

                                <Button className="w-full font-bold group-hover:translate-x-1 transition-transform" asChild variant={tool.badge ? "secondary" : "default"} disabled={!!tool.badge}>
                                    <Link to={tool.link}>
                                        {tool.badge ? tool.badge : (
                                            <>
                                                ব্যবহার করুন <MaterialIcon name="arrow_forward" className="ml-2 text-lg" />
                                            </>
                                        )}
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center max-w-3xl mx-auto">
                        <MaterialIcon name="lightbulb" className="text-4xl text-primary mb-4" />
                        <h2 className="text-2xl font-bold mb-3">আরও টুল প্রয়োজন?</h2>
                        <p className="text-muted-foreground mb-6">
                            আপনার যদি অন্য কোন ক্যালকুলেটর বা টুলের প্রয়োজন হয়, আমাদের জানান। আমরা শীঘ্রই সেটি যুক্ত করার চেষ্টা করব।
                        </p>
                        <Button variant="outline" className="font-bold border-primary text-primary hover:bg-primary/10" asChild>
                            <Link to="/contact">
                                মতামত দিন
                            </Link>
                        </Button>
                    </div>

                </main>
                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default Calculators;
