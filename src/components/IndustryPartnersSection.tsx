
import { Button } from '@/components/ui/button';
import { ExternalLink, Award, Globe, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon';

const IndustryPartnersSection = () => {
  // Industry partners data with logos
  const platinumSponsors = [
    {
      name: "FranceVFX",
      description: "Visual Effects Vendors Association offering up to 40% tax rebate for international productions.",
      icon: <Globe className="h-6 w-6" />,
      color: "from-amber-500 to-amber-600"
    }
  ];
  
  const goldSponsors = [
    {
      name: "ACCESS:VFX",
      description: "A global, industry-led initiative pursuing inclusion, diversity, awareness and opportunity in VFX.",
      icon: <Users className="h-6 w-6" />,
      color: "from-amber-400 to-amber-500"
    },
    {
      name: "HDRI Consulting",
      description: "Industry-leading insights for Visual Effects, Animation and Gaming. Growth | Strategy | M&A",
      icon: <Shield className="h-6 w-6" />,
      color: "from-amber-400 to-amber-500"
    }
  ];
  
  const silverSponsors = [
    {
      name: "Digikore Visual Effects",
      description: "Your trusted VFX vendor offering Canadian and Indian rebates with studios in Los Angeles, Montreal, Pune, and Tokyo.",
      icon: <Award className="h-6 w-6" />,
      color: "from-gray-400 to-gray-500"
    }
  ];
  
  return (
    <section className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="space-y-2 text-center mb-10">
          <h2 className="text-3xl font-bold">Industry Partners & Sponsors</h2>
          <p className="text-muted-foreground">
            The Visual Effects World Atlas is made possible by the support of these organizations
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-white/60">PLATINUM SPONSORS</h3>
            <div className="grid grid-cols-1 gap-6">
              {platinumSponsors.map((sponsor, index) => (
                <motion.div 
                  key={index}
                  className="glass p-6 rounded-xl hover:bg-white/5 transition"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 5px 30px rgba(0,0,0,0.15)" 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className={`w-full md:w-1/3 bg-gradient-to-r ${sponsor.color} p-8 rounded-lg flex items-center justify-center`}>
                      <div className="flex flex-col items-center gap-4">
                        <AnimatedIcon 
                          icon={sponsor.icon}
                          size="lg"
                          color="white"
                          withPulse
                          className="text-white"
                        />
                        <span className="text-2xl font-bold text-white">{sponsor.name}</span>
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-3">
                      <h4 className="text-xl font-semibold">{sponsor.name}</h4>
                      <p className="text-white/80">{sponsor.description}</p>
                      <Button variant="link" className="text-primary hover:text-primary/80 transition text-sm flex items-center mt-2 p-0">
                        Visit website
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-white/60">GOLD SPONSORS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goldSponsors.map((sponsor, index) => (
                <motion.div 
                  key={index}
                  className="glass p-6 rounded-xl hover:bg-white/5 transition h-full"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 5px 20px rgba(0,0,0,0.12)" 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="flex flex-col h-full">
                    <div className={`bg-gradient-to-r ${sponsor.color} p-6 rounded-lg flex items-center justify-center mb-4`}>
                      <div className="flex flex-col items-center gap-3">
                        <AnimatedIcon 
                          icon={sponsor.icon}
                          size="md"
                          color="white"
                          withRotate
                        />
                        <span className="text-xl font-bold text-white">{sponsor.name}</span>
                      </div>
                    </div>
                    <div className="space-y-3 flex-grow">
                      <h4 className="text-lg font-semibold">{sponsor.name}</h4>
                      <p className="text-white/80 text-sm">{sponsor.description}</p>
                    </div>
                    <Button variant="link" className="text-secondary hover:text-secondary/80 transition text-sm flex items-center mt-4 p-0">
                      Visit website
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-white/60">SILVER SPONSORS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {silverSponsors.map((sponsor, index) => (
                <motion.div 
                  key={index}
                  className="glass p-6 rounded-xl hover:bg-white/5 transition h-full"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 5px 20px rgba(0,0,0,0.12)" 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="flex flex-col h-full">
                    <div className={`bg-gradient-to-r ${sponsor.color} p-4 rounded-lg flex items-center justify-center mb-4`}>
                      <div className="flex flex-col items-center gap-2">
                        <AnimatedIcon 
                          icon={sponsor.icon}
                          size="sm"
                          color="white"
                          withShake
                        />
                        <span className="text-lg font-bold text-white">{sponsor.name}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-base font-semibold">{sponsor.name}</h4>
                      <p className="text-white/80 text-xs mt-2">{sponsor.description}</p>
                    </div>
                    <Button variant="link" className="text-accent hover:text-accent/80 transition text-xs flex items-center mt-3 p-0">
                      Learn more
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="glass rounded-xl p-6 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-lg font-semibold mb-2">Want to contribute to the next edition?</h3>
            <p className="text-white/80 mb-4">
              Help improve future editions by sending corrections and suggestions to info@vfxatlas.com
            </p>
            <Button className="gradient-button px-6 py-2 rounded-full">
              Contact the Research Team
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndustryPartnersSection;
