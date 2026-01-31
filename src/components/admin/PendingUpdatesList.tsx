import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPendingUpdates, approveUpdate, rejectUpdate } from "@/lib/api/updates";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Check, X, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PendingUpdatesList() {
    const queryClient = useQueryClient();

    // Fetch Pending Updates
    const { data: pendingUpdates, isLoading } = useQuery({
        queryKey: ['pending-updates'],
        queryFn: fetchPendingUpdates
    });

    // Approve Mutation
    const approveMutation = useMutation({
        mutationFn: approveUpdate,
        onSuccess: () => {
            toast.success("আপডেটটি অনুমোদিত হয়েছে এবং ব্যবহারকারীদের জানানো হয়েছে।");
            queryClient.invalidateQueries({ queryKey: ['pending-updates'] });
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    // Reject Mutation
    const rejectMutation = useMutation({
        mutationFn: rejectUpdate,
        onSuccess: () => {
            toast.success("আপডেটটি বাতিল করা হয়েছে।");
            queryClient.invalidateQueries({ queryKey: ['pending-updates'] });
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    if (isLoading) {
        return (
            <div className="flex bg-background w-full items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">Pending Updates</h2>
                <p className="text-muted-foreground text-sm">
                    Verify and approve data changes submitted by the system or other admins.
                </p>
            </div>

            {!pendingUpdates || pendingUpdates.length === 0 ? (
                <Card className="bg-muted/30 border-dashed border-2">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-background p-4 rounded-full mb-4">
                            <Check className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold">All updates verified</h3>
                        <p className="text-muted-foreground mt-2">No pending updates at the moment.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {pendingUpdates.map(update => (
                        <Card key={update.id} className="overflow-hidden transition-all hover:shadow-md">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="text-xs uppercase font-bold tracking-wider">
                                                {update.product_type === 'credit_card' ? 'Credit Card' :
                                                    update.product_type === 'loan' ? 'Loan' : 'Savings'}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">• {update.bank_name}</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-primary mb-1">{update.product_name || "Unknown Product"}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Field Update: <span className="font-mono text-foreground font-bold">{update.field_name}</span></p>

                                        <div className="grid grid-cols-2 gap-4 bg-muted/40 p-4 rounded-lg border">
                                            <div>
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Old Value</span>
                                                <p className="text-lg strike-through decoration-red-500/50 line-through decoration-2 text-muted-foreground/70 font-mono">
                                                    {update.old_value || "(Empty)"}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium text-muted-foreground uppercase">New Value</span>
                                                <p className="text-lg font-bold text-green-600 font-mono">
                                                    {update.new_value}
                                                </p>
                                            </div>
                                        </div>

                                        {update.source_url && (
                                            <div className="mt-3">
                                                <a
                                                    href={update.source_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                                >
                                                    Verify Source
                                                    <AlertCircle className="h-3 w-3" />
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex md:flex-col gap-2 min-w-[140px]">
                                        <Button
                                            variant="default"
                                            className="w-full bg-green-600 hover:bg-green-700"
                                            onClick={() => approveMutation.mutate(update.id)}
                                            disabled={approveMutation.isPending || rejectMutation.isPending}
                                        >
                                            {approveMutation.isPending && approveMutation.variables === update.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            ) : (
                                                <Check className="h-4 w-4 mr-2" />
                                            )}
                                            Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                                            onClick={() => rejectMutation.mutate(update.id)}
                                            disabled={approveMutation.isPending || rejectMutation.isPending}
                                        >
                                            {rejectMutation.isPending && rejectMutation.variables === update.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            ) : (
                                                <X className="h-4 w-4 mr-2" />
                                            )}
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
