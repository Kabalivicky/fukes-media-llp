
import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import ukMapImage from '/lovable-uploads/32b11ed0-50e1-4177-8c4c-7436fe13f9cb.png';
import europeMapImage from '/lovable-uploads/cc500bbe-25fa-4e0f-8c5f-1807de3159c9.png';
import africaMapImage from '/lovable-uploads/e49c65d4-1754-41a7-a4c7-b6b65f81b811.png';
import asiaMapImage from '/lovable-uploads/943c0b44-9308-4e29-87cd-f790717092c1.png';
import indiaMapImage from '/lovable-uploads/b0d7808b-3f01-4080-a70b-221ce742315d.png';
import { Button } from '@/components/ui/button';

interface VFXRegionalSpotlightProps {
  region: string;
}

interface RegionData {
  title: string;
  subtitle: string;
  color: string;
  headcount: string;
  mapImage: string;
  personName: string;
  personTitle: string;
  personImage: string;
  quote: string;
  description: string[];
  statTitle: string;
  statValue: string;
  statDescription: string;
}

const regionData: Record<string, RegionData> = {
  "global": {
    title: "Global VFX Industry",
    subtitle: "Overview of the Worldwide VFX Ecosystem",
    color: "#4CC9F0",
    headcount: "100,000+",
    mapImage: asiaMapImage,
    personName: "Joseph Bell",
    personTitle: "VFX Industry Researcher",
    personImage: "/lovable-uploads/f26d960c-bb81-4fa5-8f55-4dcf0102e774.png",
    quote: "Looking at data allows us to gain insights that would not be possible to acquire otherwise.",
    description: [
      "The global VFX industry spans across continents, with major hubs in North America, Europe, India, and Asia-Pacific regions.",
      "Industry trends show significant growth in India and Southeast Asia, while traditional powerhouses in North America and Europe maintain their prominent positions.",
      "The raw data used to make this atlas comes from public sources, including job titles, locations and company affiliations of over 55,000 VFX industry professionals."
    ],
    statTitle: "Total VFX Professionals",
    statValue: "~100,000",
    statDescription: "estimated worldwide"
  },
  "uk-europe": {
    title: "UK & Europe",
    subtitle: "Traditional VFX Powerhouses",
    color: "#BB86FC",
    headcount: "15,947",
    mapImage: europeMapImage,
    personName: "Neil Hatton",
    personTitle: "CEO, UK Screen Alliance",
    personImage: "/lovable-uploads/afeced82-cbb0-4882-b815-f36755364b69.png",
    quote: "There is light at the end of the tunnel, as in November 2023 an increase in the UK's VFX tax relief was announced.",
    description: [
      "The UK and European VFX industry remains strong despite recent challenges, with London and Paris serving as the primary hubs.",
      "The UK's VFX workforce was impacted by the global production slowdown, with estimates showing a reduction of up to 40% in 2023.",
      "France offers up to 40% tax rebate for productions spending over €2M in visual effects, helping position the country as a competitive VFX destination."
    ],
    statTitle: "UK VFX Workforce",
    statValue: "9,160",
    statDescription: "professionals in 2022"
  },
  "north-america": {
    title: "North America",
    subtitle: "Established VFX Markets",
    color: "#F9D923",
    headcount: "15,141",
    mapImage: asiaMapImage,
    personName: "Industry Expert",
    personTitle: "VFX Supervisor",
    personImage: "/lovable-uploads/f26d960c-bb81-4fa5-8f55-4dcf0102e774.png",
    quote: "North America continues to be a leader in high-end VFX production for blockbuster films and streaming content.",
    description: [
      "North America has traditionally been the center of the global VFX industry, particularly for high-budget feature films.",
      "Key hubs include Los Angeles, Vancouver, Montreal, Toronto, and New York, each with distinct specializations.",
      "The region faced significant challenges during 2023 due to labor disputes but remains a crucial market for VFX talent and innovation."
    ],
    statTitle: "VFX Professionals",
    statValue: "15,141",
    statDescription: "across the region"
  },
  "india": {
    title: "India",
    subtitle: "The Rising VFX Giant",
    color: "#FF7D00",
    headcount: "17,390",
    mapImage: indiaMapImage,
    personName: "Sneha Sharma",
    personTitle: "Research Lead, India",
    personImage: "/lovable-uploads/4ea8b97d-d1e3-4753-a973-13cc19993e16.png",
    quote: "International projects contribute nearly 70% of VFX revenue in India.",
    description: [
      "India has become a global powerhouse in VFX with an estimated 260,000 people working across the animation, VFX, gaming and comics sector.",
      "Mumbai (36%), Chennai (18%), and Hyderabad (15%) are the major hubs, with smaller cities seeing rapid growth.",
      "The AVGC Promotion Task Force was formed in 2022 to guide policy and boost sector growth, with several states introducing additional incentives."
    ],
    statTitle: "Revenue Source",
    statValue: "70%",
    statDescription: "of VFX revenue comes from international projects"
  },
  "east-asia": {
    title: "East & Southeast Asia",
    subtitle: "Emerging VFX Markets",
    color: "#00C897",
    headcount: "4,916",
    mapImage: asiaMapImage,
    personName: "Wenhui (Cara) Du",
    personTitle: "VFX Producer/Supervisor",
    personImage: "/lovable-uploads/ca4d5c04-3db4-40de-81a0-0dfe1caedc38.png",
    quote: "The Wandering Earth gave China one of its first VFX-driven global blockbusters.",
    description: [
      "China's VFX industry has grown significantly, with an estimated workforce exceeding 10,000 people, primarily concentrated in Beijing and Shanghai.",
      "Vietnam has seen rapid expansion with 48 VFX studios employing over 3,500 people, primarily centered in Ho Chi Minh City.",
      "The region is likely underrepresented in the data due to language barriers, with many studios working in non-English environments."
    ],
    statTitle: "Vietnam Studios",
    statValue: "48",
    statDescription: "focused on VFX employing 3,500+ people"
  },
  "australia-nz": {
    title: "Australia & New Zealand",
    subtitle: "Boutique VFX Excellence",
    color: "#E63946",
    headcount: "3,577",
    mapImage: asiaMapImage,
    personName: "Industry Expert",
    personTitle: "VFX Supervisor",
    personImage: "/lovable-uploads/f26d960c-bb81-4fa5-8f55-4dcf0102e774.png",
    quote: "Australia and New Zealand punch above their weight in the global VFX industry.",
    description: [
      "Australia and New Zealand have established themselves as key players in the global VFX ecosystem despite their smaller size.",
      "Wellington, Sydney, and Melbourne serve as primary hubs, with strong government support through incentives.",
      "The region has developed a reputation for high-quality VFX work, particularly for major Hollywood productions and streaming platforms."
    ],
    statTitle: "VFX Professionals",
    statValue: "3,577",
    statDescription: "across Australia and New Zealand"
  }
};

