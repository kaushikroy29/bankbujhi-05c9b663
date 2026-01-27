import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const openPositions = [
  {
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description: "Build and maintain our comparison platform using React, Node.js, and PostgreSQL.",
  },
  {
    title: "Financial Content Writer",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    description: "Create engaging, accurate content about credit cards, loans, and banking products.",
  },
  {
    title: "Bank Partnership Manager",
    department: "Business Development",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description: "Build and maintain relationships with banks and financial institutions.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Dhaka / Remote",
    type: "Full-time",
    description: "Design intuitive interfaces that help users find the right financial products.",
  },
];

const benefits = [
  { icon: "payments", title: "Competitive Salary", description: "Market-leading compensation packages" },
  { icon: "health_and_safety", title: "Health Insurance", description: "Comprehensive medical coverage for you and family" },
  { icon: "home_work", title: "Flexible Work", description: "Hybrid work options available" },
  { icon: "school", title: "Learning Budget", description: "Annual budget for courses and conferences" },
  { icon: "celebration", title: "Team Events", description: "Regular team outings and celebrations" },
  { icon: "trending_up", title: "Growth Path", description: "Clear career progression opportunities" },
];

const Careers = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-muted-foreground text-sm font-medium hover:underline">Home</Link>
          <MaterialIcon name="chevron_right" className="text-sm text-muted-foreground" />
          <span className="text-primary text-sm font-medium">Careers</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Build the Future of <span className="text-primary">Finance</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our mission to democratize financial information in Bangladesh and help millions make better decisions.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card border border-primary/10 rounded-xl p-5 flex items-start gap-4"
              >
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MaterialIcon name={benefit.icon} className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Open Positions</h2>
          <div className="flex flex-col gap-4">
            {openPositions.map((job) => (
              <div
                key={job.title}
                className="bg-card border border-primary/10 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MaterialIcon name="business" className="text-sm" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MaterialIcon name="location_on" className="text-sm" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <MaterialIcon name="schedule" className="text-sm" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-3">{job.description}</p>
                  </div>
                  <Button className="shrink-0">
                    Apply Now
                    <MaterialIcon name="arrow_forward" className="ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Position CTA */}
        <div className="bg-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We're always interested in hearing from talented people. Send us your resume and we'll keep you in mind.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Contact Us
            <MaterialIcon name="mail" />
          </Link>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Careers;
