
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpansibleTab from '@/components/ExpansibleTab';
import DynamicPrice from '@/components/DynamicPrice';

const VFXIndustryInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">VFX Industry Insights</h2>
          <p className="text-muted-foreground mt-2">Comprehensive data and analysis of the global VFX industry</p>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-fit mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview">Industry Overview</TabsTrigger>
            <TabsTrigger value="workforce">Workforce Analysis</TabsTrigger>
            <TabsTrigger value="regional">Regional Insights</TabsTrigger>
            <TabsTrigger value="trends">Future Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Global VFX Industry</h3>
                <ul className="space-y-3">
                  <li>
                    <span className="font-medium">Total VFX Workforce:</span> Approximately 100,000 professionals worldwide
                  </li>
                  <li>
                    <span className="font-medium">Atlas Research Base:</span> Study of 55,000+ visual effects professionals associated with 560 studios worldwide
                  </li>
                  <li>
                    <span className="font-medium">Major Companies:</span> DNEG (largest employer), Framestore, ILM, MPC, and others across global locations
                  </li>
                  <li>
                    <span className="font-medium">Cross-Continental Work:</span> Over 70% of VFX professionals live and work on different continents
                  </li>
                  <li>
                    <span className="font-medium">2023 Industry Slowdown:</span> Effects still visible with many studios reducing headcount
                  </li>
                </ul>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Discipline Distribution</h3>
                <ul className="space-y-3">
                  <li>
                    <span className="font-medium">Compositing:</span> Largest discipline with 4,989 professionals globally
                  </li>
                  <li>
                    <span className="font-medium">Production Management:</span> 4,380 professionals
                  </li>
                  <li>
                    <span className="font-medium">Animation:</span> 2,986 professionals
                  </li>
                  <li>
                    <span className="font-medium">Roto/Paint:</span> 3,018 professionals
                  </li>
                  <li>
                    <span className="font-medium">Asset Creation:</span> 2,323 professionals
                  </li>
                  <li>
                    <span className="font-medium">FX/Simulation:</span> 1,632 professionals
                  </li>
                  <li>
                    <span className="font-medium">Lighting TD:</span> 2,057 professionals
                  </li>
                </ul>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Research Methodology</h3>
                <p className="text-white/80 mb-4">
                  This atlas defines visual effects as the process of combining elements of motion picture imagery, sometimes with additional elements created with a computer.
                </p>
                <ul className="space-y-3">
                  <li>
                    <span className="font-medium">Data Collection:</span> Gathered in June 2024 from public sources including company websites and social media profiles
                  </li>
                  <li>
                    <span className="font-medium">Dataset Includes:</span> Job titles, worker locations, and company affiliations
                  </li>
                  <li>
                    <span className="font-medium">Data Filtering:</span> Over 10,000 entries were screened out to reach the final 55,000+ entries
                  </li>
                  <li>
                    <span className="font-medium">Limitations:</span> Data represents professionals with online presence, primarily on English-language websites
                  </li>
                </ul>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-4">Key Findings</h3>
                <ul className="space-y-3">
                  <li>
                    <span className="font-medium">Remote Work:</span> 6.4% of VFX professionals (over 3,100) work remotely
                  </li>
                  <li>
                    <span className="font-medium">Tax Incentives Impact:</span> Strongly influence where VFX work is performed, with changes in Quebec, France, and Australia shifting work away from certain regions
                  </li>
                  <li>
                    <span className="font-medium">AI Integration:</span> Likely to impact roles in Rotoscoping, Matchmove, and Paint first - tasks heavily concentrated in India
                  </li>
                  <li>
                    <span className="font-medium">Artist to Production Ratio:</span> Varies considerably between countries (10:1 in India vs 3.5:1 in US)
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="workforce" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ExpansibleTab title="VFX Disciplines Worldwide" defaultOpen={true}>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-amber-400">VFX Supervision</h4>
                    <p className="text-sm text-white/80">Oversees the creative and technical aspects of VFX production.</p>
                    <p className="text-xs text-white/60 italic mt-1">Example roles: VFX Supervisor, DFX Supervisor, Associate VFX Supervisor</p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-amber-400">Animation</h4>
                    <p className="text-sm text-white/80">Creates movement and performance for digital characters and objects.</p>
                    <p className="text-xs text-white/60 italic mt-1">Example roles: 3D Animator, Character Animator, Animation Director, Technical Animator</p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-amber-400">VFX Production Staff</h4>
                    <p className="text-sm text-white/80">Manages schedules, budgets, and workflow of VFX projects.</p>
                    <p className="text-xs text-white/60 italic mt-1">Example roles: VFX Producer, VFX Production Manager, VFX Coordinator</p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-amber-400">Roto / Paint</h4>
                    <p className="text-sm text-white/80">Creates mattes and removes unwanted elements from footage.</p>
                    <p className="text-xs text-white/60 italic mt-1">Example roles: Roto Artist, VFX Prep / Paint Artist, Roto / Paint Supervisor</p>
                  </div>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="Remote Work Analysis">
                <div className="space-y-4">
                  <p className="text-white/80">Over 3,100 visual effects professionals (6.4%) work remotely, with compositing being the most common remote discipline.</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Cities with Highest Remote Work Percentages:</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Atlanta</span>
                        <span className="font-semibold">18.92%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>San Francisco</span>
                        <span className="font-semibold">18.72%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Los Angeles</span>
                        <span className="font-semibold">15.04%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Melbourne</span>
                        <span className="font-semibold">15.79%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Wellington</span>
                        <span className="font-semibold">10.84%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>New York</span>
                        <span className="font-semibold">9.50%</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Remote Work by Discipline:</h4>
                    <ul className="space-y-1">
                      <li>Compositing: Most common remote role (16.8%)</li>
                      <li>Production Management: 8.3% remote workers</li>
                      <li>Animation: 8.0% remote workers</li>
                    </ul>
                  </div>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="Artist to Production Ratios">
                <div>
                  <p className="text-white/80 mb-4">There is considerable variation between countries in the ratio of artist roles to Production staff.</p>
                  
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2">Country</th>
                        <th className="text-right py-2">Artists:Production</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-2">India</td>
                        <td className="text-right font-medium">10:1</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">France</td>
                        <td className="text-right font-medium">6:1</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">New Zealand</td>
                        <td className="text-right font-medium">6:1</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Canada</td>
                        <td className="text-right font-medium">5:1</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Australia</td>
                        <td className="text-right font-medium">4:1</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">UK</td>
                        <td className="text-right font-medium">4:1</td>
                      </tr>
                      <tr>
                        <td className="py-2">US</td>
                        <td className="text-right font-medium">3.5:1</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <p className="text-sm text-white/70 mt-4">
                    India shows the highest ratio of artist roles to Production (10:1), VFX Supervisors (97:1), 
                    and Department Heads (53.5:1), compared to Western countries which typically have more supervisory 
                    roles per artist.
                  </p>
                </div>
              </ExpansibleTab>
            </div>
          </TabsContent>
          
          <TabsContent value="regional" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpansibleTab title="North America" titleClassName="text-amber-400">
                <div className="space-y-4">
                  <p className="text-white/80">Los Angeles, Vancouver, Montreal, Toronto, and New York serve as the primary VFX hubs in North America.</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Major North American Hubs:</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <span>Los Angeles</span>
                        <span className="font-semibold text-amber-400">3,306 professionals</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <span>Vancouver</span>
                        <span className="font-semibold text-amber-400">3,726 professionals</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <span>Montreal</span>
                        <span className="font-semibold text-amber-400">3,917 professionals</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <span>Toronto</span>
                        <span className="font-semibold text-amber-400">1,463 professionals</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>New York</span>
                        <span className="font-semibold text-amber-400">1,122 professionals</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Remote Work Analysis:</h4>
                    <ul className="space-y-1">
                      <li>Vancouver: Only 1.8% of VFX people work remotely (lowest in North America)</li>
                      <li>Montreal: 3.4% remote work</li>
                      <li>Los Angeles: 4.5% remote work</li>
                      <li>New York: 11.5% remote work</li>
                      <li>San Francisco: 20.8% remote work (highest in North America)</li>
                    </ul>
                    <p className="text-sm mt-2">Four out of five remote workers in San Francisco work for studios in Los Angeles.</p>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm italic text-white/80">
                      "North America continues to be a leader in high-end VFX production for blockbuster films and streaming content."
                      <span className="block mt-1 text-xs text-white/60">— Industry Expert, VFX Supervisor</span>
                    </p>
                  </div>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="UK & Europe" titleClassName="text-purple-400">
                <div className="space-y-4">
                  <p className="text-white/80">The UK and European VFX industry remains strong with London serving as the primary hub, followed by Paris, Berlin, and Madrid.</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">UK & Europe Insights:</h4>
                    <ul className="space-y-1">
                      <li>Total workforce: 15,947 VFX professionals</li>
                      <li>UK VFX workforce: 9,160 professionals (2022)</li>
                      <li>1,040 remote workers identified in the UK and EMEA</li>
                      <li>Remote work is least common in London (2.5%)</li>
                      <li>Madrid (23.5%) and Barcelona (19.5%) have significant remote worker populations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm italic text-white/80">
                      "There is light at the end of the tunnel, as in November 2023 an increase in the UK's VFX tax relief was announced."
                      <span className="block mt-1 text-xs text-white/60">— Neil Hatton, CEO, UK Screen Alliance</span>
                    </p>
                  </div>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="India" titleClassName="text-orange-400">
                <div className="space-y-4">
                  <p className="text-white/80">India has become a global powerhouse in VFX with an estimated 260,000 people working across the animation, VFX, gaming and comics sector.</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Indian VFX Industry:</h4>
                    <ul className="space-y-1">
                      <li>Total VFX workforce: 17,390 professionals (largest regional workforce)</li>
                      <li>Mumbai (36%), Chennai (18%), and Hyderabad (15%) are the major hubs</li>
                      <li>Revenue source: 70% of VFX revenue comes from international projects</li>
                      <li>Highest ratio of artist roles to Production staff (10:1)</li>
                      <li>VFX Supervisor ratio: 97 artists per supervisor (compared to much lower ratios in Western countries)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm italic text-white/80">
                      "International projects contribute nearly 70% of VFX revenue in India."
                      <span className="block mt-1 text-xs text-white/60">— Sneha Sharma, Research Lead, India</span>
                    </p>
                  </div>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="Australia & New Zealand" titleClassName="text-red-500">
                <div className="space-y-4">
                  <p className="text-white/80">Australia and New Zealand have long been regarded as dependable locations for complex and compelling VFX and post-production work.</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Major Hubs:</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <div>
                          <span className="font-medium">Sydney</span>
                          <span className="text-xs block text-white/60">Largest Australian hub with strengths in compositing and FX</span>
                        </div>
                        <span className="font-semibold text-red-500">1,242 professionals</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <div>
                          <span className="font-medium">Wellington</span>
                          <span className="text-xs block text-white/60">Home to Weta FX, specializing in creature work</span>
                        </div>
                        <span className="font-semibold text-red-500">1,210 professionals</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <div>
                          <span className="font-medium">Melbourne</span>
                          <span className="text-xs block text-white/60">Growing hub with LED volume technology</span>
                        </div>
                        <span className="font-semibold text-red-500">400 professionals</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-white/10 pb-1">
                        <div>
                          <span className="font-medium">Adelaide</span>
                          <span className="text-xs block text-white/60">Emerging center with government support</span>
                        </div>
                        <span className="font-semibold text-red-500">376 professionals</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">Brisbane</span>
                          <span className="text-xs block text-white/60">Developing hub with tax incentives</span>
                        </div>
                        <span className="font-semibold text-red-500">190 professionals</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm italic text-white/80">
                      "VFX companies that have robust support for inbound candidates compete successfully for discerning global talent."
                      <span className="block mt-1 text-xs text-white/60">— Marcus Wells, Talent & Recruitment Consultant at PXL Talent</span>
                    </p>
                  </div>
                </div>
              </ExpansibleTab>
            </div>
            
            <div className="mt-6">
              <ExpansibleTab title="East & Southeast Asia" titleClassName="text-teal-400">
                <div className="space-y-4">
                  <p className="text-white/80">China's VFX industry has grown significantly, with an estimated workforce exceeding 10,000 people, primarily concentrated in Beijing and Shanghai.</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">East & Southeast Asia Insights:</h4>
                    <ul className="space-y-1">
                      <li>Total workforce: 4,916 VFX professionals</li>
                      <li>Vietnam has seen rapid expansion with 48 VFX studios employing over 3,500 people</li>
                      <li>Ho Chi Minh City is the center of Vietnam's VFX industry</li>
                      <li>Highest percentage of remote work (12.7%) among regions covered</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-sm italic text-white/80">
                      "The Wandering Earth gave China one of its first VFX-driven global blockbusters."
                      <span className="block mt-1 text-xs text-white/60">— Wenhui (Cara) Du, VFX Producer/Supervisor</span>
                    </p>
                  </div>
                </div>
              </ExpansibleTab>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ExpansibleTab title="Industry Growth & Recovery" defaultOpen={true}>
                <div className="space-y-4">
                  <p className="text-white/80">Demand for VFX reached an all-time high in 2022. The following year saw a dramatic reduction in project commissioning by major Hollywood studios.</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Effects of the 2023 Slowdown:</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>The WGA and SAG-AFTRA strikes, combined with a slowing of content spend in neighboring sectors like commercial production and video games created significant challenges</li>
                      <li>Recovery has been slow through most of 2024, with many companies who reduced their headcount during 2023 not yet bouncing back</li>
                      <li>In January 2023, most VFX studios increased their headcount during the busy period of 2022</li>
                      <li>By December 2023, the industry slowdown resulted in far fewer studios displaying growth, with many reducing their headcount</li>
                    </ul>
                  </div>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="Studio Insights">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Major Studio Groups:</h4>
                    <p className="text-white/80">
                      Several of the largest VFX providers have a global footprint spanning North America, UK, Europe, India, and Australia.
                    </p>
                    <ul className="space-y-1 mt-2">
                      <li><span className="font-medium">DNEG:</span> Largest employer in the VFX industry globally</li>
                      <li><span className="font-medium">Framestore:</span> Large facilities in London (now including Method Studios and SDFX)</li>
                      <li><span className="font-medium">Other Major Groups:</span> Technicolor, Cinesite, and Pitch Black Group have expanded through acquisitions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Largest Sites Worldwide:</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li><span className="font-medium">Mumbai:</span> DNEG's Mumbai studio is likely the largest single VFX studio site globally by headcount</li>
                      <li><span className="font-medium">London:</span> Framestore has a particularly large facility in London, along with ILM and DNEG</li>
                      <li><span className="font-medium">Wellington:</span> Weta FX stands out among VFX studios with 1,000+ employees, with its largest site in Wellington</li>
                    </ul>
                  </div>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="Future Trends">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-teal-400 mb-1">AI Integration</h4>
                    <p className="text-sm text-white/80">
                      Artificial intelligence is transforming VFX workflows, particularly in rotoscoping, clean plate creation, and tracking.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-1">Remote Collaboration</h4>
                    <p className="text-sm text-white/80">
                      Studios are increasingly distributed, with teams working across multiple countries and time zones.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-amber-400 mb-1">Real-time Technology</h4>
                    <p className="text-sm text-white/80">
                      The line between traditional VFX and real-time rendering continues to blur with game engines being used in production.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-1">Talent Mobility</h4>
                    <p className="text-sm text-white/80">
                      VFX artists are increasingly mobile, moving between countries and regions based on project availability.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-white/80">
                    The integration of real-time technology and AI tools is reshaping workflows and creating new 
                    specializations within the industry. Despite technological advances, the VFX industry remains 
                    fundamentally human-powered, with demand for skilled artists continuing to grow globally.
                  </p>
                  
                  <p className="text-white/80 mt-2">
                    One of the best ways to make careers in VFX more sustainable worldwide is to advocate for 
                    colleagues in countries with fewer protections. Countries with stronger worker protections 
                    are likely to lose work to regions where workers have fewer protections.
                  </p>
                </div>
              </ExpansibleTab>
              
              <ExpansibleTab title="Tax Incentives & Regional Growth">
                <div className="space-y-4">
                  <p className="text-white/80">
                    Regional incentives continue to shape where VFX work is performed, with countries offering 
                    competitive tax rebates to attract productions.
                  </p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Tax Incentive Impact:</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>Changes in tax incentives in Quebec, France, and Australia have shifted work away from certain regions</li>
                      <li>Emerging hubs beyond traditional centers in North America and Europe are developing due to competitive incentives</li>
                      <li>UK VFX tax relief increase announced in November 2023 is expected to have positive impact</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-medium text-center mb-2">Regional Specializations</h4>
                    <ul className="space-y-1">
                      <li><span className="font-medium">Mumbai:</span> Roto/Paint, Compositing (36% of India's workforce)</li>
                      <li><span className="font-medium">London:</span> High-end Compositing, FX Simulation</li>
                      <li><span className="font-medium">Vancouver:</span> Animation, Character FX</li>
                      <li><span className="font-medium">Wellington:</span> Creature Design, Motion Capture</li>
                    </ul>
                  </div>
                </div>
              </ExpansibleTab>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default VFXIndustryInsights;
