import { useState, useMemo, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/seo/SEOHead";
import { adminService } from "@/services/adminService"; // NEW import
import LikeButton from "@/components/ui/LikeButton";
import { cn } from "@/lib/utils";

const Glossary = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [terms, setTerms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Load data from Supabase
    useEffect(() => {
        const load = async () => {
            try {
                const data = await adminService.getGlossaryTerms();
                setTerms(data);
            } catch (error) {
                console.error("Failed to load glossary:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Alphabet for filtering
    const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const filteredTerms = useMemo(() => {
        let result = terms;

        if (selectedLetter) {
            if (selectedLetter === "#") {
                result = result.filter(t => !/^[A-Z]/i.test(t.term_en || ""));
            } else {
                result = result.filter(t => (t.term_en || "").toUpperCase().startsWith(selectedLetter));
            }
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.term.toLowerCase().includes(query) ||
                (t.term_en || "").toLowerCase().includes(query) ||
                t.definition.toLowerCase().includes(query)
            );
        }

        return result; // Already sorted by DB query usually, but simple client sort if needed
    }, [searchQuery, selectedLetter, terms]);

    return (
        <>
            <SEOHead
                title="অর্থনৈতিক শব্দকোষ (Glossary) | BankBujhi"
                description="ব্যাংকিং ও ফাইন্যান্সের জটিল শব্দগুলোর সহজ বাংলা ব্যাখ্যা। এপিআর, ইএমআই, এবং আরও অনেক কিছু শিখুন।"
                path="/glossary"
            />
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 pb-20 md:pb-0">
                    {/* Hero */}
                    <section className="bg-gradient-to-br from-primary/5 to-accent/5 border-b">
                        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
                            <h1 className="text-3xl md:text-5xl font-black mb-4">অর্থনৈতিক <span className="text-primary">শব্দকোষ</span></h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                                ব্যাংকিং ও ফাইন্যান্সের জটিল শব্দগুলোর সহজ বাংলা ব্যাখ্যা জানুন।
                            </p>

                            <div className="max-w-xl mx-auto relative">
                                <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    className="pl-10 h-12 text-lg bg-background"
                                    placeholder="শব্দ খুঁজুন (যেমন: APR, EMI, Credit Score...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <div className="container mx-auto px-4 py-8 max-w-5xl">
                        {/* Alphabet Filter */}
                        <div className="flex flex-wrap gap-2 justify-center mb-10 sticky top-20 z-10 bg-background/95 backdrop-blur py-4 border-b">
                            <Button
                                variant={selectedLetter === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedLetter(null)}
                                className="font-bold"
                            >
                                All
                            </Button>
                            {alphabet.map(letter => (
                                <Button
                                    key={letter}
                                    variant={selectedLetter === letter ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setSelectedLetter(letter)}
                                    className="w-8 h-8 p-0 font-bold"
                                >
                                    {letter}
                                </Button>
                            ))}
                        </div>

                        {/* Terms Grid */}
                        {loading ? (
                            <div className="text-center py-20">
                                <MaterialIcon name="refresh" className="animate-spin text-4xl text-primary mb-2" />
                                <p>লোড হচ্ছে...</p>
                            </div>
                        ) : filteredTerms.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredTerms.map(term => (
                                    <div key={term.id} className="bg-card border border-primary/10 rounded-xl p-6 hover:shadow-md transition-shadow group relative">
                                        {/* Like Button */}
                                        <div className="absolute top-4 right-4 z-10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <LikeButton itemId={term.id} itemType="term" variant="icon" />
                                        </div>

                                        <div className="flex justify-between items-start mb-2 pr-8">
                                            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                                                {term.term}
                                            </h3>
                                            <span className="text-[10px] uppercase font-bold tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded">
                                                {term.category}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground mb-4 font-mono opacity-70">
                                            {term.term_en}
                                        </p>
                                        <p className="text-foreground/90 leading-relaxed mb-4">
                                            {term.definition}
                                        </p>
                                        {term.example && (
                                            <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-sm">
                                                <span className="font-bold text-primary mr-1">উদাহরণ:</span>
                                                <span className="text-muted-foreground italic">{term.example}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <MaterialIcon name="search_off" className="text-6xl text-muted-foreground mb-4" />
                                <h2 className="text-2xl font-bold mb-2">কোনো শব্দ পাওয়া যায়নি</h2>
                                <p className="text-muted-foreground">দুঃখিত, আপনার অনুসন্ধানের সাথে কোনো শব্দ মেলেনি।</p>
                                <Button
                                    variant="link"
                                    onClick={() => { setSearchQuery(""); setSelectedLetter(null); }}
                                    className="mt-4"
                                >
                                    সব শব্দ দেখুন
                                </Button>
                            </div>
                        )}
                    </div>

                </main>
                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default Glossary;
