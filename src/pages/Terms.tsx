import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Check, AlertTriangle, Scale, Mail } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Check,
      title: 'Acceptance of Terms',
      content: 'By accessing and using Fuke\'s Media services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.',
    },
    {
      icon: FileText,
      title: 'Use License',
      content: 'Permission is granted to temporarily download one copy of the materials on Fuke\'s Media\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimer',
      content: 'The materials on Fuke\'s Media\'s website are provided on an "as is" basis. Fuke\'s Media makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.',
    },
    {
      icon: Scale,
      title: 'Limitations',
      content: 'In no event shall Fuke\'s Media or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website, even if notified of the possibility of such damage.',
    },
    {
      icon: Mail,
      title: 'Contact Information',
      content: 'If you have any questions about these Terms of Service, please contact us at legal@fukes-media.com. We are committed to addressing your concerns promptly.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Terms of Service - Fuke's Media"
        description="Read our terms of service to understand the rules and regulations for using Fuke's Media services."
        keywords="terms of service, user agreement, legal terms, service conditions"
        canonical="https://fukes-media.com/terms"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-secondary/10 border-secondary/20 text-secondary">
              <FileText className="w-4 h-4 mr-2" />
              Legal Agreement
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>Terms of</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Service</GradientText>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Terms and conditions for using our services
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper withDivider>
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <LiquidReveal key={section.title} delay={index * 0.1} direction="up">
              <Card className="border-border/50 hover:border-secondary/30 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-secondary/10 flex-shrink-0">
                      <section.icon className="w-6 h-6 text-secondary" />
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

export default Terms;
