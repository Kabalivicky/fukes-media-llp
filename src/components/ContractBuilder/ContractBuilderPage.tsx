
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '@/components/SectionTitle';
import ContractForm from './ContractForm';

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
              
              <div className="max-w-4xl mx-auto mb-10 text-center">
                <p className="text-lg text-muted-foreground">
                  Our intelligent contract system combines industry best practices, legal expertise, 
                  and AI-driven customization to create comprehensive agreements tailored to your specific needs.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <ContractForm />
              </div>
              
              <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted/20 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Fill the Form</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide details about your project, requirements, and preferences
                  </p>
                </div>
                
                <div className="bg-muted/20 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-2">AI Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system generates a customized contract based on your inputs
                  </p>
                </div>
                
                <div className="bg-muted/20 p-6 rounded-lg text-center">
                  <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Download & Sign</h3>
                  <p className="text-sm text-muted-foreground">
                    Review, download and sign your contract electronically
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

export default ContractBuilderPage;
