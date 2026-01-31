import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchScrapedData, approveScrapedData, rejectScrapedData } from "@/lib/api/scraper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ScrapedDataManager() {
    const queryClient = useQueryClient();

    const { data: items, isLoading } = useQuery({
        queryKey: ["scraped_data", "pending"],
        queryFn: () => fetchScrapedData('pending'),
    });

    const approveMutation = useMutation({
        mutationFn: async (item: any) => {
            const table = item.data_type === 'credit_card' ? 'credit_cards' :
                item.data_type === 'loan' ? 'loan_products' : 'credit_cards';

            // Clean the JSON data for insertion
            const { ...cleanData } = item.scraped_json;
            // Map simple fields if needed, e.g. 'annual_fee' string to structured if schema differs

            await approveScrapedData(item.id, table, cleanData, item.bank_id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scraped_data"] });
            toast.success("Data approved and merged!");
        },
        onError: (err) => {
            toast.error("Failed to approve: " + err.message);
        }
    });

    const rejectMutation = useMutation({
        mutationFn: rejectScrapedData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scraped_data"] });
            toast.success("Data rejected.");
        }
    });

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Pending Scraped Items</h3>
                    <p className="text-sm text-muted-foreground">{items?.length || 0} items waiting for review</p>
                </div>
            </div>

            <div className="grid gap-4">
                {items?.map((item) => (
                    <Card key={item.id}>
                        <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{item.banks?.name}</Badge>
                                    <Badge>{item.data_type}</Badge>
                                </div>
                                <CardTitle className="mt-2 text-base">
                                    {item.scraped_json.name || "Unknown Product"}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1 mt-1">
                                    <a href={item.source_url} target="_blank" rel="noreferrer" className="flex items-center hover:underline">
                                        Source <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                    <span className="text-xs ml-2 text-muted-foreground">
                                        Scraped {new Date(item.scraped_at).toLocaleDateString()}
                                    </span>
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => rejectMutation.mutate(item.id)}
                                    disabled={rejectMutation.isPending}
                                >
                                    <X className="h-4 w-4 mr-1" /> Reject
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => approveMutation.mutate(item)}
                                    disabled={approveMutation.isPending}
                                >
                                    <Check className="h-4 w-4 mr-1" /> Approve
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-40 w-full rounded-md border bg-muted/50 p-4">
                                <pre className="text-xs">{JSON.stringify(item.scraped_json, null, 2)}</pre>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                ))}

                {!items?.length && (
                    <div className="text-center py-12 border rounded-lg border-dashed text-muted-foreground">
                        No pending scraped data found.
                    </div>
                )}
            </div>
        </div>
    );
}
