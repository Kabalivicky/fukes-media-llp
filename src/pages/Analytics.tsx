import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import SEOHelmet from '@/components/SEOHelmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, Eye, FileText, DollarSign, 
  Users, Briefcase, CheckCircle, Clock,
  ArrowUp, ArrowDown, BarChart3, PieChart
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AnalyticsData {
  profileViews: number;
  portfolioViews: number;
  portfolioItems: number;
  proposalsSent: number;
  proposalsAccepted: number;
  proposalsPending: number;
  totalEarnings: number;
  projectsCompleted: number;
  followersCount: number;
  followingCount: number;
  reviewsReceived: number;
  averageRating: number;
}

const Analytics = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        // Fetch portfolio stats
        const { data: portfolioItems } = await supabase
          .from('portfolio_items')
          .select('views_count, likes_count')
          .eq('user_id', user.id);

        const portfolioViews = portfolioItems?.reduce((sum, item) => sum + (item.views_count || 0), 0) || 0;

        // Fetch proposals
        const { data: proposals } = await supabase
          .from('project_proposals')
          .select('status')
          .eq('artist_id', user.id);

        const proposalsSent = proposals?.length || 0;
        const proposalsAccepted = proposals?.filter(p => p.status === 'accepted').length || 0;
        const proposalsPending = proposals?.filter(p => p.status === 'pending').length || 0;

        // Fetch workspaces (completed projects)
        const { data: workspaces } = await supabase
          .from('project_workspaces')
          .select('status, budget')
          .or(`client_id.eq.${user.id},artist_id.eq.${user.id}`);

        const projectsCompleted = workspaces?.filter(w => w.status === 'completed').length || 0;
        const totalEarnings = workspaces
          ?.filter(w => w.status === 'completed')
          .reduce((sum, w) => sum + (w.budget || 0), 0) || 0;

        // Fetch connections
        const { count: followersCount } = await supabase
          .from('connections')
          .select('*', { count: 'exact', head: true })
          .eq('following_id', user.id);

        const { count: followingCount } = await supabase
          .from('connections')
          .select('*', { count: 'exact', head: true })
          .eq('follower_id', user.id);

        // Fetch reviews
        const { data: reviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('reviewed_user_id', user.id);

        const reviewsReceived = reviews?.length || 0;
        const averageRating = reviewsReceived > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsReceived
          : 0;

        // Fetch recent activity (notifications)
        const { data: notifications } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        setRecentActivity(notifications || []);

        setAnalytics({
          profileViews: 0, // Would need separate tracking
          portfolioViews,
          portfolioItems: portfolioItems?.length || 0,
          proposalsSent,
          proposalsAccepted,
          proposalsPending,
          totalEarnings,
          projectsCompleted,
          followersCount: followersCount || 0,
          followingCount: followingCount || 0,
          reviewsReceived,
          averageRating,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const proposalSuccessRate = analytics && analytics.proposalsSent > 0
    ? Math.round((analytics.proposalsAccepted / analytics.proposalsSent) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHelmet
        title="Analytics Dashboard | Fuke's Media"
        description="Track your profile views, earnings, and proposal success rates."
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your performance and growth on the platform.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Portfolio Views"
            value={analytics?.portfolioViews || 0}
            icon={Eye}
            trend={12}
          />
          <StatCard
            title="Total Earnings"
            value={`$${(analytics?.totalEarnings || 0).toLocaleString()}`}
            icon={DollarSign}
            trend={8}
          />
          <StatCard
            title="Followers"
            value={analytics?.followersCount || 0}
            icon={Users}
            trend={5}
          />
          <StatCard
            title="Projects Completed"
            value={analytics?.projectsCompleted || 0}
            icon={CheckCircle}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Proposal Success */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Proposal Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold text-primary mb-2">
                      {proposalSuccessRate}%
                    </div>
                    <p className="text-muted-foreground">
                      {analytics?.proposalsAccepted || 0} accepted out of {analytics?.proposalsSent || 0} sent
                    </p>
                  </div>
                  <Progress value={proposalSuccessRate} className="h-3" />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>Pending: {analytics?.proposalsPending || 0}</span>
                    <span>Accepted: {analytics?.proposalsAccepted || 0}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Reviews & Ratings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold text-primary mb-2">
                      {analytics?.averageRating.toFixed(1) || '0.0'}
                    </div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={star <= (analytics?.averageRating || 0) ? 'text-yellow-500' : 'text-muted'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      Based on {analytics?.reviewsReceived || 0} reviews
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No recent activity
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                      >
                        <div className="p-2 rounded-full bg-primary/10">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{activity.title}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {activity.content}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {analytics?.proposalsSent || 0}
                  </div>
                  <p className="text-muted-foreground">Total Sent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-green-500 mb-1">
                    {analytics?.proposalsAccepted || 0}
                  </div>
                  <p className="text-muted-foreground">Accepted</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">
                    {analytics?.proposalsPending || 0}
                  </div>
                  <p className="text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold mb-1">
                    {analytics?.followersCount || 0}
                  </div>
                  <p className="text-muted-foreground">Followers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold mb-1">
                    {analytics?.followingCount || 0}
                  </div>
                  <p className="text-muted-foreground">Following</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Eye className="w-8 h-8 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold mb-1">
                    {analytics?.portfolioViews || 0}
                  </div>
                  <p className="text-muted-foreground">Portfolio Views</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <FileText className="w-8 h-8 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold mb-1">
                    {analytics?.portfolioItems || 0}
                  </div>
                  <p className="text-muted-foreground">Portfolio Items</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5 text-muted-foreground" />
        {trend !== undefined && (
          <Badge variant={trend >= 0 ? 'default' : 'destructive'} className="text-xs">
            {trend >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
            {Math.abs(trend)}%
          </Badge>
        )}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </CardContent>
  </Card>
);

export default Analytics;
