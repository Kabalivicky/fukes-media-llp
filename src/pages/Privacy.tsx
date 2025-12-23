import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This includes name, email address, phone number, and project details.',
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and send you updates about our services.',
    },
    {
      icon: Shield,
      title: 'Information Sharing',
      content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.',
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.',
    },
    {
      icon: Mail,
      title: 'Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us at privacy@fukes-media.com. We aim to respond to all inquiries within 48 hours.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Privacy Policy - Fuke's Media"
        description="Learn about how Fuke's Media collects, uses, and protects your personal information in our comprehensive privacy policy."
        keywords="privacy policy, data protection, GDPR compliance, user privacy"
        canonical="https://fukes-media.com/privacy"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Shield className="w-4 h-4 mr-2" />
              Your Privacy Matters
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <AnimatedLetters text="Privacy" className="block" delay={0.2} />
            <span className="block mt-2">
              <GradientText>Policy</GradientText>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            How we collect, use, and protect your information
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper withDivider>
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <LiquidReveal key={section.title} delay={index * 0.1} direction="up">
              <Card className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
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

export default Privacy;
