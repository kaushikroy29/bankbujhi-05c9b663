import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import SocialShare from "@/components/ui/SocialShare";
import { adminService } from "@/services/adminService"; // NEW import
import LikeButton from "@/components/ui/LikeButton";

// Article state interface
interface Article {
    id: string;
    title: string;
    titleEn?: string;
    category?: string;
    readTime?: string;
    date: string;
    image?: string;
    content?: string;
    excerpt?: string;
}

const GuideDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            try {
                // Try fetching by slug (which id is in this context)
                const data = await adminService.getGuideBySlug(id); // Ensure you use slug if id is slug
                // If not found by slug, maybe check if it's an ID? 
                // For now assuming UUIDs or Slugs are used. 
                // The adminService.getGuideBySlug implementation uses 'slug' col.
                // If id is actually an ID (UUID), this might fail if we don't have getGuideById.
                // But Phase 6 plan said ID is slug for URL mostly.
                if (data) {
                    setArticle({
                        id: data.id,
                        title: data.title,
                        titleEn: data.title_en,
                        category: data.category,
                        readTime: data.read_time,
                        date: new Date(data.created_at).getFullYear().toString(),
                        image: data.image_url,
                        content: data.content,
                        excerpt: data.excerpt
                    });
                }
            } catch (error) {
                console.error("Failed to load guide:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <MaterialIcon name="refresh" className="animate-spin text-4xl text-primary" />
                </main>
                <Footer />
            </div>
        )
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <MaterialIcon name="error_outline" className="text-6xl text-muted-foreground mb-4" />
                        <h1 className="text-2xl font-bold mb-2">আর্টিকেলটি পাওয়া যায়নি</h1>
                        <Link to="/guides">
                            <Button>সব গাইড দেখুন</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
                <BottomNav />
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title={`${article.title} | BankBujhi`}
                description={article.excerpt || article.title}
                path={`/guides/${id}`}
            />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full pb-20 md:pb-8">
                    <PageBreadcrumb items={[{ label: "গাইড", href: "/guides" }, { label: article.title }]} className="mb-6" />

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                                    {article.category}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                                    {article.title}
                                </h1>
                                {article.image && (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full aspect-video object-cover rounded-xl mb-8 shadow-sm"
                                    />
                                )}

                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b justify-between">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1">
                                            <MaterialIcon name="calendar_today" className="text-sm" />
                                            {article.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MaterialIcon name="schedule" className="text-sm" />
                                            {article.readTime} পড়ার সময়
                                        </span>
                                    </div>
                                    <LikeButton itemId={article.id} itemType="guide" />
                                </div>

                                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary">
                                    {article.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                                    ) : (
                                        <p className="text-muted-foreground italic">
                                            বিস্তারিত শীঘ্রই আসছে...
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t flex items-center justify-between">
                                <SocialShare title={article.title} />
                                <LikeButton itemId={article.id} itemType="guide" variant="icon" />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Calculator CTA - relevant to many articles */}
                            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 sticky top-24">
                                <h3 className="text-xl font-bold mb-2">হিসাব করতে চান?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    আমাদের স্মার্ট ক্যালকুলেটর ব্যবহার করে আপনার কিস্তি বা সুদের হিসাব বের করুন।
                                </p>
                                <div className="space-y-3">
                                    <Link to="/calculator/emi" className="block">
                                        <Button variant="outline" className="w-full justify-start font-bold">
                                            <MaterialIcon name="calculate" className="mr-2" />
                                            EMI ক্যালকুলেটর
                                        </Button>
                                    </Link>
                                    <Link to="/tools/calculator" className="block">
                                        <Button variant="outline" className="w-full justify-start font-bold">
                                            <MaterialIcon name="credit_score" className="mr-2" />
                                            কার্ড বিল ক্যালকুলেটর
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default GuideDetail;
