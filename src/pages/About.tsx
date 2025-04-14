
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>About Us | Fuke's Media - AI-Driven VFX & Creative Studio</title>
        <meta name="description" content="Learn about Fuke's Media, an AI-driven VFX studio revolutionizing post-production in the film and entertainment industry." />
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
                title="About Fuke's Media" 
                subtitle="An AI-Driven VFX Empire Revolutionizing the Entertainment Industry"
              />
              
              <div className="max-w-4xl mx-auto mt-12 space-y-8">
                <div className="glass p-8 rounded-xl">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Our Vision</h2>
                  <p className="text-lg">
                    Fuke's Media is pioneering the integration of artificial intelligence with traditional VFX techniques to revolutionize post-production in the film and entertainment industry. We combine cutting-edge technology with artistic excellence to deliver unparalleled visual experiences.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="glass p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-secondary">Our Mission</h2>
                    <p>
                      We aim to make high-quality VFX accessible to productions of all sizes by leveraging AI-powered tools, a distributed global talent network, and innovative pricing models. Our mission is to democratize visual effects while maintaining the highest standards of quality.
                    </p>
                  </div>
                  
                  <div className="glass p-8 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-accent">Our Values</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Innovation at every step of the creative process</li>
                      <li>Transparent pricing and business practices</li>
                      <li>Artistic excellence combined with technical precision</li>
                      <li>Global collaboration that respects diverse perspectives</li>
                      <li>Continuous learning and advancement of our craft</li>
                    </ul>
                  </div>
                </div>
                
                <div className="glass p-8 rounded-xl mt-8">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Our Story</h2>
                  <p className="mb-4">
                    Founded in 2020 by a team of VFX veterans and AI specialists, Fuke's Media was born from the vision to bridge the gap between traditional visual effects techniques and emerging artificial intelligence technologies. We recognized the potential for AI to transform the labor-intensive aspects of VFX production while enhancing creative possibilities.
                  </p>
                  <p className="mb-4">
                    Starting with a small team in Mumbai, we quickly expanded by building a distributed global network of artists and developers. Our innovative approach to VFX production attracted attention from both the film industry and the tech sector, leading to partnerships with major studios and technology companies.
                  </p>
                  <p>
                    Today, Fuke's Media operates with headquarters in Mumbai and satellite offices in London, Los Angeles, and Singapore, serving clients from independent filmmakers to major studios around the world.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
