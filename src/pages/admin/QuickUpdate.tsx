import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchCreditCards } from "@/lib/api/banks";

const QuickUpdate = () => {
    const [date, setDate] = useState<Date>();
    const [selectedCard, setSelectedCard] = useState("");
    const [updateType, setUpdateType] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Fetch cards for dropdown
    const { data: cards, isLoading } = useQuery({
        queryKey: ['credit-cards-admin'],
        queryFn: () => fetchCreditCards({})
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success("আপডেট সফলভাবে জমা দেওয়া হয়েছে", {
            description: "যাচাইকরণের পর এটি প্রকাশ করা হবে।"
        });

        setSubmitting(false);
        // Reset form would go here
    };

    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full pb-20 md:pb-8">
                <PageBreadcrumb
                    items={[
                        { label: "অ্যাডমিন", href: "/admin" },
                        { label: "কুইক আপডেট" }
                    ]}
                    className="mb-6"
                />

                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary/10 p-3 rounded-xl">
                        <MaterialIcon name="update" className="text-primary text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">প্রোডাক্ট আপডেট ড্যাশবোর্ড</h1>
                        <p className="text-muted-foreground">কার্ডের ফি বা সুবিধাদি পরিবর্তন হলে এখানে এন্ট্রি দিন</p>
                    </div>
                </div>

                <div className="bg-card border border-primary/10 rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Product Select */}
                            <div className="space-y-2">
                                <Label>কার্ড নির্বাচন করুন</Label>
                                <Select value={selectedCard} onValueChange={setSelectedCard}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="কার্ড খুঁজুন..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {isLoading ? (
                                            <SelectItem value="loading" disabled>লোড হচ্ছে...</SelectItem>
                                        ) : (
                                            cards?.map(card => (
                                                <SelectItem key={card.id} value={card.id}>
                                                    {card.name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Update Type */}
                            <div className="space-y-2">
                                <Label>আপডেটের ধরন</Label>
                                <Select value={updateType} onValueChange={setUpdateType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="ধরন নির্বাচন করুন" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fee_change">ফি পরিবর্তন (Fee Change)</SelectItem>
                                        <SelectItem value="benefit_added">নতুন সুবিধা (Benefit Added)</SelectItem>
                                        <SelectItem value="benefit_removed">সুবিধা বাতিল (Benefit Removed)</SelectItem>
                                        <SelectItem value="rate_change">সুদের হার পরিবর্তন (Rate Change)</SelectItem>
                                        <SelectItem value="new_offer">নতুন অফার (New Offer)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Old Value */}
                            <div className="space-y-2">
                                <Label>পুরাতন ভ্যালু (ঐচ্ছিক)</Label>
                                <Input placeholder="উদাহরণ: ৳৫,০০০" />
                            </div>

                            {/* New Value */}
                            <div className="space-y-2">
                                <Label>নতুন ভ্যালু</Label>
                                <Input placeholder="উদাহরণ: ৳৬,০০০" required />
                            </div>
                        </div>

                        {/* Effective Date */}
                        <div className="space-y-2 flex flex-col">
                            <Label>কার্যকর হওয়ার তারিখ</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        {date ? (
                                            format(date, "PPP")
                                        ) : (
                                            <span>তারিখ নির্বাচন করুন</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={(date) =>
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Reason/Description */}
                        <div className="space-y-2">
                            <Label>পরিবর্তনের কারণ / বিস্তারিত</Label>
                            <Textarea
                                placeholder="কেন পরিবর্তন করা হলো বা বিস্তারিত লিখুন..."
                                className="min-h-[100px]"
                            />
                        </div>

                        {/* Source URL */}
                        <div className="space-y-2">
                            <Label>সূত্র (লিংক)</Label>
                            <Input placeholder="https://bank-website.com/announcement" />
                            <p className="text-xs text-muted-foreground">ব্যাংকের অফিশিয়াল নোটিশের লিংক দিন</p>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                                {submitting ? "প্রসেসিং হচ্ছে..." : "আপডেট জমা দিন"}
                            </Button>
                        </div>

                    </form>
                </div>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default QuickUpdate;
