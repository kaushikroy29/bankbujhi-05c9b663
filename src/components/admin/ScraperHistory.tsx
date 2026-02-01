import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchScraperRuns, triggerScraperRun } from "@/lib/api/scraper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Clock, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ScraperHistory() {
    const { data: runs, isLoading } = useQuery({
        queryKey: ["scraper_runs"],
        queryFn: fetchScraperRuns,
    });

    const queryClient = useQueryClient();

    const triggerMutation = useMutation({
        mutationFn: () => triggerScraperRun(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scraper_runs"] });
            toast.success("Scraper run initiated!");
        },
        onError: (err) => {
            toast.error("Failed to start run: " + err.message);
        }
    });

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Scraper Run History</CardTitle>
                <Button
                    size="sm"
                    onClick={() => triggerMutation.mutate()}
                    disabled={triggerMutation.isPending}
                >
                    {triggerMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Play className="mr-2 h-4 w-4" />
                    )}
                    Run Scraper Now
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {runs?.map((run) => (
                        <div key={run.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                {run.status === 'success' && <CheckCircle className="text-green-500" />}
                                {run.status === 'failed' && <XCircle className="text-red-500" />}
                                {run.status === 'partial' && <Clock className="text-yellow-500" />}
                                {run.status === 'running' && <Loader2 className="animate-spin text-blue-500" />}

                                <div>
                                    <div className="font-medium capitalize">{run.run_type} Run</div>
                                    <div className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(run.started_at), { addSuffix: true })}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 text-sm">
                                <div className="text-center">
                                    <div className="text-muted-foreground">Banks</div>
                                    <div className="font-bold">{run.banks_scraped || 0}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-muted-foreground">Items</div>
                                    <div className="font-bold">{run.items_found || 0}</div>
                                </div>
                                <div className="min-w-[100px] flex justify-end">
                                    <Badge variant={
                                        run.status === 'success' ? 'default' :
                                            run.status === 'failed' ? 'destructive' : 'secondary'
                                    }>
                                        {run.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!runs?.length && <div className="text-center text-muted-foreground py-8">No run history found.</div>}
                </div>
            </CardContent>
        </Card>
    );
}
