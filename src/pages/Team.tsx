import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "রহিম আহমেদ",
    role: "প্রতিষ্ঠাতা ও সিইও",
    bio: "সাবেক ব্যাংকার, রিটেইল ব্যাংকিংয়ে ১৫+ বছরের অভিজ্ঞতা। বাংলাদেশে ফাইনান্সিয়াল লিটারেসি নিয়ে কাজের স্বপ্ন দেখেন।",
    icon: "person",
  },
  {
    name: "ফাতিমা খান",
    role: "গবেষণা প্রধান",
    bio: "আর্থিক বিশ্লেষক, ক্রেডিট প্রোডাক্ট বিশেষজ্ঞ। এমবিএ (আইবিএ, ঢাকা বিশ্ববিদ্যালয়)।",
    icon: "analytics",
  },
  {
    name: "কামাল হোসেন",
    role: "লিড ডেভেলপার",
    bio: "ফুল-স্ট্যাক ডেভেলপার, ফিনটেক সলিউশনে দক্ষ। ইতিপূর্বে পাঠাও (Pathao) এবং বিকাশ (bKash)-এ কাজ করেছেন।",
    icon: "code",
  },
  {
    name: "নুসরাত জাহান",
    role: "কন্টেন্ট লিড",
    bio: "আর্থিক সাংবাদিক, সাধারণ দর্শকদের জন্য সহজবোধ্য কন্টেন্ট তৈরিতে অভিজ্ঞ।",
    icon: "edit_note",
  },
  {
    name: "আরিফ রহমান",
    role: "পার্টনারশিপ ম্যানেজার",
    bio: "বাংলাদেশের ব্যাংক ও আর্থিক প্রতিষ্ঠানগুলোর সাথে পার্টনারশিপ তৈরিতে নিয়োজিত।",
    icon: "handshake",
  },
  {
    name: "সাদিয়া ইসলাম",
    role: "কাস্টমার সাকসেস",
    bio: "প্রতিটি ব্যবহারকারী যেন তাদের প্রয়োজন অনুযায়ী সেরা পণ্যটি খুঁজে পায় তা নিশ্চিত করেন।",
    icon: "support_agent",
  },
];

const Team = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 font-bengali">
          <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">হোম</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-sm font-medium">আমাদের টিম</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            আমাদের <span className="text-primary">টিমের</span> সাথে পরিচিত হোন
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-bengali">
            আর্থিক বিশেষজ্ঞ, ডেভেলপার এবং লেখকদের একটি নিবেদিত টিম, যারা আপনার সঠিক আর্থিক সিদ্ধান্ত নিতে সাহায্য করে।
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-card border border-primary/10 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MaterialIcon name={member.icon} className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Join Us CTA */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center font-bengali">
          <h2 className="text-2xl font-bold mb-3">আমাদের টিমে যোগ দিন</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto font-bengali">
            আমরা সর্বদা এমন মেধাবী মানুষের খোঁজ করি যারা আমাদের আর্থিক সহজলভ্যতার মিশনে অংশ নিতে আগ্রহী।
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            খালি পদগুলো দেখুন
            <MaterialIcon name="arrow_forward" />
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Team;
