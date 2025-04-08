
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ExpansibleTab from '@/components/ExpansibleTab';
import DynamicPrice from '@/components/DynamicPrice';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('vfx');

  // VFX Services Pricing
  const vfxServices = [
    {
      title: '2D Department',
      items: [
        { service: 'Roto (Rotoscoping)', lowCost: 12, highCost: 50, premium: { min: 75, max: 250 }, outsource: { min: 8, max: 40 }, perShot: { min: 500, max: 2500 } },
        { service: 'Paint (Clean-Up)', lowCost: 25, highCost: 100, premium: { min: 125, max: 375 }, outsource: { min: 15, max: 60 }, perShot: { min: 1500, max: 5000 } },
        { service: 'Prep (Plate Prep)', lowCost: 25, highCost: 125, premium: { min: 150, max: 500 }, outsource: { min: 20, max: 80 }, perShot: { min: 2000, max: 7000 } },
        { service: '2D Compositing', lowCost: 25, highCost: 75, premium: { min: 100, max: 300 }, outsource: { min: 20, max: 75 }, perShot: { min: 1500, max: 10000 } },
        { service: '3D Compositing', lowCost: 50, highCost: 150, premium: { min: 250, max: 600 }, outsource: { min: 35, max: 125 }, perShot: { min: 3000, max: 15000 } }
      ]
    },
    {
      title: '3D Department',
      items: [
        { service: '3D Modeling & Texturing', lowCost: 3000, highCost: 10000, premium: { min: 15000, max: 100000 }, outsource: { min: 2500, max: 8000 }, perShot: { min: 25000, max: 100000 }, perModel: true },
        { service: 'Animation', lowCost: 50, highCost: 200, premium: { min: 250, max: 1250 }, outsource: { min: 40, max: 150 }, perShot: { min: 5000, max: 25000 } },
        { service: 'Rigging', lowCost: 5000, highCost: 20000, premium: { min: 25000, max: 100000 }, outsource: { min: 4000, max: 15000 }, perShot: { min: 15000, max: 75000 }, perCharacter: true },
        { service: 'Matchmove', lowCost: 25, highCost: 75, premium: { min: 150, max: 400 }, outsource: { min: 20, max: 75 }, perShot: { min: 1500, max: 10000 } },
        { service: 'Simulation & FX', lowCost: 125, highCost: 500, premium: { min: 625, max: 2500 }, outsource: { min: 100, max: 300 }, perShot: { min: 7500, max: 50000 } }
      ]
    }
  ];

  // Creative Services Pricing
  const creativeServices = [
    {
      service: 'Poster Design',
      inHouse: { min: 2000, max: 10000 },
      premium: { min: 15000, max: 50000 },
      outsource: { min: 1500, max: 7500 },
      unit: 'per poster'
    },
    {
      service: 'Motion Poster',
      inHouse: { min: 5000, max: 20000 },
      premium: { min: 25000, max: 100000 },
      outsource: { min: 4000, max: 15000 },
      unit: 'per motion poster'
    },
    {
      service: 'Lyrical Video Creation',
      inHouse: { min: 5000, max: 20000 },
      premium: { min: 25000, max: 150000 },
      outsource: { min: 4000, max: 12000 },
      unit: 'per video'
    },
    {
      service: 'Video Editing',
      inHouse: { min: 2000, max: 8000 },
      premium: { min: 10000, max: 50000 },
      outsource: { min: 1500, max: 6000 },
      unit: 'per minute'
    }
  ];

  // DI Services Pricing
  const diServices = [
    {
      service: 'Basic Color Grading',
      baseLight: { min: 15000, max: 25000 },
      daVinci: { min: 25000, max: 50000 },
      unit: 'per minute'
    },
    {
      service: 'Advanced Color Grading',
      baseLight: { min: 25000, max: 50000 },
      daVinci: { min: 50000, max: 100000 },
      unit: 'per minute'
    },
    {
      service: 'HDR Grading',
      baseLight: { min: 40000, max: 80000 },
      daVinci: { min: 80000, max: 150000 },
      unit: 'per minute'
    },
    {
      service: 'Look Development',
      baseLight: { min: 50000, max: 100000 },
      daVinci: { min: 100000, max: 200000 },
      unit: 'per project'
    },
    {
      service: 'VFX Supervision (During DI)',
      baseLight: { min: 20000, max: 50000 },
      daVinci: { min: 50000, max: 100000 },
      unit: 'per day'
    }
  ];
  
  // Advance Payment Terms
  const paymentTerms = [
    {
      title: "Advance Payment Structure",
      details: [
        "Below ₹5,00,000: 30% advance payment before project initiation.",
        "₹5,00,000 to ₹1,00,00,000: 50% advance payment before project initiation.",
        "Above ₹1,00,00,000: 50% advance payment before project initiation, with the remaining 50% split into milestones."
      ]
    },
    {
      title: "Remaining Payments",
      details: [
        "40% of the total project cost is to be paid during production progress or upon mid-project milestone completion.",
        "A final 30% payment is required before the final delivery of the completed project."
      ]
    },
    {
      title: "Delivery Terms",
      details: [
        "Projects will be delivered only after full payment clearance.",
        "Creative corrections or minor mistakes will be addressed within the agreed-upon payment.",
        "Any add-ons, additional requirements, or major corrections will incur extra charges, discussed and approved beforehand."
      ]
    }
  ];

  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-10">
          <SectionTitle 
            title="Our Pricing" 
            subtitle="Transparent pricing options for all your creative and technical needs"
          />
          
          <Tabs defaultValue="vfx" value={activeTab} onValueChange={setActiveTab} className="mt-10">
            <TabsList className="grid w-full md:w-fit mx-auto grid-cols-1 md:grid-cols-3 gap-2">
              <TabsTrigger value="vfx">VFX Services</TabsTrigger>
              <TabsTrigger value="creative">Creative Services</TabsTrigger>
              <TabsTrigger value="di">Digital Intermediate</TabsTrigger>
            </TabsList>
            
            {/* VFX Services Tab */}
            <TabsContent value="vfx" className="mt-8">
              <div className="mb-6 text-center max-w-2xl mx-auto">
                <p className="text-muted-foreground">
                  Our VFX pricing varies based on project complexity. All prices are per frame unless otherwise specified.
                </p>
              </div>
              
              <div className="space-y-6">
                {vfxServices.map((dept, index) => (
                  <ExpansibleTab 
                    key={index} 
                    title={dept.title} 
                    defaultOpen={index === 0}
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Service</th>
                            <th className="text-left py-2">Low-Cost Projects</th>
                            <th className="text-left py-2">High-Budget Projects</th>
                            <th className="text-left py-2">Outsource</th>
                            <th className="text-left py-2">Per Shot</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dept.items.map((item, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="py-3">{item.service}</td>
                              <td className="py-3">
                                {item.perModel || item.perCharacter ? (
                                  <DynamicPrice priceUSD={item.lowCost} /> - <DynamicPrice priceUSD={item.highCost} />
                                  <span className="text-xs text-muted-foreground ml-1">
                                    {item.perModel ? 'per model' : 'per character'}
                                  </span>
                                ) : (
                                  <><DynamicPrice priceUSD={item.lowCost} /> - <DynamicPrice priceUSD={item.highCost} /></>
                                )}
                              </td>
                              <td className="py-3">
                                <DynamicPrice priceUSD={item.premium.min} /> - <DynamicPrice priceUSD={item.premium.max} />
                              </td>
                              <td className="py-3">
                                <DynamicPrice priceUSD={item.outsource.min} /> - <DynamicPrice priceUSD={item.outsource.max} />
                              </td>
                              <td className="py-3">
                                <DynamicPrice priceUSD={item.perShot.min} /> - <DynamicPrice priceUSD={item.perShot.max} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ExpansibleTab>
                ))}
              </div>
            </TabsContent>
            
            {/* Creative Services Tab */}
            <TabsContent value="creative" className="mt-8">
              <div className="mb-6 text-center max-w-2xl mx-auto">
                <p className="text-muted-foreground">
                  Our creative services include design, animation, and video production with pricing based on project scope and complexity.
                </p>
              </div>
              
              <ExpansibleTab title="Creative Services Pricing" defaultOpen={true}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Service</th>
                        <th className="text-left py-2">In-House Price</th>
                        <th className="text-left py-2">High-End Price</th>
                        <th className="text-left py-2">Outsource Price</th>
                        <th className="text-left py-2">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creativeServices.map((item, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-3">{item.service}</td>
                          <td className="py-3">
                            <DynamicPrice priceUSD={item.inHouse.min} /> - <DynamicPrice priceUSD={item.inHouse.max} />
                          </td>
                          <td className="py-3">
                            <DynamicPrice priceUSD={item.premium.min} /> - <DynamicPrice priceUSD={item.premium.max} />
                          </td>
                          <td className="py-3">
                            <DynamicPrice priceUSD={item.outsource.min} /> - <DynamicPrice priceUSD={item.outsource.max} />
                          </td>
                          <td className="py-3">{item.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ExpansibleTab>
            </TabsContent>
            
            {/* Digital Intermediate Tab */}
            <TabsContent value="di" className="mt-8">
              <div className="mb-6 text-center max-w-2xl mx-auto">
                <p className="text-muted-foreground">
                  Digital Intermediate (DI) is a crucial process in color grading and overall post-production workflow. Pricing is based on software used and project complexity.
                </p>
              </div>
              
              <ExpansibleTab title="Digital Intermediate Services" defaultOpen={true}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Service</th>
                        <th className="text-left py-2">Base Light Pricing</th>
                        <th className="text-left py-2">DaVinci Resolve Pricing</th>
                        <th className="text-left py-2">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diServices.map((item, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-3">{item.service}</td>
                          <td className="py-3">
                            <DynamicPrice priceUSD={item.baseLight.min} /> - <DynamicPrice priceUSD={item.baseLight.max} />
                          </td>
                          <td className="py-3">
                            <DynamicPrice priceUSD={item.daVinci.min} /> - <DynamicPrice priceUSD={item.daVinci.max} />
                          </td>
                          <td className="py-3">{item.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ExpansibleTab>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Payment Terms & Conditions</h2>
            
            <Accordion type="multiple" className="w-full">
              {paymentTerms.map((term, idx) => (
                <AccordionItem key={idx} value={`term-${idx}`}>
                  <AccordionTrigger className="text-lg">{term.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-6 space-y-2">
                      {term.details.map((detail, detailIdx) => (
                        <li key={detailIdx}>{detail}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
              
              <AccordionItem value="additional-costs">
                <AccordionTrigger className="text-lg">Additional Tools & Plugins</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Some projects may require additional tools, plugins, or stock purchases. These costs will be added to the final invoice:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Stock Footage/Images: <DynamicPrice priceUSD={1000} /> - <DynamicPrice priceUSD={50000} /> per asset</li>
                    <li>Specialized Plugins: <DynamicPrice priceUSD={5000} /> - <DynamicPrice priceUSD={30000} /> per plugin/license</li>
                    <li>High-Resolution Textures & Models: <DynamicPrice priceUSD={2000} /> - <DynamicPrice priceUSD={15000} /> per asset</li>
                    <li>3D Asset Purchases: <DynamicPrice priceUSD={5000} /> - <DynamicPrice priceUSD={50000} /> depending on complexity</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="taxes">
                <AccordionTrigger className="text-lg">Payment Methods & Taxes</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Accepted payment methods include bank transfer, credit/debit card, PayPal, or online payment gateways.</li>
                    <li>International payments may incur additional currency exchange fees and processing charges.</li>
                    <li>All payments are subject to applicable GST/VAT as per Indian tax laws or your local tax regulations for international clients.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
