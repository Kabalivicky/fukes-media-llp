import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolioItems, PortfolioItemInput } from '@/hooks/usePortfolioItems';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, Upload, Play, Eye, Heart, Trash2, 
  Edit, Loader2, Image, Link as LinkIcon, X
} from 'lucide-react';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type IndustryCategory = Database['public']['Enums']['industry_category'];

const INDUSTRY_OPTIONS: IndustryCategory[] = [
  'vfx', 'animation', 'film', 'tv', 'gaming', 
  'advertising', 'virtual-production', 'ar-vr', 'youtube', 'ai-ml'
];

const PortfolioManager = () => {
  const { user } = useAuth();
  const { items, isLoading, isSaving, createItem, updateItem, deleteItem, uploadThumbnail } = usePortfolioItems();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState<PortfolioItemInput>({
    title: '',
    description: '',
    thumbnail_url: '',
    video_url: '',
    project_url: '',
    client: '',
    role: '',
    year: new Date().getFullYear(),
    industries: [],
    tools_used: [],
  });

  const [newTool, setNewTool] = useState('');

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      thumbnail_url: '',
      video_url: '',
      project_url: '',
      client: '',
      role: '',
      year: new Date().getFullYear(),
      industries: [],
      tools_used: [],
    });
    setEditingItem(null);
    setNewTool('');
  };

  const handleOpenDialog = (itemId?: string) => {
    if (itemId) {
      const item = items.find(i => i.id === itemId);
      if (item) {
        setFormData({
          title: item.title,
          description: item.description || '',
          thumbnail_url: item.thumbnail_url || '',
          video_url: item.video_url || '',
          project_url: item.project_url || '',
          client: item.client || '',
          role: item.role || '',
          year: item.year || new Date().getFullYear(),
          industries: item.industries || [],
          tools_used: item.tools_used || [],
        });
        setEditingItem(itemId);
      }
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleInputChange = (field: keyof PortfolioItemInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);
    const url = await uploadThumbnail(file);
    if (url) {
      setFormData(prev => ({ ...prev, thumbnail_url: url }));
    }
    setIsUploading(false);
  };

  const handleAddTool = () => {
    if (newTool.trim() && !formData.tools_used?.includes(newTool.trim())) {
      setFormData(prev => ({
        ...prev,
        tools_used: [...(prev.tools_used || []), newTool.trim()],
      }));
      setNewTool('');
    }
  };

  const handleRemoveTool = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      tools_used: prev.tools_used?.filter(t => t !== tool) || [],
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
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    let success: boolean;
    if (editingItem) {
      success = await updateItem(editingItem, formData);
    } else {
      const result = await createItem(formData);
      success = !!result;
    }

    if (success) {
      handleCloseDialog();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      await deleteItem(id);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please sign in to manage your portfolio</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Portfolio</h2>
          <p className="text-muted-foreground">Showcase your best work to attract clients and collaborators</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gradient-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Work
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Thumbnail */}
              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {formData.thumbnail_url ? (
                    <div className="relative">
                      <img 
                        src={formData.thumbnail_url} 
                        alt="Thumbnail" 
                        className="max-h-48 mx-auto rounded"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, thumbnail_url: '' }));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : isUploading ? (
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload thumbnail</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </div>

              {/* Title & Description */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Project title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your work..."
                  rows={3}
                />
              </div>

              {/* Links */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => handleInputChange('video_url', e.target.value)}
                    placeholder="https://vimeo.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_url">Project URL</Label>
                  <Input
                    id="project_url"
                    value={formData.project_url}
                    onChange={(e) => handleInputChange('project_url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Client & Role */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => handleInputChange('client', e.target.value)}
                    placeholder="Client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="e.g., Lead Compositor"
                  />
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <Label>Tools Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    placeholder="Add tool (e.g., Nuke)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTool())}
                  />
                  <Button type="button" onClick={handleAddTool} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tools_used?.map((tool) => (
                    <Badge key={tool} variant="secondary" className="gap-1">
                      {tool}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => handleRemoveTool(tool)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Industries */}
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

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSaving} className="gradient-button">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingItem ? 'Update' : 'Add'
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No portfolio items yet</h3>
            <p className="text-muted-foreground mb-4">
              Start showcasing your work to attract clients and collaborators
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Work
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {item.thumbnail_url ? (
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    {/* Overlay actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" onClick={() => handleOpenDialog(item.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {item.video_url && (
                        <Button size="icon" variant="secondary" asChild>
                          <a href={item.video_url} target="_blank" rel="noopener noreferrer">
                            <Play className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    {item.client && (
                      <p className="text-sm text-muted-foreground">for {item.client}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" /> {item.views_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" /> {item.likes_count}
                      </span>
                      {item.year && <span>{item.year}</span>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
