import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Search, MapPin, Briefcase, Star, Filter, X, Globe,
  DollarSign, Clock, Award, Users, MessageCircle, ChevronDown
} from 'lucide-react';
import FollowButton from '@/components/Community/FollowButton';
import { Link } from 'react-router-dom';

interface Artist {
  id: string;
  user_id: string;
  display_name: string | null;
  title: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  skills: string[] | null;
  industries: string[] | null;
  hourly_rate: number | null;
  years_experience: number | null;
  is_available_for_hire: boolean | null;
  subscription_tier: string | null;
  portfolio_url: string | null;
}

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

const popularSkills = [
  'Nuke', 'After Effects', 'Maya', 'Houdini', 'Cinema 4D',
  'Blender', 'Unreal Engine', 'DaVinci Resolve', 'Compositing',
  'Motion Graphics', '3D Animation', 'Character Animation',
];

const ArtistSearch = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [rateRange, setRateRange] = useState([0, 500]);
  const [experienceMin, setExperienceMin] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles_public')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArtists(data || []);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = useMemo(() => {
    let result = [...artists];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (artist) =>
          artist.display_name?.toLowerCase().includes(query) ||
          artist.title?.toLowerCase().includes(query) ||
          artist.bio?.toLowerCase().includes(query) ||
          artist.location?.toLowerCase().includes(query) ||
          artist.skills?.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Industry filter
    if (selectedIndustry) {
      result = result.filter((artist) =>
        artist.industries?.includes(selectedIndustry)
      );
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      result = result.filter((artist) =>
        selectedSkills.some((skill) =>
          artist.skills?.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    // Available for hire filter
    if (availableOnly) {
      result = result.filter((artist) => artist.is_available_for_hire);
    }

    // Rate range filter
    result = result.filter((artist) => {
      if (!artist.hourly_rate) return true;
      return artist.hourly_rate >= rateRange[0] && artist.hourly_rate <= rateRange[1];
    });

    // Experience filter
    if (experienceMin) {
      const minExp = parseInt(experienceMin);
      result = result.filter(
        (artist) => (artist.years_experience || 0) >= minExp
      );
    }

    // Sorting
    switch (sortBy) {
      case 'rate-low':
        result.sort((a, b) => (a.hourly_rate || 0) - (b.hourly_rate || 0));
        break;
      case 'rate-high':
        result.sort((a, b) => (b.hourly_rate || 0) - (a.hourly_rate || 0));
        break;
      case 'experience':
        result.sort((a, b) => (b.years_experience || 0) - (a.years_experience || 0));
        break;
      default:
        // newest first (default)
        break;
    }

    return result;
  }, [artists, searchQuery, selectedIndustry, selectedSkills, availableOnly, rateRange, experienceMin, sortBy]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('');
    setSelectedSkills([]);
    setAvailableOnly(false);
    setRateRange([0, 500]);
    setExperienceMin('');
    setSortBy('newest');
  };

  const hasActiveFilters = searchQuery || selectedIndustry || selectedSkills.length > 0 || availableOnly || experienceMin || rateRange[0] > 0 || rateRange[1] < 500;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Industry */}
      <div>
        <label className="text-sm font-medium mb-2 block">Industry</label>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="All Industries" />
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
      </div>

      {/* Skills */}
      <div>
        <label className="text-sm font-medium mb-2 block">Skills</label>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="available"
          checked={availableOnly}
          onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
        />
        <label htmlFor="available" className="text-sm font-medium cursor-pointer">
          Available for hire only
        </label>
      </div>

      {/* Hourly Rate */}
      <div>
        <label className="text-sm font-medium mb-4 block">
          Hourly Rate: ${rateRange[0]} - ${rateRange[1]}+
        </label>
        <Slider
          value={rateRange}
          min={0}
          max={500}
          step={25}
          onValueChange={setRateRange}
          className="mt-2"
        />
      </div>

      {/* Experience */}
      <div>
        <label className="text-sm font-medium mb-2 block">Minimum Experience</label>
        <Select value={experienceMin} onValueChange={setExperienceMin}>
          <SelectTrigger>
            <SelectValue placeholder="Any Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Experience</SelectItem>
            <SelectItem value="1">1+ years</SelectItem>
            <SelectItem value="3">3+ years</SelectItem>
            <SelectItem value="5">5+ years</SelectItem>
            <SelectItem value="10">10+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 mr-2" /> Clear All Filters
        </Button>
      )}
    </div>
  );

  const ArtistCard = ({ artist }: { artist: Artist }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-20 h-20 mb-4 ring-4 ring-primary/10">
              <AvatarImage src={artist.avatar_url || undefined} />
              <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-secondary text-white">
                {artist.display_name?.charAt(0) || '?'}
              </AvatarFallback>
            </Avatar>

            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {artist.display_name || 'Anonymous'}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{artist.title || 'Creative Professional'}</p>

            {artist.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin className="w-3 h-3" />
                {artist.location}
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              {artist.is_available_for_hire && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <Briefcase className="w-3 h-3 mr-1" /> Available
                </Badge>
              )}
              {artist.hourly_rate && (
                <Badge variant="outline">
                  <DollarSign className="w-3 h-3 mr-1" />
                  ${artist.hourly_rate}/hr
                </Badge>
              )}
            </div>

            {artist.years_experience && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <Award className="w-3 h-3" />
                {artist.years_experience} years experience
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {artist.skills?.slice(0, 3).map((skill, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {artist.skills && artist.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{artist.skills.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to={`/messages?user=${artist.user_id}`}>
                  <MessageCircle className="w-4 h-4 mr-1" /> Message
                </Link>
              </Button>
              {artist.user_id && (
                <FollowButton targetUserId={artist.user_id} className="flex-1" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search artists by name, skills, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12"
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-12">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="rate-low">Rate: Low to High</SelectItem>
              <SelectItem value="rate-high">Rate: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 md:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Artists</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <FilterPanel />
            </CardContent>
          </Card>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-muted mb-4" />
                      <div className="h-5 w-32 bg-muted rounded mb-2" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredArtists.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No artists found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistSearch;
