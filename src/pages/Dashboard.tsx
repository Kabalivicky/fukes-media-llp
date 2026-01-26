import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { usePortfolioItems } from '@/hooks/usePortfolioItems';
import { useMessages } from '@/hooks/useMessages';
import { useNotifications } from '@/hooks/useNotifications';
import { useProjectBriefs } from '@/hooks/useProjectBriefs';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, Briefcase, MessageCircle, Bell, Image, 
  Settings, ArrowRight, Star, Eye, TrendingUp,
  Plus, CheckCircle, Clock, Loader2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading } = useProfile();
  const { items: portfolioItems } = usePortfolioItems();
  const { unreadCount: unreadMessages } = useMessages();
  const { unreadCount: unreadNotifications } = useNotifications();
  const { myBriefs } = useProjectBriefs();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion(profile);

  const quickActions = [
    { 
      label: 'Edit Profile', 
      icon: User, 
      href: '/profile/edit',
      description: 'Update your info'
    },
    { 
      label: 'Messages', 
      icon: MessageCircle, 
      href: '/messages',
      description: unreadMessages > 0 ? `${unreadMessages} unread` : 'Chat with others',
      badge: unreadMessages
    },
    { 
      label: 'Notifications', 
      icon: Bell, 
      href: '/notifications',
      description: unreadNotifications > 0 ? `${unreadNotifications} new` : 'View updates',
      badge: unreadNotifications
    },
    { 
      label: 'My Portfolio', 
      icon: Image, 
      href: '/portfolio-manager',
      description: `${portfolioItems.length} items`
    },
    { 
      label: 'Browse Projects', 
      icon: Briefcase, 
      href: '/projects',
      description: 'Find work'
    },
    { 
      label: 'Post a Project', 
      icon: Plus, 
      href: '/projects',
      description: 'Hire talent'
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHelmet
        title="Dashboard | Fuke's Media Platform"
        description="Manage your profile, portfolio, messages, and find work opportunities."
      />

      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 ring-4 ring-primary/10">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-secondary text-white">
                  {profile?.display_name?.charAt(0) || user?.email?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {profile?.display_name || 'there'}!
                </h1>
                <p className="text-muted-foreground">
                  {profile?.title || 'Complete your profile to get started'}
                </p>
              </div>
            </div>
            <Button asChild className="gradient-button">
              <Link to="/community">
                Explore Community
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Completion */}
            {profileCompletion < 100 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Complete Your Profile
                    <Badge variant="outline">{profileCompletion}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={profileCompletion} className="h-2 mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    A complete profile helps you get discovered by clients and collaborators.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {!profile?.avatar_url && (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" /> Add photo
                      </Badge>
                    )}
                    {!profile?.bio && (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" /> Add bio
                      </Badge>
                    )}
                    {(!profile?.skills || profile.skills.length === 0) && (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" /> Add skills
                      </Badge>
                    )}
                    {!profile?.location && (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" /> Add location
                      </Badge>
                    )}
                  </div>
                  <Button asChild size="sm" className="mt-4">
                    <Link to="/profile/edit">
                      <Settings className="w-4 h-4 mr-2" />
                      Complete Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Link
                      key={action.label}
                      to={action.href}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative">
                        <div className="p-2 rounded-full bg-primary/10">
                          <action.icon className="w-5 h-5 text-primary" />
                        </div>
                        {action.badge && action.badge > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{action.label}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Preview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Portfolio</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/portfolio-manager">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {portfolioItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No portfolio items yet</p>
                    <Button asChild size="sm">
                      <Link to="/portfolio-manager">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Work
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {portfolioItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="aspect-video bg-muted rounded-lg overflow-hidden">
                        {item.thumbnail_url ? (
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Portfolio Views</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {portfolioItems.reduce((sum, item) => sum + item.views_count, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Portfolio Items</span>
                  <span className="font-semibold">{portfolioItems.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Projects Posted</span>
                  <span className="font-semibold">{myBriefs.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Profile Status</span>
                  <Badge variant={profileCompletion >= 80 ? 'default' : 'secondary'}>
                    {profileCompletion >= 80 ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Complete
                      </>
                    ) : (
                      'In Progress'
                    )}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Membership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Current Plan</span>
                  <Badge className="capitalize">
                    {profile?.subscription_tier || 'Free'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Upgrade to get featured in search results and unlock premium features.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/pricing">
                    View Plans
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Check out our help center for guides and tips on getting the most out of the platform.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/help-center">Visit Help Center</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

function calculateProfileCompletion(profile: any): number {
  if (!profile) return 0;
  
  const fields = [
    { name: 'display_name', weight: 15 },
    { name: 'avatar_url', weight: 15 },
    { name: 'title', weight: 10 },
    { name: 'bio', weight: 15 },
    { name: 'location', weight: 10 },
    { name: 'skills', weight: 15, isArray: true },
    { name: 'industries', weight: 10, isArray: true },
    { name: 'portfolio_url', weight: 5 },
    { name: 'linkedin_url', weight: 5 },
  ];

  let completion = 0;
  for (const field of fields) {
    const value = profile[field.name];
    if (field.isArray) {
      if (value && value.length > 0) completion += field.weight;
    } else {
      if (value) completion += field.weight;
    }
  }

  return completion;
}

export default Dashboard;
