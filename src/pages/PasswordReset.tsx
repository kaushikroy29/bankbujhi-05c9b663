import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-black text-foreground">BankBujhi</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-primary/10 shadow-xl p-8">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon name="lock_reset" className="text-3xl text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Recover Your Account</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your registered email or mobile number to receive a password reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="e.g., 017XXXXXXXX or name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-base font-bold">
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm text-primary hover:underline font-bengali flex items-center justify-center gap-1"
                >
                  <MaterialIcon name="arrow_back" className="text-sm" />
                  লগইন-এ ফিরে যান (Back to Login)
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name="mark_email_read" className="text-3xl text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
              <p className="text-muted-foreground text-sm mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link to="/login">
                <Button variant="outline" className="border-primary text-primary">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MaterialIcon name="verified_user" className="text-primary" />
          <span>Bank-Grade Security</span>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2024 BankBujhi.com. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
