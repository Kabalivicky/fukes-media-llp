import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const fallbackHeadlines = [
  "AI-powered rotoscopy cuts turnaround by 60% in latest studio tests",
  "India's VFX industry projected to grow 25% YoY through 2027",
  "Unreal Engine 5.5 introduces real-time compositing tools",
  "Major OTT platforms increasing VFX budgets for regional content",
  "Virtual production stages expanding across Bengaluru & Hyderabad",
  "NVIDIA releases new GPU-accelerated denoising for film pipelines",
  "Indie filmmakers adopting AI previs to cut pre-production costs",
];

const AUTO_REFRESH_MS = 120_000; // 2 minutes

const NewsTicker = () => {
  const [headlines, setHeadlines] = useState<string[]>(fallbackHeadlines);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const fetchHeadlines = async () => {
    try {
      const { data } = await supabase.functions.invoke('fetch-perplexity-news', {
        body: { searchQuery: 'latest VFX AI post-production entertainment breaking news today' },
      });
      if (data?.news?.length) {
        const titles = data.news.map((n: any) => n.title).filter(Boolean);
        if (titles.length > 0) setHeadlines(titles);
      }
    } catch {
      // keep fallback headlines
    }
  };

  useEffect(() => {
    fetchHeadlines();
    timerRef.current = setInterval(fetchHeadlines, AUTO_REFRESH_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  const doubled = [...headlines, ...headlines];

  return (
    <div className="bg-primary text-primary-foreground text-xs py-1.5 overflow-hidden relative z-[60]">
      <div className="flex items-center">
        <Link
          to="/news/live"
          className="flex-shrink-0 flex items-center gap-1.5 px-3 font-semibold border-r border-primary-foreground/20 hover:underline"
        >
          <Newspaper className="h-3 w-3" />
          <span className="relative flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            LIVE
          </span>
        </Link>
        <div className="overflow-hidden flex-1">
          <div className="flex ticker-scroll whitespace-nowrap">
            {doubled.map((h, i) => (
              <span key={`${i}-${h.slice(0, 10)}`} className="mx-6 inline-block">
                {h}
                <span className="mx-6 text-primary-foreground/40">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
