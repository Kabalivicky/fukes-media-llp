
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
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
        {/* Hero Section with Brand Logo and Office Image */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-6"
            >
              <img 
                src="/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png"
                alt="Fuke's Media Brand Logo"
                className="w-64 h-auto object-contain"
              />
              <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png"
                  alt="Fuke's Media Modern Office"
                  className="w-full h-auto object-cover"
                  style={{ display: 'none' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

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
                  <h2 className="text-2xl font-bold mb-4 text-primary">Our Story: From Lazy Arts to Fuke's Media</h2>
                  <p className="mb-4">
                    <strong>2018 - The Beginning (Lazy Arts):</strong> Founded as Lazy Arts by a small team of passionate VFX artists and AI specialists, we started with a vision to bridge traditional visual effects with emerging AI technologies. Working from a modest studio in Bangalore, we focused on independent film projects and commercial work.
                  </p>
                  <p className="mb-4">
                    <strong>2019 - Growth & Recognition:</strong> Lazy Arts gained traction with several award-winning projects for regional cinema. Our innovative approach to combining traditional VFX techniques with machine learning tools caught the attention of larger production houses.
                  </p>
                  <p className="mb-4">
                    <strong>2020 - Transformation to Fuke's Media LLP:</strong> Recognizing the need for expansion and professional structure, we rebranded as Fuke's Media LLP. This transformation marked our commitment to becoming a leading VFX studio with a global presence. We expanded our team, invested in cutting-edge infrastructure, and formalized partnerships.
                  </p>
                  <p className="mb-4">
                    <strong>2021 - Major Projects & Expansion:</strong> Secured contracts for major Indian cinema projects including work on blockbusters like KGF Chapter 2, Leo, and Salaar. Opened satellite offices and established a distributed global network of artists.
                  </p>
                  <p className="mb-4">
                    <strong>2022-2023 - Industry Leadership:</strong> Worked on 500+ projects spanning feature films, web series, commercials, and digital content. Won multiple awards for technical and creative excellence. Developed proprietary AI tools for VFX production.
                  </p>
                  <p>
                    <strong>2024-Present:</strong> Operating as a full-service LLP with headquarters in Bangalore and partnerships worldwide. Serving clients from independent filmmakers to major studios, with a reputation for innovation, quality, and client satisfaction.
                  </p>
                </div>
                
                {/* Milestones & Achievements */}
                <div className="glass p-8 rounded-xl mt-8">
                  <h2 className="text-2xl font-bold mb-6 text-center text-secondary">Milestones & Achievements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-4xl font-display font-bold text-primary mb-2">500+</div>
                      <p className="text-sm font-semibold">Projects Completed</p>
                      <p className="text-xs text-muted-foreground mt-1">Since 2018</p>
                    </div>
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-4xl font-display font-bold text-secondary mb-2">50+</div>
                      <p className="text-sm font-semibold">Feature Films</p>
                      <p className="text-xs text-muted-foreground mt-1">Major Productions</p>
                    </div>
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-4xl font-display font-bold text-accent mb-2">15+</div>
                      <p className="text-sm font-semibold">Industry Awards</p>
                      <p className="text-xs text-muted-foreground mt-1">Excellence Recognition</p>
                    </div>
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-4xl font-display font-bold text-primary mb-2">98%</div>
                      <p className="text-sm font-semibold">Client Satisfaction</p>
                      <p className="text-xs text-muted-foreground mt-1">Repeat Business Rate</p>
                    </div>
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-4xl font-display font-bold text-secondary mb-2">100+</div>
                      <p className="text-sm font-semibold">Team Members</p>
                      <p className="text-xs text-muted-foreground mt-1">Global Network</p>
                    </div>
                    <div className="text-center p-4 bg-card/50 rounded-lg">
                      <div className="text-4xl font-display font-bold text-accent mb-2">24/7</div>
                      <p className="text-sm font-semibold">Production Capacity</p>
                      <p className="text-xs text-muted-foreground mt-1">Continuous Delivery</p>
                    </div>
                  </div>
                </div>
                
                {/* Recognition & Mentions */}
                <div className="glass p-8 rounded-xl mt-8">
                  <h2 className="text-2xl font-bold mb-6 text-center text-accent">Recognition & Industry Mentions</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-bold">Best VFX Studio - Regional Cinema 2023</h4>
                      <p className="text-sm text-muted-foreground">South Indian Cinema Awards</p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4">
                      <h4 className="font-bold">Innovation in AI-Driven VFX 2023</h4>
                      <p className="text-sm text-muted-foreground">FICCI Frames Technology Awards</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-bold">Featured in "Top 10 VFX Studios to Watch"</h4>
                      <p className="text-sm text-muted-foreground">VFX Voice Magazine, 2024</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-bold">Excellence in Technical Achievement</h4>
                      <p className="text-sm text-muted-foreground">Karnataka Film Chamber of Commerce, 2022</p>
                    </div>
                    <div className="border-l-4 border-secondary pl-4">
                      <h4 className="font-bold">Mentioned in "AI Revolution in Indian VFX"</h4>
                      <p className="text-sm text-muted-foreground">The Hindu Business Line, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
