import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { toast } from "sonner";

interface SocialShareProps {
    url?: string;
    title?: string;
    className?: string;
}

const SocialShare = ({ url, title, className }: SocialShareProps) => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    const shareToWhatsApp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareToFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookUrl, "_blank");
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("লিংক কপি করা হয়েছে!");
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-xs font-bold text-muted-foreground mr-1">শেয়ার করুন:</span>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full size-8 border-green-500/20 hover:bg-green-500/10 text-green-600"
                onClick={shareToWhatsApp}
                title="WhatsApp-এ শেয়ার করুন"
            >
                <MaterialIcon name="share" className="text-lg" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full size-8 border-blue-600/20 hover:bg-blue-600/10 text-blue-700"
                onClick={shareToFacebook}
                title="Facebook-এ শেয়ার করুন"
            >
                <MaterialIcon name="facebook" className="text-lg" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="rounded-full size-8"
                onClick={copyToClipboard}
                title="লিংক কপি করুন"
            >
                <MaterialIcon name="content_copy" className="text-lg" />
            </Button>
        </div>
    );
};

export default SocialShare;
