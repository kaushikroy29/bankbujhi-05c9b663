import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "./MaterialIcon";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { fetchCreditCards, fetchBanks, type CreditCard, type Bank } from "@/lib/api/banks";
import { ScrollArea } from "./scroll-area";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  variant?: "default" | "hero";
}

interface SearchResult {
  type: "card" | "bank";
  id: string;
  name: string;
  subtext: string;
  imageUrl?: string | null;
}

const SearchBar = ({ 
  placeholder = "Search by bank or card name...",
  onSearch,
  className,
  variant = "default"
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const [cards, banks] = await Promise.all([
          fetchCreditCards({ search: query }),
          fetchBanks()
        ]);

        const searchResults: SearchResult[] = [];

        // Filter banks by name
        const matchingBanks = banks.filter(bank => 
          bank.name.toLowerCase().includes(query.toLowerCase()) ||
          (bank.name_bn && bank.name_bn.includes(query))
        );

        // Add matching banks
        matchingBanks.slice(0, 3).forEach(bank => {
          searchResults.push({
            type: "bank",
            id: bank.id,
            name: bank.name,
            subtext: bank.type === "foreign" ? "Foreign Bank" : "Commercial Bank",
            imageUrl: bank.logo_url
          });
        });

        // Add matching cards
        cards.slice(0, 5).forEach(card => {
          searchResults.push({
            type: "card",
            id: card.id,
            name: card.name,
            subtext: card.banks?.name || card.category || "Credit Card",
            imageUrl: card.image_url
          });
        });

        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    } else if (query.trim()) {
      navigate(`/compare?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/compare');
    }
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "card") {
      navigate(`/cards/${result.id}`);
    } else {
      navigate(`/compare?bank=${result.id}`);
    }
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const ResultDropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
      <ScrollArea className="max-h-80">
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            <MaterialIcon name="search" className="animate-pulse mr-2" />
            Searching...
          </div>
        ) : results.length > 0 ? (
          <div className="py-2">
            {results.map((result, index) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors",
                  selectedIndex === index && "bg-muted"
                )}
              >
                <div className="shrink-0 size-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  {result.imageUrl ? (
                    <img 
                      src={result.imageUrl} 
                      alt={result.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <MaterialIcon 
                      name={result.type === "bank" ? "account_balance" : "credit_card"} 
                      className="text-muted-foreground"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{result.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MaterialIcon 
                      name={result.type === "bank" ? "business" : "credit_card"} 
                      className="text-xs"
                    />
                    {result.subtext}
                  </p>
                </div>
                <MaterialIcon name="arrow_forward" className="text-muted-foreground" />
              </button>
            ))}
            {/* View all results option */}
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 border-t border-border"
            >
              View all results for "{query}"
              <MaterialIcon name="search" className="text-sm" />
            </button>
          </div>
        ) : query.length >= 2 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No results found for "{query}"
          </div>
        ) : null}
      </ScrollArea>
    </div>
  );

  if (variant === "hero") {
    return (
      <div ref={wrapperRef} className={cn(
        "w-full max-w-2xl relative",
        className
      )}>
        <div className="bg-card p-2 rounded-xl shadow-xl border border-primary/10">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center flex-1 w-full px-4 border-r-0 md:border-r border-primary/10">
              <MaterialIcon name="search" className="text-primary mr-2" />
              <input
                ref={inputRef}
                className="w-full py-3 bg-transparent border-none focus:ring-0 focus:outline-none text-sm md:text-base placeholder:text-muted-foreground"
                placeholder={placeholder}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => results.length > 0 && setIsOpen(true)}
              />
              {isLoading && (
                <MaterialIcon name="sync" className="text-muted-foreground animate-spin" />
              )}
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
        {isOpen && <ResultDropdown />}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
        <MaterialIcon name="search" className="text-muted-foreground" />
        <input
          ref={inputRef}
          className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm placeholder:text-muted-foreground"
          placeholder={placeholder}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        {isLoading && (
          <MaterialIcon name="sync" className="text-muted-foreground animate-spin text-sm" />
        )}
      </div>
      {isOpen && <ResultDropdown />}
    </div>
  );
};

export default SearchBar;
