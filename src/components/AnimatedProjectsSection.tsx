import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ContentCarousel from './ContentCarousel';
import SectionTitle from './SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Star, Calendar, Users } from 'lucide-react';

// Import project images
import abbaraImg from '@/assets/projects/abbara.jpg';
import acharyaImg from '@/assets/projects/acharya.jpg';
import adipurushImg from '@/assets/projects/adipurush.png';
import jailerImg from '@/assets/projects/jailer.jpg';
import jawanImg from '@/assets/projects/jawan.png';
import kalkiImg from '@/assets/projects/kalki-2898-ad.png';
import kgfImg from '@/assets/projects/kgf-chapter-2.jpg';
import leoImg from '@/assets/projects/leo.jpg';
import cobraImg from '@/assets/projects/cobra.jpg';
import villainImg from '@/assets/projects/ek-villain-returns.jpg';
import indianImg from '@/assets/projects/indian-2.png';
import bheemaImg from '@/assets/projects/bheema.jpg';

interface Project {
  id: string;
  title: string;
  poster: string;
  genre: string;
  year: string;
  rating: number;
  description: string;
  director: string;
  cast: string[];
  status: 'completed' | 'in-production' | 'upcoming';
  budget: string;
  role: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Abbara',
    poster: abbaraImg,
    genre: 'Action Drama',
    year: '2023',
    rating: 8.2,
    description: 'A thrilling action drama that showcases our expertise in visual effects and cinematography.',
    director: 'Director Name',
    cast: ['Actor 1', 'Actor 2', 'Actor 3'],
    status: 'completed',
    budget: '₹50 Crores',
    role: 'VFX & Post-Production'
  },
  {
    id: '2',
    title: 'Acharya',
    poster: acharyaImg,
    genre: 'Action',
    year: '2022',
    rating: 7.8,
    description: 'An epic action film where we handled extensive VFX sequences and color grading.',
    director: 'Koratala Siva',
    cast: ['Chiranjeevi', 'Ram Charan', 'Pooja Hegde'],
    status: 'completed',
    budget: '₹140 Crores',
    role: 'Visual Effects & Color Grading'
  },
  {
    id: '3',
    title: 'Adipurush',
    poster: adipurushImg,
    genre: 'Mythology',
    year: '2023',
    rating: 6.5,
    description: 'A mythological epic featuring cutting-edge VFX work and digital environments.',
    director: 'Om Raut',
    cast: ['Prabhas', 'Saif Ali Khan', 'Kriti Sanon'],
    status: 'completed',
    budget: '₹500 Crores',
    role: 'Digital Environment & Character VFX'
  },
  {
    id: '4',
    title: 'Jailer',
    poster: jailerImg,
    genre: 'Action Comedy',
    year: '2023',
    rating: 8.9,
    description: 'A blockbuster action comedy where we provided comprehensive post-production services.',
    director: 'Nelson Dilipkumar',
    cast: ['Rajinikanth', 'Mohanlal', 'Tamannaah'],
    status: 'completed',
    budget: '₹180 Crores',
    role: 'Complete Post-Production'
  },
  {
    id: '5',
    title: 'Jawan',
    poster: jawanImg,
    genre: 'Action Thriller',
    year: '2023',
    rating: 8.7,
    description: 'A high-octane action thriller with spectacular VFX sequences and action choreography.',
    director: 'Atlee',
    cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
    status: 'completed',
    budget: '₹300 Crores',
    role: 'Action VFX & Compositing'
  },
  {
    id: '6',
    title: 'Kalki 2898 AD',
    poster: kalkiImg,
    genre: 'Sci-Fi Epic',
    year: '2024',
    rating: 9.1,
    description: 'A groundbreaking sci-fi epic showcasing our expertise in futuristic world-building.',
    director: 'Nag Ashwin',
    cast: ['Prabhas', 'Deepika Padukone', 'Amitabh Bachchan'],
    status: 'completed',
    budget: '₹600 Crores',
    role: 'Futuristic VFX & World Building'
  },
  {
    id: '7',
    title: 'KGF Chapter 2',
    poster: kgfImg,
    genre: 'Action',
    year: '2022',
    rating: 8.4,
    description: 'The sequel to the blockbuster KGF, featuring intense action sequences and VFX.',
    director: 'Prashanth Neel',
    cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon'],
    status: 'completed',
    budget: '₹100 Crores',
    role: 'Action Sequences & VFX'
  },
  {
    id: '8',
    title: 'Leo',
    poster: leoImg,
    genre: 'Action Thriller',
    year: '2023',
    rating: 8.1,
    description: 'A stylish action thriller with our signature visual effects and cinematography.',
    director: 'Lokesh Kanagaraj',
    cast: ['Vijay', 'Trisha', 'Sanjay Dutt'],
    status: 'completed',
    budget: '₹350 Crores',
    role: 'Cinematography & VFX'
  },
  {
    id: '9',
    title: 'Cobra',
    poster: cobraImg,
    genre: 'Action Thriller',
    year: '2022',
    rating: 7.3,
    description: 'An international action thriller showcasing our global production capabilities.',
    director: 'R. Ajay Gnanamuthu',
    cast: ['Chiyaan Vikram', 'Srinidhi Shetty', 'KS Ravikumar'],
    status: 'completed',
    budget: '₹150 Crores',
    role: 'International Locations & VFX'
  },
  {
    id: '10',
    title: 'Ek Villain Returns',
    poster: villainImg,
    genre: 'Action Thriller',
    year: '2022',
    rating: 7.0,
    description: 'A stylish Bollywood thriller with contemporary visual effects and sound design.',
    director: 'Mohit Suri',
    cast: ['John Abraham', 'Arjun Kapoor', 'Disha Patani'],
    status: 'completed',
    budget: '₹80 Crores',
    role: 'Sound Design & VFX'
  },
  {
    id: '11',
    title: 'Indian 2',
    poster: indianImg,
    genre: 'Action Drama',
    year: '2024',
    rating: 8.3,
    description: 'The highly anticipated sequel featuring advanced aging VFX and action sequences.',
    director: 'S. Shankar',
    cast: ['Kamal Haasan', 'Siddharth', 'Rakul Preet Singh'],
    status: 'in-production',
    budget: '₹250 Crores',
    role: 'Aging VFX & Action Sequences'
  },
  {
    id: '12',
    title: 'Bheema',
    poster: bheemaImg,
    genre: 'Action',
    year: '2024',
    rating: 7.9,
    description: 'An upcoming action film showcasing our latest VFX innovations and techniques.',
    director: 'Director Name',
    cast: ['Actor 1', 'Actor 2', 'Actor 3'],
    status: 'upcoming',
    budget: '₹120 Crores',
    role: 'Complete VFX Pipeline'
  }
];

const AnimatedProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-production' | 'upcoming'>('all');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  // Animation variants for different poster effects
  const getAnimationVariant = (index: number) => {
    const variants = [
      // Slide and scale
      {
        hidden: { opacity: 0, x: -100, scale: 0.8 },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: { duration: 0.8, delay: index * 0.1 }
        }
      },
      // Rotate and fade
      {
        hidden: { opacity: 0, rotateY: -90, scale: 0.9 },
        visible: { 
          opacity: 1, 
          rotateY: 0, 
          scale: 1,
          transition: { duration: 0.8, delay: index * 0.1 }
        }
      },
      // Bounce from top
      {
        hidden: { opacity: 0, y: -150, rotate: -10 },
        visible: { 
          opacity: 1, 
          y: 0, 
          rotate: 0,
          transition: { 
            duration: 0.8, 
            delay: index * 0.1,
            type: "spring",
            bounce: 0.4
          }
        }
      },
      // Slide from right with blur
      {
        hidden: { opacity: 0, x: 100, filter: "blur(10px)" },
        visible: { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          transition: { duration: 0.8, delay: index * 0.1 }
        }
      },
      // Scale with rotation
      {
        hidden: { opacity: 0, scale: 0, rotate: 180 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          rotate: 0,
          transition: { duration: 0.8, delay: index * 0.1 }
        }
      },
      // Flip effect
      {
        hidden: { opacity: 0, rotateX: -90, transformPerspective: 1000 },
        visible: { 
          opacity: 1, 
          rotateX: 0,
          transition: { duration: 0.8, delay: index * 0.1 }
        }
      }
    ];
    
    return variants[index % variants.length];
  };

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div
      variants={getAnimationVariant(index)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
      onClick={() => setSelectedProject(project)}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
        <div className="relative aspect-[2/3] overflow-hidden">
          <motion.img
            src={project.poster}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ filter: "brightness(1.1)" }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="secondary" className="mb-2">
                {project.genre}
              </Badge>
              <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{project.rating}</span>
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant={
                project.status === 'completed' ? 'default' : 
                project.status === 'in-production' ? 'secondary' : 
                'outline'
              }
              className="text-xs font-medium"
            >
              {project.status === 'completed' ? 'Completed' :
               project.status === 'in-production' ? 'In Production' :
               'Upcoming'}
            </Badge>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Featured Projects"
          subtitle="Discover our award-winning work in film and entertainment production"
          accent="primary"
          className="mb-12"
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['all', 'completed', 'in-production', 'upcoming'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "outline"}
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType === 'all' ? 'All Projects' : 
               filterType === 'in-production' ? 'In Production' :
               filterType.replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={selectedProject.poster}
                    alt={selectedProject.title}
                    className="w-full md:w-64 aspect-[2/3] object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                      <div className="flex items-center gap-4 text-muted-foreground mb-2">
                        <span>{selectedProject.year}</span>
                        <span>•</span>
                        <span>{selectedProject.genre}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedProject.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div><strong>Director:</strong> {selectedProject.director}</div>
                    <div><strong>Budget:</strong> {selectedProject.budget}</div>
                    <div><strong>Our Role:</strong> {selectedProject.role}</div>
                    <div><strong>Cast:</strong> {selectedProject.cast.join(', ')}</div>
                  </div>
                  
                  <div className="mt-4">
                    <Badge 
                      variant={
                        selectedProject.status === 'completed' ? 'default' : 
                        selectedProject.status === 'in-production' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {selectedProject.status === 'completed' ? 'Completed' :
                       selectedProject.status === 'in-production' ? 'In Production' :
                       'Upcoming'}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AnimatedProjectsSection;