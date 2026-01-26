import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import SEOHelmet from '@/components/SEOHelmet';
import SectionWrapper from '@/components/SectionWrapper';
import { AnimatedLetters, GradientText } from '@/components/KineticText';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, Users, MapPin, Briefcase, Star,
  MessageCircle, Play, Heart, Eye, ArrowRight,
  Award, TrendingUp, Crown, Sparkles, Globe, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ParallaxSection from '@/components/ParallaxSection';
import FloatingElements from '@/components/FloatingElements';
import AnimatedSectionDivider from '@/components/AnimatedSectionDivider';
import { useCommunityData } from '@/hooks/useCommunityData';
import FollowButton from '@/components/Community/FollowButton';

const Community = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('members');

  // Fetch real data from database with sample fallback
  const { members: allMembers, portfolio: allPortfolio, isLoading } = useCommunityData();

  const featuredMembers = allMembers.filter(m => m.featured);
  const hiringMembers = allMembers.filter(m => m.is_available_for_hire);

  const filteredMembers = allMembers.filter((member) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      member.display_name?.toLowerCase().includes(query) ||
      member.title?.toLowerCase().includes(query) ||
      member.skills?.some((s: string) => s.toLowerCase().includes(query))
    );
  });

  const getTierBadge = (tier: string) => {
    const tiers: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      free: { label: 'Member', className: 'bg-muted', icon: null },
      artist: { label: 'Artist', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: <Star className="w-3 h-3" /> },
      studio: { label: 'Studio', className: 'bg-purple-500/10 text-purple-500 border-purple-500/20', icon: <Crown className="w-3 h-3" /> },
      enterprise: { label: 'Enterprise', className: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: <Award className="w-3 h-3" /> },
    };
    const tierInfo = tiers[tier] || tiers.free;
    return (
      <Badge variant="outline" className={tierInfo.className}>
        {tierInfo.icon}
        {tierInfo.label}
      </Badge>
    );
  };

  const MemberCard = ({ member, featured = false }: { member: typeof allMembers[0], featured?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${featured ? 'border-primary/30' : 'border-border/50'}`}>
        {featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" /> Featured
            </Badge>
          </div>
        )}
        
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-20 h-20 mb-4 ring-4 ring-primary/10">
              <AvatarImage src={member.avatar_url || undefined} />
              <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-secondary text-white">
                {member.display_name?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {member.display_name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{member.title}</p>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="w-3 h-3" />
              {member.location}
            </div>

            <div className="flex items-center gap-2 mb-4">
              {getTierBadge(member.subscription_tier)}
              {member.is_available_for_hire && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <Briefcase className="w-3 h-3 mr-1" /> Hiring
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {member.skills?.slice(0, 3).map((skill: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {member.followers_count}
              </span>
              <span className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                {member.portfolio_count} works
              </span>
            </div>

            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
              {member.id && (
                <FollowButton 
                  targetUserId={member.id} 
                  className="flex-1"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const PortfolioCard = ({ item }: { item: typeof allPortfolio[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted relative overflow-hidden">
          {item.thumbnail_url ? (
            <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="h-8">
                  <Play className="w-3 h-3 mr-1" /> Watch
                </Button>
              </div>
              <div className="flex gap-3 text-white text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {item.views_count}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {item.likes_count}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            by {item.user?.display_name}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHelmet
        title="Community | Connect with Post-Production Professionals - Fuke's Media"
        description="Join the largest community of VFX artists, animators, colorists, and post-production professionals. Showcase your work and collaborate."
        keywords="VFX community, animation artists, post-production network, creative professionals, portfolio showcase"
      />

      {/* Hero Section */}
      <ParallaxSection className="relative pt-32 pb-16" speed={0.5}>
        <FloatingElements variant="orbs" density="low" colorScheme="primary" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
              <Users className="w-4 h-4 mr-2" />
              {allMembers.length}+ Professionals
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              <AnimatedLetters>Join Our</AnimatedLetters>
              <span className="block mt-2">
                <GradientText>Community</GradientText>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Connect with talented professionals, showcase your work, and collaborate on amazing projects.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search members, skills, or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
              <Button className="h-12 px-8 gradient-button">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{allMembers.length}+</div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{hiringMembers.length}+</div>
                <div className="text-sm text-muted-foreground">Available for Hire</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{allPortfolio.length}+</div>
                <div className="text-sm text-muted-foreground">Portfolio Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      <AnimatedSectionDivider variant="wave" />

      {/* Main Content Tabs */}
      <SectionWrapper>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Members
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Portfolio
            </TabsTrigger>
            <TabsTrigger value="hiring" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Hiring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            {/* Featured Members */}
            {featuredMembers.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    Featured Members
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredMembers.slice(0, 4).map((member) => (
                    <MemberCard key={member.id} member={member} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Members */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">All Members</h2>
                <Badge variant="outline">{filteredMembers.length} members</Badge>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Play className="w-6 h-6 text-primary" />
                Latest Work
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allPortfolio.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hiring">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-green-500" />
                Available for Hire
              </h2>
              <Badge variant="outline">{hiringMembers.length} available</Badge>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hiringMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SectionWrapper>

      {/* CTA Section */}
      <AnimatedSectionDivider variant="geometric" inverted />
      <SectionWrapper variant="gradient">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to <GradientText>Join</GradientText>?
          </h2>
          <p className="text-muted-foreground mb-6">
            Create your profile, showcase your work, and connect with the global post-production community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" className="gradient-button" asChild>
                <Link to="/freelancer-portal">
                  Complete Your Profile <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="gradient-button" asChild>
                <Link to="/auth">
                  Create Free Account <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">
                <Globe className="w-4 h-4 mr-2" />
                View Premium Plans
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Community;
