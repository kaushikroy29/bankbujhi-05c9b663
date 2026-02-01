import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminService } from "@/services/adminService";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import LikeButton from "@/components/ui/LikeButton";

import { User } from "@supabase/supabase-js";

// Consolidated details interface with all possible properties
interface FavoriteDetails {
    // Guide properties
    title?: string;
    slug?: string;
    excerpt?: string;
    category?: string;
    image_url?: string;
    // GlossaryTerm properties
    term?: string;
    term_en?: string;
    definition?: string;
}

interface FavoriteItem {
    id: string;
    item_id: string;
    item_type: 'guide' | 'term';
    details?: FavoriteDetails;
}

const UserFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/signup"); // Or login
                return;
            }
            setUser(user);
            loadFavorites(user.id);
        };
        checkUser();
    }, [navigate]);

    const loadFavorites = async (userId: string) => {
        try {
            const data = await adminService.getHydratedFavorites(userId);
            setFavorites(data);
        } catch (error) {
            console.error("Failed to load favorites", error);
        } finally {
            setLoading(false);
        }
    };

    const guides = favorites.filter(f => f.item_type === 'guide');
    const terms = favorites.filter(f => f.item_type === 'term');

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl pb-20 md:pb-8">
                <div className="flex items-center gap-4 mb-8">
                    <MaterialIcon name="favorite" className="text-4xl text-red-500" />
                    <div>
                        <h1 className="text-3xl font-bold">আমার পছন্দ (Favorites)</h1>
                        <p className="text-muted-foreground">আপনার সেভ করা গাইড এবং শব্দগুলো এখানে পাবেন।</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <MaterialIcon name="refresh" className="animate-spin text-4xl text-primary mb-2" />
                        <p>লোড হচ্ছে...</p>
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                        <MaterialIcon name="bookmark_border" className="text-6xl text-muted-foreground mb-4" />
                        <h2 className="text-xl font-bold mb-2">কোনো প্রিয় তালিকা নেই</h2>
                        <p className="text-muted-foreground mb-6">আপনি এখনও কোনো গাইড বা শব্দ সেভ করেননি।</p>
                        <div className="flex justify-center gap-4">
                            <Link to="/guides">
                                <Button variant="outline">গাইড দেখুন</Button>
                            </Link>
                            <Link to="/glossary">
                                <Button variant="outline">শব্দকোষ দেখুন</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Saved Guides */}
                        {guides.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <MaterialIcon name="article" className="text-primary" />
                                    সেভ করা গাইড ({guides.length})
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {guides.map(fav => (
                                        <div key={fav.id} className="bg-card border rounded-lg p-4 flex gap-4 hover:shadow transition-shadow relative group">
                                            {fav.details?.image_url && (
                                                <img
                                                    src={fav.details.image_url}
                                                    alt={fav.details.title}
                                                    className="w-20 h-20 object-cover rounded-md shrink-0"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">
                                                        {fav.details?.category}
                                                    </span>
                                                    <LikeButton
                                                        itemId={fav.item_id}
                                                        itemType="guide"
                                                        variant="icon"
                                                        className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                                    />
                                                </div>
                                                <Link to={`/guides/${fav.details?.slug || fav.item_id}`} className="block mt-1">
                                                    <h3 className="font-bold text-lg truncate hover:text-primary transition-colors">
                                                        {fav.details?.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {fav.details?.excerpt}
                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Saved Terms */}
                        {terms.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <MaterialIcon name="menu_book" className="text-primary" />
                                    সেভ করা শব্দ ({terms.length})
                                </h2>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {terms.map(fav => (
                                        <div key={fav.id} className="bg-card border rounded-lg p-4 relative group hover:border-primary/50 transition-colors">
                                            <div className="absolute top-3 right-3">
                                                <LikeButton
                                                    itemId={fav.item_id}
                                                    itemType="term"
                                                    variant="icon"
                                                    className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <h3 className="font-bold text-lg text-primary mb-1">
                                                {fav.details?.term}
                                            </h3>
                                            <p className="text-xs font-mono text-muted-foreground mb-2">
                                                {fav.details?.term_en}
                                            </p>
                                            <p className="text-sm line-clamp-3 text-foreground/80">
                                                {fav.details?.definition}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default UserFavorites;
