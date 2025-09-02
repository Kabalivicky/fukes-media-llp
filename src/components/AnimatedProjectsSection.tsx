import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ContentCarousel from './ContentCarousel';
import SectionTitle from './SectionTitle';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Star, Calendar, Users } from 'lucide-react';

// Import exact project images from gallery
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
    description: 'A captivating action drama that showcases our expertise in visual storytelling and post-production excellence.',
    director: 'Pavan Sadineni',
    cast: ['Karthikeya', 'Ruhani Sharma', 'Harsha Vardhan'],
    status: 'completed',
    budget: '₹15 Crores',
    role: 'Complete Post-Production & VFX'
  },
  {
    id: '2',
    title: 'Acharya',
    poster: acharyaImg,
    genre: 'Action',
    year: '2022',
    rating: 7.8,
    description: 'A powerful action film featuring extensive VFX sequences and cinematic excellence in every frame.',
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
    genre: 'Mythology Epic',
    year: '2023',
    rating: 6.5,
    description: 'An epic mythological tale brought to life with groundbreaking VFX and digital environments.',
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
    description: 'A blockbuster action comedy that became a massive hit with our comprehensive post-production work.',
    director: 'Nelson Dilipkumar',
    cast: ['Rajinikanth', 'Mohanlal', 'Tamannaah'],
    status: 'completed',
    budget: '₹180 Crores',
    role: 'Complete Post-Production Pipeline'
  },
  {
    id: '5',
    title: 'Jawan',
    poster: jawanImg,
    genre: 'Action Thriller',
    year: '2023',
    rating: 8.7,
    description: 'A high-octane action thriller with spectacular VFX sequences that redefined action cinema.',
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
    description: 'A groundbreaking sci-fi epic that pushed the boundaries of Indian cinema with futuristic VFX.',
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
    description: 'The epic sequel that shattered box office records with intense action and visual grandeur.',
    director: 'Prashanth Neel',
    cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon'],
    status: 'completed',
    budget: '₹100 Crores',
    role: 'Action Sequences & VFX Enhancement'
  },
  {
    id: '8',
    title: 'Leo',
    poster: leoImg,
    genre: 'Action Thriller',
    year: '2023',
    rating: 8.1,
    description: 'A stylish action thriller showcasing our signature visual effects and cinematic excellence.',
    director: 'Lokesh Kanagaraj',
    cast: ['Vijay', 'Trisha', 'Sanjay Dutt'],
    status: 'completed',
    budget: '₹350 Crores',
    role: 'Cinematography & Advanced VFX'
  },
  {
    id: '9',
    title: 'Cobra',
    poster: cobraImg,
    genre: 'Action Thriller',
    year: '2022',
    rating: 7.3,
    description: 'An international action thriller demonstrating our global production capabilities and VFX expertise.',
    director: 'R. Ajay Gnanamuthu',
    cast: ['Chiyaan Vikram', 'Srinidhi Shetty', 'KS Ravikumar'],
    status: 'completed',
    budget: '₹150 Crores',
    role: 'International VFX & Post-Production'
  },
  {
    id: '10',
    title: 'Ek Villain Returns',
    poster: villainImg,
    genre: 'Action Thriller',
    year: '2022',
    rating: 7.0,
    description: 'A stylish Bollywood thriller enhanced with contemporary visual effects and immersive sound design.',
    director: 'Mohit Suri',
    cast: ['John Abraham', 'Arjun Kapoor', 'Disha Patani'],
    status: 'completed',
    budget: '₹80 Crores',
    role: 'Sound Design & Visual Effects'
  },
  {
    id: '11',
    title: 'Indian 2',
    poster: indianImg,
    genre: 'Action Drama',
    year: '2024',
    rating: 8.3,
    description: 'The highly anticipated sequel featuring cutting-edge aging VFX and spectacular action sequences.',
    director: 'S. Shankar',
    cast: ['Kamal Haasan', 'Siddharth', 'Rakul Preet Singh'],
    status: 'in-production',
    budget: '₹250 Crores',
    role: 'Advanced Aging VFX & Action Design'
  },
  {
    id: '12',
    title: 'Bheema',
    poster: bheemaImg,
    genre: 'Action',
    year: '2024',
    rating: 7.9,
    description: 'An upcoming action spectacle showcasing our latest innovations in VFX pipeline and techniques.',
    director: 'Harish Shankar',
    cast: ['Gopichand', 'Priya Bhavani Shankar', 'Malvika Sharma'],
    status: 'upcoming',
    budget: '₹45 Crores',
    role: 'Complete VFX Pipeline & Supervision'
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

  // Unique animation variants for each poster
  const getAnimationVariant = (index: number, projectId: string) => {
    const variants = {
      // Abbara - Cinematic slide and glow
      '1': {
        hidden: { opacity: 0, x: -100, scale: 0.8, filter: "brightness(0.3)" },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          filter: "brightness(1)",
          transition: { 
            duration: 1.2, 
            delay: index * 0.15,
            ease: "easeOut"
          }
        }
      },
      // Acharya - Heroic rise from bottom
      '2': {
        hidden: { opacity: 0, y: 100, rotateX: -45, transformPerspective: 1000 },
        visible: { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: { 
            duration: 1.0, 
            delay: index * 0.12,
            type: "spring",
            damping: 20
          }
        }
      },
      // Adipurush - Divine descent
      '3': {
        hidden: { opacity: 0, y: -200, scale: 1.3, filter: "blur(8px)" },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: "blur(0px)",
          transition: { 
            duration: 1.4, 
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }
      },
      // Jailer - Explosive entrance
      '4': {
        hidden: { opacity: 0, scale: 0, rotate: 360, filter: "hue-rotate(180deg)" },
        visible: { 
          opacity: 1, 
          scale: 1, 
          rotate: 0,
          filter: "hue-rotate(0deg)",
          transition: { 
            duration: 1.1, 
            delay: index * 0.1,
            type: "spring",
            bounce: 0.6
          }
        }
      },
      // Jawan - Military precision slide
      '5': {
        hidden: { opacity: 0, x: 150, rotateZ: 15, scale: 0.7 },
        visible: { 
          opacity: 1, 
          x: 0, 
          rotateZ: 0,
          scale: 1,
          transition: { 
            duration: 0.9, 
            delay: index * 0.08,
            ease: "easeInOut"
          }
        }
      },
      // Kalki 2898 AD - Futuristic materialize
      '6': {
        hidden: { 
          opacity: 0, 
          scale: 0.5, 
          rotateY: -180, 
          filter: "blur(15px) saturate(0%)",
          transformPerspective: 1200 
        },
        visible: { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          filter: "blur(0px) saturate(100%)",
          transition: { 
            duration: 1.6, 
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      },
      // KGF Chapter 2 - Powerful ground emergence
      '7': {
        hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 25 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotateX: 0,
          transition: { 
            duration: 1.0, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }
        }
      },
      // Leo - Swift predator approach
      '8': {
        hidden: { opacity: 0, x: -120, rotateY: 45, scale: 0.8 },
        visible: { 
          opacity: 1, 
          x: 0, 
          rotateY: 0,
          scale: 1,
          transition: { 
            duration: 0.8, 
            delay: index * 0.1,
            ease: "easeOut"
          }
        }
      },
      // Cobra - Serpentine spiral reveal
      '9': {
        hidden: { 
          opacity: 0, 
          rotate: -270, 
          scale: 0.3,
          filter: "contrast(0.3)"
        },
        visible: { 
          opacity: 1, 
          rotate: 0, 
          scale: 1,
          filter: "contrast(1)",
          transition: { 
            duration: 1.3, 
            delay: index * 0.1,
            ease: "easeInOut"
          }
        }
      },
      // Ek Villain Returns - Dark villain emergence
      '10': {
        hidden: { 
          opacity: 0, 
          y: -60, 
          x: 60, 
          rotateZ: -20,
          filter: "brightness(0.2)"
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          x: 0,
          rotateZ: 0,
          filter: "brightness(1)",
          transition: { 
            duration: 1.1, 
            delay: index * 0.1,
            ease: [0.34, 1.56, 0.64, 1]
          }
        }
      },
      // Indian 2 - Legacy continuation
      '11': {
        hidden: { 
          opacity: 0, 
          scale: 1.4, 
          rotateY: -90,
          filter: "sepia(100%) blur(5px)"
        },
        visible: { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          filter: "sepia(0%) blur(0px)",
          transition: { 
            duration: 1.2, 
            delay: index * 0.1,
            ease: "easeOut"
          }
        }
      },
      // Bheema - Mythological power reveal
      '12': {
        hidden: { 
          opacity: 0, 
          y: 100, 
          scale: 0.6,
          rotate: 180,
          filter: "saturate(0%)"
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotate: 0,
          filter: "saturate(100%)",
          transition: { 
            duration: 1.5, 
            delay: index * 0.1,
            type: "spring",
            bounce: 0.3
          }
        }
      }
    };
    
    return variants[projectId] || variants['1'];
  };

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div
      variants={getAnimationVariant(index, project.id)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.08, 
        rotateY: 8,
        rotateX: 5,
        transformPerspective: 1000,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer transform-gpu"
      onClick={() => setSelectedProject(project)}
    >
      <Card className="overflow-hidden bg-card/60 backdrop-blur-md border-border/40 hover:border-primary/60 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/20">
        <div className="relative aspect-[2/3] overflow-hidden">
          <motion.img
            src={project.poster}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115"
            whileHover={{ 
              filter: "brightness(1.15) contrast(1.1)",
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Enhanced Overlay with Cinematic Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[1px]">
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

        {/* Enhanced Projects Grid with Staggered Layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 perspective-1000"
          layout
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
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