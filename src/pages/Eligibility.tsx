import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const banks = [
  "City Bank",
  "BRAC Bank",
  "Eastern Bank",
  "Standard Chartered",
  "Dutch Bangla Bank",
  "Mutual Trust Bank",
  "HSBC Bangladesh",
  "Prime Bank",
];

const employmentTypes = [
  { value: "salaried", label: "Salaried (চাকুরীজীবী)", icon: "badge" },
  { value: "business", label: "Business (ব্যবসায়ী)", icon: "storefront" },
  { value: "professional", label: "Professional (পেশাজীবী)", icon: "work" },
];

const Eligibility = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    employmentType: "",
    monthlyIncome: "",
    existingBank: "",
  });

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-foreground mb-4">
            Check Your Card <span className="text-primary">Eligibility</span>
          </h1>
          <p className="text-muted-foreground font-bengali">
            ক্রেডিট কার্ডের যোগ্যতা যাচাই করুন। আপনার সঠিক তথ্য প্রদান করে আপনার জন্য সেরা কার্ডগুলো খুঁজে নিন।
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-semibold">Step {step} of 3: {step === 1 ? "Basic Information" : step === 2 ? "Financial Details" : "Review"}</span>
            <span className="font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-primary/10 shadow-lg p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Employment Type</label>
                <div className="grid sm:grid-cols-3 gap-4">
                  {employmentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setFormData({ ...formData, employmentType: type.value })}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.employmentType === type.value
                          ? "border-primary bg-primary/5"
                          : "border-primary/10 hover:border-primary/30"
                      }`}
                    >
                      <MaterialIcon
                        name={type.icon}
                        className={`text-2xl mb-2 ${
                          formData.employmentType === type.value ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm font-medium block font-bengali">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Monthly Income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">৳</span>
                  <Input
                    type="number"
                    placeholder="e.g., 50,000"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    className="pl-8 h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Existing Bank</label>
                <Select
                  value={formData.existingBank}
                  onValueChange={(value) => setFormData({ ...formData, existingBank: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your primary bank" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <MaterialIcon name="fact_check" className="text-6xl text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Additional Verification</h3>
                <p className="text-muted-foreground">
                  We'll need a few more details to find the best cards for you.
                </p>
              </div>
              {/* Placeholder for additional fields */}
              <div className="bg-muted/30 p-6 rounded-xl text-center text-muted-foreground">
                Additional form fields would go here (employment details, documents, etc.)
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <MaterialIcon name="check_circle" className="text-6xl text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Review Your Information</h3>
                <p className="text-muted-foreground mb-6">
                  Please confirm your details before we check your eligibility.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-xl space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employment Type</span>
                  <span className="font-semibold capitalize">{formData.employmentType || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Income</span>
                  <span className="font-semibold">৳ {formData.monthlyIncome || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary Bank</span>
                  <span className="font-semibold">{formData.existingBank || "Not selected"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10 flex items-start gap-3">
            <MaterialIcon name="lock" className="text-primary shrink-0" />
            <p className="text-xs text-muted-foreground font-bengali">
              আপনার তথ্য নিরাপদ। আমরা শুধুমাত্র কার্ডের যোগ্যতা যাচাইয়ের জন্য এটি ব্যবহার করি। ব্যাংকবুঝি আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়।
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="border-primary/20"
            >
              <MaterialIcon name="arrow_back" className="mr-2" />
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === 3 ? "Check Eligibility" : "Next Step"}
              <MaterialIcon name="arrow_forward" className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Help Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
          <Link to="/help" className="text-muted-foreground hover:text-primary flex items-center gap-1">
            <MaterialIcon name="help" className="text-sm" /> How it works?
          </Link>
          <Link to="/privacy" className="text-muted-foreground hover:text-primary flex items-center gap-1">
            <MaterialIcon name="security" className="text-sm" /> Privacy Policy
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-primary flex items-center gap-1">
            <MaterialIcon name="support_agent" className="text-sm" /> Need Assistance?
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Eligibility;
