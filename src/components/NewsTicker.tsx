import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';

const headlines = [
  "AI-powered rotoscopy cuts turnaround by 60% in latest studio tests",
  "India's VFX industry projected to grow 25% YoY through 2027",
  "Unreal Engine 5.5 introduces real-time compositing tools",
  "Major OTT platforms increasing VFX budgets for regional content",
  "Virtual production stages expanding across Bengaluru & Hyderabad",
  "NVIDIA releases new GPU-accelerated denoising for film pipelines",
  "Indie filmmakers adopting AI previs to cut pre-production costs",
];

const NewsTicker = () => {
  const doubled = [...headlines, ...headlines];

  return (
    <div className="bg-primary text-primary-foreground text-xs py-1.5 overflow-hidden relative z-[60]">
      <div className="flex items-center">
        <Link
          to="/news/live"
          className="flex-shrink-0 flex items-center gap-1.5 px-3 font-semibold border-r border-primary-foreground/20 hover:underline"
        >
          <Newspaper className="h-3 w-3" />
          LIVE NEWS
        </Link>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((h, i) => (
              <span key={i} className="mx-6 inline-block">
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
