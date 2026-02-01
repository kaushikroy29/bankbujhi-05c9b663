import { useState, useEffect } from "react";
import { adminService } from "@/services/adminService";
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
import { toast } from "sonner";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { articles } from "@/data/guides"; // Import static for seeding

const AdminGuides = () => {
    const [guides, setGuides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit/Add State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        titleEn: "",
        slug: "",
        category: "General",
        excerpt: "",
        content: "",
        readTime: "5 min",
        imageUrl: ""
    });

    const loadGuides = async () => {
        try {
            setLoading(true);
            const data = await adminService.getGuides();
            setGuides(data);
        } catch (error) {
            toast.error("Failed to load guides");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGuides();
    }, []);

    const handleSave = async () => {
        // Basic slug gen if empty
        let slug = formData.slug;
        if (!slug) {
            slug = formData.titleEn.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        }

        try {
            const payload = {
                title: formData.title,
                title_en: formData.titleEn,
                slug: slug,
                category: formData.category,
                excerpt: formData.excerpt,
                content: formData.content,
                read_time: formData.readTime,
                image_url: formData.imageUrl,
                is_featured: false
            };

            if (editingId) {
                await adminService.updateGuide(editingId, payload);
                toast.success("Guide updated");
            } else {
                await adminService.addGuide(payload);
                toast.success("Guide added");
            }
            setIsDialogOpen(false);
            loadGuides();
        } catch (error) {
            toast.error("Failed to save guide");
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await adminService.deleteGuide(id);
            toast.success("Guide deleted");
            loadGuides();
        } catch (error) {
            toast.error("Failed to delete guide");
        }
    };

    const handleSeed = async () => {
        if (!confirm("Migrate all static articles to DB?")) return;
        try {
            let count = 0;
            for (const a of articles) {
                await adminService.addGuide({
                    title: a.title,
                    title_en: a.titleEn || a.id,
                    slug: a.id, // Using existing ID as slug
                    category: a.category,
                    excerpt: a.excerpt,
                    content: a.content || "",
                    read_time: a.readTime,
                    image_url: a.image,
                    is_featured: a.isFeatured,
                });
                count++;
            }
            toast.success(`Migrated ${count} guides!`);
            loadGuides();
        } catch (error) {
            console.error(error);
            toast.error("Migration failed");
        }
    };

    const openAdd = () => {
        setEditingId(null);
        setFormData({
            title: "", titleEn: "", slug: "", category: "Tips",
            excerpt: "", content: "", readTime: "5 min", imageUrl: ""
        });
        setIsDialogOpen(true);
    };

    const openEdit = (guide: any) => {
        setEditingId(guide.id);
        setFormData({
            title: guide.title,
            titleEn: guide.title_en || "",
            slug: guide.slug,
            category: guide.category,
            excerpt: guide.excerpt || "",
            content: guide.content || "",
            readTime: guide.read_time || "5 min",
            imageUrl: guide.image_url || ""
        });
        setIsDialogOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Guides</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSeed}>
                        <MaterialIcon name="cloud_upload" className="mr-2" />
                        Migrate Data
                    </Button>
                    <Button onClick={openAdd}>
                        <MaterialIcon name="add" className="mr-2" />
                        Add Article
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : guides.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No guides found. Try migrating data.</div>
                ) : (
                    guides.map((guide) => (
                        <div key={guide.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{guide.title}</h3>
                                <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                                    <span className="bg-muted px-2 py-0.5 rounded">{guide.category}</span>
                                    <span>Slug: {guide.slug}</span>
                                    <span>{guide.read_time}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost" onClick={() => openEdit(guide)}>
                                    <MaterialIcon name="edit" className="text-blue-600" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleDelete(guide.id)}>
                                    <MaterialIcon name="delete" className="text-red-600" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Guide" : "New Guide"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title (BN)</label>
                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title (EN)</label>
                                <Input value={formData.titleEn} onChange={e => setFormData({ ...formData, titleEn: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <Input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <Input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Read Time</label>
                                <Input value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Excerpt</label>
                            <Textarea rows={2} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">HTML Content</label>
                            <Textarea rows={10} className="font-mono text-xs" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                        </div>

                        <Button className="w-full" onClick={handleSave}>Save Guide</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminGuides;
