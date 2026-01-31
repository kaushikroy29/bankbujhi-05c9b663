import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import MaterialIcon from '@/components/ui/MaterialIcon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '@/lib/api/watchlist';
import { supabase } from '@/integrations/supabase/client';

interface WatchlistButtonProps {
    productType: 'credit_card' | 'loan' | 'savings';
    productId: string;
    variant?: 'default' | 'icon';
    className?: string;
}

const WatchlistButton = ({
    productType,
    productId,
    variant = 'default',
    className
}: WatchlistButtonProps) => {
    const [isWatched, setIsWatched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        checkAuthAndWatchStatus();
    }, [productId]);

    const checkAuthAndWatchStatus = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setIsAuthenticated(!!user);

        if (user) {
            const watched = await isInWatchlist(productType, productId);
            setIsWatched(watched);
        }
    };

    const handleToggleWatchlist = async () => {
        if (!isAuthenticated) {
            toast({
                title: "লগইন প্রয়োজন",
                description: "ওয়াচলিস্টে যোগ করতে প্রথমে লগইন করুন",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            if (isWatched) {
                const { error } = await removeFromWatchlist(productType, productId);
                if (error) throw error;

                setIsWatched(false);
                toast({
                    title: "সরানো হয়েছে",
                    description: "ওয়াচলিস্ট থেকে সরানো হয়েছে",
                });
            } else {
                const { error } = await addToWatchlist(productType, productId);
                if (error) throw error;

                setIsWatched(true);
                toast({
                    title: "যোগ করা হয়েছে",
                    description: "ওয়াচলিস্টে যোগ করা হয়েছে। পরিবর্তন হলে আপনাকে জানানো হবে।",
                });
            }
        } catch (error) {
            console.error('Watchlist error:', error);
            toast({
                title: "ত্রুটি",
                description: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === 'icon') {
        return (
            <button
                onClick={handleToggleWatchlist}
                disabled={isLoading}
                className={cn(
                    "p-2 rounded-lg transition-colors",
                    isWatched
                        ? "text-primary bg-primary/10 hover:bg-primary/20"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                    isLoading && "opacity-50 cursor-not-allowed",
                    className
                )}
                title={isWatched ? "ওয়াচলিস্ট থেকে সরান" : "ওয়াচলিস্টে যোগ করুন"}
            >
                <MaterialIcon
                    name={isWatched ? "bookmark" : "bookmark_border"}
                    className="text-xl"
                />
            </button>
        );
    }

    return (
        <Button
            variant={isWatched ? "default" : "outline"}
            onClick={handleToggleWatchlist}
            disabled={isLoading}
            className={cn("font-bold", className)}
        >
            <MaterialIcon
                name={isWatched ? "bookmark" : "bookmark_border"}
                className="text-lg mr-1"
            />
            {isWatched ? "ওয়াচলিস্টে আছে" : "ওয়াচলিস্টে যোগ করুন"}
        </Button>
    );
};

export default WatchlistButton;
