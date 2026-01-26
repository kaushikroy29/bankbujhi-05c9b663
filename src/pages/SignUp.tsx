import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "Compare 50+ Credit Cards in Bangladesh",
  "Get personalized loan advice",
  "Exclusive bank offers and discounts",
  "Trusted by over 50,000 users across Bangladesh",
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
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-black text-foreground">BankBujhi.com</span>
          </Link>

          <h2 className="text-3xl font-bold mb-6">Why join BankBujhi?</h2>

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
              <span className="font-bold">Your data is protected</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We use bank-grade security to protect your information.
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
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-black text-foreground">BankBujhi.com</span>
            </Link>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {step > 1 ? <MaterialIcon name="check" /> : "1"}
              </div>
              <span className="text-sm font-medium hidden sm:inline">Your Info</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted">
              <div className={`h-full bg-primary transition-all ${step >= 2 ? "w-full" : "w-0"}`} />
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                2
              </div>
              <span className="text-sm font-medium hidden sm:inline">Verify</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border border-primary/10 shadow-xl p-8">
            {step === 1 ? (
              <>
                <h1 className="text-2xl font-bold mb-2">Start your financial journey</h1>
                <p className="text-muted-foreground text-sm mb-8 font-bengali">
                  Create your BankBujhi Account
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Mobile Number</label>
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
                      We will send a 6-digit OTP to verify your number.
                    </p>
                  </div>

                  <Button onClick={handleSendOTP} className="w-full h-12 text-base font-bold">
                    Send OTP
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">Verify your number</h1>
                <p className="text-muted-foreground text-sm mb-8">
                  Sent to +880 {formData.mobileNumber}
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Enter OTP</label>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      className="h-12 text-center text-xl tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button onClick={handleVerify} className="w-full h-12 text-base font-bold">
                    Verify & Complete
                  </Button>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full text-sm text-muted-foreground hover:text-primary"
                  >
                    Change number
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to BankBujhi's{" "}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>

          {/* Help */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Need help? Call us at <span className="text-primary">09612-XXXXXX</span>
          </p>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            © 2024 BankBujhi.com. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
