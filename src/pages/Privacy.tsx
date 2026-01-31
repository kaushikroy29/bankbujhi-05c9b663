import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">হোম</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-sm font-medium">গোপনীয়তা নীতি</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">গোপনীয়তা নীতি</h1>
        <p className="text-muted-foreground mb-6">সর্বশেষ আপডেট: জানুয়ারি ২০২৫</p>

        {/* Bangla Summary */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <MaterialIcon name="info" className="text-primary text-xl shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-foreground mb-1">সংক্ষেপে</p>
              <p className="text-muted-foreground text-sm">
                আমরা আপনার ব্যাংক লগইন, পাসওয়ার্ড বা সংবেদনশীল আর্থিক তথ্য সংগ্রহ করি না।
                BankBujhi শুধুমাত্র তুলনার জন্য সাধারণ তথ্য ব্যবহার করে।
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-lg font-bold mb-3">১. ভূমিকা</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi ("আমরা") আপনার গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। এই নীতিতে বলা হয়েছে আমরা কী তথ্য সংগ্রহ করি,
              কীভাবে ব্যবহার করি এবং কীভাবে সুরক্ষিত রাখি।
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">২. আমরা কী তথ্য সংগ্রহ করি</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>সাধারণ তথ্য:</strong> নাম, ইমেইল (শুধুমাত্র যদি আপনি নিউজলেটার সাবস্ক্রাইব করেন)</li>
              <li><strong>ব্রাউজিং তথ্য:</strong> কোন পেজ দেখেছেন, কতক্ষণ ছিলেন (ওয়েবসাইট উন্নত করতে)</li>
              <li><strong>যোগ্যতা যাচাই তথ্য:</strong> আয়ের পরিসীমা, বয়স (স্থায়ীভাবে সংরক্ষণ করা হয় না)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">৩. আমরা কী সংগ্রহ করি না</h2>
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MaterialIcon name="cancel" className="text-destructive" />
                  ব্যাংক লগইন বা পাসওয়ার্ড
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon name="cancel" className="text-destructive" />
                  ক্রেডিট/ডেবিট কার্ড নম্বর
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon name="cancel" className="text-destructive" />
                  জাতীয় পরিচয়পত্র নম্বর
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon name="cancel" className="text-destructive" />
                  ব্যাংক একাউন্ট নম্বর
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">৪. তথ্য ব্যবহার</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>তুলনা সেবা প্রদান ও উন্নত করতে</li>
              <li>প্রাসঙ্গিক প্রোডাক্ট দেখাতে</li>
              <li>নিউজলেটার পাঠাতে (আপনার অনুমতিতে)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">৫. তথ্য শেয়ারিং</h2>
            <p className="text-muted-foreground leading-relaxed">
              আমরা আপনার ব্যক্তিগত তথ্য বিক্রি করি না। শুধুমাত্র আপনি যখন কোনো ব্যাংকে আবেদন করতে চান
              (Apply বাটনে ক্লিক করে) তখন সেই ব্যাংকের ওয়েবসাইটে যান।
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">৬. আপনার অধিকার</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>আপনার তথ্য দেখতে বা মুছে ফেলতে চাইতে পারেন</li>
              <li>নিউজলেটার থেকে যেকোনো সময় আনসাবস্ক্রাইব করতে পারেন</li>
              <li>কুকি সেটিংস পরিবর্তন করতে পারেন</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">৭. যোগাযোগ</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              গোপনীয়তা সংক্রান্ত প্রশ্নের জন্য যোগাযোগ করুন:
            </p>
            <div className="bg-card border border-primary/10 rounded-xl p-4">
              <p className="font-semibold">BankBujhi</p>
              <p className="text-muted-foreground">ইমেইল: privacy@bankbujhi.com</p>
              <p className="text-muted-foreground">ঢাকা, বাংলাদেশ</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Privacy;
