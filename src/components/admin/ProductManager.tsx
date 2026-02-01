import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCreditCardForm from "./forms/AddCreditCardForm";
import AddLoanForm from "./forms/AddLoanForm";

interface ProductSummary {
    id: string;
    name: string;
    bank_name?: string;
    type: 'credit_card' | 'loan';
    is_active: boolean;
}

export default function ProductManager() {
    const [products, setProducts] = useState<ProductSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const { data: cards } = await supabase.from('credit_cards').select('id, name, is_active, banks(name)');
            const { data: loans } = await supabase.from('loan_products').select('id, name, is_active, banks(name)');

            const formattedCards = (cards || []).map(c => ({
                id: c.id,
                name: c.name,
                bank_name: c.banks?.name || 'Unknown',
                type: 'credit_card' as const,
                is_active: c.is_active !== false
            }));

            const formattedLoans = (loans || []).map(l => ({
                id: l.id,
                name: l.name,
                bank_name: l.banks?.name || 'Unknown',
                type: 'loan' as const,
                is_active: l.is_active !== false
            }));

            setProducts([...formattedCards, ...formattedLoans]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const filteredProducts = activeTab === "all"
        ? products
        : products.filter(p => p.type === activeTab);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Products</h2>
                <div className="flex gap-2">
                    <AddLoanForm onSuccess={loadProducts} />
                    <AddCreditCardForm onSuccess={loadProducts} />
                </div>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All Products</TabsTrigger>
                    <TabsTrigger value="credit_card">Credit Cards</TabsTrigger>
                    <TabsTrigger value="loan">Loans</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="bg-card border rounded-xl overflow-hidden shadow-sm mt-4">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="p-4 font-bold">Product Name</th>
                            <th className="p-4 font-bold">Bank</th>
                            <th className="p-4 font-bold">Type</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No products found.</td></tr>
                        ) : (
                            filteredProducts.map((p) => (
                                <tr key={p.id} className="hover:bg-muted/5">
                                    <td className="p-4 font-medium">{p.name}</td>
                                    <td className="p-4">{p.bank_name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.type === 'credit_card' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {p.type === 'credit_card' ? 'Credit Card' : 'Loan'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {p.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button size="sm" variant="ghost">Edit</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
