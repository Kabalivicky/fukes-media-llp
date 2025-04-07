
import { useRef, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Tooltip } from 'recharts';
import { gsap } from 'gsap';

const VFXDataHighlights = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll
  useEffect(() => {
    if (!containerRef.current || !numbersRef.current) return;
    
    const container = containerRef.current;
    const numbers = numbersRef.current;
    
    gsap.fromTo(
      container.querySelectorAll('.data-item'),
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.8,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        }
      }
    );
    
    gsap.fromTo(
      numbers.querySelectorAll('.stat-number'),
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.5,
        scrollTrigger: {
          trigger: numbers,
          start: 'top 80%',
        }
      }
    );
  }, []);
  
  const departmentData = [
    { name: 'Compositing', value: 4989 },
    { name: 'Production', value: 4380 },
    { name: 'Animation', value: 2986 },
    { name: 'Roto/Paint', value: 3018 },
    { name: 'Asset Creation', value: 2323 },
    { name: 'FX/Simulation', value: 1632 },
    { name: 'Lighting TD', value: 2057 },
  ];
  
  const colors = [
    '#E63946', // red
    '#F9D923', // yellow
    '#90BE6D', // green
    '#43AA8B', // teal
    '#577590', // blue
    '#BB86FC', // purple
    '#FF7D00', // orange
  ];
  
  const remoteWorkData = [
    { location: 'Atlanta', percentage: 18.92 },
    { location: 'San Francisco', percentage: 18.72 },
    { location: 'Los Angeles', percentage: 15.04 },
    { location: 'Melbourne', percentage: 15.79 },
    { location: 'Wellington', percentage: 10.84 },
    { location: 'New York', percentage: 9.50 },
  ];
  
  const ratioData = [
    { country: 'India', ratio: '10.1', type: 'Artists:Production' },
    { country: 'France', ratio: '6.1', type: 'Artists:Production' },
    { country: 'New Zealand', ratio: '6.1', type: 'Artists:Production' },
    { country: 'Canada', ratio: '5.1', type: 'Artists:Production' },
    { country: 'Australia', ratio: '4.1', type: 'Artists:Production' },
    { country: 'UK', ratio: '4.1', type: 'Artists:Production' },
    { country: 'US', ratio: '3.5:1', type: 'Artists:Production' },
  ];

  return (
    <div ref={containerRef} className="space-y-12">
      <h2 className="text-3xl font-bold text-red-500">VFX Industry Data Analysis</h2>
      
      <div className="glass rounded-xl p-6 md:p-8 border-2 border-red-500/20">
        <h3 className="text-xl font-semibold mb-4 text-white">Global Department Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
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
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-white/70 mt-4">
          Compositing represents the largest discipline globally with 4,989 professionals, followed by Production Management 
          and Animation. Total global VFX workforce is approximately 100,000 professionals.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-xl p-6 border-2 border-amber-400/20">
          <h3 className="text-xl font-semibold mb-4 text-amber-400">Remote Work Percentage</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={remoteWorkData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <XAxis type="number" tick={{ fill: 'white' }} />
                <YAxis 
                  dataKey="location" 
                  type="category" 
                  tick={{ fill: 'white' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Remote Workers']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(23, 23, 23, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="percentage" fill="#F9D923" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-white/70 mt-4">
            Over 3,100 visual effects professionals (6.4%) work remotely. 
            Atlanta and San Francisco have the highest percentages of remote VFX workers.
          </p>
        </div>
        
        <div className="glass rounded-xl p-6 border-2 border-red-500/20">
          <h3 className="text-xl font-semibold mb-4 text-red-500">Artist to Production Ratio</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={ratioData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <XAxis type="number" tick={{ fill: 'white' }} hide />
                <YAxis 
                  dataKey="country" 
                  type="category" 
                  tick={{ fill: 'white' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value, name, props) => [`${props.payload.ratio}`, 'Artist:Production Ratio']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(23, 23, 23, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="ratio" fill="#E63946" radius={[0, 4, 4, 0]}>
                  {ratioData.map((entry, index) => (
                    <Cell fill={entry.country === 'India' ? '#E63946' : '#BB86FC'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-white/70 mt-4">
            There is considerable variation between countries in the ratio of artist roles to Production. 
            India shows the highest ratio at 10:1, while the US has the lowest at 3.5:1.
          </p>
        </div>
      </div>
      
      <div ref={numbersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="data-item glass rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition">
          <div className="flex items-start gap-4">
            <div className="stat-number flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-red-500 text-white">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">VFX Companies</h3>
              <p className="text-sm text-white/80">DNEG is the largest employer in the VFX industry globally, with their Mumbai studio likely the largest single VFX site in the world.</p>
            </div>
          </div>
        </div>
        
        <div className="data-item glass rounded-xl p-6 border border-amber-400/20 hover:border-amber-400/40 transition">
          <div className="flex items-start gap-4">
            <div className="stat-number flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-amber-400 text-black">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Remote Work</h3>
              <p className="text-sm text-white/80">Compositing is the most common remote role (16.8%), followed by Production Management (8.3%) and Animation (8.0%).</p>
            </div>
          </div>
        </div>
        
        <div className="data-item glass rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition">
          <div className="flex items-start gap-4">
            <div className="stat-number flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-red-500 text-white">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Regional Impact</h3>
              <p className="text-sm text-white/80">Tax incentives strongly influence where VFX work is performed. Changes in Quebec, France, and Australia have shifted work away from certain regions.</p>
            </div>
          </div>
        </div>
        
        <div className="data-item glass rounded-xl p-6 border border-amber-400/20 hover:border-amber-400/40 transition">
          <div className="flex items-start gap-4">
            <div className="stat-number flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-amber-400 text-black">
              4
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Future Trends</h3>
              <p className="text-sm text-white/80">AI and Machine Learning tools are likely to impact roles in Rotoscoping, Matchmove, and Paint first - tasks heavily concentrated in India.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VFXDataHighlights;
