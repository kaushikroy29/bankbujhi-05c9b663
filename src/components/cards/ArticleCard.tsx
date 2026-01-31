import { Link } from "react-router-dom";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface Article {
  id: string | number;
  title: string;
  category: string;
  date?: string;
  readTime: string;
  image?: string;
  excerpt?: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link
      to={`/guides/${article.id}`}
      className="group bg-card rounded-xl border border-primary/10 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
            {article.category}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MaterialIcon name="calendar_today" className="text-sm" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <MaterialIcon name="schedule" className="text-sm" />
            {article.readTime} read
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
