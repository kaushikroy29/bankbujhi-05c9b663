import { CreditCardFees } from "@/lib/api/banks";
import { cn } from "@/lib/utils";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeeBreakdownProps {
    fees: CreditCardFees;
    className?: string;
}

export const FeeBreakdown = ({ fees, className }: FeeBreakdownProps) => {
    if (!fees) return null;

    const sections = [
        {
            title: "Annual Fees",
            icon: "calendar_today",
            items: [
                { label: "Annual Fee", value: fees.annual?.fee },
                { label: "Renewal Fee", value: fees.annual?.renewal_fee },
                {
                    label: "Waiver Condition",
                    value: fees.annual?.waiver_condition,
                    className: "text-green-600 font-medium"
                },
            ]
        },
        {
            title: "Transaction Fees",
            icon: "payments",
            items: [
                { label: "Cash Advance", value: fees.transaction?.cash_advance },
                { label: "Foreign Currency", value: fees.transaction?.foreign_currency },
                { label: "Balance Transfer", value: fees.transaction?.balance_transfer },
            ]
        },
        {
            title: "Penalties",
            icon: "warning",
            items: [
                { label: "Late Payment", value: fees.penalty?.late_payment, className: "text-red-600" },
                { label: "Over Limit", value: fees.penalty?.over_limit, className: "text-red-600" },
                { label: "Returned Payment", value: fees.penalty?.returned_payment },
            ]
        },
        {
            title: "Service Charges",
            icon: "settings",
            items: [
                { label: "Replacement Card", value: fees.service?.replacement_card },
                { label: "Duplicate Statement", value: fees.service?.duplicate_statement },
                { label: "PIN Change", value: fees.service?.pin_change },
            ]
        },
        {
            title: "EMI",
            icon: "schedule",
            items: [
                { label: "Processing Fee", value: fees.emi?.processing_fee },
                { label: "Interest Rate", value: fees.emi?.interest_rate },
            ]
        }
    ].map(section => ({
        ...section,
        items: section.items.filter(item => item.value) as { label: string; value: string; className?: string }[]
    }));

    return (
        <Card className={cn("w-full", className)}>
            <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                    <MaterialIcon name="account_balance_wallet" className="text-primary" />
                    Transparent Fee Breakdown
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                            <MaterialIcon name={section.icon} className="text-base" />
                            {section.title}
                        </h4>
                        <ul className="space-y-2 text-sm">
                            {section.items.map((item, i) => (
                                <li key={i} className="flex justify-between items-start gap-2 pb-2 border-b border-dashed last:border-0 border-primary/10">
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <span className={cn("font-medium text-right", item.className)}>{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
