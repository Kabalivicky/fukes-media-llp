import { useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jobOpenings = [
    {
      title: "Senior VFX Artist",
      department: "Visual Effects",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead complex VFX sequences using cutting-edge AI-assisted tools and workflows."
    },
    {
      title: "3D Generalist",
      department: "3D Department",
      location: "Remote",
      type: "Contract",
      experience: "3+ years",
      description: "Create stunning 3D assets and animations for feature films and commercials."
    },
    {
      title: "AI/ML Engineer",
      department: "Technology",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4+ years",
      description: "Develop AI solutions for automated VFX workflows and real-time rendering."
    },
    {
      title: "Compositing Artist",
      department: "Post-Production",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "2+ years",
      description: "Master the art of seamless compositing for high-end feature films."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Careers - Join Fuke's Media Team"
        description="Join our innovative team of VFX artists, engineers, and creative professionals. Explore career opportunities at Fuke's Media."
        keywords="VFX careers, visual effects jobs, 3D artist jobs, AI engineer positions, remote work"
        canonical="https://fukes-media.com/careers"
      />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionTitle 
            title="Join Our Team" 
            subtitle="Build the future of visual effects with us"
          />
          
          <div className="max-w-6xl mx-auto mt-12">
            {/* Company Culture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <h3 className="text-2xl font-bold mb-4">Why Work With Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Collaborative Culture</h4>
                    <p className="text-muted-foreground">Work with talented artists and engineers from around the world</p>
                  </div>
                  <div className="text-center">
                    <Briefcase className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Cutting-Edge Projects</h4>
                    <p className="text-muted-foreground">Work on blockbuster films and innovative VFX projects</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Global Opportunities</h4>
                    <p className="text-muted-foreground">Remote work options and international collaboration</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Job Openings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                          <p className="text-muted-foreground">{job.department}</p>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.experience}
                        </div>
                      </div>
                      
                      <Button className="w-full">Apply Now</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <h3 className="text-2xl font-bold mb-4">Don't See Your Role?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always looking for talented individuals to join our team. Send us your portfolio 
                  and tell us how you can contribute to our mission.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Send Your Portfolio
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
