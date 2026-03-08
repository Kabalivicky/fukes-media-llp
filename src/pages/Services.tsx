import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Scissors, Camera, Layers, Mountain, Eye, Cpu, FileText, Shield, Clock, Crosshair, Palette, Film, Tv, Wand2, MonitorPlay, Sparkles, Video, Music, Mic, PenTool, Clapperboard, SunMedium, Zap, Globe, Cloud, Server, Box, Megaphone, Share2, Instagram, Smartphone, Target, Bookmark, LayoutGrid, Type, Crown, Brush, Aperture, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '@/components/SEOHelmet';

const Services = () => {
  const serviceCategories = [
    {
      category: "CGI & VFX",
      description: "Full-spectrum visual effects production across every discipline",
      services: [
        { id: "roto", title: "Rotoscopy & Paint", description: "Precise isolation. Edge integrity. Hair-level detail.", icon: Scissors, features: ["Frame-accurate isolation", "Edge refinement & cleanup", "Hair & fine detail work", "Paint & wire removal", "Roto-prep for compositing", "Batch pipeline delivery"], gradient: "from-brand-red to-brand-blue" },
        { id: "matchmove", title: "Matchmove & Body Tracking", description: "Camera reconstruction, 3D tracking, CG integration.", icon: Camera, features: ["Camera solve & reconstruction", "3D object tracking", "Body & face tracking", "Survey data integration", "Lens distortion solve", "CG element alignment"], gradient: "from-brand-blue to-brand-green" },
        { id: "compositing", title: "3D Compositing", description: "Physically accurate integration. Light matching. Depth realism.", icon: Layers, features: ["Multi-pass rendering integration", "Light & shadow matching", "Depth & atmospheric effects", "Color consistency", "CG-live action blending", "Final pixel delivery"], gradient: "from-brand-green to-brand-red" },
        { id: "matte", title: "Matte Painting", description: "Production-scale environments, not static wallpapers.", icon: Mountain, features: ["Full CG environments", "Set extensions", "2.5D camera projections", "Sky replacements", "Period & world building", "Camera-ready asset delivery"], gradient: "from-brand-red to-brand-green" },
        { id: "previs", title: "Previsualization", description: "Shot planning to reduce on-set confusion and post chaos.", icon: Eye, features: ["Shot planning & design", "Camera blocking", "Action choreography viz", "VFX shot breakdown", "Director communication tool", "Budget forecasting aid"], gradient: "from-brand-blue to-brand-red" },
        { id: "greenscreen", title: "Green Screen & Keying", description: "Clean extraction, spill suppression, seamless composites.", icon: MonitorPlay, features: ["Chroma keying", "Spill suppression", "Edge blending", "Virtual backgrounds", "Live-action integration", "Multi-layer composites"], gradient: "from-brand-green to-brand-blue" },
        { id: "fx", title: "FX & Simulations", description: "Particle systems, fluid dynamics, destruction, and environmental FX.", icon: Sparkles, features: ["Particle effects", "Fluid simulations", "Destruction & debris", "Fire, smoke & explosions", "Cloth & hair dynamics", "Environmental FX"], gradient: "from-brand-red to-brand-blue" },
        { id: "3d-modeling", title: "3D Modeling & Texturing", description: "High-fidelity asset creation for film and commercial work.", icon: Box, features: ["Character modeling", "Hard-surface modeling", "UV unwrapping", "PBR texturing", "Look development", "Asset optimization"], gradient: "from-brand-blue to-brand-green" },
      ],
    },
    {
      category: "Creative Services",
      description: "End-to-end creative direction from concept to final delivery",
      services: [
        { id: "concept-art", title: "Concept Art & Design", description: "Visual development that sets the creative foundation.", icon: PenTool, features: ["Character design", "Environment concepts", "Prop & vehicle design", "Mood boards", "Style frames", "Visual development"], gradient: "from-brand-red to-brand-green" },
        { id: "storyboarding", title: "Storyboarding", description: "Frame-by-frame narrative planning for directors and producers.", icon: Clapperboard, features: ["Shot-by-shot breakdown", "Action sequences", "Animatics", "Camera angle planning", "Narrative flow design", "Revision rounds"], gradient: "from-brand-blue to-brand-red" },
        { id: "motion-graphics", title: "Motion Graphics & Titles", description: "Broadcast-quality motion design, title sequences, and lower thirds.", icon: Wand2, features: ["Title sequences", "Lower thirds & supers", "Logo animations", "Infographic animations", "Broadcast packages", "Social media motion"], gradient: "from-brand-green to-brand-blue" },
        { id: "art-direction", title: "Art Direction", description: "Expert creative guidance to unify your project's visual language.", icon: Palette, features: ["Visual style guides", "Color palette direction", "Typography systems", "Brand alignment", "Cross-department coherence", "Creative supervision"], gradient: "from-brand-red to-brand-blue" },
      ],
    },
    {
      category: "Editing & Post-Production",
      description: "From raw footage to polished final cut — every frame counts",
      services: [
        { id: "film-editing", title: "Film & TV Editing", description: "Narrative editing, pacing, and story structure for long-form content.", icon: Film, features: ["Narrative editing", "Assembly to fine cut", "Multi-cam editing", "Dialogue editing", "Scene pacing", "Director's cut assembly"], gradient: "from-brand-blue to-brand-green" },
        { id: "reel-editing", title: "Showreel & Promo Editing", description: "High-impact reels, trailers, teasers, and promotional edits.", icon: Video, features: ["Showreel compilation", "Trailer editing", "Teaser cuts", "Social media edits", "Behind-the-scenes", "Highlight reels"], gradient: "from-brand-red to-brand-blue" },
        { id: "sound-design", title: "Sound Design & Mixing", description: "Audio post-production, SFX design, and final mix.", icon: Music, features: ["Sound effects design", "Foley integration", "Dialogue cleanup", "Ambient soundscapes", "Stereo & surround mixing", "Audio mastering"], gradient: "from-brand-green to-brand-red" },
        { id: "voiceover", title: "Voiceover & Dubbing", description: "Professional VO recording, dubbing, and lip-sync services.", icon: Mic, features: ["Voice talent sourcing", "Studio recording", "Multi-language dubbing", "Lip-sync matching", "ADR sessions", "Audio direction"], gradient: "from-brand-blue to-brand-red" },
      ],
    },
    {
      category: "Digital Intermediate (DI)",
      description: "Color science, mastering, and deliverable compliance",
      services: [
        { id: "color-grading", title: "Color Grading", description: "Scene-to-scene color consistency, mood, and cinematic look.", icon: SunMedium, features: ["Primary correction", "Secondary grading", "Scene matching", "Look creation (LUTs)", "Skin tone management", "HDR grading"], gradient: "from-brand-red to-brand-green" },
        { id: "conforming", title: "Conforming & Online", description: "Timeline conforming, online finishing, and QC.", icon: Tv, features: ["EDL/XML conforming", "Online editing", "Title safe & framing", "QC & compliance", "Versioning", "Format conversion"], gradient: "from-brand-blue to-brand-red" },
        { id: "mastering", title: "Mastering & Deliverables", description: "DCPs, IMFs, broadcast masters, and streaming specs.", icon: Shield, features: ["DCP creation", "IMF packaging", "Broadcast masters", "Streaming deliverables", "HDR/SDR versions", "Archival masters"], gradient: "from-brand-green to-brand-blue" },
      ],
    },
    {
      category: "Tech Innovation",
      description: "Next-generation production technology and pipeline solutions",
      services: [
        { id: "ai", title: "AI-Enhanced Workflow", description: "Controlled AI usage integrated into production pipelines.", icon: Cpu, features: ["AI-assisted rotoscopy", "Automated QC checks", "Smart batch processing", "Pipeline automation", "Version control systems", "Asset tracking integration"], gradient: "from-brand-green to-brand-blue" },
        { id: "virtual-production", title: "Virtual Production", description: "LED walls, real-time rendering, and in-camera VFX.", icon: Globe, features: ["LED volume setup", "Real-time rendering", "In-camera VFX", "Unreal Engine integration", "Virtual scouting", "Techvis & stage planning"], gradient: "from-brand-red to-brand-blue" },
        { id: "cloud-pipeline", title: "Cloud Pipeline & Infra", description: "Scalable cloud rendering, storage, and remote collaboration.", icon: Cloud, features: ["Cloud rendering farms", "Remote artist setup", "Secure file transfer", "Collaborative review tools", "Scalable infrastructure", "Pipeline consulting"], gradient: "from-brand-blue to-brand-green" },
        { id: "pipeline-dev", title: "Pipeline Development", description: "Custom tools, automation scripts, and studio pipeline design.", icon: Server, features: ["Custom tool development", "Shotgrid integration", "Automation scripts", "Render management", "Asset management", "Studio pipeline design"], gradient: "from-brand-green to-brand-red" },
      ],
    },
    {
      category: "Branding & Identity",
      description: "Build a visual identity that commands recognition and trust",
      services: [
        { id: "brand-strategy", title: "Brand Strategy & Identity", description: "Core brand positioning, voice, and visual identity systems.", icon: Crown, features: ["Brand positioning", "Mission & vision crafting", "Brand voice guidelines", "Visual identity system", "Brand book creation", "Competitive analysis"], gradient: "from-brand-red to-brand-blue" },
        { id: "logo-design", title: "Logo & Mark Design", description: "Distinctive logos, wordmarks, and brand marks that stand out.", icon: Brush, features: ["Logo design & variations", "Wordmark & monogram", "Icon & symbol design", "Color palette definition", "Typography selection", "Usage guidelines"], gradient: "from-brand-blue to-brand-green" },
        { id: "brand-collateral", title: "Brand Collateral", description: "Business cards, letterheads, presentations, and brand materials.", icon: LayoutGrid, features: ["Business card design", "Letterhead & stationery", "Presentation templates", "Brand merchandise", "Packaging design", "Print-ready assets"], gradient: "from-brand-green to-brand-red" },
        { id: "brand-guidelines", title: "Brand Guidelines & Toolkit", description: "Comprehensive style guides for consistent brand application.", icon: Type, features: ["Style guide document", "Color & typography specs", "Do's and don'ts", "Asset library", "Template systems", "Multi-platform adaptation"], gradient: "from-brand-red to-brand-green" },
      ],
    },
    {
      category: "Promotions & Advertising",
      description: "High-impact promotional content that drives engagement and conversions",
      services: [
        { id: "ad-films", title: "Ad Films & Commercials", description: "Concept-to-delivery ad production for TV, digital, and cinema.", icon: Megaphone, features: ["TV commercials", "Digital ad films", "Product demos", "Explainer videos", "Testimonial videos", "Cinema ads"], gradient: "from-brand-blue to-brand-red" },
        { id: "campaign-creative", title: "Campaign Creatives", description: "Visual assets for ad campaigns across all platforms.", icon: Target, features: ["Banner ad design", "Display creatives", "Email templates", "Landing page design", "Print ads", "OOH & billboard design"], gradient: "from-brand-green to-brand-blue" },
        { id: "event-promo", title: "Event & Launch Promos", description: "Teasers, countdowns, launch videos, and event coverage.", icon: Radio, features: ["Launch teaser videos", "Countdown animations", "Event highlight reels", "Invitation videos", "Live event graphics", "Post-event recaps"], gradient: "from-brand-red to-brand-green" },
        { id: "brand-films", title: "Brand Films & Documentaries", description: "Long-form storytelling that builds brand equity and trust.", icon: Aperture, features: ["Brand story films", "Corporate documentaries", "Founder stories", "Behind-the-scenes", "Culture films", "CSR & impact videos"], gradient: "from-brand-blue to-brand-green" },
      ],
    },
    {
      category: "Digital & Social Media",
      description: "Content creation and strategy for every digital platform",
      services: [
        { id: "social-content", title: "Social Media Content", description: "Scroll-stopping content for Instagram, YouTube, LinkedIn, and more.", icon: Instagram, features: ["Instagram Reels & Stories", "YouTube Shorts", "LinkedIn video content", "Twitter/X visual posts", "TikTok content", "Platform-specific formats"], gradient: "from-brand-red to-brand-blue" },
        { id: "social-strategy", title: "Content Strategy & Calendar", description: "Data-driven content planning, scheduling, and performance tracking.", icon: Share2, features: ["Content calendar planning", "Platform strategy", "Hashtag research", "Posting schedules", "Engagement tactics", "Analytics & reporting"], gradient: "from-brand-blue to-brand-green" },
        { id: "reel-production", title: "Reel & Short-Form Production", description: "High-quality short-form video production optimized for virality.", icon: Smartphone, features: ["Trending reel formats", "Product showcases", "Tutorial & how-to reels", "Transition edits", "Music-synced edits", "Batch reel production"], gradient: "from-brand-green to-brand-red" },
        { id: "thumbnail-design", title: "Thumbnails & Graphics", description: "Click-worthy thumbnails, carousels, and social media graphics.", icon: Bookmark, features: ["YouTube thumbnails", "Carousel posts", "Infographics", "Quote cards", "Story templates", "Highlight covers"], gradient: "from-brand-red to-brand-green" },
      ],
    },
  ];

  const processSteps = [
    { step: "01", title: "Script & Shot Breakdown", description: "We break cost per shot, not per vague assumption. Every frame is accounted for.", icon: FileText },
    { step: "02", title: "Pipeline Mapping", description: "Department allocation, version control, asset flow clarity. No guesswork.", icon: Crosshair },
    { step: "03", title: "Milestone Delivery", description: "Fixed review cycles. Structured revisions. Predictable handoffs.", icon: Clock },
    { step: "04", title: "Final Integration", description: "Color pipeline integrity, render verification, delivery compliance.", icon: Shield },
  ];

  const structuredData = {
    "@context": "https://schema.org", "@type": "Service", "serviceType": "VFX & Post-Production Services",
    "provider": { "@type": "Organization", "name": "Fuke's Media LLP", "url": "https://fukesmedia.com" },
    "areaServed": "India",
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet title="VFX & Post-Production Services | Fuke's Media LLP" description="Rotoscopy, matchmove, compositing, matte painting, editing, color grading, sound design, AI workflows, virtual production & more. Full-service VFX studio." keywords="VFX services India, rotoscopy, matchmove, compositing, matte painting, editing, color grading, sound design, AI VFX, virtual production" structuredData={structuredData} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 px-5 py-2.5 bg-muted border-border/50 text-foreground rounded-full">
              <Crosshair className="w-4 h-4 mr-2 text-primary" />Full-Service Studio
            </Badge>
          </motion.div>
          <motion.h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.1]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Every <span className="gradient-text">Department</span> You Need
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            From VFX and editing to color grading, sound design, and virtual production — structured pipeline execution across every discipline.
          </motion.p>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((cat, catIndex) => (
        <SectionWrapper key={cat.category} variant={catIndex % 2 === 0 ? 'default' : 'gradient'} withDivider>
          <SectionHeading
            title={cat.category}
            subtitle={cat.description}
            badge={`${cat.services.length} Services`}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cat.services.map((service, index) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                <Card className="group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 border-border/30 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className={`h-1 w-full bg-gradient-to-r ${service.gradient}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-display">{service.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm">{service.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <div className="space-y-1.5">
                      {service.features.map((feature, i) => (
                        <motion.div key={i} className="flex items-start" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                          <Check className="h-3.5 w-3.5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 group/btn text-sm">
                      <Link to="/pricing">Get Estimate <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      ))}

      {/* Process */}
      <SectionWrapper variant="gradient" withDivider>
        <SectionHeading title="Our Process" subtitle="This is how we eliminate production chaos" badge="Your Differentiator" />
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 bottom-0 left-8 md:left-[calc(4rem-1px)] w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
          {processSteps.map((phase, index) => (
            <motion.div key={phase.step} className="flex mb-12 last:mb-0" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
              <div className="mr-8 relative">
                <motion.div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg relative z-10" whileHover={{ scale: 1.1 }}>
                  {phase.step}
                </motion.div>
              </div>
              <Card className="flex-1 border-border/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 flex items-center">
                    <phase.icon className="w-5 h-5 mr-2 text-primary" />{phase.title}
                  </h3>
                  <p className="text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="dark">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="font-display text-4xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Ready for a <span className="gradient-text">Real Breakdown</span>?
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Get per-shot costing, pipeline mapping, and a production timeline — not a vague PDF.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-lg px-8 border-0 shadow-lg">
              <Link to="/contact">Request Project Breakdown <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-border/50">
              <Link to="/pricing">Shot-Level Calculator</Link>
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Services;
