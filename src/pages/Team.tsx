import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Rahim Ahmed",
    role: "Founder & CEO",
    bio: "Former banker with 15+ years in retail banking. Passionate about financial literacy in Bangladesh.",
    icon: "person",
  },
  {
    name: "Fatima Khan",
    role: "Head of Research",
    bio: "Financial analyst specializing in credit products. MBA from IBA, Dhaka University.",
    icon: "analytics",
  },
  {
    name: "Kamal Hossain",
    role: "Lead Developer",
    bio: "Full-stack developer building fintech solutions. Previously at Pathao and bKash.",
    icon: "code",
  },
  {
    name: "Nusrat Jahan",
    role: "Content Lead",
    bio: "Financial journalist creating accessible content for everyday Bangladeshis.",
    icon: "edit_note",
  },
  {
    name: "Arif Rahman",
    role: "Partnership Manager",
    bio: "Building relationships with banks and financial institutions across Bangladesh.",
    icon: "handshake",
  },
  {
    name: "Sadia Islam",
    role: "Customer Success",
    bio: "Ensuring every user finds the perfect financial product for their needs.",
    icon: "support_agent",
  },
];

const Team = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">Home</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-sm font-medium">Our Team</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate team of financial experts, developers, and writers dedicated to helping Bangladeshis make smarter financial decisions.
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
        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Join Our Team</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We're always looking for talented individuals who share our passion for financial inclusion.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            View Open Positions
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
