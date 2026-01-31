import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, User, Briefcase, Building2, Package, 
  X, ArrowRight, Loader2 
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult {
  id: string;
  type: 'artist' | 'job' | 'company' | 'resource';
  title: string;
  subtitle?: string;
  url: string;
}

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  // Search when query changes
  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      const searchResults: SearchResult[] = [];
      const searchTerm = `%${debouncedQuery}%`;

      try {
        // Search artists
        const { data: artists } = await supabase
          .from('profiles_public')
          .select('user_id, display_name, title, location')
          .or(`display_name.ilike.${searchTerm},title.ilike.${searchTerm},skills.cs.{${debouncedQuery}}`)
          .limit(5);

        artists?.forEach((a) => {
          searchResults.push({
            id: a.user_id || '',
            type: 'artist',
            title: a.display_name || 'Unknown Artist',
            subtitle: a.title || a.location || undefined,
            url: `/artist/${a.user_id}`,
          });
        });

        // Search jobs
        const { data: jobs } = await supabase
          .from('jobs')
          .select('id, title, location, company_id')
          .eq('is_active', true)
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5);

        jobs?.forEach((j) => {
          searchResults.push({
            id: j.id,
            type: 'job',
            title: j.title,
            subtitle: j.location || undefined,
            url: `/jobs?highlight=${j.id}`,
          });
        });

        // Search companies
        const { data: companies } = await supabase
          .from('companies')
          .select('id, name, slug, location')
          .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5);

        companies?.forEach((c) => {
          searchResults.push({
            id: c.id,
            type: 'company',
            title: c.name,
            subtitle: c.location || undefined,
            url: `/company/${c.slug}`,
          });
        });

        // Search resources
        const { data: resources } = await supabase
          .from('resources')
          .select('id, name, slug, short_description')
          .eq('is_approved', true)
          .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
          .limit(5);

        resources?.forEach((r) => {
          searchResults.push({
            id: r.id,
            type: 'resource',
            title: r.name,
            subtitle: r.short_description || undefined,
            url: `/resources?highlight=${r.id}`,
          });
        });

        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    search();
  }, [debouncedQuery]);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.url);
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'artist': return User;
      case 'job': return Briefcase;
      case 'company': return Building2;
      case 'resource': return Package;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'artist': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'job': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'company': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'resource': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-lg gap-0">
        <div className="flex items-center px-4 border-b">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists, jobs, companies, resources..."
            className="border-0 focus-visible:ring-0 text-base"
          />
          {query && (
            <Button variant="ghost" size="sm" onClick={() => setQuery('')}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {query ? 'No results found' : 'Start typing to search...'}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {results.map((result, index) => {
                const Icon = getIcon(result.type);
                return (
                  <motion.button
                    key={result.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                  >
                    <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      {result.subtitle && (
                        <p className="text-sm text-muted-foreground truncate">{result.subtitle}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="capitalize text-xs">
                      {result.type}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        <div className="p-2 border-t text-xs text-muted-foreground flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd> select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">esc</kbd> close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