const VFXRegionalSpotlight = ({ region }: VFXRegionalSpotlightProps) => {
  const [currentRegion, setCurrentRegion] = useState<RegionData>(regionData.global);
  
  useEffect(() => {
    setCurrentRegion(regionData[region] || regionData.global);
  }, [region]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: currentRegion.color }}>
            {currentRegion.title}
          </h2>
          <p className="text-white/70">{currentRegion.subtitle}</p>
        </div>
        
        <Button variant="outline" className="group">
          <span>Explore region data</span>
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl overflow-hidden lg:col-span-2">
          <img 
            src={currentRegion.mapImage} 
            alt={`${currentRegion.title} Map`} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="glass rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={currentRegion.personImage} 
                alt={currentRegion.personName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{currentRegion.personName}</h3>
              <p className="text-sm text-white/70">{currentRegion.personTitle}</p>
            </div>
          </div>
          
          <blockquote className="border-l-4 pl-4 italic text-white/90" style={{ borderColor: currentRegion.color }}>
            "{currentRegion.quote}"
          </blockquote>
          
          <div className="space-y-2">
            {currentRegion.description.map((paragraph, index) => (
              <p key={index} className="text-sm text-white/80">{paragraph}</p>
            ))}
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm text-white/70">{currentRegion.statTitle}</h4>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold" style={{ color: currentRegion.color }}>
                {currentRegion.statValue}
              </span>
              <span className="text-sm text-white/70 mb-1">
                {currentRegion.statDescription}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VFXRegionalSpotlight;
