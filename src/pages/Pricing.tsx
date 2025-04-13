
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { Check, X, Shield, Zap, Star, Award, Sparkles, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ExpansibleTab from '@/components/ExpansibleTab';
import DynamicPrice from '@/components/DynamicPrice';
import PricingCalculator from '@/components/PricingCalculator';
import { Helmet } from 'react-helmet-async';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      when: "beforeChildren", 
      staggerChildren: 0.2,
      duration: 0.6 
    } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('vfx');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // VFX Services Pricing - Updated based on the rate card image
  const vfxServices = [
    {
      title: '2D Department',
      items: [
        { service: 'Roto (Rotoscoping)', lowCost: 12, highCost: 50, premium: { min: 75, max: 250 }, outsource: { min: 8, max: 40 }, perShot: { min: 500, max: 2500 } },
        { service: 'Paint (Clean-Up)', lowCost: 25, highCost: 100, premium: { min: 125, max: 375 }, outsource: { min: 15, max: 60 }, perShot: { min: 1500, max: 5000 } },
        { service: 'Prep (Plate Prep)', lowCost: 25, highCost: 125, premium: { min: 150, max: 500 }, outsource: { min: 20, max: 80 }, perShot: { min: 2000, max: 7000 } },
        { service: '2D Compositing', lowCost: 25, highCost: 75, premium: { min: 100, max: 300 }, outsource: { min: 20, max: 75 }, perShot: { min: 1500, max: 10000 } },
        { service: '3D Compositing', lowCost: 50, highCost: 150, premium: { min: 250, max: 600 }, outsource: { min: 35, max: 125 }, perShot: { min: 3000, max: 15000 } },
        { service: 'Digital Matte Painting', lowCost: 15000, highCost: 30000, premium: { min: 50000, max: 100000 }, outsource: { min: 12000, max: 20000 }, perShot: { min: 75000, max: 5000000 }, perFrame: true }
      ]
    },
    {
      title: '3D Department',
      items: [
        { service: '3D Modeling & Texturing', lowCost: 3000, highCost: 10000, premium: { min: 15000, max: 100000 }, outsource: { min: 2500, max: 8000 }, perShot: { min: 25000, max: 100000 }, perModel: true },
        { service: 'Animation', lowCost: 50, highCost: 200, premium: { min: 250, max: 1250 }, outsource: { min: 40, max: 150 }, perShot: { min: 5000, max: 25000 } },
        { service: 'Rigging', lowCost: 5000, highCost: 20000, premium: { min: 25000, max: 100000 }, outsource: { min: 4000, max: 15000 }, perShot: { min: 15000, max: 75000 }, perCharacter: true },
        { service: 'Matchmove', lowCost: 25, highCost: 75, premium: { min: 150, max: 400 }, outsource: { min: 20, max: 75 }, perShot: { min: 1500, max: 10000 } },
        { service: 'Simulation & FX', lowCost: 125, highCost: 500, premium: { min: 625, max: 2500 }, outsource: { min: 100, max: 300 }, perShot: { min: 7500, max: 50000 } },
        { service: 'Lighting & Rendering', lowCost: 50, highCost: 200, premium: { min: 300, max: 1000 }, outsource: { min: 40, max: 150 }, perShot: { min: 3000, max: 15000 } }
      ]
    }
  ];

  // Creative Services Pricing - Updated based on the rate card image
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
      unit: 'per video (up to 3 min)'
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
  type BaseLightDaVinciService = {
    service: string;
    baseLight: { min: number; max: number };
    daVinci: { min: number; max: number };
    unit: string;
  }
  
  type CustomBaseLightDaVinciService = {
    service: string;
    baseLight: { min: number; max: number; custom: boolean };
    daVinci: { min: number; max: number; custom: boolean };
    unit: string;
  }
  
  type DIService = BaseLightDaVinciService | CustomBaseLightDaVinciService;
  
  const diServices: DIService[] = [
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
    },
    {
      service: 'Stock Footage and Additional Tools',
      baseLight: { min: 0, max: 0, custom: true },
      daVinci: { min: 0, max: 0, custom: true },
      unit: 'As per client needs'
    }
  ];

  // Popular Package Tiers
  const packageTiers = [
    {
      name: "Basic VFX",
      description: "Essential VFX services for indie productions",
      price: 5000,
      features: [
        "Basic Rotoscoping",
        "2D Compositing",
        "Basic Clean-up",
        "Color Correction",
        "Up to 10 shots",
      ],
      limitations: [
        "No 3D work",
        "No complex simulations",
        "Standard turnaround time"
      ],
      recommended: false,
      color: "from-fukes-blue to-fukes-cyan"
    },
    {
      name: "Professional",
      description: "Full service package for professional productions",
      price: 25000,
      features: [
        "Advanced Rotoscoping",
        "2D/3D Compositing",
        "Digital Matte Painting",
        "Basic Simulations & FX",
        "Color Grading",
        "Up to 30 shots",
      ],
      limitations: [],
      recommended: true,
      color: "from-fukes-red to-fukes-gold"
    },
    {
      name: "Premium Studio",
      description: "Hollywood-level VFX for major productions",
      price: 75000,
      features: [
        "Everything in Professional",
        "Complex 3D Simulations",
        "Character Animation",
        "Advanced FX",
        "HDR Grading",
        "Unlimited shots",
        "Priority support",
      ],
      limitations: [],
      recommended: false,
      color: "from-fukes-green to-fukes-gold"
    }
  ];
  
  // Payment Terms
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
      title: "Milestone Payments",
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
    },
    {
      title: "Revisions Policy",
      details: [
        "Two rounds of revisions are included in the quoted price.",
        "Additional revisions will be charged at ₹2K-₹5K per hour based on complexity."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Pricing | Fuke's Media - AI-Driven VFX & Creative Studio</title>
        <meta name="description" content="Transparent pricing options for all your creative and technical VFX needs. From 2D/3D compositing to digital intermediate services." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section with parallax effect */}
      <div 
        className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url("/lovable-uploads/7aa001b2-00ae-4aed-9551-897de83da325.png")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px)` 
          }}
        />
        
        <motion.div 
          className="container relative z-10 text-center px-4 py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fukes-blue via-fukes-red to-fukes-green">
              Pricing & Packages
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80">
            Transparent pricing options tailored to your creative vision and production needs
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="gradient-button text-white px-8 py-6 text-lg rounded-full">
              <a href="#pricing-calculator">Calculate Your Project Cost</a>
            </Button>
          </div>
        </motion.div>

        {/* Animated arrow indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <main className="relative z-10">
        {/* Popular Package Tiers - New Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-background/95">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Packages</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Choose from our pre-configured packages or create a custom solution tailored to your specific needs</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packageTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  className={`relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 ${tier.recommended ? 'ring-2 ring-primary' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {tier.recommended && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  
                  <div className={`h-2 w-full bg-gradient-to-r ${tier.color}`}></div>
                  
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-semibold mb-2">{tier.name}</h3>
                    <p className="text-muted-foreground mb-6">{tier.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-3xl font-bold">
                        <DynamicPrice priceUSD={tier.price} />
                      </div>
                      <div className="text-sm text-muted-foreground">starting price</div>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      
                      {tier.limitations.map((limitation, i) => (
                        <div key={`limit-${i}`} className="flex items-center text-muted-foreground">
                          <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full ${
                        tier.recommended 
                          ? 'gradient-button text-white' 
                          : 'bg-muted/50 text-foreground hover:bg-muted'
                      }`}
                      asChild
                    >
                      <a href="#contact">Get Started</a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Calculator */}
        <section id="pricing-calculator" className="py-16 px-4 bg-gradient-to-b from-background/95 to-background">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle 
                title="Pricing Calculator" 
                subtitle="Estimate the cost of your next project with our interactive calculator"
              />
              <PricingCalculator />
            </motion.div>
          </div>
        </section>
        
        {/* Detailed Pricing Tables */}
        <section className="py-16 px-4 bg-gradient-to-t from-background/95 to-background">
          <div className="container mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center max-w-2xl mx-auto">
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Detailed Service Pricing
                </motion.h2>
                <motion.p 
                  variants={itemVariants}
                  className="text-muted-foreground"
                >
                  Our comprehensive pricing tables for all services across departments
                </motion.p>
              </div>
              
              <motion.div variants={itemVariants}>
                <Tabs 
                  defaultValue="vfx" 
                  value={activeTab} 
                  onValueChange={setActiveTab} 
                  className="w-full"
                >
                  <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-md grid-cols-3 h-14 p-1 rounded-full bg-muted/30">
                      <TabsTrigger 
                        value="vfx" 
                        className="rounded-full text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white"
                      >
                        VFX Services
                      </TabsTrigger>
                      <TabsTrigger 
                        value="creative" 
                        className="rounded-full text-sm md:text-base data-[state=active]:bg-secondary data-[state=active]:text-white"
                      >
                        Creative Services
                      </TabsTrigger>
                      <TabsTrigger 
                        value="di" 
                        className="rounded-full text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-white"
                      >
                        Digital Intermediate
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  {/* VFX Services Tab */}
                  <TabsContent value="vfx" className="w-full">
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
                          <div className="price-table">
                            <div className="overflow-x-auto rounded-lg border border-border/50 shadow-sm">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-muted/30">
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Service</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Low-Cost Projects</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">High-Budget Projects</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Outsource</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Per Shot</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                  {dept.items.map((item, idx) => (
                                    <tr 
                                      key={idx}
                                      className="hover:bg-muted/10 transition-colors"
                                    >
                                      <td className="py-4 px-4">{item.service}</td>
                                      <td className="py-4 px-4">
                                        {item.perModel || item.perCharacter || item.perFrame ? (
                                          <div>
                                            <DynamicPrice priceUSD={item.lowCost} /> - <DynamicPrice priceUSD={item.highCost} />
                                            <span className="text-xs text-muted-foreground ml-1">
                                              {item.perModel ? 'per model' : item.perCharacter ? 'per character' : 'per frame'}
                                            </span>
                                          </div>
                                        ) : (
                                          <div>
                                            <DynamicPrice priceUSD={item.lowCost} /> - <DynamicPrice priceUSD={item.highCost} />
                                          </div>
                                        )}
                                      </td>
                                      <td className="py-4 px-4">
                                        <DynamicPrice priceUSD={item.premium.min} /> - <DynamicPrice priceUSD={item.premium.max} />
                                      </td>
                                      <td className="py-4 px-4">
                                        <DynamicPrice priceUSD={item.outsource.min} /> - <DynamicPrice priceUSD={item.outsource.max} />
                                      </td>
                                      <td className="py-4 px-4">
                                        <DynamicPrice priceUSD={item.perShot.min} /> - <DynamicPrice priceUSD={item.perShot.max} />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </ExpansibleTab>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Creative Services Tab */}
                  <TabsContent value="creative" className="w-full">
                    <div className="mb-6 text-center max-w-2xl mx-auto">
                      <p className="text-muted-foreground">
                        Our creative services include design, animation, and video production with pricing based on project scope and complexity.
                      </p>
                    </div>
                    
                    <ExpansibleTab title="Creative Services Pricing" defaultOpen={true}>
                      <div className="price-table">
                        <div className="overflow-x-auto rounded-lg border border-border/50 shadow-sm">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted/30">
                                <th className="text-left py-3 px-4 font-semibold text-sm">Service</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">In-House Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">High-End Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Outsource Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Unit</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                              {creativeServices.map((item, idx) => (
                                <tr 
                                  key={idx}
                                  className="hover:bg-muted/10 transition-colors"
                                >
                                  <td className="py-4 px-4">{item.service}</td>
                                  <td className="py-4 px-4">
                                    <DynamicPrice priceUSD={item.inHouse.min} /> - <DynamicPrice priceUSD={item.inHouse.max} />
                                  </td>
                                  <td className="py-4 px-4">
                                    <DynamicPrice priceUSD={item.premium.min} /> - <DynamicPrice priceUSD={item.premium.max} />
                                  </td>
                                  <td className="py-4 px-4">
                                    <DynamicPrice priceUSD={item.outsource.min} /> - <DynamicPrice priceUSD={item.outsource.max} />
                                  </td>
                                  <td className="py-4 px-4">{item.unit}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </ExpansibleTab>
                  </TabsContent>
                  
                  {/* Digital Intermediate Tab */}
                  <TabsContent value="di" className="w-full">
                    <div className="mb-6 text-center max-w-2xl mx-auto">
                      <p className="text-muted-foreground">
                        Digital Intermediate (DI) is a crucial process in color grading and overall post-production workflow. Pricing is based on software used and project complexity.
                      </p>
                    </div>
                    
                    <ExpansibleTab title="Digital Intermediate Services" defaultOpen={true}>
                      <div className="price-table">
                        <div className="overflow-x-auto rounded-lg border border-border/50 shadow-sm">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted/30">
                                <th className="text-left py-3 px-4 font-semibold text-sm">Service</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Base Light Pricing</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">DaVinci Resolve Pricing</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Unit</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                              {diServices.map((item, idx) => (
                                <tr 
                                  key={idx}
                                  className="hover:bg-muted/10 transition-colors"
                                >
                                  <td className="py-4 px-4">{item.service}</td>
                                  <td className="py-4 px-4">
                                    {'custom' in item.baseLight ? (
                                      <span className="text-muted-foreground text-sm">As per client needs (Stock Footage, Plugins, LUTs, etc.)</span>
                                    ) : (
                                      <><DynamicPrice priceUSD={item.baseLight.min} /> - <DynamicPrice priceUSD={item.baseLight.max} /></>
                                    )}
                                  </td>
                                  <td className="py-4 px-4">
                                    {'custom' in item.daVinci ? (
                                      <span className="text-muted-foreground text-sm">As per client needs (Stock Footage, Plugins, LUTs, etc.)</span>
                                    ) : (
                                      <><DynamicPrice priceUSD={item.daVinci.min} /> - <DynamicPrice priceUSD={item.daVinci.max} /></>
                                    )}
                                  </td>
                                  <td className="py-4 px-4">{item.unit}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </ExpansibleTab>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Payment Terms & Process Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-background/95 to-background">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Payment Terms & Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Clear and transparent payment policies for a smooth production workflow</p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="multiple" className="w-full">
                {paymentTerms.map((term, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <AccordionItem value={`term-${idx}`} className="border border-border/50 mb-4 rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/10 text-lg font-medium">
                        {term.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2">
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                          {term.details.map((detail, detailIdx) => (
                            <li key={detailIdx}>{detail}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <AccordionItem value="additional-costs" className="border border-border/50 mb-4 rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/10 text-lg font-medium">
                      Additional Tools & Plugins
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <p className="mb-2">Some projects may require additional tools, plugins, or stock purchases. These costs will be added to the final invoice:</p>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Stock Footage/Images: <DynamicPrice priceUSD={1000} /> - <DynamicPrice priceUSD={50000} /> per asset</li>
                        <li>Specialized Plugins: <DynamicPrice priceUSD={5000} /> - <DynamicPrice priceUSD={30000} /> per plugin/license</li>
                        <li>High-Resolution Textures & Models: <DynamicPrice priceUSD={2000} /> - <DynamicPrice priceUSD={15000} /> per asset</li>
                        <li>3D Asset Purchases: <DynamicPrice priceUSD={5000} /> - <DynamicPrice priceUSD={50000} /> depending on complexity</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <AccordionItem value="taxes" className="border border-border/50 mb-4 rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/10 text-lg font-medium">
                      Payment Methods & Taxes
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Accepted payment methods include bank transfer, credit/debit card, PayPal, or online payment gateways.</li>
                        <li>International payments may incur additional currency exchange fees and processing charges.</li>
                        <li>All payments are subject to applicable GST/VAT as per Indian tax laws or your local tax regulations for international clients.</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              </Accordion>
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-flex items-center p-4 rounded-lg bg-muted/30 border border-border/50">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">All pricing is subject to change based on project specifics and complexity.</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-background/95">
          <div className="container mx-auto max-w-4xl">
            <div className="glass rounded-2xl overflow-hidden border border-border/50">
              <div className="p-8 md:p-12">
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to bring your vision to life?</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Contact our team for a personalized quote tailored to your project's unique requirements
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col md:flex-row gap-4 justify-center"
                >
                  <Button 
                    size="lg" 
                    className="gradient-button text-white px-8 py-6 text-lg rounded-full"
                    asChild
                  >
                    <a href="/#contact">Request Quote</a>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-8 py-6 text-lg rounded-full border-2"
                    asChild
                  >
                    <a href="/#portfolio">View Our Portfolio</a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
