import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { fetchCreditCards, type CreditCard } from "@/lib/api/banks";
import CreditCardListing from "@/components/cards/CreditCardListing";
import { Skeleton } from "@/components/ui/skeleton";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";
import { findBestCards, UserProfile, CardRecommendation } from "@/lib/recommendations/matcher";
import { Button } from "@/components/ui/button";

const Recommendations = () => {
    const location = useLocation();
    const userProfile = location.state?.profile as UserProfile | undefined;

    const { data: allCards = [], isLoading } = useQuery({
        queryKey: ["credit-cards-recommendations"],
        queryFn: () => fetchCreditCards(),
    });

    const recommendations = useMemo(() => {
        if (!userProfile || allCards.length === 0) return [];
        return findBestCards(userProfile, allCards).slice(0, 5); // Top 5
    }, [userProfile, allCards]);

    // Fallback logic if no quiz taken
    const travelCards = allCards.filter(c => c.category === "Travel" || c.category === "Premium Travel & Rewards").slice(0, 2);
    const studentCards = allCards.filter(c => c.annual_fee_waived || c.min_income === "৳১০,০০০" || c.category === "Entry Level").slice(0, 2);

    const transformCard = (rec: CardRecommendation) => {
        const card = rec.card;
        return {
            id: card.id,
            bank: card.banks?.name || "Unknown Bank",
            name: card.name,
            category: card.category || "",
            annualFee: card.annual_fee || "N/A",
            annualFeeNote: card.annual_fee_note || "",
            annualFeeStrikethrough: card.annual_fee_waived || false,
            benefits: card.benefits.slice(0, 2).map(b => ({ icon: b.icon, text: b.text })),
            badge: `${rec.match_percentage}% Match`,
            image: card.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
            matchReasons: rec.reasons
        };
    };

    const transformGenericCard = (card: CreditCard) => ({
        id: card.id,
        bank: card.banks?.name || "Unknown Bank",
        name: card.name,
        category: card.category || "",
        annualFee: card.annual_fee || "N/A",
        annualFeeNote: card.annual_fee_note || "",
        annualFeeStrikethrough: card.annual_fee_waived || false,
        benefits: card.benefits.slice(0, 2).map(b => ({ icon: b.icon, text: b.text })),
        image: card.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    });

    return (
        <>
            <SEOHead
                title="আপনার জন্য সেরা কার্ড | Smart Recommendations"
                description="আপনার প্রোফাইল অনুযায়ী সেরা ক্রেডিট কার্ডের তালিকা।"
                path="/recommendations"
            />
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full">
                    <PageBreadcrumb items={[{ label: "সুপারিশ" }]} className="mb-6" />

                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black mb-3">
                            {userProfile ? "আপনার জন্য সেরা সুপারিশ" : "আমাদের শীর্ষ পছন্দসমূহ"}
                        </h1>
                        <p className="text-muted-foreground">
                            {userProfile
                                ? "আপনার উত্তরের ভিত্তিতে আমরা এই কার্ডগুলো নির্বাচন করেছি।"
                                : "ক্যাটাগরি অনুযায়ী সেরা কার্ডগুলো এখানে বাছাই করা হয়েছে।"
                            }
                        </p>
                        {!userProfile && (
                            <Link to="/quiz" className="mt-4 inline-block">
                                <Button className="font-bold gap-2">
                                    <MaterialIcon name="psychology" />
                                    আমার জন্য কার্ড খুঁজুন
                                </Button>
                            </Link>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2].map(i => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {userProfile && recommendations.length > 0 ? (
                                <section>
                                    <div className="grid gap-6">
                                        {recommendations.map(rec => (
                                            <div key={rec.card.id} className="relative">
                                                {/* Match Score Badge */}
                                                <div className="absolute -top-3 -right-2 z-10 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                                                    <MaterialIcon name="verified" className="text-sm" />
                                                    {rec.match_percentage}% Match
                                                </div>

                                                <div className="bg-primary/5 p-4 rounded-t-xl border border-primary/10 border-b-0 -mb-2 pb-6">
                                                    <div className="flex flex-wrap gap-2 text-sm text-green-700 font-bold mb-2">
                                                        <MaterialIcon name="thumb_up" className="text-sm" />
                                                        কেন এটি আপনার জন্য:
                                                    </div>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                                        {rec.reasons.map((r, idx) => (
                                                            <li key={idx} className="flex items-center gap-2">
                                                                <span className="size-1.5 rounded-full bg-green-500"></span>
                                                                {r}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <CreditCardListing card={transformCard(rec)} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 text-center bg-muted/50 p-6 rounded-xl">
                                        <p className="mb-4 text-muted-foreground">ফলাফল পছন্দ হয়নি?</p>
                                        <Link to="/quiz">
                                            <Button variant="outline" className="gap-2">
                                                <MaterialIcon name="refresh" />
                                                আবার চেষ্টা করুন
                                            </Button>
                                        </Link>
                                    </div>
                                </section>
                            ) : (
                                <>
                                    {/* Fallback View (Original) */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <MaterialIcon name="flight" className="text-2xl text-primary" />
                                            <h2 className="text-xl font-bold">ভ্রমণকারীদের জন্য সেরা (Travel)</h2>
                                        </div>
                                        <div className="grid gap-4">
                                            {travelCards.map(card => <CreditCardListing key={card.id} card={transformGenericCard(card)} />)}
                                        </div>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <MaterialIcon name="school" className="text-2xl text-primary" />
                                            <h2 className="text-xl font-bold">নতুনদের জন্য সেরা (Beginners/Students)</h2>
                                        </div>
                                        <div className="grid gap-4">
                                            {studentCards.map(card => <CreditCardListing key={card.id} card={transformGenericCard(card)} />)}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Recommendations;
