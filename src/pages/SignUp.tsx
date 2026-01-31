import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "বাংলাদেশের ৫০টির বেশি ক্রেডিট কার্ড তুলনা করুন",
  "ব্যক্তিগত লোনের পরামর্শ পান",
  "ব্যাংকের এক্সক্লুসিভ অফার এবং ডিসকাউন্ট",
  "সারা বাংলাদেশে ৫০,০০০-এর বেশি ব্যবহারকারীর বিশ্বস্ত",
];

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    otp: "",
  });

  const handleSendOTP = () => {
    if (formData.fullName && formData.mobileNumber) {
      setStep(2);
    }
  };

  const handleVerify = () => {
    // Handle verification
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex">
      {/* Left Side - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <Logo showText={false} className="w-10 h-10" />
            <span className="text-2xl font-black text-foreground">BankBujhi.com</span>
          </Link>

          <h2 className="text-3xl font-bold mb-6">কেন ব্যাংকবুঝিতে যোগ দেবেন?</h2>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <MaterialIcon name="check" className="text-sm text-primary-foreground" />
                </div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-card rounded-xl border border-primary/10">
            <div className="flex items-center gap-3 mb-3">
              <MaterialIcon name="verified_user" className="text-2xl text-primary" />
              <span className="font-bold">আপনার তথ্য সুরক্ষিত</span>
            </div>
            <p className="text-sm text-muted-foreground">
              আমরা আপনার তথ্য রক্ষায় ব্যাংক-গ্রেড সিকিউরিটি ব্যবহার করি।
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <Logo showText={false} className="w-10 h-10" />
              <span className="text-2xl font-black text-foreground">BankBujhi.com</span>
            </Link>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                {step > 1 ? <MaterialIcon name="check" /> : "1"}
              </div>
              <span className="text-sm font-medium hidden sm:inline">আপনার তথ্য</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted">
              <div className={`h-full bg-primary transition-all ${step >= 2 ? "w-full" : "w-0"}`} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                2
              </div>
              <span className="text-sm font-medium hidden sm:inline">যাচাইকরণ</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border border-primary/10 shadow-xl p-8">
            {step === 1 ? (
              <>
                <h1 className="text-2xl font-bold mb-2">আপনার আর্থিক যাত্রা শুরু হোক</h1>
                <p className="text-muted-foreground text-sm mb-8 font-bengali">
                  আপনার ব্যাংকবুঝি অ্যাকাউন্ট তৈরি করুন
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">পুরো নাম</label>
                    <Input
                      type="text"
                      placeholder="আপনার পুরো নাম লিখুন"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">মোবাইল নম্বর</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">+880</span>
                      <Input
                        type="tel"
                        placeholder="1XXXXXXXXX"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className="pl-14 h-12"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      আপনার নম্বর যাচাই করতে আমরা একটি ৬-সংখ্যার OTP পাঠাব।
                    </p>
                  </div>

                  <Button onClick={handleSendOTP} className="w-full h-12 text-base font-bold">
                    OTP পাঠুন
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">নম্বর যাচাই করুন</h1>
                <p className="text-muted-foreground text-sm mb-8 font-bengali">
                  +880 {formData.mobileNumber} নম্বরে পাঠানো হয়েছে
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">OTP লিখুন</label>
                    <Input
                      type="text"
                      placeholder="৬-সংখ্যার OTP দিন"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="h-12 text-center text-xl tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button onClick={handleVerify} className="w-full h-12 text-base font-bold">
                    যাচাই ও সম্পন্ন করুন
                  </Button>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-sm text-muted-foreground hover:text-primary"
                  >
                    নম্বর পরিবর্তন করুন
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            অব্যাহতির মাধ্যমে আপনি ব্যাংকবুঝির{" "}
            <a href="/terms" className="text-primary hover:underline">পরিষেবার শর্তাবলী</a> এবং{" "}
            <a href="/privacy" className="text-primary hover:underline">গোপনীয়তা নীতিতে</a> সম্মত হচ্ছেন।
          </p>

          {/* Help */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            সাহায্য প্রয়োজন? আমাদের কল করুন <span className="text-primary">০৯৬১২-XXXXXX</span> নম্বরে
          </p>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            © ২০২৪ BankBujhi.com. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
