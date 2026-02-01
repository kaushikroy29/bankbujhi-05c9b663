
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SearchBar from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { fetchBanks, type Bank } from "@/lib/api/banks"; // Reusing fetchBanks assuming NBFIs are in same table
import { Skeleton } from "@/components/ui/skeleton";
import SEOHead from "@/components/seo/SEOHead";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NBFIs = () => {
    const [nbfis, setNbfis] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // In a real implementation, we would filter by type='nbfi'
            // For now, fetching all and filtering on client or simulating
            const banksData = await fetchBanks();

            // MOCK FILTER: Since we don't have real "type" column data for NBFIs yet,
            // I will filter assuming some might be labeled 'nbfi' or just take a slice for demo
            // In production: const nbfisData = banksData.filter(b => b.type === 'nbfi');

            // For demonstration, let's pretend IDLC, IPDC are in the DB or just show generic ones if missing
            // Since I don't know the exact data, I'll filter by name or fallback to empty state prompt
            // But to show something, I will show banks that match 'Finance' or 'Leasing' in name or type

            const potentialNbfis = banksData.filter(b =>
                b.name.includes("Finance") ||
                b.name.includes("Leasing") ||
                b.type === 'nbfi'
            );

            setNbfis(potentialNbfis);
        } catch (error) {
            console.error("Error loading NBFIs:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredNbfis = nbfis.filter(
        (nbfi) =>
            nbfi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (nbfi.name_bn?.includes(searchQuery))
    );

    return (
        <>
            <SEOHead
                title="NBFI ডিরেক্টরি | BankBujhi"
                description="বাংলাদেশের আর্থিক প্রতিষ্ঠান (NBFI) গুলোর তালিকা। লোন ও ডিপোজিট স্কিম তুলনা করুন।"
                path="/nbfi"
            />
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                <Header />
                <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
                    <PageBreadcrumb items={[{ label: "NBFI (আর্থিক প্রতিষ্ঠান)" }]} className="mb-6" />

                    {/* Page Heading */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-foreground mb-2">
                            আর্থিক প্রতিষ্ঠান <span className="text-blue-600">(NBFI)</span>
                        </h1>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                            ব্যাংক নয়, তবে লোন এবং ডিপোজিট সেবা প্রদানকারী নির্ভরযোগ্য প্রতিষ্ঠানসমূহ।
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8 max-w-md">
                        <SearchBar placeholder="NBFI খুঁজুন..." onSearch={setSearchQuery} />
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-64 rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filteredNbfis.length > 0 ? (
                                filteredNbfis.map((nbfi) => (
                                    <div key={nbfi.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                                        {/* Header */}
                                        <div className="bg-slate-800 p-4 text-white relative">
                                            <div className="absolute top-3 right-3">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm cursor-help">
                                                                <MaterialIcon name="warning" className="text-xs" />
                                                                Limited Banking
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>সেভিংস অ্যাকাউন্ট খোলা যায় না, ব্যাংকের মতো নয়</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="size-12 rounded-lg bg-white p-1 flex items-center justify-center">
                                                    {nbfi.logo_url ? (
                                                        <img src={nbfi.logo_url} alt={nbfi.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <MaterialIcon name="domain" className="text-2xl text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg leading-tight">{nbfi.name}</h3>
                                                    <div className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full inline-block mt-1">
                                                        Regulated by BB
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Body */}
                                        <div className="p-4 flex-1">
                                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-4">
                                                <div className="flex items-start gap-2">
                                                    <MaterialIcon name="info" className="text-amber-600 mt-0.5 text-sm" />
                                                    <p className="text-xs text-amber-800 leading-snug">
                                                        <strong>মনে রাখবেন:</strong> এখানে সেভিংস অ্যাকাউন্ট বা কারেন্ট অ্যাকাউন্ট খোলা যায় না। শুধুমাত্র মেয়াদী আমানত (FDR payment) রাখা যায়।
                                                    </p>
                                                </div>
                                            </div>

                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Available Services</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                                    <MaterialIcon name="check_circle" className="text-blue-500 text-sm" />
                                                    Term Deposit / FDR
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                                    <MaterialIcon name="check_circle" className="text-blue-500 text-sm" />
                                                    Home & Car Loans
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                                    <MaterialIcon name="check_circle" className="text-blue-500 text-sm" />
                                                    SME Financing
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-gray-400 line-through">
                                                    <MaterialIcon name="cancel" className="text-gray-300 text-sm" />
                                                    Savings/Current A/C
                                                </li>
                                            </ul>
                                        </div>

                                        {/* CTA */}
                                        <div className="p-4 pt-0 mt-auto">
                                            <Button className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200" asChild>
                                                <Link to={`/compare?bank=${nbfi.id}&type=fdr`}>
                                                    View Schemes
                                                    <MaterialIcon name="arrow_forward" className="text-lg" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <MaterialIcon name="search" className="text-4xl text-gray-300 mb-2" />
                                    <p className="text-gray-500">কোনো আর্থিক প্রতিষ্ঠান পাওয়া যায়নি</p>
                                    <p className="text-xs text-gray-400 mt-1">লিস্টে 'Finance' বা 'Leasing' নামের প্রতিষ্ঠান খুঁজছে...</p>
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

export default NBFIs;
