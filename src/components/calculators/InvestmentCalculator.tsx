import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const InvestmentCalculator = () => {
    const [activeTab, setActiveTab] = useState("sip");

    // SIP State
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [sipReturnRate, setSipReturnRate] = useState(12);
    const [sipYears, setSipYears] = useState(10);

    // Lumpsum State
    const [lumpsumAmount, setLumpsumAmount] = useState(100000);
    const [lumpsumReturnRate, setLumpsumReturnRate] = useState(12);
    const [lumpsumYears, setLumpsumYears] = useState(10);

    // Results
    const [result, setResult] = useState({ invested: 0, returns: 0, total: 0 });

    useEffect(() => {
        calculate();
    }, [monthlyInvestment, sipReturnRate, sipYears, lumpsumAmount, lumpsumReturnRate, lumpsumYears, activeTab]);

    const calculate = () => {
        if (activeTab === "sip") {
            const i = sipReturnRate / 12 / 100;
            const n = sipYears * 12;
            // FV = P * ((1+i)^n - 1) / i * (1+i)
            const fv = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            const invested = monthlyInvestment * n;
            setResult({
                invested: Math.round(invested),
                returns: Math.round(fv - invested),
                total: Math.round(fv)
            });
        } else {
            // FV = P * (1 + r/100)^n
            const fv = lumpsumAmount * Math.pow(1 + lumpsumReturnRate / 100, lumpsumYears);
            const invested = lumpsumAmount;
            setResult({
                invested: Math.round(invested),
                returns: Math.round(fv - invested),
                total: Math.round(fv)
            });
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'BDT',
            maximumFractionDigits: 0
        }).format(amount).replace('BDT', '৳');
    };

    const pieData = [
        { name: "Invested", value: result.invested, color: "#9b87f5" }, // Primary
        { name: "Returns", value: result.returns, color: "#10b981" } // Success/Green
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
                    <MaterialIcon name="trending_up" className="text-primary" />
                    ইনভেস্টমেন্ট ক্যালকুলেটর
                </h1>
                <p className="text-muted-foreground">SIP বা এককালীন বিনিয়োগের ভবিষ্যৎ রিটার্ন হিসাব করুন</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <Card>
                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="sip">SIP (মাসিক)</TabsTrigger>
                                <TabsTrigger value="lumpsum">Lumpsum (এককালীন)</TabsTrigger>
                            </TabsList>

                            <TabsContent value="sip" className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-semibold text-sm">মাসিক বিনিয়োগ</label>
                                        <span className="font-bold bg-primary/10 px-2 py-0.5 rounded text-primary">{formatCurrency(monthlyInvestment)}</span>
                                    </div>
                                    <Slider
                                        value={[monthlyInvestment]}
                                        onValueChange={(v) => setMonthlyInvestment(v[0])}
                                        max={100000}
                                        step={500}
                                        className="py-2"
                                    />
                                    <Input
                                        type="number"
                                        value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-semibold text-sm">রিটার্ন রেট (বার্ষিক %)</label>
                                        <span className="font-bold">{sipReturnRate}%</span>
                                    </div>
                                    <Slider
                                        value={[sipReturnRate]}
                                        onValueChange={(v) => setSipReturnRate(v[0])}
                                        max={30}
                                        step={0.5}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-semibold text-sm">সময়কাল (বছর)</label>
                                        <span className="font-bold">{sipYears} বছর</span>
                                    </div>
                                    <Slider
                                        value={[sipYears]}
                                        onValueChange={(v) => setSipYears(v[0])}
                                        max={30}
                                        step={1}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="lumpsum" className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-semibold text-sm">মোট বিনিয়োগ</label>
                                        <span className="font-bold bg-primary/10 px-2 py-0.5 rounded text-primary">{formatCurrency(lumpsumAmount)}</span>
                                    </div>
                                    <Slider
                                        value={[lumpsumAmount]}
                                        onValueChange={(v) => setLumpsumAmount(v[0])}
                                        max={5000000}
                                        step={5000}
                                    />
                                    <Input
                                        type="number"
                                        value={lumpsumAmount}
                                        onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-semibold text-sm">রিটার্ন রেট (বার্ষিক %)</label>
                                        <span className="font-bold">{lumpsumReturnRate}%</span>
                                    </div>
                                    <Slider
                                        value={[lumpsumReturnRate]}
                                        onValueChange={(v) => setLumpsumReturnRate(v[0])}
                                        max={30}
                                        step={0.5}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <label className="font-semibold text-sm">সময়কাল (বছর)</label>
                                        <span className="font-bold">{lumpsumYears} বছর</span>
                                    </div>
                                    <Slider
                                        value={[lumpsumYears]}
                                        onValueChange={(v) => setLumpsumYears(v[0])}
                                        max={30}
                                        step={1}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <Card className="bg-muted/30 border-primary/20">
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <p className="text-sm text-muted-foreground mb-1">ভবিষ্যৎ মোট মান</p>
                            <h2 className="text-4xl font-black text-primary">{formatCurrency(result.total)}</h2>
                        </div>

                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t">
                            <div>
                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">মোট বিনিয়োগ</p>
                                <p className="text-xl font-bold">{formatCurrency(result.invested)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">সম্ভাব্য লাভ</p>
                                <p className="text-xl font-bold text-green-600">+{formatCurrency(result.returns)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default InvestmentCalculator;
