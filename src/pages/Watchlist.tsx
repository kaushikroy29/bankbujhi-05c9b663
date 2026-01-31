import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";

// Simple interface for stored items
interface StoredCard {
    id: string;
    name: string;
    bankName: string;
}

const Watchlist = () => {
    const [savedCards, setSavedCards] = useState<StoredCard[]>([]);

    useEffect(() => {
        // Load from local storage
        const stored = localStorage.getItem("bankbujhi_watchlist");
        if (stored) {
            try {
                setSavedCards(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse watchlist", e);
            }
        }
    }, []);

    const clearWatchlist = () => {
        localStorage.removeItem("bankbujhi_watchlist");
        setSavedCards([]);
    };

    return (
        <>
            <SEOHead
                title="আমার ওয়াচলিস্ট | Saved Cards"
                description="আপনার সংরক্ষণ করা কার্ডগুলো।"
                path="/watchlist"
            />
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full">
                    <PageBreadcrumb items={[{ label: "ওয়াচলিস্ট" }]} className="mb-6" />

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black mb-2">সংরক্ষিত কার্ড</h1>
                            <p className="text-muted-foreground">
                                আপনি {savedCards.length}টি কার্ড সেভ করে রেখেছেন।
                            </p>
                        </div>
                        {savedCards.length > 0 && (
                            <Button variant="destructive" size="sm" onClick={clearWatchlist}>
                                <MaterialIcon name="delete" className="mr-2" /> সব মুছুন
                            </Button>
                        )}
                    </div>

                    {savedCards.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-primary/20">
                            <MaterialIcon name="bookmark_border" className="text-6xl text-muted-foreground mb-4" />
                            <h3 className="text-xl font-bold mb-2">ওয়াচলিস্ট খালি</h3>
                            <p className="text-muted-foreground mb-6">আপনি এখনো কোনো কার্ড সেভ করেননি।</p>
                            <Link to="/compare">
                                <Button>কার্ড দেখুন</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedCards.map((card) => (
                                <div key={card.id} className="bg-card p-5 rounded-xl border border-primary/10 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{card.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{card.bankName}</p>
                                    </div>
                                    <Link to={`/cards/${card.id}`}>
                                        <Button variant="outline" className="w-full">বিস্তারিত দেখুন</Button>
                                    </Link>
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
