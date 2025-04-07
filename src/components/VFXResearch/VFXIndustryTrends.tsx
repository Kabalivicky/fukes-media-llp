
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const VFXIndustryTrends = () => {
  // Data about VFX disciplines and roles
  const disciplineData = [
    { name: 'Animation', value: 2986 },
    { name: 'Compositing', value: 4989 },
    { name: 'FX/Simulation', value: 1632 },
    { name: 'Lighting', value: 2057 },
    { name: 'Roto/Paint', value: 3018 },
    { name: 'Asset Creation', value: 2323 },
    { name: 'Production', value: 4380 },
  ];
  
  // Regional distribution data
  const regionData = [
    { name: 'Americas', Animation: 928, Compositing: 1960, FX: 561, 'Lighting TD': 958, Total: 15141 },
    { name: 'UK & EMEA', Animation: 753, Compositing: 1754, FX: 476, 'Lighting TD': 438, Total: 15947 },
    { name: 'India', Animation: 809, Compositing: 2567, FX: 330, 'Lighting TD': 502, Total: 17390 },
    { name: 'Asia-Pacific', Animation: 496, Compositing: 556, FX: 265, 'Lighting TD': 307, Total: 8493 },
  ];

  const colors = [
    '#BB86FC', // purple
    '#FF7597', // pink
    '#4CC9F0', // blue
    '#F97316', // orange
    '#10B981', // green
    '#FBBF24', // yellow
    '#F43F5E', // red
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

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold neon-text-pink">Industry Analysis & Trends</h2>
      
      <Tabs defaultValue="disciplines" className="w-full">
        <TabsList className="glass w-full justify-start mb-6 overflow-x-auto">
          <TabsTrigger value="disciplines">VFX Disciplines</TabsTrigger>
          <TabsTrigger value="regional">Regional Distribution</TabsTrigger>
          <TabsTrigger value="future">Future Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="disciplines" className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Global VFX Discipline Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disciplineData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'white', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: 'white', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
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
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {disciplineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Compositing represents the largest discipline globally, followed by Production Management and Animation. 
              This distribution varies by region, with some areas specializing in specific disciplines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {disciplineData.slice(0, 4).map((item, index) => (
              <div key={index} className="glass p-4 rounded-lg">
                <h3 className="font-semibold" style={{ color: colors[index % colors.length] }}>
                  {item.name}
                </h3>
                <p className="text-3xl font-bold mt-1">{item.value.toLocaleString()}</p>
                <p className="text-xs text-white/70">Global Professionals</p>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="regional" className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Regional Distribution by Department</h3>
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
                  <Bar dataKey="Animation" stackId="a" fill="#BB86FC" />
                  <Bar dataKey="Compositing" stackId="a" fill="#FF7597" />
                  <Bar dataKey="FX" stackId="a" fill="#4CC9F0" />
                  <Bar dataKey="Lighting TD" stackId="a" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Regional distribution shows India leads in Compositing roles, while the Americas have the highest proportion 
              of Animation professionals. UK & EMEA region maintains a balanced distribution across disciplines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold text-primary">Key Regional Insights</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                <li>• India has emerged as the largest VFX workforce region globally</li>
                <li>• North America maintains strength in high-end feature film VFX</li>
                <li>• UK & Europe focus on premium TV and film content</li>
                <li>• Asia-Pacific shows the fastest growth rate in the industry</li>
              </ul>
            </div>
            
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold text-secondary">Regional Specializations</h3>
              <ul className="mt-2 space-y-2 text-sm text-white/80">
                <li>• Mumbai: Roto/Paint, Compositing (36% of India's workforce)</li>
                <li>• London: High-end Compositing, FX Simulation</li>
                <li>• Vancouver: Animation, Character FX</li>
                <li>• Wellington: Creature Design, Motion Capture</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="future" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureItems.map((item, index) => (
              <div key={index} className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">The Future of VFX</h3>
            <div className="space-y-4 text-white/80">
              <p>
                The VFX industry is in constant flux, not least because many visual effects artists and technicians 
                are itinerant film workers who travel the world for work. The continued growth of streaming platforms 
                has created unprecedented demand for high-quality content with sophisticated visual effects.
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VFXIndustryTrends;
