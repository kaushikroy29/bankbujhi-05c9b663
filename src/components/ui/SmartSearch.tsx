import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from '@/components/ui/MaterialIcon';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
    query: string;
    intent: string;
    results: string;
    filter?: Record<string, unknown>;
    path?: string;
}

interface SmartSearchProps {
    className?: string;
    placeholder?: string;
    variant?: 'default' | 'hero';
}

const SmartSearch = ({
    className,
    placeholder = "কী ধরনের কার্ড খুঁজছেন? (যেমন: কম ফি, লাউঞ্জ এক্সেস)",
    variant = 'default'
}: SmartSearchProps) => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const defaultSuggestions: SearchSuggestion[] = [
        {
            query: 'কম ফি',
            intent: 'low_fee',
            results: 'Cards with annual fee < ৳2000',
            filter: { annualFee: '0-2000' }
        },
        {
            query: 'লাউঞ্জ এক্সেস',
            intent: 'lounge_access',
            results: 'Cards with airport lounge access',
            filter: { category: 'Travel' } // Mapping to Travel category for now as proxy
        },
        {
            query: 'স্টুডেন্ট কার্ড',
            intent: 'student_card',
            results: 'Student-friendly cards',
            filter: { category: 'Student Cards' }
        },
        {
            query: 'ক্যাশব্যাক',
            intent: 'cashback',
            results: 'Highest cashback cards',
            filter: { category: 'Cashback' }
        }
    ];

    const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>(defaultSuggestions);

    useEffect(() => {
        // Handle outside click to close suggestions
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSearch = (value: string) => {
        setQuery(value);
        if (!value.trim()) {
            setFilteredSuggestions(defaultSuggestions);
            return;
        }

        // Simple client-side filtering of suggestions
        // In a real app, this might call an API
        const lowerValue = value.toLowerCase();
        const filtered = defaultSuggestions.filter(s =>
            s.query.toLowerCase().includes(lowerValue) ||
            s.intent.includes(lowerValue)
        );

        // Add a "Search for..." option if no direct matches or as a fallback
        if (filtered.length === 0 || value.length > 1) {
            filtered.push({
                query: `${value}`,
                intent: 'search_query',
                results: 'Search by text',
                filter: { search: value }
            });
        }

        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
    };

    const applyFilter = (suggestion: SearchSuggestion) => {
        setQuery(suggestion.query);
        setShowSuggestions(false);

        // Construct query params
        const params = new URLSearchParams();

        if (suggestion.filter) {
            if (suggestion.filter.annualFee) params.set('annualFee', suggestion.filter.annualFee as string);
            if (suggestion.filter.category) params.set('category', suggestion.filter.category as string);
            if (suggestion.filter.search) params.set('search', suggestion.filter.search as string);
        }

        navigate(`/compare?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            // If enter is pressed, search for the current query text
            navigate(`/compare?search=${encodeURIComponent(query)}`);
            setShowSuggestions(false);
        }
    };

    return (
        <div ref={wrapperRef} className={cn("relative w-full max-w-2xl mx-auto", className)}>
            <div className={cn(
                "relative flex items-center w-full transition-all duration-200",
                variant === 'hero'
                    ? "bg-background rounded-full shadow-lg border-2 border-primary/10 focus-within:border-primary/30 focus-within:shadow-xl hover:border-primary/20"
                    : "bg-background rounded-lg border border-input focus-within:border-primary"
            )}>
                <MaterialIcon
                    name="search"
                    className={cn(
                        "ml-4 text-muted-foreground",
                        variant === 'hero' ? "text-xl" : "text-lg"
                    )}
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn(
                        "w-full bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground/70",
                        variant === 'hero' ? "py-4 px-3 text-lg" : "py-2 px-3"
                    )}
                />
                {query && (
                    <button
                        onClick={() => { setQuery(''); setFilteredSuggestions(defaultSuggestions); }}
                        className="mr-4 text-muted-foreground hover:text-foreground"
                    >
                        <MaterialIcon name="close" className="text-lg" />
                    </button>
                )}
            </div>

            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card shadow-xl rounded-xl border border-primary/10 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-[300px] overflow-y-auto py-2">
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={`${suggestion.intent}-${index}`}
                                className="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border/40 last:border-0"
                                onClick={() => applyFilter(suggestion)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <MaterialIcon
                                            name={suggestion.intent === 'search_query' ? 'search' : 'trending_up'}
                                            className="text-primary text-sm"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-foreground">{suggestion.query}</p>
                                        <p className="text-xs text-muted-foreground">{suggestion.results}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SmartSearch;
