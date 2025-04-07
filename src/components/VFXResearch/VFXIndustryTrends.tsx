
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const VFXIndustryTrends = () => {
  // VFX Disciplines data
  const disciplinesData = [
    { 
      title: "VFX Supervision",
      roles: "VFX Supervisor, DFX Supervisor, Associate VFX Supervisor",
      description: "Oversees the creative and technical aspects of VFX production."
    },
    { 
      title: "Animation",
      roles: "3D Animator, Character Animator, Animation Director, Technical Animator",
      description: "Creates movement and performance for digital characters and objects."
    },
    { 
      title: "VFX Production Staff",
      roles: "VFX Producer, VFX Production Manager, VFX Coordinator",
      description: "Manages schedules, budgets, and workflow of VFX projects."
    },
    { 
      title: "Roto / Paint",
      roles: "Roto Artist, VFX Prep / Paint Artist, Roto / Paint Supervisor",
      description: "Creates mattes and removes unwanted elements from footage."
    },
    { 
      title: "Environment / DMP Artists",
      roles: "Environment Artist, Digimatte Artist, Matte Painter",
      description: "Creates digital backgrounds and environments for scenes."
    },
    { 
      title: "Previz / Postviz Artists",
      roles: "Previs Artist, Previs Supervisor, Visualization Artist",
      description: "Creates preliminary visualizations of scenes before shooting."
    },
    { 
      title: "Asset / Texture / Lookdev",
      roles: "Asset Artist, Texture Artist, Modeler, LookDev Artist, Character Modeler",
      description: "Creates 3D models and their surface properties."
    },
    { 
      title: "FX Simulation",
      roles: "FX Technical Director, FX Supervisor, Crowd Artist",
      description: "Creates dynamic effects like fire, water, destruction, and crowds."
    },
    { 
      title: "Matchmove / Tracking",
      roles: "Body Tracking TD, Camera Tracking, Matchmove Artist, Rotomation",
      description: "Aligns CG elements with camera movement in live action footage."
    },
    { 
      title: "Creature Artists / CFX",
      roles: "Creature Technical Director, Groom, Rigging, CFX Artist, Creature Supervisor",
      description: "Specializes in creating and animating digital creatures."
    },
    { 
      title: "Lighting TDs",
      roles: "Lighting Technical Director, Lighting Artist, Lighting Supervisor",
      description: "Illuminates CG scenes to match live action or create stylized looks."
    },
    { 
      title: "Compositors / 2D",
      roles: "Digital Compositor, Lead Compositor, 2D Supervisor, Compositing Supervisor",
      description: "Combines all elements into final shots, including color grading."
    },
  ];
  
  // Regional distribution data
  const regionData = [
    { name: 'Americas', Animation: 928, Compositing: 1960, FX: 561, 'Lighting TD': 958, Total: 15141 },
    { name: 'UK & EMEA', Animation: 753, Compositing: 1754, FX: 476, 'Lighting TD': 438, Total: 15947 },
    { name: 'India', Animation: 809, Compositing: 2567, FX: 330, 'Lighting TD': 502, Total: 17390 },
    { name: 'Asia-Pacific', Animation: 496, Compositing: 556, FX: 265, 'Lighting TD': 307, Total: 8493 },
  ];

  const colors = [
    '#E63946', // red
    '#F9D923', // yellow
    '#43AA8B', // teal
    '#577590', // blue
  ];
  
  // Future trends data points
  const futureItems = [
    {
      title: "AI Integration",
      description: "Artificial intelligence is transforming VFX workflows, particularly in rotoscoping, clean plate creation, and tracking.",
      icon: "✨"
    },
    {
      title: "Remote Collaboration",
      description: "Studios are increasingly distributed, with teams working across multiple countries and time zones.",
      icon: "🌐"
    },
    {
      title: "Real-time Technology",
      description: "The line between traditional VFX and real-time rendering continues to blur with game engines being used in production.",
      icon: "⚡"
    },
    {
      title: "Talent Mobility",
      description: "VFX artists are increasingly mobile, moving between countries and regions based on project availability.",
      icon: "🔄"
    }
  ];
  
  // Studio growth data
  const studioGrowthData = [
    {
      title: "Effects of the 2023 Slowdown",
      paragraphs: [
        "Demand for VFX reached an all time high in 2022. The following year saw a dramatic reduction in project commissioning by major Hollywood studios.",
        "The WGA and SAG-AFTRA strikes, and a slowing of content spend in neighboring sectors like commercial production and video games created significant challenges.",
        "Recovery has been slow through most of 2024, with many companies who reduced their headcount during 2023 not yet bouncing back."
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-red-500">Industry Analysis & Trends</h2>
      
      <Tabs defaultValue="disciplines" className="w-full">
        <TabsList className="glass w-full justify-start mb-6 overflow-x-auto border-b border-white/10">
          <TabsTrigger value="disciplines">VFX Disciplines</TabsTrigger>
          <TabsTrigger value="regional">Regional Distribution</TabsTrigger>
          <TabsTrigger value="studios">VFX Studios</TabsTrigger>
          <TabsTrigger value="future">Future Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="disciplines" className="space-y-6">
          <div className="glass rounded-xl p-6 border-2 border-red-500/20">
            <h3 className="text-xl font-semibold mb-6 text-red-500">VFX Disciplines Worldwide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disciplinesData.map((discipline, index) => (
                <div key={index} className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-white/20 transition">
                  <h4 className="text-lg font-semibold text-amber-400 mb-2">{discipline.title}</h4>
                  <p className="text-sm text-white/80 mb-3">{discipline.description}</p>
                  <div className="text-xs text-white/60 italic">
                    Example roles: {discipline.roles}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="regional" className="space-y-6">
          <div className="glass rounded-xl p-6 border-2 border-amber-400/20">
            <h3 className="text-xl font-semibold mb-4 text-amber-400">Regional Distribution by Department</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={regionData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <XAxis type="number" tick={{ fill: 'white' }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'white' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(23, 23, 23, 0.9)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="Animation" stackId="a" fill="#F9D923" />
                  <Bar dataKey="Compositing" stackId="a" fill="#E63946" />
                  <Bar dataKey="FX" stackId="a" fill="#43AA8B" />
                  <Bar dataKey="Lighting TD" stackId="a" fill="#577590" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Regional distribution shows India leads in Compositing roles, while the Americas have a higher proportion 
              of Animation and FX professionals. UK & EMEA maintain a balanced distribution across disciplines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-5 rounded-lg border border-red-500/20">
              <h3 className="font-semibold text-red-500 mb-3">Key Regional Insights</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                <li>• India has emerged as the largest VFX workforce region globally</li>
                <li>• North America maintains strength in high-end feature film VFX</li>
                <li>• UK & Europe focus on premium TV and film content</li>
                <li>• Asia-Pacific shows the fastest growth rate in the industry</li>
              </ul>
            </div>
            
            <div className="glass p-5 rounded-lg border border-amber-400/20">
              <h3 className="font-semibold text-amber-400 mb-3">Regional Specializations</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                <li>• Mumbai: Roto/Paint, Compositing (36% of India's workforce)</li>
                <li>• London: High-end Compositing, FX Simulation</li>
                <li>• Vancouver: Animation, Character FX</li>
                <li>• Wellington: Creature Design, Motion Capture</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="studios" className="space-y-6">
          <div className="glass rounded-xl p-6 border-2 border-red-500/20">
            <h3 className="text-xl font-semibold mb-4 text-red-500">Global VFX Studios</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div>
                <h4 className="text-lg font-semibold text-amber-400 mb-3">Major Studio Groups</h4>
                <p className="text-white/80 mb-4">
                  Several of the largest VFX providers have a global footprint spanning North America, UK, 
                  Europe, India and Australia. DNEG, owned by Disney, is the largest employer in the VFX 
                  industry globally, with significant presence across major VFX hubs.
                </p>
                <p className="text-white/80">
                  Framestore (now including Method Studios and SDFX) has particularly large facilities in 
                  London, while companies like Technicolor, Cinesite, and Pitch Black Group have expanded 
                  through acquisitions of other VFX studios worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-amber-400 mb-3">Studio Growth Patterns</h4>
                <p className="text-white/80 mb-4">
                  In January 2023, most VFX studios increased their headcount during the busy period of 2022. 
                  By December 2023, the industry slowdown resulted in far fewer studios displaying growth, with 
                  many reducing their headcount.
                </p>
                <p className="text-white/80">
                  Recovery has been slow through July 2024, with little change in headcount for many companies, 
                  suggesting that studios who reduced their workforce during 2023 had not yet fully recovered.
                </p>
              </div>
            </div>
            
            <div className="mt-6 border-t border-white/10 pt-6">
              <h4 className="text-lg font-semibold text-amber-400 mb-3">Largest Sites Worldwide</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h5 className="font-medium mb-1">Mumbai</h5>
                  <p className="text-sm text-white/70">DNEG's Mumbai studio is likely the largest single VFX studio site globally by headcount.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h5 className="font-medium mb-1">London</h5>
                  <p className="text-sm text-white/70">Framestore has a particularly large facility in London, along with ILM and DNEG.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h5 className="font-medium mb-1">Wellington</h5>
                  <p className="text-sm text-white/70">Weta FX stands out among VFX studios with 1,000+ employees, with its largest site in Wellington.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="future" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureItems.map((item, index) => (
              <div key={index} className="glass p-6 rounded-xl border-2 border-amber-400/20 hover:border-amber-400/40 transition">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-amber-400">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="glass rounded-xl p-6 border-2 border-red-500/20">
            <h3 className="text-xl font-semibold mb-4 text-red-500">The Future of VFX</h3>
            <div className="space-y-4 text-white/80">
              <p>
                The VFX industry is in constant flux, with visual effects professionals traveling the world for work. 
                The continued growth of streaming platforms has created unprecedented demand for high-quality content 
                with sophisticated visual effects.
              </p>
              <p>
                Regional incentives continue to shape where VFX work is performed, with countries offering 
                competitive tax rebates to attract productions. This has led to the emergence of new hubs 
                beyond the traditional centers in North America and Europe.
              </p>
              <p>
                The integration of real-time technology and AI tools is reshaping workflows and creating new 
                specializations within the industry. Despite technological advances, the VFX industry remains 
                fundamentally human-powered, with demand for skilled artists continuing to grow globally.
              </p>
              <p>
                One of the best ways to make careers in VFX more sustainable worldwide is to advocate for 
                colleagues in countries with fewer protections. Countries with stronger worker protections 
                are likely to lose work to regions where workers have fewer protections.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VFXIndustryTrends;
