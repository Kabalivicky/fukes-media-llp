
import { Book, Globe, PieChart, Users, BriefcaseBusiness, Laptop } from "lucide-react";

const VFXResearchIntro = () => {
  return (
    <div className="space-y-8">
      <div className="glass rounded-xl p-8 border-2 border-red-600/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-red-500">About This Research</h2>
            <p className="text-white/80 leading-relaxed">
              This atlas is based on a study of 55,000+ visual effects professionals associated with 560 studios worldwide. 
              It provides a comprehensive view of the global VFX industry, highlighting key hubs, talent distribution, 
              and emerging trends.
            </p>
            <p className="text-white/80 leading-relaxed">
              If the maps in this atlas show just one thing, it's that visual effects has become a truly global industry — 
              at least when it comes to the type of big budget Hollywood films and television shows that drive much of the 
              spending on visual effects worldwide.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-amber-400">Key Findings</h2>
            <p className="text-white/80 leading-relaxed">
              Over 70% of VFX professionals in this study live and work on different continents. India has the largest 
              workforce with major hubs in Mumbai, Chennai, and Hyderabad. The effects of the 2023 industry slowdown 
              are still visible with many studios reducing headcount.
            </p>
            <p className="text-white/80 leading-relaxed">
              Compositing represents the largest discipline globally with 4,989 professionals, followed by Production 
              Management (4,380) and Animation (2,986). Remote work is growing, with 6.4% of VFX professionals working remotely.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition border border-red-600/20">
            <Globe className="h-8 w-8 mb-3 text-red-500" />
            <h3 className="text-xl font-semibold text-white">Global Industry</h3>
            <p className="text-sm text-white/70 mt-2">Data from major VFX hubs across North America, UK & Europe, India, East & SE Asia, and Australia & New Zealand</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition border border-amber-400/20">
            <Users className="h-8 w-8 mb-3 text-amber-400" />
            <h3 className="text-xl font-semibold text-white">Workforce Analysis</h3>
            <p className="text-sm text-white/70 mt-2">Detailed breakdown of 55,000+ VFX professionals by discipline, location, and company</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition border border-red-600/20">
            <BriefcaseBusiness className="h-8 w-8 mb-3 text-red-500" />
            <h3 className="text-xl font-semibold text-white">Studio Insights</h3>
            <p className="text-sm text-white/70 mt-2">Data on 560 VFX companies including DNEG, Framestore, ILM, MPC, and others across global locations</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition border border-amber-400/20">
            <PieChart className="h-8 w-8 mb-3 text-amber-400" />
            <h3 className="text-xl font-semibold text-white">Role Distribution</h3>
            <p className="text-sm text-white/70 mt-2">Analysis of role ratios like Artists:Production (10:1 in India vs 3.5:1 in the US) and other staffing patterns</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition border border-red-600/20">
            <Laptop className="h-8 w-8 mb-3 text-red-500" />
            <h3 className="text-xl font-semibold text-white">Remote Work</h3>
            <p className="text-sm text-white/70 mt-2">Over 3,100 VFX professionals (6.4%) work remotely, with compositing being the most common remote discipline</p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition border border-amber-400/20">
            <Book className="h-8 w-8 mb-3 text-amber-400" />
            <h3 className="text-xl font-semibold text-white">Future Trends</h3>
            <p className="text-sm text-white/70 mt-2">Analysis of AI/ML integration, tax incentives, and post-2023 recovery patterns in the global VFX industry</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl overflow-hidden border-2 border-red-600/20">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <h2 className="text-2xl font-bold">Research Methodology</h2>
          <p className="opacity-90 mt-2">
            This atlas defines visual effects as the process of combining elements of motion picture imagery, sometimes with additional elements created with a computer.
          </p>
        </div>
        <div className="glass p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-amber-400">Data Collection</h3>
              <p className="text-white/80 mb-4">
                The core data was gathered in June 2024 from public sources including company websites and social media profiles.
                The dataset includes job titles, worker locations, and company affiliations.
              </p>
              <p className="text-white/80">
                Over 10,000 entries were screened out to get to the 55,000+ entries used for the atlas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-amber-400">Limitations</h3>
              <p className="text-white/80 mb-4">
                The data only "shows what it shows" - it represents VFX professionals with online presence, 
                primarily on English-language websites. It does not include all VFX workers globally.
              </p>
              <p className="text-white/80">
                Companies mentioned did not participate in or validate the study. Data represents a snapshot from 
                June 2024 and may not reflect current employment status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VFXResearchIntro;
