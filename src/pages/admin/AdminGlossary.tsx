import { useState, useEffect } from "react";
import { adminService, type DbGlossaryTerm } from "@/services/adminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { glossaryTerms } from "@/data/glossary"; // Import static for seeding

const AdminGlossary = () => {
    const [terms, setTerms] = useState<DbGlossaryTerm[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Edit/Add State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        term: "",
        termEn: "",
        definition: "",
        example: "",
        category: "general"
    });

    const loadTerms = async () => {
        try {
            setLoading(true);
            const data = await adminService.getGlossaryTerms();
            setTerms(data);
        } catch (error) {
            toast.error("Failed to load glossary terms");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTerms();
    }, []);

    const handleSave = async () => {
        try {
            const payload = {
                term: formData.term,
                term_en: formData.termEn,
                definition: formData.definition,
                example: formData.example,
                category: formData.category,
                is_active: true
            };

            if (editingId) {
                await adminService.updateGlossaryTerm(editingId, payload);
                toast.success("Term updated");
            } else {
                await adminService.addGlossaryTerm(payload);
                toast.success("Term added");
            }
            setIsDialogOpen(false);
            loadTerms();
        } catch (error) {
            toast.error("Failed to save term");
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await adminService.deleteGlossaryTerm(id);
            toast.success("Term deleted");
            loadTerms();
        } catch (error) {
            toast.error("Failed to delete term");
        }
    };

    const handleSeed = async () => {
        if (!confirm("This will migrate all static terms to the database. Continue?")) return;

        try {
            let count = 0;
            for (const t of glossaryTerms) {
                await adminService.addGlossaryTerm({
                    term: t.term,
                    term_en: t.termEn,
                    definition: t.definition,
                    example: t.example,
                    category: t.category,
                    is_active: true
                });
                count++;
            }
            toast.success(`Migrated ${count} terms successfully!`);
            loadTerms();
        } catch (error) {
            console.error(error);
            toast.error("Migration failed (partial success possible)");
        }
    };

    const openAdd = () => {
        setEditingId(null);
        setFormData({ term: "", termEn: "", definition: "", example: "", category: "general" });
        setIsDialogOpen(true);
    };

    const openEdit = (term: DbGlossaryTerm) => {
        setEditingId(term.id);
        setFormData({
            term: term.term,
            termEn: term.term_en || "",
            definition: term.definition,
            example: term.example || "",
            category: term.category
        });
        setIsDialogOpen(true);
    };

    const filtered = terms.filter(t =>
        t.term.includes(searchTerm) || t.term_en?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Glossary</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSeed}>
                        <MaterialIcon name="cloud_upload" className="mr-2" />
                        Migrate Static Data
                    </Button>
                    <Button onClick={openAdd}>
                        <MaterialIcon name="add" className="mr-2" />
                        Add Term
                    </Button>
                </div>
            </div>

            <div className="mb-4">
                <Input
                    placeholder="Search terms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                />
            </div>

            <div className="border rounded-lg bg-card">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground border-b">
                        <tr>
                            <th className="p-3">Term (BN)</th>
                            <th className="p-3">Term (EN)</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Definition</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center">Loading...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No terms found</td></tr>
                        ) : (
                            filtered.map((term) => (
                                <tr key={term.id} className="border-b last:border-0 hover:bg-muted/50">
                                    <td className="p-3 font-medium">{term.term}</td>
                                    <td className="p-3">{term.term_en}</td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                            {term.category}
                                        </span>
                                    </td>
                                    <td className="p-3 max-w-xs truncate" title={term.definition}>{term.definition}</td>
                                    <td className="p-3 text-right">
                                        <Button size="sm" variant="ghost" onClick={() => openEdit(term)}>
                                            <MaterialIcon name="edit" className="text-blue-600" />
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={() => handleDelete(term.id)}>
                                            <MaterialIcon name="delete" className="text-red-600" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Term" : "Add New Term"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Term (Bangla)</label>
                                <Input
                                    value={formData.term}
                                    onChange={e => setFormData({ ...formData, term: e.target.value })}
                                    placeholder="e.g. ইএমআই"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Term (English)</label>
                                <Input
                                    value={formData.termEn}
                                    onChange={e => setFormData({ ...formData, termEn: e.target.value })}
                                    placeholder="e.g. EMI"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Select
                                value={formData.category}
                                onValueChange={v => setFormData({ ...formData, category: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="banking">Banking</SelectItem>
                                    <SelectItem value="loans">Loans</SelectItem>
                                    <SelectItem value="cards">Cards</SelectItem>
                                    <SelectItem value="investing">Investing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Definition</label>
                            <Textarea
                                value={formData.definition}
                                onChange={e => setFormData({ ...formData, definition: e.target.value })}
                                placeholder="Explain the term..."
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Example (Optional)</label>
                            <Textarea
                                value={formData.example}
                                onChange={e => setFormData({ ...formData, example: e.target.value })}
                                placeholder="Provide an example context..."
                                rows={2}
                            />
                        </div>

                        <Button className="w-full" onClick={handleSave}>
                            Save Term
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminGlossary;
