import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOHelmet from '@/components/SEOHelmet';
import SectionWrapper from '@/components/SectionWrapper';
import { AnimatedLetters, GradientText } from '@/components/KineticText';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, MapPin, Briefcase, Clock, DollarSign, Building2, 
  Filter, ArrowRight, Star, Globe, Users, Bookmark, ExternalLink
} from 'lucide-react';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';
import AnimatedSectionDivider from '@/components/AnimatedSectionDivider';

const industryOptions = [
  { value: 'vfx', label: 'VFX' },
  { value: 'animation', label: 'Animation' },
  { value: 'film', label: 'Film' },
  { value: 'tv', label: 'TV' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'advertising', label: 'Advertising' },
  { value: 'virtual-production', label: 'Virtual Production' },
  { value: 'ar-vr', label: 'AR/VR' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'ai-ml', label: 'AI/ML' },
];

const jobTypeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' },
];

const experienceLevels = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
];

// Sample featured jobs for demonstration
const sampleJobs = [
  {
    id: '1',
    title: 'Senior VFX Compositor',
    company: { name: 'Weta Digital', logo_url: null, is_verified: true },
    location: 'Wellington, New Zealand',
    is_remote: true,
    job_type: 'full-time',
    experience_level: 'senior',
    salary_min: 80000,
    salary_max: 120000,
    salary_currency: 'USD',
    industries: ['vfx', 'film'],
    skills: ['Nuke', 'After Effects', 'Compositing', '3D Integration'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: '3D Character Animator',
    company: { name: 'Pixar Animation', logo_url: null, is_verified: true },
    location: 'Emeryville, CA',
    is_remote: false,
    job_type: 'full-time',
    experience_level: 'mid',
    salary_min: 90000,
    salary_max: 140000,
    salary_currency: 'USD',
    industries: ['animation', 'film'],
    skills: ['Maya', 'Character Animation', 'Rigging', 'Motion Capture'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Virtual Production Supervisor',
    company: { name: 'ILM', logo_url: null, is_verified: true },
    location: 'San Francisco, CA',
    is_remote: false,
    job_type: 'full-time',
    experience_level: 'lead',
    salary_min: 120000,
    salary_max: 180000,
    salary_currency: 'USD',
    industries: ['virtual-production', 'vfx', 'film'],
    skills: ['Unreal Engine', 'LED Volume', 'Real-time Rendering', 'On-set Supervision'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Motion Graphics Designer',
    company: { name: 'Netflix', logo_url: null, is_verified: true },
    location: 'Los Angeles, CA',
    is_remote: true,
    job_type: 'contract',
    experience_level: 'mid',
    salary_min: 60000,
    salary_max: 90000,
    salary_currency: 'USD',
    industries: ['tv', 'advertising'],
    skills: ['After Effects', 'Cinema 4D', 'Motion Design', 'Typography'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Game VFX Artist',
    company: { name: 'Ubisoft', logo_url: null, is_verified: true },
    location: 'Montreal, Canada',
    is_remote: false,
    job_type: 'full-time',
    experience_level: 'senior',
    salary_min: 85000,
    salary_max: 130000,
    salary_currency: 'USD',
    industries: ['gaming', 'vfx'],
    skills: ['Houdini', 'Unity', 'Unreal Engine', 'Particle Systems'],
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'AI/ML Research Engineer - Visual Effects',
    company: { name: 'Adobe', logo_url: null, is_verified: true },
    location: 'San Jose, CA',
    is_remote: true,
    job_type: 'full-time',
    experience_level: 'senior',
    salary_min: 150000,
    salary_max: 220000,
    salary_currency: 'USD',
    industries: ['ai-ml', 'vfx'],
    skills: ['Python', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Query for real jobs from database
  const { data: dbJobs, isLoading } = useQuery({
    queryKey: ['jobs', selectedIndustry, selectedJobType, remoteOnly],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select(`
          *,
          company:companies(name, logo_url, is_verified)
        `)
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (remoteOnly) {
        query = query.eq('is_remote', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Combine sample jobs with database jobs
  const allJobs = [...sampleJobs, ...(dbJobs || [])];

  // Filter jobs based on search and filters
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = !selectedIndustry || 
      job.industries?.includes(selectedIndustry);
    
    const matchesJobType = !selectedJobType || 
      job.job_type === selectedJobType;
    
    const matchesExperience = !selectedExperience || 
      job.experience_level === selectedExperience;
    
    const matchesRemote = !remoteOnly || job.is_remote;

    return matchesSearch && matchesIndustry && matchesJobType && matchesExperience && matchesRemote;
  });

  const featuredJobs = filteredJobs.filter(job => job.is_featured);
  const regularJobs = filteredJobs.filter(job => !job.is_featured);

  const formatSalary = (min?: number, max?: number, currency = 'USD') => {
    if (!min && !max) return 'Competitive';
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
    if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}`;
    if (min) return `From ${formatter.format(min)}`;
    return `Up to ${formatter.format(max!)}`;
  };

  const JobCard = ({ job, featured = false }: { job: typeof sampleJobs[0], featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${featured ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-transparent' : 'border-border/50'}`}>
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" /> Featured
            </Badge>
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                {job.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">{job.company?.name}</span>
                {job.company?.is_verified && (
                  <Badge variant="outline" className="text-xs py-0 px-1.5 bg-blue-500/10 text-blue-500 border-blue-500/20">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {job.location}
            </span>
            {job.is_remote && (
              <Badge variant="secondary" className="text-xs">
                <Globe className="w-3 h-3 mr-1" /> Remote
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              <Briefcase className="w-3 h-3 mr-1" />
              {job.job_type?.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className="capitalize">
              <Users className="w-3 h-3 mr-1" />
              {job.experience_level}
            </Badge>
            <Badge variant="outline">
              <DollarSign className="w-3 h-3 mr-1" />
              {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {job.skills?.slice(0, 4).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                {skill}
              </Badge>
            ))}
            {job.skills && job.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {job.industries?.slice(0, 3).map((industry, idx) => (
              <Badge key={idx} variant="outline" className="text-xs capitalize">
                {industry?.replace('-', ' ')}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(job.created_at).toLocaleDateString()}
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button size="sm" className="h-8">
                Apply <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title="Jobs | Post-Production Careers - Fuke's Media"
        description="Find your dream job in VFX, animation, film, gaming, and post-production. Browse thousands of opportunities from top studios worldwide."
        keywords="VFX jobs, animation careers, film industry jobs, post-production careers, gaming jobs"
      />

      {/* Hero Section */}
      <ParallaxSection className="relative pt-32 pb-16" speed={0.5}>
        <FloatingElements variant="mixed" density="low" colorScheme="mixed" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Briefcase className="w-4 h-4 mr-2" />
              {allJobs.length}+ Active Jobs
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <AnimatedLetters>Find Your</AnimatedLetters>
              <span className="block mt-2">
                <GradientText>Dream Career</GradientText>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Discover opportunities at the world's leading studios in VFX, animation, film, gaming, and more.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
              <Button 
                variant="outline" 
                className="h-12 px-6"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="h-12 px-8 gradient-button">
                Search Jobs
              </Button>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      <AnimatedSectionDivider variant="wave" />

      {/* Filters Section */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-muted/30 border-y border-border/50"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Industries</SelectItem>
                  {industryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {jobTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  {experienceLevels.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remote" 
                  checked={remoteOnly}
                  onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
                />
                <label htmlFor="remote" className="text-sm font-medium cursor-pointer">
                  Remote Only
                </label>
              </div>

              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedIndustry('');
                  setSelectedJobType('');
                  setSelectedExperience('');
                  setRemoteOnly(false);
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <SectionWrapper>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500" />
              Featured Opportunities
            </h2>
            <Badge variant="outline">{featuredJobs.length} Featured</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured />
            ))}
          </div>
        </SectionWrapper>
      )}

      <AnimatedSectionDivider variant="dots" />

      {/* All Jobs */}
      <SectionWrapper>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold">
            All Opportunities
          </h2>
          <Badge variant="outline">{regularJobs.length} Jobs</Badge>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="space-y-3">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-muted rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded w-20" />
                    <div className="h-6 bg-muted rounded w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : regularJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button onClick={() => {
              setSelectedIndustry('');
              setSelectedJobType('');
              setSelectedExperience('');
              setRemoteOnly(false);
              setSearchQuery('');
            }}>
              Clear All Filters
            </Button>
          </Card>
        )}
      </SectionWrapper>

      {/* CTA Section */}
      <AnimatedSectionDivider variant="geometric" inverted />
      <SectionWrapper variant="gradient">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Looking to <GradientText>Hire Talent</GradientText>?
          </h2>
          <p className="text-muted-foreground mb-6">
            Post your job openings and reach thousands of qualified professionals in the post-production industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-button">
              Post a Job <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Pricing Plans
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Jobs;
