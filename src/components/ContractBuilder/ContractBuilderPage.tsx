
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const ContractBuilderPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Contract Builder | Fuke's Media - AI-Driven Contract Creation</title>
        <meta name="description" content="Create customized VFX and creative services contracts with our AI-powered contract builder." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle 
                title="Smart Contract Builder" 
                subtitle="Generate customized VFX service contracts with our AI-powered contract builder"
                accent="primary"
              />
              
              <div className="max-w-4xl mx-auto mt-12">
                <Card className="glass-card">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Contract Builder</h3>
                      <p className="text-muted-foreground">
                        This feature is coming soon. Our AI-powered contract builder will allow you to:
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Customized Templates</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose from industry-standard templates tailored for VFX services
                        </p>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Smart Clause Suggestions</h4>
                        <p className="text-sm text-muted-foreground">
                          AI-driven suggestions based on your project specifications
                        </p>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">E-Signature Integration</h4>
                        <p className="text-sm text-muted-foreground">
                          Sign and send contracts electronically with legal validity
                        </p>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Blockchain Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Optional immutable contract storage on blockchain
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button className="gradient-button">
                        Join Waitlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContractBuilderPage;
