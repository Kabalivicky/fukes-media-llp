
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '@/components/SectionTitle';
import LoginForm from './LoginForm';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const FreelancerPortalPage = () => {
  const benefits = [
    "Access to exclusive VFX job opportunities",
    "Transparent payment processing",
    "Project management tools and resources",
    "Training and upskilling programs",
    "Connect with industry professionals",
    "Portfolio showcase to potential clients"
  ];
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Freelancer Portal | Fuke's Media - VFX Talent Network</title>
        <meta name="description" content="Join our network of VFX professionals and gain access to exclusive opportunities, resources, and community support." />
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
                title="Freelancer Portal" 
                subtitle="Access exclusive opportunities and resources for VFX professionals"
                accent="primary"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Why Join Our Network</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <p>{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Card className="mt-8 bg-muted/20 border-dashed">
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-2">Application Requirements</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Minimum 2 years professional VFX experience</li>
                        <li>Professional portfolio or demo reel</li>
                        <li>References from previous clients/employers</li>
                        <li>Valid work authorization in your country of residence</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <LoginForm />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FreelancerPortalPage;
