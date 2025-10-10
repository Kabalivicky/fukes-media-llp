
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Download, FileText, Video, Book, ExternalLink, FileBadge, GraduationCap, Newspaper } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';

const Resources = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        duration: 0.6 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Resource categories
  const resources = {
    templates: [
      {
        title: "VFX Project Quote Template",
        description: "Comprehensive template for creating detailed VFX project quotes with cost breakdowns.",
        type: "Excel/PDF",
        icon: <FileText className="h-10 w-10 text-primary" />
      },
      {
        title: "VFX Shot Tracking Sheet",
        description: "Track progress, notes, and approvals for individual VFX shots throughout production.",
        type: "Excel",
        icon: <FileBadge className="h-10 w-10 text-primary" />
      },
      {
        title: "Post-Production Schedule Template",
        description: "Template for planning all phases of post-production with dependencies and milestones.",
        type: "Excel/PDF",
        icon: <FileText className="h-10 w-10 text-primary" />
      },
      {
        title: "VFX Contract Template",
        description: "Legal contract template for VFX services with customizable terms and conditions.",
        type: "Word/PDF",
        icon: <FileText className="h-10 w-10 text-primary" />
      }
    ],
    tutorials: [
      {
        title: "Introduction to Rotoscoping",
        description: "Learn the fundamentals of rotoscoping techniques used in professional VFX workflows.",
        duration: "45 minutes",
        icon: <Video className="h-10 w-10 text-secondary" />
      },
      {
        title: "Advanced Compositing Techniques",
        description: "Master advanced compositing workflows for seamless integration of VFX elements.",
        duration: "1 hour 20 minutes",
        icon: <Video className="h-10 w-10 text-secondary" />
      },
      {
        title: "Digital Matte Painting Essentials",
        description: "Create stunning digital environments using industry-standard techniques.",
        duration: "55 minutes",
        icon: <Video className="h-10 w-10 text-secondary" />
      },
      {
        title: "AI Tools in VFX Production",
        description: "Explore how AI tools are transforming modern VFX production pipelines.",
        duration: "1 hour",
        icon: <Video className="h-10 w-10 text-secondary" />
      }
    ],
    guides: [
      {
        title: "VFX Production Pipeline Guide",
        description: "Comprehensive overview of modern VFX production pipelines from pre to post-production.",
        pages: 45,
        icon: <Book className="h-10 w-10 text-accent" />
      },
      {
        title: "VFX Budget Planning Guide",
        description: "Learn how to accurately estimate and manage VFX budgets for projects of any size.",
        pages: 32,
        icon: <Book className="h-10 w-10 text-accent" />
      },
      {
        title: "Quality Control in VFX",
        description: "Best practices for maintaining quality standards throughout the VFX production process.",
        pages: 28,
        icon: <Book className="h-10 w-10 text-accent" />
      },
      {
        title: "Client Communication Guide for VFX Artists",
        description: "Effective strategies for communicating with clients about VFX work.",
        pages: 24,
        icon: <Book className="h-10 w-10 text-accent" />
      }
    ],
    articles: [
      {
        title: "The Future of AI in VFX Production",
        description: "Exploring how artificial intelligence is transforming visual effects workflows.",
        date: "May 15, 2023",
        icon: <Newspaper className="h-10 w-10 text-primary" />
      },
      {
        title: "Virtual Production Techniques for Independent Filmmakers",
        description: "Cost-effective virtual production approaches for smaller budget productions.",
        date: "August 3, 2023",
        icon: <Newspaper className="h-10 w-10 text-primary" />
      },
      {
        title: "Navigating VFX Pricing Models",
        description: "Understanding fixed price vs. time and materials pricing for VFX projects.",
        date: "October 12, 2023",
        icon: <Newspaper className="h-10 w-10 text-primary" />
      },
      {
        title: "Collaborative VFX Workflows for Remote Teams",
        description: "Best practices for distributed VFX production in the post-pandemic era.",
        date: "January 7, 2024",
        icon: <Newspaper className="h-10 w-10 text-primary" />
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Resources | Fuke's Media - AI-Driven VFX & Creative Studio</title>
        <meta name="description" content="Access free templates, tutorials, guides, and articles to elevate your VFX and creative production workflows." />
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
                title="Resources" 
                subtitle="Free templates, tutorials, guides, and articles to elevate your VFX production"
              />
              
              <div className="mt-12">
                <Tabs defaultValue="templates" className="w-full">
                  <div className="flex justify-center mb-8">
                    <TabsList className="grid grid-cols-4 max-w-xl">
                      <TabsTrigger value="templates">Templates</TabsTrigger>
                      <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                      <TabsTrigger value="guides">Guides</TabsTrigger>
                      <TabsTrigger value="articles">Articles</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="templates">
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {resources.templates.map((resource, index) => (
                        <motion.div key={index} variants={itemVariants}>
                          <Card className="h-full flex flex-col hover:border-primary/40 transition-colors">
                            <CardHeader>
                              <div className="flex justify-center mb-4">
                                {resource.icon}
                              </div>
                              <CardTitle className="text-center">{resource.title}</CardTitle>
                              <CardDescription className="text-center text-xs">{resource.type}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                              <p className="text-sm text-center">{resource.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="w-full gap-2">
                                <Download className="h-4 w-4" />
                                Download Template
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="tutorials">
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {resources.tutorials.map((resource, index) => (
                        <motion.div key={index} variants={itemVariants}>
                          <Card className="h-full flex flex-col hover:border-secondary/40 transition-colors">
                            <CardHeader>
                              <div className="flex justify-center mb-4">
                                {resource.icon}
                              </div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription className="text-xs">Duration: {resource.duration}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                              <p className="text-sm">{resource.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full gap-2 bg-secondary hover:bg-secondary/80">
                                <GraduationCap className="h-4 w-4" />
                                Watch Tutorial
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="guides">
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {resources.guides.map((resource, index) => (
                        <motion.div key={index} variants={itemVariants}>
                          <Card className="h-full flex flex-col hover:border-accent/40 transition-colors">
                            <CardHeader>
                              <div className="flex justify-center mb-4">
                                {resource.icon}
                              </div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription className="text-xs">{resource.pages} pages</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                              <p className="text-sm">{resource.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="w-full gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                                <Download className="h-4 w-4" />
                                Download Guide
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="articles">
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {resources.articles.map((resource, index) => (
                        <motion.div key={index} variants={itemVariants}>
                          <Card className="h-full flex flex-col hover:border-primary/40 transition-colors">
                            <CardHeader>
                              <div className="flex justify-center mb-4">
                                {resource.icon}
                              </div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription className="text-xs">Published: {resource.date}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                              <p className="text-sm">{resource.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button className="w-full gap-2 gradient-button">
                                <ExternalLink className="h-4 w-4" />
                                Read Article
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="mt-20 text-center">
                <SectionTitle 
                  title="Partner Resources" 
                  subtitle="Access specialized tools and resources from our industry partners"
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                  {[1, 2, 3, 4].map((partner) => (
                    <motion.div
                      key={partner}
                      className="glass p-8 rounded-xl flex items-center justify-center hover:border-primary/40 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: partner * 0.1, duration: 0.5 }}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-muted/30 rounded-full flex items-center justify-center mb-4">
                          <img 
                            src={`/placeholder.svg`} 
                            alt={`Partner ${partner}`} 
                            className="w-12 h-12 opacity-70"
                          />
                        </div>
                        <p className="text-sm font-medium">Partner {partner}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <Button asChild>
                    <Link to="/help-center">
                      Visit Help Center for More Resources
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Resources;
