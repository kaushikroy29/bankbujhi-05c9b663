import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MaterialIcon from "@/components/ui/MaterialIcon";

const QuizCTASection = () => {
  return (
    <section className="container-padding py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-8">
            {/* Icon */}
            <div className="shrink-0">
              <div className="size-16 md:size-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MaterialIcon name="quiz" className="text-3xl md:text-4xl text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
                কোন কার্ড আপনার জন্য সঠিক?
              </h2>
              <p className="text-white/80 mb-5 text-sm sm:text-base max-w-lg">
                ২ মিনিটের কুইজে আপনার খরচের ধরন ও পছন্দ অনুযায়ী সেরা কার্ডের পরামর্শ পান।
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="font-bold gap-2 bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link to="/quiz">
                  <MaterialIcon name="play_arrow" className="text-xl" />
                  কুইজ শুরু করুন
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizCTASection;
