import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { fetchBanks, type Bank } from "@/lib/api/banks";
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/seo/SEOHead";
import { Badge } from "@/components/ui/badge";

const MFIs = () => {
    const [mfis, setMfis] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Mock fetching MFIs. In reality, we'd filter banks/institutions
            const banksData = await fetchBanks();

            // Mock filter for demonstration: 'Micro', 'Grameen', 'Asha', 'Brac' (NGO part)
            // Since real data might not display these yet, we might need a fallback or placeholder
            const potentialMfis = banksData.filter(b =>
                b.name.includes("Micro") ||
                b.name.includes("Grameen") ||
                b.name.includes("Asha") ||
                b.type === 'mfi'
            );

            setMfis(potentialMfis);
        } catch (error) {
            console.error("Error loading MFIs:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMfis = mfis.filter(
        (mfi) =>
            mfi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (mfi.name_bn?.includes(searchQuery))
    );

    return (
        <>
            <SEOHead
                title="MFI ডিরেক্টরি | BankBujhi"
                description="ক্ষুদ্র ঋণ প্রদানকারী প্রতিষ্ঠান (MFI) তালিকা। ছোট লোন এবং সেভিংস স্কিম।"
                path="/mfi"
            />
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                <Header />
                <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
                    <PageBreadcrumb items={[{ label: "MFI (ক্ষুদ্র ঋণ)" }]} className="mb-6" />

                    {/* Page Heading */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-foreground mb-2">
                            ক্ষুদ্র ঋণ প্রতিষ্ঠান <span className="text-green-600">(MFI)</span>
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                            গ্রামীণ এবং প্রান্তিক পর্যায়ের মানুষের জন্য ক্ষুদ্র ঋণ ও সঞ্চয় সেবা।
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8 max-w-md">
                        <SearchBar placeholder="MFI খুঁজুন..." onSearch={setSearchQuery} />
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <Skeleton className="h-64 rounded-xl" />
                            <Skeleton className="h-64 rounded-xl" />
                            <Skeleton className="h-64 rounded-xl" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filteredMfis.length > 0 ? (
                                filteredMfis.map((mfi) => (
                                    <div key={mfi.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                                        {/* Header */}
                                        <div className="bg-green-700 p-4 text-white relative">
                                            <div className="absolute top-3 right-3">
                                                <div className="bg-white/90 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                                    <MaterialIcon name="savings" className="text-xs" />
                                                    Small Loans
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="size-12 rounded-lg bg-white p-1 flex items-center justify-center">
                                                    {mfi.logo_url ? (
                                                        <img src={mfi.logo_url} alt={mfi.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <MaterialIcon name="groups" className="text-2xl text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg leading-tight">{mfi.name}</h3>
                                                    <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">
                                                        MRA Regulated
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Body */}
                                        <div className="p-4 flex-1">
                                            <div className="grid grid-cols-2 gap-2 mb-4">
                                                <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                                                    <span className="block text-xs text-gray-500">Interest Rate</span>
                                                    <span className="font-bold text-gray-900">High (24%+)</span>
                                                </div>
                                                <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                                                    <span className="block text-xs text-gray-500">Loan Size</span>
                                                    <span className="font-bold text-gray-900">Small</span>
                                                </div>
                                            </div>

                                            <ul className="space-y-2 mb-4">
                                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                                    <MaterialIcon name="check_circle" className="text-green-500 text-sm" />
                                                    ব্যবসা বা কৃষির জন্য লোন
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                                    <MaterialIcon name="check_circle" className="text-green-500 text-sm" />
                                                    সহজ শর্তে ঋণ
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                                    <MaterialIcon name="groups" className="text-green-500 text-sm" />
                                                    গ্রুপ ভিত্তিক লোন
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <MaterialIcon name="search" className="text-4xl text-gray-300 mb-2" />
                                    <p className="text-gray-500">কোনো MFI পাওয়া যায়নি</p>
                                    <p className="text-xs text-gray-400 mt-1">(এটা ডেমো ডাটা, তাই আপাতত কিছু দেখাচ্ছে না)</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
                <Footer />
                <BottomNav />
            </div>
        </>
    );
};

export default MFIs;
