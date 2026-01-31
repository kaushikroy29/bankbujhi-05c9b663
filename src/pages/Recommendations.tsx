import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { fetchCreditCards, type CreditCard } from "@/lib/api/banks";
import CreditCardListing from "@/components/cards/CreditCardListing";
import { Skeleton } from "@/components/ui/skeleton";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SEOHead from "@/components/seo/SEOHead";

const Recommendations = () => {
    const { data: cards = [], isLoading } = useQuery({
        queryKey: ["credit-cards-recommendations"],
        queryFn: () => fetchCreditCards(),
    });

    // Simple client-side filters for "Recommendations" logic
    // in a real app, this might come from a curated backend endpoint
    const travelCards = cards.filter(c => c.category === "Travel" || c.category === "Premium Travel & Rewards").slice(0, 2);
    const studentCards = cards.filter(c => c.annual_fee_waived || c.min_income === "৳১০,০০০" || c.category === "Entry Level").slice(0, 2);
    const shoppingCards = cards.filter(c => c.category?.includes("Shopping") || c.category?.includes("Cashback")).slice(0, 2);

    const transformCard = (card: CreditCard) => ({
        id: card.id,
        bank: card.banks?.name || "Unknown Bank",
        name: card.name,
        category: card.category || "",
        annualFee: card.annual_fee || "N/A",
        annualFeeNote: card.annual_fee_note || "",
        annualFeeStrikethrough: card.annual_fee_waived || false,
        benefits: card.benefits.slice(0, 2).map(b => ({ icon: b.icon, text: b.text })),
        badge: card.badge || undefined,
        image: card.image_url || "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    });

    return (
        <>
            <SEOHead
                title="সেরা কার্ড সুপারিশ | Top Picks"
                description="আপনার জিবনযাত্রার জন্য সেরা ক্রেডিট কার্ডগুলো দেখুন।"
                path="/recommendations"
            />
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 container-padding py-8 max-w-[1280px] mx-auto w-full">
                    <PageBreadcrumb items={[{ label: "সুপারিশ" }]} className="mb-6" />

                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-black mb-3">আমাদের শীর্ষ পছন্দসমূহ</h1>
                        <p className="text-muted-foreground">
                            ক্যাটাগরি অনুযায়ী সেরা কার্ডগুলো এখানে বাছাই করা হয়েছে।
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2].map(i => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Section: Travel */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <MaterialIcon name="flight" className="text-2xl text-primary" />
                                    <h2 className="text-xl font-bold">ভ্রমণকারীদের জন্য সেরা (Travel)</h2>
                                </div>
                                <div className="grid gap-4">
                                    {travelCards.length > 0 ? (
                                        travelCards.map(card => <CreditCardListing key={card.id} card={transformCard(card)} />)
                                    ) : (
                                        <p className="text-muted-foreground text-sm">কোনো কার্ড পাওয়া যায়নি।</p>
                                    )}
                                </div>
                            </section>

                            {/* Section: Shopping */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <MaterialIcon name="shopping_bag" className="text-2xl text-primary" />
                                    <h2 className="text-xl font-bold">কেনাকাটার জন্য সেরা (Shopping)</h2>
                                </div>
                                <div className="grid gap-4">
                                    {shoppingCards.length > 0 ? (
                                        shoppingCards.map(card => <CreditCardListing key={card.id} card={transformCard(card)} />)
                                    ) : (
                                        <p className="text-muted-foreground text-sm">কোনো কার্ড পাওয়া যায়নি।</p>
                                    )}
                                </div>
                            </section>

                            {/* Section: Beginners */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <MaterialIcon name="school" className="text-2xl text-primary" />
                                    <h2 className="text-xl font-bold">নতুনদের জন্য সেরা (Beginners/Students)</h2>
                                </div>
                                <div className="grid gap-4">
                                    {studentCards.length > 0 ? (
                                        studentCards.map(card => <CreditCardListing key={card.id} card={transformCard(card)} />)
                                    ) : (
                                        <p className="text-muted-foreground text-sm">কোনো কার্ড পাওয়া যায়নি।</p>
                                    )}
                                </div>
                            </section>

                        </div>
                    )}

                </main>
                <Footer />
            </div>
        </>
    );
};

export default Recommendations;
