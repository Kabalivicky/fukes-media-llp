import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, Briefcase, Image, CheckCircle, ArrowRight, ArrowLeft, 
  Sparkles, Target, Users, Upload, Loader2, MapPin
} from 'lucide-react';
import { Constants } from '@/integrations/supabase/types';

const steps = [
  { id: 'welcome', title: 'Welcome', icon: Sparkles },
  { id: 'profile', title: 'Profile', icon: User },
  { id: 'skills', title: 'Skills', icon: Target },
  { id: 'complete', title: 'Complete', icon: CheckCircle },
];

const industryOptions = Constants.public.Enums.industry_category;

const popularSkills = [
  'After Effects', 'Nuke', 'Houdini', 'Maya', 'Blender', 'Cinema 4D',
  'DaVinci Resolve', 'Premiere Pro', 'Photoshop', 'ZBrush', 'Unreal Engine',
  'Unity', 'Substance Painter', 'Python', 'Motion Graphics', 'Compositing',
  '3D Modeling', 'Character Animation', 'Rigging', 'Lighting', 'Rendering'
];

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, updateProfile, uploadAvatar, isSaving } = useProfile();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form state
  const [displayName, setDisplayName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  // Prefill from existing profile
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setTitle(profile.title || '');
      setBio(profile.bio || '');
      setLocation(profile.location || '');
      setAvatarUrl(profile.avatar_url || '');
      setSelectedSkills(profile.skills || []);
      setSelectedIndustries(profile.industries || []);
    }
  }, [profile]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const url = await uploadAvatar(file);
    if (url) {
      setAvatarUrl(url);
    }
    setIsUploading(false);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      // Save profile info
      await updateProfile({
        display_name: displayName,
        title,
        bio,
        location,
        avatar_url: avatarUrl,
      });
    } else if (currentStep === 2) {
      // Save skills
      await updateProfile({
        skills: selectedSkills,
        industries: selectedIndustries as any,
      });
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = async () => {
    // Final save
    await updateProfile({
      display_name: displayName,
      title,
      bio,
      location,
      avatar_url: avatarUrl,
      skills: selectedSkills,
      industries: selectedIndustries as any,
    });
    navigate('/dashboard');
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Welcome to Fuke's Media Platform!
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                The global hub for VFX artists, animators, and creative professionals. 
                Let's set up your profile so you can connect with opportunities.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto">
              <Card className="p-4 text-center border-primary/20">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Connect with Pros</p>
              </Card>
              <Card className="p-4 text-center border-primary/20">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Find Projects</p>
              </Card>
              <Card className="p-4 text-center border-primary/20">
                <Image className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Showcase Work</p>
              </Card>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Set Up Your Profile</h2>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-2xl bg-muted">
                    {displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  placeholder="Your full name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior VFX Artist, Motion Designer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell others about your experience and expertise..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Your Expertise</h2>
              <p className="text-muted-foreground">Select your skills and industries</p>
            </div>

            {/* Industries */}
            <div className="space-y-3">
              <Label>Industries (select all that apply)</Label>
              <div className="flex flex-wrap gap-2">
                {industryOptions.map((industry) => (
                  <Badge
                    key={industry}
                    variant={selectedIndustries.includes(industry) ? 'default' : 'outline'}
                    className="cursor-pointer capitalize text-sm py-1.5 px-3 transition-colors"
                    onClick={() => toggleIndustry(industry)}
                  >
                    {industry.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <Label>Skills (select or add your own)</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {popularSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                    className="cursor-pointer text-sm py-1.5 px-3 transition-colors"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              
              {/* Custom skill input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a custom skill..."
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()}
                />
                <Button type="button" variant="outline" onClick={addCustomSkill}>
                  Add
                </Button>
              </div>

              {/* Selected skills preview */}
              {selectedSkills.length > 0 && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected ({selectedSkills.length}):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">You're All Set!</h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Your profile is ready. Start exploring opportunities, connecting with professionals, 
                and showcasing your work.
              </p>
            </div>

            {/* Profile Preview */}
            <Card className="max-w-sm mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                      {displayName?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{displayName || 'Your Name'}</h3>
                    <p className="text-sm text-muted-foreground">{title || 'Creative Professional'}</p>
                    {location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {location}
                      </p>
                    )}
                  </div>
                </div>
                {selectedSkills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {selectedSkills.slice(0, 5).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {selectedSkills.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedSkills.length - 5} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/portfolio-manager')}>
                <Image className="w-4 h-4 mr-2" />
                Add Portfolio Items
              </Button>
              <Button className="gradient-button" onClick={handleComplete}>
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center ${index > 0 ? 'ml-2' : ''}`}
                  >
                    {index > 0 && (
                      <div className={`w-8 h-0.5 mr-2 ${index <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        index <= currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              Skip for now
            </Button>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="border-t bg-background/95 backdrop-blur sticky bottom-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
