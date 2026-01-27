import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useRef } from "react";

interface CardBenefit {
  icon: string;
  text: string;
}

interface CompareCard {
  id: string;
  bank: string;
  name: string;
  category: string;
  annualFee: string;
  annualFeeNote: string;
  creditScore?: string;
  minAge?: number;
  maxAge?: number;
  requiredDocuments?: string[];
  employmentTypes?: string[];
  interestRate?: string;
  minIncome?: string;
  fees?: Record<string, string>;
  image: string;
  benefits: CardBenefit[];
}

interface CompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cards: CompareCard[];
  onRemoveCard: (id: string) => void;
}

const CompareRow = ({ 
  label, 
  values, 
  highlight = false 
}: { 
  label: string; 
  values: (string | React.ReactNode)[]; 
  highlight?: boolean;
}) => (
  <div className={cn(
    "grid gap-4 py-3 border-b border-primary/10",
    highlight && "bg-primary/5"
  )} style={{ gridTemplateColumns: `140px repeat(${values.length}, 1fr)` }}>
    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-4 flex items-center">
      {label}
    </div>
    {values.map((value, i) => (
      <div key={i} className="text-sm font-medium px-2">
        {value}
      </div>
    ))}
  </div>
);

const FeeRow = ({ 
  label, 
  feeKey, 
  cards 
}: { 
  label: string; 
  feeKey: string; 
  cards: CompareCard[];
}) => (
  <div className="flex items-center py-2 border-b border-primary/5 last:border-0">
    <span className="text-xs text-muted-foreground w-32 shrink-0">{label}</span>
    <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: `repeat(${cards.length}, 1fr)` }}>
      {cards.map((card) => (
        <span key={card.id} className="text-xs font-medium">
          {card.fees?.[feeKey] || "—"}
        </span>
      ))}
    </div>
  </div>
);

