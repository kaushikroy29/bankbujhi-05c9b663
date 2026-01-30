import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { CardRecommendation } from "@/lib/recommendations/matcher";
import { cn } from "@/lib/utils";

interface RecommendationResultsProps {
    recommendations: CardRecommendation[];
    onReset: () => void;
}

export const RecommendationResults = ({ recommendations, onReset }: RecommendationResultsProps) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-primary">আপনার জন্য সেরা {recommendations.length} টি কার্ড</h2>
                <p className="text-muted-foreground">আপনার প্রোফাইল এবং খরচের উপর ভিত্তি করে এই কার্ডগুলো নির্বাচন করা হয়েছে</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((item, index) => {
                    const { card, score, matchPercentage, reasons, netValue } = item;
                    const isTopPick = index === 0;

                    return (
                        <div key={card.id} className="relative group">
                            {isTopPick && (
                                <div className="absolute -top-4 left-0 right-0 z-10 flex justify-center">
                                    <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                        <MaterialIcon name="emoji_events" className="text-base" />
                                        Top Recommendation
                                    </span>
                                </div>
                            )}

                            <Card className={cn(
                                "h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-2",
                                isTopPick ? "border-primary/50 shadow-lg bg-primary/5" : "border-transparent hover:border-primary/20"
                            )}>
                                {/* Match Score */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="flex items-center justify-center size-12 rounded-full bg-background/90 backdrop-blur border text-primary font-bold shadow-sm">
                                        {matchPercentage}%
                                    </div>
                                </div>

                                {/* Card Image */}
                                <div className="aspect-[1.6/1] w-full bg-muted relative overflow-hidden">
                                    <img
                                        src={card.image_url || "/placeholder.png"}
                                        alt={card.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-xs font-medium opacity-90">{card.banks?.name}</p>
                                        <h3 className="font-bold text-lg leading-tight">{card.name}</h3>
                                    </div>
                                </div>

                                <div className="p-5 space-y-4">
                                    {/* Reasons */}
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">কেন এটি সেরা?</p>
                                        <ul className="space-y-1">
                                            {reasons.map((reason, i) => (
                                                <li key={i} className="text-sm flex items-start gap-2">
                                                    <MaterialIcon name="check_circle" className="text-green-600 text-base mt-0.5" />
                                                    <span>{reason}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Net Value */}
                                    {(netValue !== undefined && netValue > 0) && (
                                        <div className="bg-primary/10 rounded-lg p-3 flex items-center justify-between">
                                            <span className="text-sm font-medium">আনুমানিক বার্ষিক লাভ</span>
                                            <span className="font-black text-primary">৳{netValue.toLocaleString()}</span>
                                        </div>
                                    )}

                                    {/* Action */}
                                    <Button onClick={() => navigate(`/cards/${card.id}`)} className="w-full font-bold">
                                        বিস্তারিত দেখুন
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center pt-8">
                <Button variant="outline" onClick={onReset} className="gap-2">
                    <MaterialIcon name="refresh" />
                    আবার শুরু করুন
                </Button>
            </div>
        </div>
    );
};
