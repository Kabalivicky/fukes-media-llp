
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
    { name: 'Animation', value: 2986 },
    { name: 'Compositing', value: 4989 },
    { name: 'FX/Simulation', value: 1632 },
    { name: 'Lighting TD', value: 2057 },
    { name: 'Roto/Paint', value: 3018 },
    { name: 'Prod. Management', value: 4380 },
  ];
  
  const colors = [
    '#BB86FC', // purple
    '#FF7597', // pink
    '#4CC9F0', // blue
    '#F97316', // orange
    '#10B981', // green
    '#FBBF24', // yellow
  ];
  
  const dataPoints = [
    { title: "About the Data", content: "This atlas was created using publicly available data on 55,000+ VFX professionals and 560 VFX companies.", number: "1" },
    { title: "Data Tables", content: "Sample size is large enough to provide insights into the global industry, while not capturing every individual.", number: "2" },
    { title: "Language Bias", content: "English language websites were the main source of data, resulting in underrepresentation of non-English speaking regions.", number: "3" },
    { title: "Employment Status", content: "Data shows where VFX professionals with specific skillsets were located, not whether they were actively employed.", number: "4" },
    { title: "Validation", content: "Companies mentioned were not contacted to validate findings except for a small number in Vietnam and Africa.", number: "5" },
    { title: "Objectivity", content: "This publication is intended to be objective and factual. Please send corrections to info@vfxatlas.com.", number: "6" },
  ];

  return (
    <div ref={containerRef} className="space-y-12">
      <h2 className="text-3xl font-bold neon-text-purple">VFX Industry Data</h2>
      
      <div className="glass rounded-xl p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-4">Global Department Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false}
                tickLine={false}
                width={120}
                tick={{ fill: 'white', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(23, 23, 23, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: 'white' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-white/70 mt-4">
          Data represents global headcount across major VFX departments. Total global VFX workforce is approximately 100,000 professionals.
        </p>
      </div>
      
      <div ref={numbersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataPoints.map((point, index) => (
          <div key={index} className="data-item glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition">
            <div className="flex items-start gap-4">
              <div className="stat-number flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold" 
                style={{ backgroundColor: colors[index % colors.length], color: 'black' }}>
                {point.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-white/80">{point.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VFXDataHighlights;
