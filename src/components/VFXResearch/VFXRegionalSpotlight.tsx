
import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import auNzMapImage from '/lovable-uploads/18519d06-b0d4-4ebf-a7ca-7436b6748170.png';
import northAmericaMapImage from '/lovable-uploads/85ee4cc8-9963-49c6-bfbc-0c4246af2318.png';
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
  hubData?: {
    title: string;
    cities: Array<{name: string, value: string, description?: string}>;
  };
}

const regionData: Record<string, RegionData> = {
  "global": {
    title: "Global VFX Industry",
    subtitle: "Overview of the Worldwide VFX Ecosystem",
    color: "#4CC9F0",
    headcount: "100,000+",
    mapImage: northAmericaMapImage,
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
  "north-america": {
    title: "North America",
    subtitle: "Established VFX Markets",
    color: "#F9D923",
    headcount: "15,141",
    mapImage: northAmericaMapImage,
    personName: "Industry Expert",
    personTitle: "VFX Supervisor",
    personImage: "/lovable-uploads/f26d960c-bb81-4fa5-8f55-4dcf0102e774.png",
    quote: "North America continues to be a leader in high-end VFX production for blockbuster films and streaming content.",
    description: [
      "Los Angeles, Vancouver, Montreal, Toronto, and New York serve as the primary VFX hubs in North America.",
      "Just 1.8% of VFX people in Vancouver work remotely, the lowest proportion among major North American hubs. Montreal (3.4%) and Los Angeles (4.5%) also show low remote work percentages.",
      "New York has 11.5% of VFX professionals working remotely, while San Francisco leads with 20.8%. Four out of five remote workers in San Francisco work for studios in Los Angeles."
    ],
    statTitle: "VFX Professionals",
    statValue: "15,141",
    statDescription: "across the region",
    hubData: {
      title: "Major North American Hubs",
      cities: [
        {name: "Los Angeles", value: "3,306"},
        {name: "Vancouver", value: "3,726"},
        {name: "Montreal", value: "3,917"},
        {name: "Toronto", value: "1,463"},
        {name: "New York", value: "1,122"}
      ]
    }
  },
  "australia-nz": {
    title: "Australia & New Zealand",
    subtitle: "Boutique VFX Excellence",
    color: "#E63946",
    headcount: "3,577",
    mapImage: auNzMapImage,
    personName: "Marcus Wells",
    personTitle: "Talent & Recruitment Consultant at PXL Talent",
    personImage: "/lovable-uploads/afeced82-cbb0-4882-b815-f36755364b69.png",
    quote: "VFX companies that have robust support for inbound candidates compete successfully for discerning global talent.",
    description: [
      "Australia and New Zealand have long been regarded as dependable locations for complex and compelling VFX and post-production work.",
      "There has been a softening in overall staffing numbers over the past eighteen months, but a modest increase in the number of VFX studios looking to invest in the region.",
      "Wellington hosts major studios like Weta FX, while Sydney leads with 1,242 VFX professionals. Melbourne and Adelaide are also significant hubs in the region."
    ],
    statTitle: "Sydney VFX Workforce",
    statValue: "1,242",
    statDescription: "professionals",
    hubData: {
      title: "Australia & New Zealand Hubs",
      cities: [
        {name: "Sydney", value: "1,242", description: "Largest Australian hub with strengths in compositing and FX"},
        {name: "Wellington", value: "1,210", description: "Home to Weta FX, specializing in creature work"},
        {name: "Melbourne", value: "400", description: "Growing hub with LED volume technology"},
        {name: "Adelaide", value: "376", description: "Emerging center with government support"},
        {name: "Brisbane", value: "190", description: "Developing hub with tax incentives"}
      ]
    }
  },
  "uk-europe": {
    title: "UK & Europe",
    subtitle: "Traditional VFX Powerhouses",
    color: "#BB86FC",
    headcount: "15,947",
    mapImage: northAmericaMapImage,
    personName: "Neil Hatton",
    personTitle: "CEO, UK Screen Alliance",
    personImage: "/lovable-uploads/afeced82-cbb0-4882-b815-f36755364b69.png",
    quote: "There is light at the end of the tunnel, as in November 2023 an increase in the UK's VFX tax relief was announced.",
    description: [
      "The UK and European VFX industry remains strong with London serving as the primary hub, followed by Paris, Berlin, and Madrid.",
      "The study identified 1,040 remote workers in the UK and EMEA. Remote work is least common in London, where just 2.5% of people worked remotely for VFX studios scattered worldwide.",
      "Cities with fewer local VFX studios show higher percentages of remote work - Madrid (23.5%) and Barcelona (19.5%) have significant remote worker populations."
    ],
    statTitle: "UK VFX Workforce",
    statValue: "9,160",
    statDescription: "professionals in 2022"
  },
  "india": {
    title: "India",
    subtitle: "The Rising VFX Giant",
    color: "#FF7D00",
    headcount: "17,390",
    mapImage: northAmericaMapImage,
    personName: "Sneha Sharma",
    personTitle: "Research Lead, India",
    personImage: "/lovable-uploads/4ea8b97d-d1e3-4753-a973-13cc19993e16.png",
    quote: "International projects contribute nearly 70% of VFX revenue in India.",
    description: [
      "India has become a global powerhouse in VFX with an estimated 260,000 people working across the animation, VFX, gaming and comics sector.",
      "Mumbai (36%), Chennai (18%), and Hyderabad (15%) are the major hubs, with smaller cities seeing rapid growth.",
      "India shows the highest ratio of artist roles to Production (10:1), VFX Supervisors (97:1) and Department Heads (53.5:1), compared to Western countries which typically have more supervisory roles per artist."
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
    mapImage: northAmericaMapImage,
    personName: "Wenhui (Cara) Du",
    personTitle: "VFX Producer/Supervisor",
    personImage: "/lovable-uploads/ca4d5c04-3db4-40de-81a0-0dfe1caedc38.png",
    quote: "The Wandering Earth gave China one of its first VFX-driven global blockbusters.",
    description: [
      "China's VFX industry has grown significantly, with an estimated workforce exceeding 10,000 people, primarily concentrated in Beijing and Shanghai.",
      "Vietnam has seen rapid expansion with 48 VFX studios employing over 3,500 people, primarily centered in Ho Chi Minh City.",
      "Among the regions covered by this atlas, the relatively small sample of workers from Asian countries other than India had the highest percentage of people working remotely (12.7%), followed by EMEA (9.6%)."
    ],
    statTitle: "Vietnam Studios",
    statValue: "48",
    statDescription: "focused on VFX employing 3,500+ people"
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
        
        <Button variant="outline" className="group border-red-500/30 hover:border-red-500/60 text-red-500">
          <span>Explore region data</span>
          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl overflow-hidden lg:col-span-2 border-2 border-white/10">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
            <h3 className="text-xl font-semibold text-white">{currentRegion.title} VFX Industry Map</h3>
          </div>
          <img 
            src={currentRegion.mapImage} 
            alt={`${currentRegion.title} Map`} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="glass rounded-xl overflow-hidden border-2 border-white/10">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4">
            <h3 className="text-xl font-semibold text-white">Regional Insights</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={currentRegion.personImage} 
                  alt={currentRegion.personName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white">{currentRegion.personName}</h3>
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
      
      {currentRegion.hubData && (
        <div className="glass rounded-xl p-6 border-2 border-red-500/20">
          <h3 className="text-xl font-semibold mb-6 text-red-500">{currentRegion.hubData.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRegion.hubData.cities.map((city, index) => (
              <div key={index} className="bg-white/5 p-5 rounded-lg border border-white/10 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{city.name}</h4>
                  <p className="text-xl font-bold text-amber-400 my-1">{city.value}</p>
                  <p className="text-xs text-white/70">VFX Professionals</p>
                  {city.description && (
                    <p className="text-sm text-white/80 mt-2">{city.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VFXRegionalSpotlight;
