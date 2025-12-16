import { useState } from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import Billboard from '@/components/Netflix/Billboard';
import ContentRow from '@/components/Netflix/ContentRow';
import ProjectModal from '@/components/Netflix/ProjectModal';
import { Project, projects } from '@/components/ProjectsData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Categorize projects for Netflix-style rows
  const trendingProjects = projects.filter(p => p.rating >= 8.5);
  const actionProjects = projects.filter(p => p.genre.toLowerCase().includes('action'));
  const thrillerProjects = projects.filter(p => p.genre.toLowerCase().includes('thriller'));
  const dramaProjects = projects.filter(p => p.genre.toLowerCase().includes('drama'));
  const recentProjects = projects.filter(p => p.year === '2024' || p.year === '2023');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Fuke's Media Portfolio",
    "description": "Professional VFX portfolio showcasing visual effects projects for film and television",
    "creator": {
      "@type": "Organization",
      "name": "Fuke's Media LLP"
    }
  };

  return (
    <>
      <SEOHelmet 
        title="Portfolio - VFX Projects | Fuke's Media"
        description="Explore our portfolio of professional VFX, CGI, color grading, and creative services projects for film and television."
        keywords="VFX portfolio, visual effects projects, CGI showreel, film VFX, Fuke's Media portfolio"
        canonical="https://fukes-media.com/portfolio"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="netflix-browse pt-16">
          {/* Hero Billboard */}
          <Billboard onMoreInfo={setSelectedProject} />

          {/* Content Rows */}
          <div className="netflix-content pb-20">
            <ContentRow 
              title="Trending Now" 
              projects={trendingProjects}
              onProjectSelect={setSelectedProject}
            />
            
            <ContentRow 
              title="Action & Thrillers" 
              projects={actionProjects}
              onProjectSelect={setSelectedProject}
            />
            
            <ContentRow 
              title="Recently Added" 
              projects={recentProjects}
              onProjectSelect={setSelectedProject}
            />
            
            <ContentRow 
              title="Drama Collection" 
              projects={dramaProjects}
              onProjectSelect={setSelectedProject}
            />
            
            <ContentRow 
              title="All Projects" 
              projects={projects}
              onProjectSelect={setSelectedProject}
            />
          </div>

          {/* Project Modal */}
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Portfolio;