import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchBanks } from "@/lib/api/banks";
import { fetchPendingUpdates } from "@/lib/api/updates";
import BankManager from "@/components/admin/BankManager";
import ProductManager from "@/components/admin/ProductManager";
import PendingUpdatesList from "@/components/admin/PendingUpdatesList";
import ScrapedDataManager from "@/components/admin/ScrapedDataManager";
import ScraperHistory from "@/components/admin/ScraperHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Building2, CreditCard, AlertCircle } from "lucide-react";

import AdminGlossary from "./admin/AdminGlossary";
import AdminGuides from "./admin/AdminGuides";

export default function Admin() {
    const [stats, setStats] = useState({
        banks: 0,
        products: 0,
        updates: 0
    });

    useEffect(() => {
        loadStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadStats = async () => {
        try {
            console.log("Loading admin stats...");
            const banks = await fetchBanks();
            console.log("Banks fetched:", banks?.length);

            const updates = await fetchPendingUpdates();
            console.log("Updates fetched:", updates?.length);

            const { count: cardsCount, error: cardsError } = await supabase.from('credit_cards').select('*', { count: 'exact', head: true });
            if (cardsError) console.error("Cards count error:", cardsError);

            const { count: loansCount, error: loansError } = await supabase.from('loan_products').select('*', { count: 'exact', head: true });
            if (loansError) console.error("Loans count error:", loansError);

            setStats({
                banks: banks.length,
                products: (cardsCount || 0) + (loansCount || 0),
                updates: updates.length
            });
        } catch (error) {
            console.error("Failed to load admin stats:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage banks, products, verification requests, and content.</p>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-muted/50 p-1">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="banks">Banks</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="glossary">Glossary</TabsTrigger>
                        <TabsTrigger value="guides">Guides</TabsTrigger>
                        <TabsTrigger value="updates" className="relative">
                            Pending Updates
                            {stats.updates > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                                    {stats.updates}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="scraped">Scraped Data</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Banks</CardTitle>
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.banks}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.products}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Updates</CardTitle>
                                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.updates}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Activities</CardTitle>
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+5</div>
                                    <p className="text-xs text-muted-foreground">Last 24 hours</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="banks">
                        <BankManager />
                    </TabsContent>

                    <TabsContent value="products">
                        <ProductManager />
                    </TabsContent>

                    <TabsContent value="glossary">
                        <AdminGlossary />
                    </TabsContent>

                    <TabsContent value="guides">
                        <AdminGuides />
                    </TabsContent>

                    <TabsContent value="updates">
                        <PendingUpdatesList />
                    </TabsContent>

                    <TabsContent value="scraped">
                        <ScrapedDataManager />
                    </TabsContent>

                    <TabsContent value="history">
                        <ScraperHistory />
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
