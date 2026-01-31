import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import SEOHelmet from '@/components/SEOHelmet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import ReviewsSection from '@/components/Reviews/ReviewsSection';
import FollowButton from '@/components/Community/FollowButton';
import { 
  MapPin, Briefcase, Clock, DollarSign, Globe, 
  Linkedin, Star, Image, MessageCircle, Calendar
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PublicProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  title: string | null;
  bio: string | null;
  location: string | null;
  skills: string[] | null;
  industries: string[] | null;
  hourly_rate: number | null;
  years_experience: number | null;
  availability: string | null;
  is_available_for_hire: boolean | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  subscription_tier: string | null;
  created_at: string | null;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  project_url: string | null;
  client: string | null;
  year: number | null;
  role: string | null;
  tools_used: string[] | null;
}

const ArtistProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;

      setIsLoading(true);
      try {
        // Fetch from profiles_public view by user_id (username is actually user_id for now)
        const { data: profileData, error: profileError } = await supabase
          .from('profiles_public')
          .select('*')
          .eq('user_id', username)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch portfolio items
        const { data: portfolioData } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', username)
          .order('year', { ascending: false });

        setPortfolioItems(portfolioData || []);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError('Artist not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-48 w-full rounded-xl mb-4" />
            <div className="flex gap-4 items-end -mt-16 mb-6 px-4">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Artist Not Found</h1>
          <p className="text-muted-foreground mb-4">The profile you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/artists">Browse Artists</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <SEOHelmet
        title={`${profile.display_name || 'Artist'} | Fuke's Media`}
        description={profile.bio || `View ${profile.display_name}'s portfolio and profile`}
      />

      {/* Cover Image */}
      <div 
        className="h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20 relative"
        style={profile.cover_url ? { 
          backgroundImage: `url(${profile.cover_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-4 items-start md:items-end -mt-20 mb-8 relative z-10"
          >
            <Avatar className="w-32 h-32 ring-4 ring-background shadow-xl">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-secondary text-white">
                {profile.display_name?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold">{profile.display_name}</h1>
                {profile.subscription_tier && profile.subscription_tier !== 'free' && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                    {profile.subscription_tier}
                  </Badge>
                )}
                {profile.is_available_for_hire && (
                  <Badge variant="outline" className="border-green-500 text-green-500">
                    Available for Hire
                  </Badge>
                )}
              </div>
              {profile.title && (
                <p className="text-lg text-muted-foreground">{profile.title}</p>
              )}
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                )}
                {profile.years_experience && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {profile.years_experience} years
                  </span>
                )}
                {profile.created_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <FollowButton targetUserId={profile.user_id} />
              <Button variant="outline" asChild>
                <Link to={`/messages?to=${profile.user_id}`}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Main Content */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio ({portfolioItems.length})</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Bio */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profile.bio ? (
                      <p className="whitespace-pre-wrap">{profile.bio}</p>
                    ) : (
                      <p className="text-muted-foreground">No bio provided yet.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profile.hourly_rate && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Rate
                        </span>
                        <span className="font-semibold">${profile.hourly_rate}/hr</span>
                      </div>
                    )}
                    {profile.availability && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Availability
                        </span>
                        <span className="font-semibold capitalize">{profile.availability}</span>
                      </div>
                    )}
                    <div className="pt-2 space-y-2">
                      {profile.portfolio_url && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Portfolio Website
                          </a>
                        </Button>
                      )}
                      {profile.linkedin_url && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills */}
              {profile.skills && profile.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Industries */}
              {profile.industries && profile.industries.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Industries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.industries.map((industry) => (
                        <Badge key={industry} variant="outline" className="capitalize">
                          {industry.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="portfolio">
              {portfolioItems.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No Portfolio Items</h3>
                    <p className="text-muted-foreground">
                      This artist hasn't added any work to their portfolio yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden group">
                      <div className="aspect-video bg-muted relative">
                        {item.thumbnail_url ? (
                          <img
                            src={item.thumbnail_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                        {item.role && (
                          <p className="text-sm text-muted-foreground">{item.role}</p>
                        )}
                        {item.client && (
                          <p className="text-sm text-muted-foreground">Client: {item.client}</p>
                        )}
                        {item.tools_used && item.tools_used.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tools_used.slice(0, 3).map((tool) => (
                              <Badge key={tool} variant="outline" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                            {item.tools_used.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.tools_used.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewsSection userId={profile.user_id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
