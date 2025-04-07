
import { Book, Globe, PieChart, Users } from "lucide-react";

const VFXResearchIntro = () => {
  return (
    <div className="glass rounded-xl p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold neon-text-blue">Foreword</h2>
          <p className="text-white/80 leading-relaxed">
            The VFX industry is in constant flux, not least because many visual effects artists and technicians are itinerant film workers who travel the world for work. Yet, this guide, while a snapshot in time, shines a light on what is real and documentable. To glance through it will enlighten and amaze you. To read it cover to cover will educate and empower you.
          </p>
          <p className="italic text-white/70 mt-4">- Jeffrey A. Okun, VES</p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold neon-text-green">Introduction</h2>
          <p className="text-white/80 leading-relaxed">
            This atlas is about people. To be specific, it's about the global population of people who work in the visual effects industry. There are approximately 100,000 of us worldwide. This research provides insights that would not be possible to acquire otherwise. It allows us to see the forest for the trees.
          </p>
          <p className="italic text-white/70 mt-4">- Joseph Bell</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="glass p-6 rounded-lg hover:bg-white/10 transition">
          <Globe className="h-8 w-8 mb-2 text-primary" />
          <h3 className="text-xl font-semibold">Global Scope</h3>
          <p className="text-sm text-white/70">Data from over 55,000 VFX professionals and 560 companies worldwide</p>
        </div>
        
        <div className="glass p-6 rounded-lg hover:bg-white/10 transition">
          <Users className="h-8 w-8 mb-2 text-secondary" />
          <h3 className="text-xl font-semibold">Industry Insight</h3>
          <p className="text-sm text-white/70">Detailed breakdown of workforce distribution across regions and roles</p>
        </div>
        
        <div className="glass p-6 rounded-lg hover:bg-white/10 transition">
          <PieChart className="h-8 w-8 mb-2 text-accent" />
          <h3 className="text-xl font-semibold">Data Visualization</h3>
          <p className="text-sm text-white/70">Interactive maps and charts showing global VFX employment trends</p>
        </div>
        
        <div className="glass p-6 rounded-lg hover:bg-white/10 transition">
          <Book className="h-8 w-8 mb-2 text-primary" />
          <h3 className="text-xl font-semibold">Expert Analysis</h3>
          <p className="text-sm text-white/70">Comments from industry leaders on regional opportunities and challenges</p>
        </div>
      </div>
    </div>
  );
};

export default VFXResearchIntro;
