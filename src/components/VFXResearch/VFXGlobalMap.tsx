
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold neon-text-blue">World VFX Hubs</h2>
        <a 
          href="#" 
          className="flex items-center space-x-2 text-secondary hover:text-secondary/80 transition"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={`transition-transform duration-300 ${isHovering ? 'translate-x-0' : '-translate-x-1'}`}>
            Explore interactive map
          </span>
          <ExternalLink className={`h-4 w-4 transition-transform duration-300 ${isHovering ? 'translate-x-1' : 'translate-x-0'}`} />
        </a>
      </div>
      
      <div className="relative glass overflow-hidden rounded-xl aspect-[16/9] w-full">
        <img 
          src={worldMapImage} 
          alt="World VFX Hubs Map" 
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-sm text-white/80">
            This map shows the global distribution of VFX professionals. Circle size represents relative workforce population.
          </p>
        </div>
        
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`absolute p-3 rounded-full transition transform hover:scale-110 ${
              activeRegion === region.id 
                ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-105' 
                : 'opacity-80'
            }`}
            style={{ 
              backgroundColor: region.color,
              left: `${region.x}%`, 
              top: `${region.y}%`,
              width: region.id === 'global' ? '100px' : '80px',
              height: region.id === 'global' ? '100px' : '80px',
            }}
          >
            <span className="sr-only">{region.name}</span>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={`glass p-4 rounded-lg text-center transition hover:bg-white/10 ${
              activeRegion === region.id ? 'ring-2 ring-white/50' : ''
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
