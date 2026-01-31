import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getUserWatchlist } from "@/lib/api/watchlist";
import { fetchCreditCard, fetchCreditCards, type CreditCard } from "@/lib/api/banks"; // Import types
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type Notification = Database['public']['Tables']['notifications']['Row'];

interface WatchlistCard {
  id: string;
  name: string;
  bankName: string;
  image_url?: string | null;
  type: string;
}

const menuItems = [
  { icon: "dashboard", label: "ড্যাশবোর্ড", active: true },
  { icon: "credit_card", label: "আমার কার্ড", active: false },
  { icon: "bookmark", label: "সংরক্ষিত", active: false },
  { icon: "history", label: "আবেদনসমূহ", active: false },
  { icon: "settings", label: "সেটিংস", active: false },
];

const Dashboard = () => {
  const [profileCompletion] = useState(65);
  const [showSidebar, setShowSidebar] = useState(false);

  // Data State
  const [watchlist, setWatchlist] = useState<WatchlistCard[]>([]);
  const [recommendations, setRecommendations] = useState<CreditCard[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    loadDashboardData();

    // Realtime Subscription
    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotif = payload.new as Notification;
          toast.info(newNotif.title_bn, {
            description: newNotif.message_bn,
          });
          setNotifications((prev) => [newNotif, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setUserEmail(user.email);

      // 1. Load Watchlist
      const { data: watchlistData } = await getUserWatchlist();
      if (watchlistData) {
        const watchlistDetails = await Promise.all(
          watchlistData.slice(0, 5).map(async (item) => {
            if (item.product_type === 'credit_card') {
              const card = await fetchCreditCard(item.product_id);
              if (card) {
                return {
                  id: card.id,
                  name: card.name,
                  bankName: card.banks?.name || "Unknown",
                  image_url: card.image_url,
                  type: 'credit_card'
                };
              }
            }
            return null;
          })
        );
        setWatchlist(watchlistDetails.filter((item): item is WatchlistCard => item !== null));
      }

      // 2. Load Recommendations (Featured Cards)
      const allCards = await fetchCreditCards();
      // Simple logic: Pick random 2 featured cards or just top 2
      const featured = allCards.filter(c => c.badge).slice(0, 2);
      setRecommendations(featured.length > 0 ? featured : allCards.slice(0, 2));

      // 3. Load Notifications (Recent 5)
      const { data: notifData } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (notifData) {
        setNotifications(notifData);
      }

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 sm:py-8 w-full pb-20 md:pb-8">
        {/* Mobile Profile Header */}
        <div className="lg:hidden mb-6">
          <div className="bg-card rounded-xl border border-primary/10 p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MaterialIcon name="person" className="text-2xl text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">স্বাগতম!</h3>
                <p className="text-sm text-muted-foreground truncate">{userEmail || "Guest"}</p>
              </div>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg bg-muted"
              >
                <MaterialIcon name="menu" />
              </button>
            </div>

            {/* Profile Completion */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">প্রোফাইল সম্পন্ন</span>
                <span className="font-bold text-primary">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>

            {/* Mobile Menu - Collapsible */}
            {showSidebar && (
              <nav className="mt-4 pt-4 border-t border-primary/10 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${item.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <MaterialIcon name={item.icon} className="text-lg" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
                  <MaterialIcon name="logout" className="text-lg" />
                  <span className="font-medium text-sm">লগ আউট</span>
                </button>
              </nav>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-card rounded-xl border border-primary/10 p-6 sticky top-24">
              {/* Profile */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MaterialIcon name="person" className="text-4xl text-primary" />
                </div>
                <h3 className="font-bold">স্বাগতম!</h3>
                <p className="text-sm text-muted-foreground">{userEmail || "Guest"}</p>
              </div>

              {/* Profile Completion */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">প্রোফাইল সম্পন্ন</span>
                  <span className="font-bold text-primary">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>

              {/* Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${item.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <MaterialIcon name={item.icon} className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-primary/10">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors">
                  <MaterialIcon name="logout" className="text-lg" />
                  <span className="font-medium">লগ আউট</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Quick Actions - Mobile first */}
            <section className="lg:order-last">
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">দ্রুত অ্যাকশন</h2>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {[
                  { icon: "add_card", label: "কার্ড যোগ", href: "/compare" },
                  { icon: "compare_arrows", label: "তুলনা করুন", href: "/compare" },
                  { icon: "calculate", label: "ইএমআই ক্যালক", href: "/calculator/emi" }, // Updated Link
                  { icon: "support_agent", label: "সহায়তা", href: "/contact" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="bg-card p-3 sm:p-4 rounded-xl border border-primary/10 text-center hover:bg-primary/5 transition-colors"
                  >
                    <MaterialIcon name={action.icon} className="text-xl sm:text-3xl text-primary mb-1 sm:mb-2" />
                    <span className="text-[10px] sm:text-sm font-medium block truncate">{action.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Notifications Section */}
            {notifications.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <MaterialIcon name="notifications" className="text-primary" />
                  আপডেট এবং নোটিফিকেশন
                </h2>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="bg-card/50 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.severity === 'critical' ? 'bg-destructive' : 'bg-primary'}`} />
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{notif.title_bn}</h4>
                        <p className="text-sm text-muted-foreground">{notif.message_bn}</p>
                        <span className="text-[10px] text-muted-foreground/60 mt-1 block">
                          {new Date(notif.created_at || '').toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Saved Cards */}
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold">সংরক্ষিত কার্ড</h2>
                <Button variant="outline" size="sm" className="text-primary border-primary text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3" asChild>
                  <Link to="/watchlist">
                    <MaterialIcon name="visibility" className="mr-1 text-sm" />
                    <span className="hidden xs:inline">সবগুলো দেখুন</span>
                    <span className="xs:hidden">সব</span>
                  </Link>
                </Button>
              </div>

              {/* Display Logic */}
              {loading ? (
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="w-[260px] h-[180px] rounded-xl shrink-0" />
                  ))}
                </div>
              ) : watchlist.length === 0 ? (
                <div className="text-center py-10 bg-muted/20 rounded-xl border border-dashed border-primary/20">
                  <p className="text-muted-foreground mb-4">কোনো কার্ড সেভ করা নেই</p>
                  <Button size="sm" asChild><Link to="/compare">কার্ড খুঁজুন</Link></Button>
                </div>
              ) : (
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
                  {watchlist.map((card) => (
                    <div
                      key={card.id}
                      className="bg-card rounded-xl border border-primary/10 p-3 sm:p-4 hover:shadow-lg transition-shadow shrink-0 w-[260px] sm:w-auto flex flex-col justify-between"
                    >
                      <div>
                        {card.image_url ? (
                          <div className="h-32 rounded-lg overflow-hidden mb-3">
                            <img src={card.image_url} alt={card.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="h-32 bg-primary/10 rounded-lg mb-3 flex items-center justify-center text-primary">
                            <MaterialIcon name="credit_card" className="text-4xl" />
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-primary text-[10px] sm:text-xs font-bold uppercase">{card.bankName}</span>
                        </div>
                        <div className="font-bold text-sm sm:text-base line-clamp-1">{card.name}</div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 text-[10px] sm:text-xs h-8" asChild>
                          <Link to={`/cards/${card.id}`}>বিস্তারিত</Link>
                        </Button>
                        <Button size="sm" className="flex-1 text-[10px] sm:text-xs h-8" asChild>
                          <Link to="/eligibility">আবেদন</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recommendations */}
            <section>
              <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">আপনার জন্য সুপারিশকৃত</h2>
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Skeleton className="h-32 w-full rounded-xl" />
                  <Skeleton className="h-32 w-full rounded-xl" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-card rounded-xl border border-primary/10 p-4 sm:p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                        <div className="min-w-0">
                          {rec.badge && (
                            <span className="text-[10px] sm:text-xs font-semibold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full inline-block mb-1">
                              {rec.badge}
                            </span>
                          )}
                          <h3 className="font-bold mt-0.5 sm:mt-1 truncate">{rec.banks?.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{rec.name}</p>
                        </div>
                        <div className="text-right shrink-0">
                          {/* Show Annual Fee or a Benefit */}
                          <div className="text-sm sm:text-base font-bold text-primary">
                            {rec.annual_fee === "৳0" ? "ফ্রি" : rec.annual_fee}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">বার্ষিক ফি</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline" className="w-full h-9" asChild>
                          <Link to={`/cards/${rec.id}`}>বিস্তারিত</Link>
                        </Button>
                        <Button size="sm" className="w-full h-9" asChild>
                          <Link to="/compare">তুলনা করুন</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
