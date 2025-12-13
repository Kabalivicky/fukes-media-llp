import { useState } from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import Billboard from '@/components/Netflix/Billboard';
import ContentRow from '@/components/Netflix/ContentRow';
import ProjectModal from '@/components/Netflix/ProjectModal';
import { Project, projects } from '@/components/ProjectsData';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Categorize projects for Netflix-style rows
  const trendingProjects = projects.filter(p => p.rating >= 8.5);
  const actionProjects = projects.filter(p => p.genre.toLowerCase().includes('action'));
  const thrillerProjects = projects.filter(p => p.genre.toLowerCase().includes('thriller'));
  const dramaProjects = projects.filter(p => p.genre.toLowerCase().includes('drama'));
  const recentProjects = projects.filter(p => p.year === '2024' || p.year === '2023');

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fuke's Media",
    "url": "https://fukes-media.com",
    "logo": "/lovable-uploads/86a9e886-0aee-4aab-b7cb-2e2fdebdd2cc.png",
    "description": "Professional VFX Studio delivering exceptional visual effects and creative solutions",
    "sameAs": [
      "https://twitter.com/fukesmedia",
      "https://www.linkedin.com/company/fukes-media",
      "https://www.instagram.com/fukesmedia"
    ]
  };

  return (
    <>
      <SEOHelmet 
        title="Fuke's Media LLP - Professional VFX Studio"
        description="Professional VFX studio delivering cutting-edge visual effects, CGI, color grading, and creative services for film and television."
        keywords="VFX studio, visual effects, CGI, color grading, post-production, film VFX, Fuke's Media"
        canonical="https://fukes-media.com"
        structuredData={structuredData}
      />

      <div className="netflix-browse">
        {/* Hero Billboard */}
        <Billboard onMoreInfo={setSelectedProject} />

        {/* Content Rows */}
        <div className="netflix-content">
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
    </>
  );
};

export default Home;
