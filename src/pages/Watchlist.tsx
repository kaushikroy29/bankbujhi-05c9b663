
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import { Link, useNavigate } from "react-router-dom";
import { getUserWatchlist, removeFromWatchlist, WatchlistItem } from "@/lib/api/watchlist";
import { fetchCreditCard } from "@/lib/api/banks";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductDetails {
    id: string;
    name: string;
    bankName: string;
    image_url?: string | null;
    type: 'credit_card' | 'loan' | 'savings';
}

const Watchlist = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductDetails[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthAndLoad();
    }, []);

    const checkAuthAndLoad = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        setIsAuthenticated(true);
        await loadWatchlist();
    };

    const loadWatchlist = async () => {
        setLoading(true);
        try {
            const { data, error } = await getUserWatchlist();
            if (error) throw error;

            if (data && data.length > 0) {
                const details = await Promise.all(data.map(async (item) => {
                    try {
                        if (item.product_type === 'credit_card') {
                            const card = await fetchCreditCard(item.product_id);
                            if (card) {
                                return {
                                    id: card.id,
                                    name: card.name,
                                    bankName: card.banks?.name || "Unknown Bank",
                                    image_url: card.image_url,
                                    type: 'credit_card'
                                } as ProductDetails;
                            }
                        }
                        // Placeholder for other types (Loan, Savings) if needed
                        return null;
                    } catch (e) {
                        console.error(`Failed to load product ${item.product_id}`, e);
                        return null;
                    }
                }));

                setProducts(details.filter((p): p is ProductDetails => p !== null));
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Failed to load watchlist", error);
            toast.error("ওয়াচলিস্ট লোড করতে সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (product: ProductDetails) => {
        try {
            const { error } = await removeFromWatchlist(product.type, product.id);
            if (error) throw error;

            setProducts(prev => prev.filter(p => p.id !== product.id));
            toast.success("ওয়াচলিস্ট থেকে সরানো হয়েছে");
        } catch (error) {
            toast.error("মুছতে ব্যর্থ হয়েছে");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </main>
                <Footer />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 container py-20 text-center max-w-md mx-auto">
                    <MaterialIcon name="lock" className="text-6xl text-muted-foreground mb-4" />
                    <h1 className="text-2xl font-bold mb-2">লগইন প্রয়োজন</h1>
                    <p className="text-muted-foreground mb-6">আপনার ওয়াচলিস্ট দেখতে অনুগ্রহ করে লগইন করুন।</p>
                    <Link to="/signup">
                        <Button size="lg" className="w-full">লগইন / সাইন আপ</Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title="আমার ওয়াচলিস্ট | BankBujhi"
                description="আপনার সেভ করা ক্রেডিট কার্ড এবং আর্থিক পণ্য।"
                path="/watchlist"
            />
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full">
                    <PageBreadcrumb items={[{ label: "ওয়াচলিস্ট" }]} className="mb-6" />

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black mb-2">সংরক্ষিত পণ্য</h1>
                            <p className="text-muted-foreground">
                                আপনি {products.length}টি পণ্য সেভ করে রেখেছেন।
                            </p>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-primary/20">
                            <MaterialIcon name="bookmark_border" className="text-6xl text-muted-foreground mb-4" />
                            <h3 className="text-xl font-bold mb-2">ওয়াচলিস্ট খালি</h3>
                            <p className="text-muted-foreground mb-6">আপনার তালিকায় কোনো পণ্য নেই।</p>
                            <Link to="/compare">
                                <Button>কার্ড খুঁজুন</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-card p-5 rounded-xl border border-primary/10 shadow-sm flex flex-col justify-between group transition-all hover:shadow-md">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="h-10 object-contain" />
                                            ) : (
                                                <div className="h-10 w-16 bg-muted/50 rounded flex items-center justify-center">
                                                    <MaterialIcon name="credit_card" className="text-muted-foreground" />
                                                </div>
                                            )}
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8" onClick={() => handleRemove(product)}>
                                                <MaterialIcon name="close" />
                                            </Button>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                                <Link to={`/cards/${product.id}`}>{product.name}</Link>
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">{product.bankName}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
                                        <Link to={`/cards/${product.id}`} className="col-span-2">
                                            <Button variant="outline" className="w-full font-bold group-hover:bg-primary group-hover:text-primary-foreground">
                                                বিস্তারিত দেখুন
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </main>
                <Footer />
            </div>
        </>
    );
};

export default Watchlist;
