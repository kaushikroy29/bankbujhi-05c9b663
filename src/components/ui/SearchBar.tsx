import { useState } from "react";
import MaterialIcon from "./MaterialIcon";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  variant?: "default" | "hero";
}

const SearchBar = ({ 
  placeholder = "Search by bank or category...",
  onSearch,
  className,
  variant = "default"
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (variant === "hero") {
    return (
      <div className={cn(
        "w-full max-w-2xl bg-card p-2 rounded-xl shadow-xl border border-primary/10",
        className
      )}>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center flex-1 w-full px-4 border-r-0 md:border-r border-primary/10">
            <MaterialIcon name="search" className="text-primary mr-2" />
            <input
              className="w-full py-3 bg-transparent border-none focus:ring-0 focus:outline-none text-sm md:text-base placeholder:text-muted-foreground"
              placeholder={placeholder}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              onClick={handleSearch}
              className="w-full md:w-auto font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2"
            >
              Search 
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2",
      className
    )}>
      <MaterialIcon name="search" className="text-muted-foreground" />
      <input
        className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm placeholder:text-muted-foreground"
        placeholder={placeholder}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
