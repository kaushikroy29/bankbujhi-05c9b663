import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MaterialIcon from "@/components/ui/MaterialIcon";

const sampleCards = [
  {
    id: "1",
    bankName: "City Bank",
    cardName: "City Platinum Card",
    annualFee: "৳৩,০০০",
    cashback: "১০%",
  },
  {
    id: "2",
    bankName: "BRAC Bank",
    cardName: "BRAC Visa Signature",
    annualFee: "৳৫,০০০",
    cashback: "৫%",
  },
  {
    id: "3",
    bankName: "EBL",
    cardName: "EBL Visa Gold",
    annualFee: "৳২,০০০",
    cashback: "৩%",
  },
  {
    id: "4",
    bankName: "Standard Chartered",
    cardName: "SC Platinum Rewards",
    annualFee: "৳৪,০০০",
    cashback: "৮%",
  },
];

const FeaturedCardsSection = () => {
  return (
    <section className="container-padding py-16 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
            জনপ্রিয় ক্রেডিট কার্ড
          </h2>
          <p className="text-muted-foreground mt-3 text-base sm:text-lg">
            বাংলাদেশের সেরা ব্যাংকগুলোর ক্রেডিট কার্ড
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleCards.map((card) => (
            <Card key={card.id} className="bg-card border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex flex-col gap-4">
                {/* Bank Logo Placeholder */}
                <div className="w-full h-16 bg-muted rounded-lg flex items-center justify-center">
                  <MaterialIcon name="account_balance" className="text-3xl text-muted-foreground" />
                </div>

                {/* Card Info */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">{card.bankName}</p>
                  <h3 className="font-bold text-foreground text-lg leading-tight">{card.cardName}</h3>
                </div>

                {/* Details */}
                <div className="space-y-2 py-3 border-t border-primary/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">বার্ষিক ফি</span>
                    <span className="font-semibold text-foreground">{card.annualFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ক্যাশব্যাক</span>
                    <span className="font-semibold text-primary">{card.cashback}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="outline" className="w-full font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                  <Link to={`/cards/${card.id}`}>
                    বিস্তারিত দেখুন
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCardsSection;
