import { useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Investors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const metrics = [
    { label: "Revenue Growth", value: "300%", period: "YoY" },
    { label: "Global Clients", value: "50+", period: "Countries" },
    { label: "Projects Delivered", value: "1000+", period: "Successfully" },
    { label: "Team Size", value: "100+", period: "Professionals" }
  ];

  return (
    <>
      <SEOHelmet
        title="Investor Relations - Fuke's Media"
        description="Learn about investment opportunities and growth at Fuke's Media. Financial information for current and potential investors."
        keywords="investor relations, VFX investment, media company investment, financial growth"
        canonical="https://fukes-media.com/investors"
      />

      <MainLayout pageKey="investors">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <SectionTitle 
              title="Investor Relations" 
              subtitle="Partnering for the future of visual effects"
            />
            
            <div className="max-w-6xl mx-auto mt-12">
              {/* Company Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Investment Opportunity</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Fuke's Media is at the forefront of the AI-driven VFX revolution, combining cutting-edge 
                    technology with creative excellence. Our innovative approach has positioned us as a leader 
                    in the rapidly growing visual effects industry.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                        <div className="font-medium">{metric.label}</div>
                        <div className="text-sm text-muted-foreground">{metric.period}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Value Propositions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <TrendingUp className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Market Leadership</h3>
                    <p className="text-muted-foreground">
                      Leading the market with AI-assisted VFX workflows that reduce production time by 40% 
                      while maintaining Hollywood-quality output.
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="p-6 h-full">
                    <Globe className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Global Expansion</h3>
                    <p className="text-muted-foreground">
                      Expanding operations across 3 continents with strategic partnerships in key markets 
                      including Hollywood, Bollywood, and European cinema.
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="p-6 h-full">
                    <Target className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Strategic Vision</h3>
                    <p className="text-muted-foreground">
                      Clear roadmap for growth including proprietary AI tools, real-time VFX platforms, 
                      and virtual production capabilities.
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="p-6 h-full">
                    <Award className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">Industry Recognition</h3>
                    <p className="text-muted-foreground">
                      Award-winning team with recognition from major film festivals and industry bodies 
                      for technical innovation and creative excellence.
                    </p>
                  </Card>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center"
              >
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <h3 className="text-2xl font-bold mb-4">Ready to Invest in the Future?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join us in revolutionizing the visual effects industry. Contact our investor relations 
                    team to learn more about partnership opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Request Information
                    </Button>
                    <Button size="lg" variant="outline">
                      Download Pitch Deck
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Investors;