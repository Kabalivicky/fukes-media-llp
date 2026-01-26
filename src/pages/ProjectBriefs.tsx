import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProjectBriefs, ProjectBriefInput } from '@/hooks/useProjectBriefs';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, Briefcase, MapPin, Clock, DollarSign, 
  Eye, Users, Calendar, Loader2, Search, Filter,
  Globe, Building, X, ArrowRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import type { Database } from '@/integrations/supabase/types';

type IndustryCategory = Database['public']['Enums']['industry_category'];

const INDUSTRY_OPTIONS: IndustryCategory[] = [
  'vfx', 'animation', 'film', 'tv', 'gaming', 
  'advertising', 'virtual-production', 'ar-vr', 'youtube', 'ai-ml'
];

const CATEGORY_OPTIONS = [
  'compositing', 'color-grading', '3d-modeling', 'animation', 
  'motion-graphics', 'editing', 'sound-design', 'virtual-production'
];

const ProjectBriefs = () => {
  const { user } = useAuth();
  const { briefs, myBriefs, isLoading, isSaving, createBrief, deleteBrief } = useProjectBriefs();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newSkill, setNewSkill] = useState('');
  
  const [formData, setFormData] = useState<ProjectBriefInput>({
    title: '',
    description: '',
    category: '',
    industries: [],
    required_skills: [],
    budget_min: undefined,
    budget_max: undefined,
    budget_currency: 'USD',
    budget_type: 'fixed',
    deadline: '',
    duration_estimate: '',
    is_remote: true,
    location: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      industries: [],
      required_skills: [],
      budget_min: undefined,
      budget_max: undefined,
      budget_currency: 'USD',
      budget_type: 'fixed',
      deadline: '',
      duration_estimate: '',
      is_remote: true,
      location: '',
    });
    setNewSkill('');
  };

  const handleInputChange = (field: keyof ProjectBriefInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.required_skills?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        required_skills: [...(prev.required_skills || []), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      required_skills: prev.required_skills?.filter(s => s !== skill) || [],
    }));
  };

  const handleToggleIndustry = (industry: IndustryCategory) => {
    setFormData(prev => {
      const current = prev.industries || [];
      if (current.includes(industry)) {
        return { ...prev, industries: current.filter(i => i !== industry) };
      } else {
        return { ...prev, industries: [...current, industry] };
      }
    });
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    const result = await createBrief(formData);
    if (result) {
      setIsDialogOpen(false);
      resetForm();
    }
  };

  const filteredBriefs = briefs.filter(brief => {
    const matchesSearch = 
      brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'all' || brief.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const BriefCard = ({ brief, isOwn = false }: { brief: typeof briefs[0], isOwn?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="hover:shadow-lg transition-all h-full">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            {brief.client && (
              <Avatar className="hidden sm:flex">
                <AvatarImage src={brief.client.avatar_url || undefined} />
                <AvatarFallback>
                  {brief.client.display_name?.charAt(0) || 'C'}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{brief.title}</h3>
                  {brief.client && (
                    <p className="text-sm text-muted-foreground">
                      Posted by {brief.client.display_name}
                    </p>
                  )}
                </div>
                {brief.is_featured && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    Featured
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {brief.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {brief.category && (
                  <Badge variant="secondary" className="capitalize">
                    {brief.category.replace('-', ' ')}
                  </Badge>
                )}
                {brief.is_remote ? (
                  <Badge variant="outline">
                    <Globe className="w-3 h-3 mr-1" />
                    Remote
                  </Badge>
                ) : brief.location && (
                  <Badge variant="outline">
                    <MapPin className="w-3 h-3 mr-1" />
                    {brief.location}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                {(brief.budget_min || brief.budget_max) && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {brief.budget_min && brief.budget_max 
                      ? `$${brief.budget_min.toLocaleString()} - $${brief.budget_max.toLocaleString()}`
                      : brief.budget_min 
                        ? `From $${brief.budget_min.toLocaleString()}`
                        : `Up to $${brief.budget_max?.toLocaleString()}`
                    }
                  </span>
                )}
                {brief.deadline && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(brief.deadline).toLocaleDateString()}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDistanceToNow(new Date(brief.created_at), { addSuffix: true })}
                </span>
              </div>

              {brief.required_skills && brief.required_skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {brief.required_skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {brief.required_skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{brief.required_skills.length - 4} more
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {brief.views_count} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {brief.proposals_count} proposals
                  </span>
                </div>
                {isOwn ? (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteBrief(brief.id)}
                  >
                    Delete
                  </Button>
                ) : (
                  <Button size="sm" className="gradient-button">
                    Submit Proposal
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHelmet
        title="Project Briefs | Find VFX & Animation Work"
        description="Browse project opportunities from clients worldwide. Submit proposals and get hired for VFX, animation, and post-production work."
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Briefs</h1>
            <p className="text-muted-foreground">Find work from clients worldwide</p>
          </div>
          
          {user && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Post a Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Post a New Project</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., VFX Compositing for Short Film"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your project requirements in detail..."
                      rows={4}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(v) => handleInputChange('category', v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((cat) => (
                            <SelectItem key={cat} value={cat} className="capitalize">
                              {cat.replace('-', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Type</Label>
                      <Select 
                        value={formData.budget_type} 
                        onValueChange={(v) => handleInputChange('budget_type', v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Price</SelectItem>
                          <SelectItem value="hourly">Hourly Rate</SelectItem>
                          <SelectItem value="negotiable">Negotiable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget_min">Min Budget (USD)</Label>
                      <Input
                        id="budget_min"
                        type="number"
                        value={formData.budget_min || ''}
                        onChange={(e) => handleInputChange('budget_min', e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget_max">Max Budget (USD)</Label>
                      <Input
                        id="budget_max"
                        type="number"
                        value={formData.budget_max || ''}
                        onChange={(e) => handleInputChange('budget_max', e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="5000"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline || ''}
                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Estimated Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration_estimate || ''}
                        onChange={(e) => handleInputChange('duration_estimate', e.target.value)}
                        placeholder="e.g., 2-3 weeks"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Required Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add skill"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      />
                      <Button type="button" onClick={handleAddSkill} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.required_skills?.map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1">
                          {skill}
                          <button onClick={() => handleRemoveSkill(skill)}>
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Industries</Label>
                    <div className="flex flex-wrap gap-2">
                      {INDUSTRY_OPTIONS.map((industry) => (
                        <Badge
                          key={industry}
                          variant={formData.industries?.includes(industry) ? 'default' : 'outline'}
                          className="cursor-pointer capitalize"
                          onClick={() => handleToggleIndustry(industry)}
                        >
                          {industry.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSaving || !formData.title || !formData.description}
                      className="gradient-button"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        'Post Project'
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Browse Projects
            </TabsTrigger>
            {user && (
              <TabsTrigger value="my-projects" className="gap-2">
                <Building className="w-4 h-4" />
                My Projects ({myBriefs.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="browse">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat.replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredBriefs.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No projects found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || selectedCategory !== 'all'
                      ? 'Try adjusting your filters'
                      : 'Check back later for new opportunities'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                <AnimatePresence>
                  {filteredBriefs.map((brief) => (
                    <BriefCard key={brief.id} brief={brief} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-projects">
            {myBriefs.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Building className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No projects posted yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Post a project to find talented artists for your work
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {myBriefs.map((brief) => (
                  <BriefCard key={brief.id} brief={brief} isOwn />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectBriefs;
