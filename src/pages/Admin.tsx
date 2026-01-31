import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface AdminProduct {
    id: string;
    name: string;
    annual_fee: string;
    interest_rate: string;
    type: 'credit_card' | 'loan';
}

const Admin = () => {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<AdminProduct>>({});
    const { toast } = useToast();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const { data: cards } = await supabase.from('credit_cards').select('id, name, annual_fee, interest_rate');
            const { data: loans } = await supabase.from('loan_products').select('id, name, interest_rate_min, interest_rate_max, processing_fee');

            const formattedCards = cards?.map(c => ({
                id: c.id,
                name: c.name,
                annual_fee: c.annual_fee,
                interest_rate: c.interest_rate,
                type: 'credit_card' as const
            })) || [];

            // Quick mapping for loans to fit the simplified interface
            const formattedLoans = loans?.map(l => ({
                id: l.id,
                name: l.name,
                annual_fee: l.processing_fee, // Using processing fee as the "fee" field for now
                interest_rate: `${l.interest_rate_min}% - ${l.interest_rate_max}%`,
                type: 'loan' as const
            })) || [];

            setProducts([...formattedCards, ...formattedLoans]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: AdminProduct) => {
        setEditingId(product.id);
        setEditForm({
            annual_fee: product.annual_fee,
            interest_rate: product.interest_rate
        });
    };

    const handleSave = async (id: string, type: 'credit_card' | 'loan') => {
        try {
            const tableName = type === 'credit_card' ? 'credit_cards' : 'loan_products';

            // Allow partial updates
            const updates: any = {};
            if (editForm.annual_fee) {
                if (type === 'credit_card') updates.annual_fee = editForm.annual_fee;
                else updates.processing_fee = editForm.annual_fee; // Mapping back for loans
            }
            if (editForm.interest_rate) {
                if (type === 'credit_card') updates.interest_rate = editForm.interest_rate;
                // For loans we'd need more logic, skipping simple text edit for loan rates for now to avoid breaking types
            }

            if (Object.keys(updates).length === 0) return;

            const { error } = await supabase
                .from(tableName)
                .update(updates)
                .eq('id', id);

            if (error) throw error;

            toast({ title: "Updated!", description: "Change logged and notification sent (if configured)." });
            setEditingId(null);
            loadProducts(); // Refresh list

        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to update product.", variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage products and trigger real-time updates</p>
                    </div>
                </div>

                <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="p-4 font-bold">Product Name</th>
                                    <th className="p-4 font-bold">Type</th>
                                    <th className="p-4 font-bold">Fee / Price</th>
                                    <th className="p-4 font-bold">Rate</th>
                                    <th className="p-4 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-muted/5">
                                        <td className="p-4 font-medium">{product.name}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.type === 'credit_card' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                {product.type === 'credit_card' ? 'Credit Card' : 'Loan'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {editingId === product.id ? (
                                                <Input
                                                    value={editForm.annual_fee}
                                                    onChange={e => setEditForm({ ...editForm, annual_fee: e.target.value })}
                                                    className="h-8 w-32"
                                                />
                                            ) : (
                                                <span className="font-mono">{product.annual_fee}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingId === product.id && product.type === 'credit_card' ? (
                                                <Input
                                                    value={editForm.interest_rate}
                                                    onChange={e => setEditForm({ ...editForm, interest_rate: e.target.value })}
                                                    className="h-8 w-24"
                                                />
                                            ) : (
                                                <span className="font-mono">{product.interest_rate}</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            {editingId === product.id ? (
                                                <div className="flex gap-2 justify-end">
                                                    <Button size="sm" onClick={() => handleSave(product.id, product.type)}>Save</Button>
                                                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                                                </div>
                                            ) : (
                                                <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                                                    <MaterialIcon name="edit" className="mr-1 text-base" /> Edit
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Admin;
