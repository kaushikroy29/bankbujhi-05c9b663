import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MaterialIcon from "@/components/ui/MaterialIcon";

const values = [
  {
    icon: "visibility",
    title: "Transparency",
    description: "We show you all fees, rates, and terms upfront. No hidden surprises.",
  },
  {
    icon: "shield",
    title: "Trust",
    description: "Bank-grade security protects your data. Your privacy is our priority.",
  },
  {
    icon: "diversity_3",
    title: "Accessibility",
    description: "Financial information in Bengali and English for all Bangladeshis.",
  },
  {
    icon: "trending_up",
    title: "Empowerment",
    description: "We help you make informed decisions to grow your financial health.",
  },
];

const team = [
  { name: "Rahim Ahmed", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Fatima Khan", role: "Head of Product", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Karim Hossain", role: "Lead Engineer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { name: "Nusrat Jahan", role: "Finance Expert", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
];

const About = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-foreground mb-6">
              Making Finance <span className="text-primary">Simple</span> for Bangladesh
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              BankBujhi helps millions of Bangladeshis compare financial products and make smarter money decisions.
            </p>
            <p className="text-lg font-bengali text-muted-foreground">
              আমরা বাংলাদেশের মানুষদের আর্থিক সিদ্ধান্ত নিতে সাহায্য করি।
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 max-w-[1200px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                In Bangladesh, comparing financial products has always been confusing. Hidden fees, complex terms, 
                and scattered information make it hard for consumers to make the right choice.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                BankBujhi was born to solve this problem. We aggregate data from 40+ banks and financial 
                institutions, presenting it in a clear, unbiased way so you can make informed decisions.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl border border-primary/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-black text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Users Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-primary mb-2">40+</div>
                  <div className="text-sm text-muted-foreground">Partner Banks</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Products Compared</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-primary mb-2">₿0</div>
                  <div className="text-sm text-muted-foreground">Cost to Users</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card p-6 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon name={value.icon} className="text-primary text-2xl" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                />
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make Smarter Financial Decisions?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Join thousands of Bangladeshis who trust BankBujhi for unbiased financial comparisons.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/compare"
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors"
              >
                Compare Cards
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
