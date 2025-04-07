
import { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import auNzMapImage from '/lovable-uploads/18519d06-b0d4-4ebf-a7ca-7436b6748170.png';
import northAmericaMapImage from '/lovable-uploads/85ee4cc8-9963-49c6-bfbc-0c4246af2318.png';
import worldMapImage from '/lovable-uploads/943c0b44-9308-4e29-87cd-f790717092c1.png';

interface VFXGlobalMapProps {
  activeRegion: string;
  setActiveRegion: (region: string) => void;
}

const VFXGlobalMap = ({ activeRegion, setActiveRegion }: VFXGlobalMapProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const regions = [
    { id: "north-america", name: "North America", color: "#F9D923", headcount: "15,141", x: 20, y: 40 },
    { id: "uk-europe", name: "UK & Europe", color: "#BB86FC", headcount: "15,947", x: 45, y: 30 },
    { id: "india", name: "India", color: "#FF7D00", headcount: "17,390", x: 60, y: 42 },
    { id: "east-asia", name: "East & SE Asia", color: "#00C897", headcount: "4,916", x: 75, y: 37 },
    { id: "australia-nz", name: "Australia & NZ", color: "#E63946", headcount: "3,577", x: 80, y: 70 },
    { id: "global", name: "Global Overview", color: "#4CC9F0", headcount: "58,971", x: 50, y: 50 },
  ];

  // Get the appropriate map image based on active region
  const getRegionMap = () => {
    switch(activeRegion) {
      case 'australia-nz':
        return auNzMapImage;
      case 'north-america':
        return northAmericaMapImage;
      default:
        return worldMapImage;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-red-500">VFX Industry Hubs</h2>
        <Button 
          variant="outline" 
          className="group border-red-500/30 hover:border-red-500/60 text-red-500"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={`transition-transform duration-300 ${isHovering ? 'translate-x-0' : '-translate-x-1'}`}>
            Explore interactive map
          </span>
          <ExternalLink className={`h-4 w-4 ml-2 transition-transform duration-300 ${isHovering ? 'translate-x-1' : 'translate-x-0'}`} />
        </Button>
      </div>
      
      <div className="relative glass overflow-hidden rounded-xl aspect-[16/9] w-full border-2 border-red-500/20">
        <img 
          src={getRegionMap()} 
          alt={`${regions.find(r => r.id === activeRegion)?.name || 'Global'} VFX Hub Map`} 
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-sm text-white/90">
            {activeRegion === 'australia-nz' ? 
              'Sydney leads with 1,242 VFX professionals, while Wellington hosts major studios like Weta FX.' : 
              activeRegion === 'north-america' ? 
              'Los Angeles, Montreal, Vancouver, and New York serve as the primary VFX hubs in North America.' :
              'This map shows the global distribution of VFX professionals. Circle size represents relative workforce population.'}
          </p>
        </div>
        
        {/* Only show pins for the global view */}
        {activeRegion === 'global' && regions.filter(r => r.id !== 'global').map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`absolute rounded-full transition transform hover:scale-110 flex items-center justify-center ${
              activeRegion === region.id 
                ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-105' 
                : 'opacity-80'
            }`}
            style={{ 
              left: `${region.x}%`, 
              top: `${region.y}%`,
              width: '40px',
              height: '40px',
              backgroundColor: region.color,
            }}
          >
            <MapPin className="h-5 w-5 text-white" />
            <span className="sr-only">{region.name}</span>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`glass p-4 rounded-lg text-center transition hover:bg-white/5 border ${
              activeRegion === region.id 
                ? `border-2 ${region.id === 'australia-nz' ? 'border-red-500/60' : 
                    region.id === 'north-america' ? 'border-amber-400/60' : 'border-white/30'}` 
                : 'border-white/10'
            }`}
          >
            <h3 className="font-semibold" style={{ color: region.color }}>
              {region.name}
            </h3>
            <p className="text-2xl font-bold mt-2">{region.headcount}</p>
            <p className="text-xs text-white/70">VFX Professionals</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VFXGlobalMap;
