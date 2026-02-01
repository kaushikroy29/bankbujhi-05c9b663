import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { adminService } from "@/services/adminService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
    itemId: string;
    itemType: 'guide' | 'term';
    className?: string;
    showCount?: boolean; // Future proofing
    variant?: 'default' | 'ghost' | 'icon';
}

const LikeButton = ({ itemId, itemType, className, variant = "default" }: LikeButtonProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const checkAuthAndStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                const liked = await adminService.checkFavoriteStatus(user.id, itemId);
                setIsLiked(liked);
            }
        };
        checkAuthAndStatus();
    }, [itemId]);

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent bubbling if in a card link
        e.stopPropagation();

        if (!userId) {
            toast.error("Please login to save favorites");
            // Optionally trigger auth modal
            return;
        }

        const oldState = isLiked;
        setIsLiked(!oldState); // Optimistic

        try {
            setLoading(true);
            await adminService.toggleFavorite(userId, itemId, itemType);
            toast.success(oldState ? "Removed from favorites" : "Added to favorites");
        } catch (error) {
            setIsLiked(oldState); // Revert
            toast.error("Failed to update favorite");
        } finally {
            setLoading(false);
        }
    };

    if (variant === 'icon') {
        return (
            <button
                onClick={handleToggle}
                className={cn("transition-colors hover:scale-110 active:scale-95", className)}
                disabled={loading}
            >
                <MaterialIcon
                    name={isLiked ? "favorite" : "favorite_border"}
                    className={cn(
                        "text-xl",
                        isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                    )}
                />
            </button>
        );
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleToggle}
            disabled={loading}
            className={cn("gap-2", className)}
        >
            <MaterialIcon
                name={isLiked ? "favorite" : "favorite_border"}
                className={isLiked ? "text-red-500" : ""}
            />
            {isLiked ? "Saved" : "Save"}
        </Button>
    );
};

export default LikeButton;