const CompareModal = ({ open, onOpenChange, cards, onRemoveCard }: CompareModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  if (cards.length === 0) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Card Comparison - BankBujhi</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; color: #333; }
            h1 { font-size: 24px; margin-bottom: 20px; color: #16a34a; }
            .header { display: grid; gap: 16px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb; }
            .card-header { text-align: center; padding: 12px; background: #f9fafb; border-radius: 8px; }
            .card-header h3 { font-size: 14px; font-weight: bold; margin-bottom: 4px; }
            .card-header p { font-size: 12px; color: #6b7280; }
            .row { display: grid; gap: 16px; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
            .row-label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280; }
            .row-value { font-size: 13px; }
            .highlight { background: #f0fdf4; padding: 12px; margin: 0 -12px; }
            .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #6b7280; margin: 16px 0 8px; }
            .benefit-item, .doc-item { font-size: 12px; padding: 4px 0; }
            .fee-row { display: flex; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
            .fee-label { font-size: 11px; color: #6b7280; width: 120px; }
            .fee-values { display: grid; flex: 1; gap: 16px; }
            .fee-value { font-size: 12px; }
            @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <h1>Credit Card Comparison</h1>
          <div class="header" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div></div>
            ${cards.map(card => `
              <div class="card-header">
                <p style="color: #16a34a; font-weight: bold; font-size: 11px;">${card.bank}</p>
                <h3>${card.name}</h3>
                <p>${card.category}</p>
              </div>
            `).join('')}
          </div>
          
          <div class="row highlight" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div class="row-label">Annual Fee</div>
            ${cards.map(card => `<div class="row-value" style="font-weight: bold; font-size: 16px;">${card.annualFee}</div>`).join('')}
          </div>
          <div class="row" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div class="row-label">Fee Note</div>
            ${cards.map(card => `<div class="row-value">${card.annualFeeNote || '—'}</div>`).join('')}
          </div>
          <div class="row highlight" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div class="row-label">Interest Rate</div>
            ${cards.map(card => `<div class="row-value">${card.interestRate || '—'}</div>`).join('')}
          </div>
          <div class="row" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div class="row-label">Min. Income</div>
            ${cards.map(card => `<div class="row-value">${card.minIncome || '—'}</div>`).join('')}
          </div>
          <div class="row highlight" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div class="row-label">Credit Score</div>
            ${cards.map(card => `<div class="row-value">${card.creditScore || '—'}</div>`).join('')}
          </div>
          <div class="row" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div class="row-label">Age Limit</div>
            ${cards.map(card => `<div class="row-value">${card.minAge && card.maxAge ? `${card.minAge} - ${card.maxAge} years` : '—'}</div>`).join('')}
          </div>

          <div class="section-title">Employment Types</div>
          <div class="row" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div></div>
            ${cards.map(card => `
              <div class="row-value">
                ${card.employmentTypes && card.employmentTypes.length > 0 
                  ? card.employmentTypes.join(', ') 
                  : 'Not specified'}
              </div>
            `).join('')}
          </div>

          <div class="section-title">Fee Breakdown</div>
          <div class="fee-row">
            <span class="fee-label">Cash Advance</span>
            <div class="fee-values" style="grid-template-columns: repeat(${cards.length}, 1fr)">
              ${cards.map(card => `<span class="fee-value">${card.fees?.cash_advance || card.fees?.cashAdvance || '—'}</span>`).join('')}
            </div>
          </div>
          <div class="fee-row">
            <span class="fee-label">Late Payment</span>
            <div class="fee-values" style="grid-template-columns: repeat(${cards.length}, 1fr)">
              ${cards.map(card => `<span class="fee-value">${card.fees?.late_payment || card.fees?.latePayment || '—'}</span>`).join('')}
            </div>
          </div>
          <div class="fee-row">
            <span class="fee-label">Foreign Transaction</span>
            <div class="fee-values" style="grid-template-columns: repeat(${cards.length}, 1fr)">
              ${cards.map(card => `<span class="fee-value">${card.fees?.foreign_transaction || card.fees?.foreignTransaction || '—'}</span>`).join('')}
            </div>
          </div>

          <div class="section-title">Required Documents</div>
          <div class="row" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div></div>
            ${cards.map(card => `
              <div>
                ${card.requiredDocuments && card.requiredDocuments.length > 0 
                  ? card.requiredDocuments.map(doc => `<div class="doc-item">• ${doc}</div>`).join('') 
                  : '<span style="color: #9ca3af;">Not specified</span>'}
              </div>
            `).join('')}
          </div>

          <div class="section-title">Key Benefits</div>
          <div class="row" style="grid-template-columns: 140px repeat(${cards.length}, 1fr)">
            <div></div>
            ${cards.map(card => `
              <div>
                ${card.benefits.slice(0, 4).map(benefit => `<div class="benefit-item">✓ ${benefit.text}</div>`).join('')}
                ${card.benefits.length === 0 ? '<span style="color: #9ca3af;">No benefits listed</span>' : ''}
              </div>
            `).join('')}
          </div>

          <p style="margin-top: 24px; font-size: 11px; color: #9ca3af; text-align: center;">
            Generated by BankBujhi.com on ${new Date().toLocaleDateString()}
          </p>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <MaterialIcon name="compare_arrows" className="text-primary" />
              Compare Cards ({cards.length})
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
              <MaterialIcon name="print" className="text-sm" />
              Print / Save PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto" ref={contentRef}>
          {/* Card Headers */}
          <div 
            className="grid gap-4 p-4 bg-muted/30 sticky top-0 z-10 border-b border-primary/10"
            style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
          >
            <div />
            {cards.map((card) => (
              <div key={card.id} className="relative">
                <button
                  onClick={() => onRemoveCard(card.id)}
                  className="absolute -top-1 -right-1 size-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors z-10"
                >
                  <MaterialIcon name="close" className="text-sm" />
                </button>
                <div className="bg-card rounded-xl p-3 border border-primary/10">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-muted">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-bold text-primary mb-1">{card.bank}</p>
                  <h3 className="font-bold text-sm leading-tight line-clamp-2">{card.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{card.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          <div className="min-w-max">
            <CompareRow 
              label="Annual Fee" 
              values={cards.map((card) => (
                <span className={cn(
                  "font-black text-lg",
                  (card.annualFee === "Free" || card.annualFee === "৳0") && "text-primary"
                )}>
                  {card.annualFee}
                </span>
              ))}
              highlight
            />
            <CompareRow 
              label="Fee Note" 
              values={cards.map((card) => card.annualFeeNote || "—")}
            />
            <CompareRow 
              label="Interest Rate" 
              values={cards.map((card) => card.interestRate || "—")}
              highlight
            />
            <CompareRow 
              label="Min. Income" 
              values={cards.map((card) => card.minIncome || "—")}
            />
            <CompareRow 
              label="Credit Score" 
              values={cards.map((card) => (
                <span className="text-sm font-medium">
                  {card.creditScore || "—"}
                </span>
              ))}
              highlight
            />
            <CompareRow 
              label="Age Limit" 
              values={cards.map((card) => (
                card.minAge && card.maxAge 
                  ? `${card.minAge} - ${card.maxAge} years`
                  : "—"
              ))}
            />

            {/* Employment Types Section */}
            <div className="py-4 px-4 border-b border-primary/10 bg-primary/5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Employment Types
              </p>
              <div 
                className="grid gap-4"
                style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
              >
                <div />
                {cards.map((card) => (
                  <div key={card.id} className="flex flex-wrap gap-1.5">
                    {card.employmentTypes && card.employmentTypes.length > 0 ? (
                      card.employmentTypes.map((type, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-1 bg-background px-2 py-1 rounded-md text-xs font-medium border border-primary/10"
                        >
                          <MaterialIcon name="work" className="text-primary text-xs" />
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">Not specified</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Breakdown Section */}
            <div className="py-4 px-4 border-b border-primary/10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Fee Breakdown
              </p>
              <div className="bg-muted/30 rounded-lg p-3 space-y-1">
                <FeeRow label="Cash Advance" feeKey="cash_advance" cards={cards} />
                <FeeRow label="Late Payment" feeKey="late_payment" cards={cards} />
                <FeeRow label="Foreign Transaction" feeKey="foreign_transaction" cards={cards} />
                <FeeRow label="Over Limit" feeKey="over_limit" cards={cards} />
                <FeeRow label="Card Replacement" feeKey="card_replacement" cards={cards} />
              </div>
            </div>
            
            {/* Required Documents Section */}
            <div className="py-4 px-4 border-b border-primary/10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Required Documents
              </p>
              <div 
                className="grid gap-4"
                style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
              >
                <div />
                {cards.map((card) => (
                  <div key={card.id} className="space-y-1.5">
                    {card.requiredDocuments && card.requiredDocuments.length > 0 ? (
                      card.requiredDocuments.map((doc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <MaterialIcon name="description" className="text-muted-foreground text-sm mt-0.5" />
                          <span className="text-xs font-medium leading-tight">{doc}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">Not specified</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="py-4 px-4 border-b border-primary/10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Key Benefits
              </p>
              <div 
                className="grid gap-4"
                style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
              >
                <div />
                {cards.map((card) => (
                  <div key={card.id} className="space-y-2">
                    {card.benefits.slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="size-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          <MaterialIcon name={benefit.icon} className="text-primary text-sm" />
                        </div>
                        <span className="text-xs font-medium leading-tight">{benefit.text}</span>
                      </div>
                    ))}
                    {card.benefits.length === 0 && (
                      <span className="text-xs text-muted-foreground">No benefits listed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div 
          className="p-4 border-t border-primary/10 bg-muted/30 grid gap-4"
          style={{ gridTemplateColumns: `140px repeat(${cards.length}, 1fr)` }}
        >
          <div className="flex items-center">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
          {cards.map((card) => (
            <Link key={card.id} to={`/cards/${card.id}`}>
              <Button className="w-full font-bold">
                View Details
              </Button>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
