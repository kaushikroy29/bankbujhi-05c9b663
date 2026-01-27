import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center gap-1 text-sm text-muted-foreground", className)}
    >
      <ol 
        className="flex items-center gap-1 flex-wrap"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home */}
        <li 
          className="flex items-center gap-1"
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-primary transition-colors"
            itemProp="item"
          >
            <Home className="size-4" />
            <span className="sr-only" itemProp="name">হোম</span>
          </Link>
          <meta itemProp="position" content="1" />
          <ChevronRight className="size-4 text-muted-foreground/50" />
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          return (
            <li 
              key={index}
              className="flex items-center gap-1"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {item.href && !isLast ? (
                <Link 
                  to={item.href} 
                  className="hover:text-primary transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span 
                  className={cn(isLast && "text-foreground font-medium")}
                  itemProp="name"
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(position)} />
              {!isLast && <ChevronRight className="size-4 text-muted-foreground/50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
