import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchBanks, type Bank } from "@/lib/api/banks";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Skeleton } from "@/components/ui/skeleton";
import AddBankForm from "./forms/AddBankForm";

export default function BankManager() {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        loadBanks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadBanks = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
            const data = await fetchBanks();
            setBanks(data);
        } catch (error) {
            console.error("Error loading banks:", error);
            setErrorMsg(error instanceof Error ? error.message : "Failed to load banks");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Partner Banks</h2>
                <AddBankForm onSuccess={loadBanks} />
            </div>

            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="p-4 font-bold">Bank Name</th>
                            <th className="p-4 font-bold">Headquarters</th>
                            <th className="p-4 font-bold">Est. Year</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center">Loading...</td>
                            </tr>
                        ) : errorMsg ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-red-500">
                                    Error: {errorMsg}
                                </td>
                            </tr>
                        ) : banks.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-muted-foreground">No banks found.</td>
                            </tr>
                        ) : (
                            banks.map((bank) => (
                                <tr key={bank.id} className="hover:bg-muted/5">
                                    <td className="p-4 font-medium flex items-center gap-2">
                                        {bank.logo_url && <img src={bank.logo_url} alt="" className="w-6 h-6 object-contain" />}
                                        {bank.name}
                                    </td>
                                    <td className="p-4">{bank.headquarters || "-"}</td>
                                    <td className="p-4">{bank.established_year || "-"}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${bank.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {bank.is_active ? 'Active' : 'Inactive'}
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
