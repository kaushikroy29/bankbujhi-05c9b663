import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">Home</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-sm font-medium">Terms of Service</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using BankBujhi (the "Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi is a financial comparison platform that helps users compare credit cards, loans, savings products, and other banking services available in Bangladesh. We provide information and tools to help you make informed financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Not Financial Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided on BankBujhi is for general informational purposes only and should not be considered as professional financial advice. We recommend consulting with a qualified financial advisor before making any financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to keep information accurate and up-to-date, we cannot guarantee that all information is complete, accurate, or current. Product terms, rates, and availability may change without notice. Always verify details with the respective financial institution before applying.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate information when using our services</li>
              <li>Keep your account credentials secure</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not use automated tools to scrape or collect data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service contains links to third-party websites, including banks and financial institutions. We are not responsible for the content, privacy policies, or practices of these third-party sites. You access them at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Affiliate Relationships</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi may receive compensation from banks and financial institutions when users apply for products through our platform. This does not affect our editorial independence or the order in which products are displayed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, BankBujhi shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to loss of data, loss of profits, or business interruption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on BankBujhi, including text, graphics, logos, and software, is the property of BankBujhi or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on our website. Continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">12. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-card border border-primary/10 rounded-xl p-4 mt-3">
              <p className="font-semibold">BankBujhi</p>
              <p className="text-muted-foreground">Email: legal@bankbujhi.com</p>
              <p className="text-muted-foreground">Address: Dhaka, Bangladesh</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Terms;
