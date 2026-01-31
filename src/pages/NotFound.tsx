import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="text-center p-8 bg-card rounded-2xl border border-primary/10 shadow-lg max-w-md w-full mx-4">
        <h1 className="mb-2 text-6xl font-black text-primary/20">404</h1>
        <h2 className="mb-4 text-2xl font-bold">পৃষ্ঠাটি পাওয়া যায়নি</h2>
        <p className="mb-8 text-muted-foreground">দুঃখিত, আপনি যে লিংকটি খুঁজছেন তা বর্তমানে আমাদের সার্ভারে নেই।</p>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors w-full"
        >
          হোম পেজে ফিরে যান
        </a>
      </div>
    </div>
  );
};

export default NotFound;
