import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchScrapedData, approveScrapedData, rejectScrapedData } from "@/lib/api/scraper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Check, X, ExternalLink, CheckSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ScrapedDataManager() {
    const queryClient = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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
            await approveScrapedData(item.id, table, cleanData, item.bank_id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scraped_data"] });
            toast.success("Item approved!");
        },
        onError: (err) => {
            toast.error("Failed to approve: " + err.message);
        }
    });

    const rejectMutation = useMutation({
        mutationFn: rejectScrapedData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scraped_data"] });
            toast.success("Item rejected.");
        }
    });

    const bulkApproveMutation = useMutation({
        mutationFn: async (itemsToApprove: any[]) => {
            let successCount = 0;
            let failCount = 0;

            for (const item of itemsToApprove) {
                try {
                    const table = item.data_type === 'credit_card' ? 'credit_cards' :
                        item.data_type === 'loan' ? 'loan_products' : 'credit_cards';
                    const { ...cleanData } = item.scraped_json;
                    await approveScrapedData(item.id, table, cleanData, item.bank_id);
                    successCount++;
                } catch (e) {
                    console.error("Failed to approve item", item.id, e);
                    failCount++;
                }
            }
            return { successCount, failCount };
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["scraped_data"] });
            setSelectedIds(new Set()); // Clear selection
            toast.success(`Approved ${data.successCount} items.${data.failCount > 0 ? ` Failed: ${data.failCount}` : ''}`);
        }
    });

    const bulkRejectMutation = useMutation({
        mutationFn: async (idsToReject: string[]) => {
            for (const id of idsToReject) {
                await rejectScrapedData(id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scraped_data"] });
            setSelectedIds(new Set()); // Clear selection
            toast.success("Selected items rejected.");
        }
    });

    const handleSelectAll = (checked: boolean) => {
        if (checked && items) {
            setSelectedIds(new Set(items.map(i => i.id)));
        } else {
            setSelectedIds(new Set());
        }
    };

    const handleSelectOne = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedIds);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkApprove = () => {
        if (!items) return;
        const itemsToApprove = items.filter(i => selectedIds.has(i.id));
        bulkApproveMutation.mutate(itemsToApprove);
    };

    const handleBulkReject = () => {
        bulkRejectMutation.mutate(Array.from(selectedIds));
    };

    const handleApproveAll = () => {
        if (!items) return;
        if (confirm(`Are you sure you want to approve all ${items.length} items?`)) {
            bulkApproveMutation.mutate(items);
        }
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    const allSelected = items?.length && items.length > 0 && selectedIds.size === items.length;
    const isIndeterminate = selectedIds.size > 0 && items?.length && selectedIds.size < items.length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-medium">Pending Scraped Items</h3>
                    <p className="text-sm text-muted-foreground">{items?.length || 0} items waiting for review</p>
                </div>

                <div className="flex gap-2">
                    {selectedIds.size > 0 && (
                        <>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleBulkReject}
                                disabled={bulkRejectMutation.isPending}
                            >
                                <Trash2 className="h-4 w-4 mr-1" /> Reject ({selectedIds.size})
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={handleBulkApprove}
                                disabled={bulkApproveMutation.isPending}
                            >
                                <CheckSquare className="h-4 w-4 mr-1" /> Approve ({selectedIds.size})
                            </Button>
                        </>
                    )}
                    {items && items.length > 0 && selectedIds.size === 0 && (
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleApproveAll}
                            disabled={bulkApproveMutation.isPending}
                        >
                            <CheckSquare className="h-4 w-4 mr-1" /> Approve All ({items.length})
                        </Button>
                    )}
                </div>
            </div>

            {items && items.length > 0 && (
                <div className="flex items-center gap-2 pb-2 pl-1">
                    <Checkbox
                        id="select-all"
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                        Select All
                    </label>
                </div>
            )}

            <div className="grid gap-4">
                {items?.map((item) => (
                    <Card key={item.id} className={selectedIds.has(item.id) ? "border-primary/50 bg-accent/5" : ""}>
                        <CardHeader className="flex flex-row items-start gap-4 pb-2">
                            <Checkbox
                                id={`select-${item.id}`}
                                className="mt-1"
                                checked={selectedIds.has(item.id)}
                                onCheckedChange={(checked) => handleSelectOne(item.id, checked as boolean)}
                            />
                            <div className="flex-1">
                                <div className="flex flex-row items-start justify-between">
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
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-12">
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
