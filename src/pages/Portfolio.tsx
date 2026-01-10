import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Play, Award, Sparkles, ArrowRight, Plus, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/useAdmin';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeading from '@/components/SectionHeading';
import LiquidReveal from '@/components/LiquidReveal';
import { AnimatedLetters, GradientText, AnimatedWords } from '@/components/KineticText';
import SEOHelmet from '@/components/SEOHelmet';
import { Link } from 'react-router-dom';
import showreelThumbnail from '@/assets/projects/kalki-2898-ad-new.png';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';
import { ProjectCard } from '@/components/Portfolio/ProjectCard';
import { ProjectFormDialog } from '@/components/Portfolio/ProjectFormDialog';
import { DeleteConfirmDialog } from '@/components/Portfolio/DeleteConfirmDialog';

const SHOWREEL_EMBED_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/preview";
const SHOWREEL_VIEW_URL = "https://drive.google.com/file/d/1DPiU-XsPOEOgCOOgQh0n2P-rIH_Idfyk/view";

interface Project {
  id: string;
  title: string;
  description: string | null;
  client: string | null;
  category: string | null;
  year: number | null;
  image_url: string | null;
  video_url: string | null;
  imdb_url: string | null;
  featured: boolean | null;
  status: string | null;
  technologies: string[] | null;
  services: string[] | null;
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  
  const { isAdmin } = useAdmin();
  const queryClient = useQueryClient();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch projects from database
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('year', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    },
  });

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (project: Partial<Project>) => {
      if (editingProject?.id) {
        const { error } = await supabase
          .from('projects')
          .update(project)
          .eq('id', editingProject.id);
        if (error) throw error;
      } else {
        if (!project.title) throw new Error('Title is required');
        const { error } = await supabase
          .from('projects')
          .insert([{ ...project, title: project.title }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-projects'] });
      setFormDialogOpen(false);
      setEditingProject(null);
      toast({
        title: editingProject ? 'Project updated' : 'Project added',
        description: 'Your changes have been saved successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error saving project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-projects'] });
      setDeleteDialogOpen(false);
      setDeletingProject(null);
      toast({
        title: 'Project deleted',
        description: 'The project has been removed successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleAddProject = useCallback(() => {
    setEditingProject(null);
    setFormDialogOpen(true);
  }, []);

  const handleEditProject = useCallback((project: Project) => {
    setEditingProject(project);
    setFormDialogOpen(true);
  }, []);

  const handleDeleteProject = useCallback((project: Project) => {
    setDeletingProject(project);
    setDeleteDialogOpen(true);
  }, []);

  const handleSaveProject = async (projectData: Partial<Project>) => {
    await saveMutation.mutateAsync(projectData);
  };

  const handleConfirmDelete = async () => {
    if (deletingProject?.id) {
      await deleteMutation.mutateAsync(deletingProject.id);
    }
  };

  // Get unique categories from projects
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(item => item.category === selectedCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Fuke's Media Portfolio & Showreel",
    "description": "Award-winning VFX portfolio showcasing AI-driven visual effects and creative excellence",
    "creator": {
      "@type": "Organization",
      "name": "Fuke's Media LLP"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEOHelmet
        title="Portfolio & Showreel - Award-Winning VFX Projects"
        description="Explore our award-winning portfolio of VFX, AI-assisted production, and creative projects. See why we're recognized as industry leaders in visual effects."
        keywords="VFX portfolio, showreel, award-winning projects, visual effects gallery, AI-driven VFX"
        canonical="https://fukes-media.com/portfolio"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <ParallaxSection 
        className="relative pt-32 pb-16"
        speed={0.25}
        fade
      >
        <FloatingElements variant="particles" count={6} />
        
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Award-Winning Work
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            <AnimatedLetters className="block" delay={0.2}>Our</AnimatedLetters>
            <span className="block mt-2">
              <GradientText>Portfolio</GradientText>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <AnimatedWords
              className="text-xl text-muted-foreground"
              delay={1}
            >
              Detailed breakdown of our technical expertise and production capabilities
            </AnimatedWords>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Showreel Section */}
      <SectionWrapper variant="dark">
        <LiquidReveal direction="up">
          <div 
            className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden bg-card border-2 border-primary/20 cursor-pointer group shadow-2xl"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail Image */}
            <img 
              src={showreelThumbnail} 
              alt="Showreel Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <motion.div
                className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-8"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-12 w-12 ml-1" />
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
                Fuke's Media - Official Showreel 2024
              </h3>
              <p className="text-white/90 drop-shadow-md">Click to watch our showreel</p>
            </div>
            {/* Award Badge */}
            <div className="absolute top-6 right-6">
              <Badge className="bg-accent text-accent-foreground shadow-lg">
                <Award className="w-4 h-4 mr-1" />
                Award Winning
              </Badge>
            </div>
          </div>
        </LiquidReveal>

        {/* Video Modal */}
        <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-none">
            <DialogTitle className="sr-only">Fuke's Media Official Showreel 2024</DialogTitle>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={SHOWREEL_EMBED_URL}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Fuke's Media Official Showreel 2024"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <a 
                  href={SHOWREEL_VIEW_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white text-sm underline"
                >
                  Video not loading? Click here to watch on Google Drive
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SectionWrapper>

      {/* Portfolio Grid */}
      <SectionWrapper withDivider>
        {/* Admin Add Button */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end mb-6"
          >
            <Button onClick={handleAddProject} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </motion.div>
        )}

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full max-w-4xl">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-card/50 border border-border/30 h-auto p-2">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all duration-300"
                >
                  {category === 'all' ? 'All Projects' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No projects found.</p>
            {isAdmin && (
              <Button onClick={handleAddProject} variant="outline">
                Add your first project
              </Button>
            )}
          </div>
        )}

        {/* Grid */}
        {!isLoading && filteredProjects.length > 0 && (
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isAdmin={isAdmin}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </SectionWrapper>

      {/* CTA Section */}
      <ParallaxSection speed={0.2} className="py-0">
        <SectionWrapper variant="gradient" withDivider>
        <div className="max-w-3xl mx-auto text-center">
          <LiquidReveal direction="up">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Create <GradientText>Award-Winning Content</GradientText>?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Let's collaborate to bring your vision to life with our award-winning team and cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                <Link to="/contact">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </LiquidReveal>
        </div>
      </SectionWrapper>
      </ParallaxSection>

      {/* Admin Dialogs */}
      <ProjectFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        project={editingProject}
        onSave={handleSaveProject}
        isLoading={saveMutation.isPending}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        projectTitle={deletingProject?.title || ''}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default Portfolio;
