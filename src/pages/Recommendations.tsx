import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import SEOHead from "@/components/seo/SEOHead";
import { RecommendationWizard } from "@/components/recommendations/RecommendationWizard";
import { RecommendationResults } from "@/components/recommendations/RecommendationResults";
import { UserPreferences, findBestCards, CardRecommendation } from "@/lib/recommendations/matcher";
import { userPersonas } from "@/lib/recommendations/personas";
import { fetchCreditCards, CreditCard } from "@/lib/api/banks";
import MaterialIcon from "@/components/ui/MaterialIcon";

const Recommendations = () => {
    const [stage, setStage] = useState<'wizard' | 'loading' | 'results'>('wizard');
    const [allCards, setAllCards] = useState<CreditCard[]>([]);
    const [recommendations, setRecommendations] = useState<CardRecommendation[]>([]);

    // Pre-load cards
    useEffect(() => {
        const loadCards = async () => {
            try {
                const cards = await fetchCreditCards();
                setAllCards(cards);
            } catch (error) {
                console.error("Failed to load cards", error);
            }
        };
        loadCards();
    }, []);

    const handleWizardComplete = (prefs: UserPreferences) => {
        setStage('loading');

        // Simulate processing time for UX
        setTimeout(() => {
            const persona = prefs.selectedPersonaId ? userPersonas[prefs.selectedPersonaId] : undefined;
            const results = findBestCards(allCards, prefs, persona);
            setRecommendations(results);
            setStage('results');
        }, 1500);
    };

    const handleReset = () => {
        setStage('wizard');
        setRecommendations([]);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEOHead
                title="Smart Card Recommendation | BankBujhi"
                description="আমাদের স্মার্ট অ্যালগরিদম ব্যবহার করে আপনার জন্য সেরা ক্রেডিট কার্ডটি খুঁজে নিন।"
                path="/recommendations"
            />
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                {stage === 'wizard' && (
                    <RecommendationWizard onComplete={handleWizardComplete} />
                )}

                {stage === 'loading' && (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 animate-in fade-in duration-500">
                        <div className="relative">
                            <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MaterialIcon name="smart_toy" className="text-primary text-xl" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold animate-pulse">আপনার জন্য সেরা কার্ড খোঁজা হচ্ছে...</h2>
                        <p className="text-muted-foreground">আমরা ৫০+ কার্ড বিশ্লেষণ করছি</p>
                    </div>
                )}

                {stage === 'results' && (
                    <RecommendationResults recommendations={recommendations} onReset={handleReset} />
                )}
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default Recommendations;
