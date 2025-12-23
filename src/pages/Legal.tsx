import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import LiquidReveal from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Copyright, FileCheck, Scale, Globe } from 'lucide-react';

const Legal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Building2,
      title: 'Company Information',
      content: 'Fuke\'s Media LLP is a limited liability partnership registered in India, specializing in visual effects and creative services. We operate globally with headquarters in Mumbai and satellite offices in London, Los Angeles, and Singapore.',
    },
    {
      icon: Copyright,
      title: 'Intellectual Property',
      content: 'All content, trademarks, and intellectual property on this website are owned by Fuke\'s Media LLP unless otherwise stated. This includes our logo, brand assets, proprietary software, and creative works.',
    },
    {
      icon: FileCheck,
      title: 'Copyright Notice',
      content: '© 2025 Fuke\'s Media LLP. All rights reserved. No part of this website may be reproduced, distributed, or transmitted in any form without prior written permission from our legal team.',
    },
    {
      icon: Globe,
      title: 'Compliance',
      content: 'We comply with all applicable laws and regulations in the jurisdictions where we operate, including data protection laws (GDPR, CCPA), intellectual property laws, and industry-specific regulations.',
    },
    {
      icon: Scale,
      title: 'Dispute Resolution',
      content: 'Any disputes arising from the use of our services shall be governed by Indian law and resolved through arbitration in Mumbai. For international clients, we offer mediation services as a first step.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Legal Information - Fuke's Media"
        description="Legal information, compliance, and regulatory details for Fuke's Media services."
        keywords="legal information, compliance, regulations, copyright, intellectual property"
        canonical="https://fukes-media.com/legal"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-accent/10 border-accent/20 text-accent">
              <Scale className="w-4 h-4 mr-2" />
              Legal & Compliance
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <AnimatedLetters text="Legal" className="block" delay={0.2} />
            <span className="block mt-2">
              <GradientText>Information</GradientText>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Legal compliance and regulatory information
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper withDivider>
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <LiquidReveal key={section.title} delay={index * 0.1} direction="up">
              <Card className="border-border/50 hover:border-accent/30 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 flex-shrink-0">
                      <section.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-3">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LiquidReveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Last Updated */}
      <SectionWrapper variant="dark">
        <div className="text-center">
          <p className="text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Legal;
