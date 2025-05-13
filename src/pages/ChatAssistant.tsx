
import { useEffect } from 'react';
import AIChat from '@/components/ChatAssistant/AIChat';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';

const ChatAssistant = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Fuke's Media AI Assistant",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web",
    "description": "AI-powered assistant for VFX production queries and project planning."
  };

  return (
    <>
      <SEOHelmet
        title="AI Assistant - Fuke's Media"
        description="Get immediate assistance with your VFX project needs through our AI-powered chatbot."
        keywords="VFX assistant, AI chat, production help, visual effects consultation"
        canonical="https://fukes-media.com/chat-assistant"
        structuredData={structuredData}
      />

      <MainLayout pageKey="chat-assistant">
        <section className="py-20 px-4">
          <SectionTitle
            title="AI Assistant"
            subtitle="Get immediate answers to your VFX production questions"
          />

          <div className="container mx-auto mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto">
                <AIChat />
              </div>
              
              <div className="mt-12 max-w-2xl mx-auto text-center">
                <h3 className="text-xl font-semibold mb-4">How Our AI Assistant Can Help You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="bg-card/50 p-4 rounded-lg border border-border/40">
                    <h4 className="font-medium mb-2">Project Consultation</h4>
                    <p className="text-sm text-muted-foreground">Get instant feedback on your project requirements and technical specifications.</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg border border-border/40">
                    <h4 className="font-medium mb-2">Budget Estimation</h4>
                    <p className="text-sm text-muted-foreground">Receive preliminary cost estimates based on your project scope and timeline.</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg border border-border/40">
                    <h4 className="font-medium mb-2">Technical Support</h4>
                    <p className="text-sm text-muted-foreground">Find answers to common technical questions about our VFX pipeline and capabilities.</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg border border-border/40">
                    <h4 className="font-medium mb-2">Production Planning</h4>
                    <p className="text-sm text-muted-foreground">Get guidance on project timelines, milestones, and production workflows.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ChatAssistant;
