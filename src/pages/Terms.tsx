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
          <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">হোম</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-sm font-medium">শর্তাবলী</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">ব্যবহারের শর্তাবলী</h1>
        <p className="text-muted-foreground mb-8">সর্বশেষ আপডেট: জানুয়ারি ২০২৫</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">১. শর্তাবলী গ্রহণ (Acceptance)</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi ("সার্ভিস") ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তবে অনুগ্রহ করে আমাদের সার্ভিস ব্যবহার করবেন না।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">২. সার্ভিসের বিবরণ</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi একটি আর্থিক তুলনা প্ল্যাটফর্ম যা ব্যবহারকারীদের বাংলাদেশের ব্যাংকগুলোর ক্রেডিট কার্ড, লোন, এবং সেভিংস স্কিম তুলনা করতে সাহায্য করে। আমরা সঠিক আর্থিক সিদ্ধান্ত নিতে তথ্য ও টুলস প্রদান করি।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">৩. আর্থিক পরামর্শ নয়</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi-তে প্রদত্ত তথ্য শুধুমাত্র সাধারণ তথ্যের জন্য। এটিকে পেশাদার আর্থিক পরামর্শ হিসেবে বিবেচনা করা উচিত নয়। কোনো বড় আর্থিক সিদ্ধান্ত নেওয়ার আগে একজন বিশেষজ্ঞের পরামর্শ নিন।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">৪. তথ্যের সঠিকতা</h2>
            <p className="text-muted-foreground leading-relaxed">
              আমরা সঠিক এবং আপ-টু-ডেট তথ্য রাখার চেষ্টা করি, তবে তথ্যের সম্পূর্ণতা বা নির্ভুলতার গ্যারান্টি দিই না। ব্যাংকের রেট এবং শর্তাবলী পরিবর্তন হতে পারে। আবেদনের আগে ব্যাংকের সাথে তথ্য যাচাই করে নিন।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">৫. ব্যবহারকারীর দায়িত্ব</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>সঠিক তথ্য প্রদান করা</li>
              <li>অ্যাকাউন্টের নিরাপত্তা বজায় রাখা</li>
              <li>বেআইনি কাজে সার্ভিস ব্যবহার না করা</li>
              <li>ওয়েবসাইট স্ক্র্যাপ বা হ্যাক করার চেষ্টা না করা</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">৬. তৃতীয় পক্ষের লিংক</h2>
            <p className="text-muted-foreground leading-relaxed">
              আমাদের সাইটে বিভিন্ন ব্যাংকের লিংক থাকতে পারে। তাদের প্রাইভেসি পলিসি বা কন্টেন্টের জন্য আমরা দায়ী নই।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">৭. অ্যাফিলিয়েট ডিসক্লোজার</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi কিছু ক্ষেত্রে ব্যাংক থেকে কমিশন পেতে পারে যখন ব্যবহারকারীরা আমাদের মাধ্যমে আবেদন করেন। তবে এটি আমাদের নিরপেক্ষতাকে প্রভাবিত করে না।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">৮. দায়বদ্ধতা</h2>
            <p className="text-muted-foreground leading-relaxed">
              আইন অনুযায়ী, BankBujhi ব্যবহার করার ফলে কোনো পরোক্ষ ক্ষতির জন্য দায়ী থাকবে না।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">৯. মেধাস্বত্ব</h2>
            <p className="text-muted-foreground leading-relaxed">
              BankBujhi-র সকল কন্টেন্ট, লোগো এবং সফটওয়্যার আমাদের সম্পত্তি। অনুমতি ছাড়া এটি কপি বা বিতরণ করা নিষেধ।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">১০. পরিবর্তন</h2>
            <p className="text-muted-foreground leading-relaxed">
              আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করতে পারি। গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে আমরা নোটিশ দেব।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">১১. আইন</h2>
            <p className="text-muted-foreground leading-relaxed">
              এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত হবে।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">১২. যোগাযোগ</h2>
            <p className="text-muted-foreground leading-relaxed">
              শর্তাবলী নিয়ে কোনো প্রশ্ন থাকলে যোগাযোগ করুন:
            </p>
            <div className="bg-card border border-primary/10 rounded-xl p-4 mt-3">
              <p className="font-semibold">BankBujhi</p>
              <p className="text-muted-foreground">ইমেইল: legal@bankbujhi.com</p>
              <p className="text-muted-foreground">ঠিকানা: ঢাকা, বাংলাদেশ</p>
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
