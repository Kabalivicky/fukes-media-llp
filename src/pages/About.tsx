import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Target, Shield, Clock, ArrowRight, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const values = [
    { icon: Target, title: 'Pipeline Discipline', description: 'Department allocation, version control, asset flow clarity — not creative chaos.', gradient: 'from-brand-red to-brand-blue' },
    { icon: Shield, title: 'Cost Transparency', description: 'Per-shot costing. Transparent revision limits. No hidden billing. Ever.', gradient: 'from-brand-blue to-brand-green' },
    { icon: Clock, title: 'Predictable Delivery', description: 'Fixed review cycles. Milestone-based handoffs. Structured revisions.', gradient: 'from-brand-green to-brand-red' },
    { icon: Crosshair, title: 'Execution Focus', description: 'We don\'t chase trends. We build execution systems that deliver under pressure.', gradient: 'from-brand-red to-brand-green' },
  ];

  const milestones = [
    { year: '2020', event: 'Founded in Bengaluru', description: 'Started as a production-focused VFX unit' },
    { year: '2022', event: 'Pipeline Maturity', description: 'Structured shot-level costing & milestone delivery' },
    { year: '2023', event: '50+ Productions', description: 'Films, OTT, television, and advertising' },
    { year: '2024', event: 'AI Pipeline Integration', description: 'AI-assisted roto, previs, and QC workflows' },
    { year: '2025', event: 'LLP Registration', description: 'Fuke\'s Media LLP — structured for scale' },
  ];

  const stats = [
    { value: '500+', label: 'Shots Delivered' },
    { value: '50+', label: 'Productions' },
    { value: '5+', label: 'Years' },
    { value: '0', label: 'Hidden Costs' },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media LLP",
    "url": "https://fukesmedia.com",
    "description": "Production-ready VFX studio with disciplined pipeline execution and transparent costing",
    "foundingDate": "2020",
    "founder": [
      { "@type": "Person", "name": "Vikram A." },
      { "@type": "Person", "name": "Arjun" },
      { "@type": "Person", "name": "Harshith" },
      { "@type": "Person", "name": "Sai Prasad" },
      { "@type": "Person", "name": "Vignesh" },
    ]
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="About Fuke's Media LLP — Production-Discipline VFX Studio"
        description="Fuke's Media LLP is a Bengaluru-based VFX studio built on pipeline discipline, transparent costing, and structured delivery for films, OTT, and advertising."
        keywords="VFX studio Bengaluru, production VFX, transparent VFX costing, disciplined pipeline, post production India"
        canonical="https://fukesmedia.com/about"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-red/10 blur-[120px]" style={{ y: y1 }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-blue/10 blur-[120px]" style={{ y: y2 }} />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 px-5 py-2.5 bg-surface-elevated border-border/50 text-foreground rounded-full">
              <Zap className="w-4 h-4 mr-2 text-brand-red" />
              Production Discipline, Not Showreels
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            About{' '}
            <span className="gradient-text">Fuke's Media</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A Bengaluru-based VFX and post-production studio founded by five partners driven by production discipline, not showreels.
          </motion.p>
        </div>
      </section>

      {/* Origin */}
      <SectionWrapper variant="gradient" withDivider>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div className="space-y-6" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionHeading title="We Build Execution Systems" badge="Our Story" align="left" size="lg" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Started in 2020. Structured as an LLP in 2025. From day one, we focused on the parts of VFX that 
              producers actually care about — cost predictability, pipeline discipline, and on-time delivery.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We don't chase trends. We don't sell "creative storytelling." We build VFX execution systems 
              for Indian film producers, ad agencies, OTT platforms, television studios, and indie directors 
              who need certainty under pressure.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Rotoscopy & Paint', 'Matchmove', '3D Compositing', 'Matte Painting', 'Previs', 'AI Pipelines'].map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-surface-elevated rounded-full px-4 py-1.5 text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="relative overflow-hidden border-border/30 bg-surface-elevated/50 backdrop-blur-xl rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-brand-green/5" />
              <CardContent className="p-8 relative space-y-6">
                <h3 className="text-2xl font-display font-bold">What We're Not</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    'We\'re not a "creative storytelling studio"',
                    'We don\'t quote randomly',
                    'We don\'t hide costs in revision loops',
                    'We don\'t promise cheap and deliver chaos',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-border/30">
                  <p className="text-sm text-muted-foreground italic">
                    "If a producer wants cheap and chaotic, we're not the right studio."
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper variant="dark">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
            >
              <div className="font-display text-5xl md:text-6xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper withDivider>
        <SectionHeading title="Our Operating Principles" subtitle="What drives every shot we deliver" badge="Discipline" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl hover:shadow-brand-red/5 transition-all duration-500 hover:-translate-y-2 border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-3xl h-full">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Journey Timeline */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading title="Our Journey" subtitle="From a small studio to a structured production unit" badge="Timeline" />
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-red via-brand-blue to-brand-green" />
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-20 md:pl-0`}>
                <Card className="inline-block hover:shadow-lg transition-shadow border-border/30 bg-surface-elevated/50 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="font-display text-3xl font-bold gradient-text mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-1">{milestone.event}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-brand-blue rounded-full -translate-x-1/2 ring-4 ring-background z-10" />
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="dark">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready for <span className="gradient-text">Predictable VFX</span>?
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Get a shot-level breakdown with transparent costing. No vague assumptions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-brand-red to-brand-blue hover:opacity-90 text-white text-lg px-8 shadow-lg">
              <Link to="/contact">
                Request Project Breakdown
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-border/50">
              <Link to="/pricing">Shot-Level Estimate</Link>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;
