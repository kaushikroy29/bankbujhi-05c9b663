import { useQuery } from "@tanstack/react-query";
import { fetchScraperRuns } from "@/lib/api/scraper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ScraperHistory() {
    const { data: runs, isLoading } = useQuery({
        queryKey: ["scraper_runs"],
        queryFn: fetchScraperRuns,
    });

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Scraper Run History</CardTitle>
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
