
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';

const FreelancerPortalPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Freelancer Portal | Fuke's Media - VFX Talent Network</title>
        <meta name="description" content="Access your freelancer dashboard, manage projects, and track payments with Fuke's Media VFX talent network." />
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
                subtitle="Access your dashboard, manage projects, and track payments"
                accent="secondary"
              />
              
              <div className="max-w-md mx-auto mt-12">
                <Card className="glass-card">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-secondary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Sign In</h3>
                      <p className="text-muted-foreground">
                        Access your freelancer dashboard
                      </p>
                    </div>
                    
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Input id="email" placeholder="you@example.com" className="pl-10" />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <Button type="submit" className="gradient-button w-full">
                        Sign In
                      </Button>
                    </form>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Button variant="link" className="p-0 h-auto">
                          Apply to join our network
                        </Button>
                      </p>
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

export default FreelancerPortalPage;
