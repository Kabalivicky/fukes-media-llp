// Community sample data - extracted from Community.tsx for cleaner code organization

export interface CommunityMember {
  id: string;
  display_name: string;
  title: string;
  avatar_url: string | null;
  location: string;
  industries: string[];
  skills: string[];
  is_available_for_hire: boolean;
  subscription_tier: string;
  portfolio_count: number;
  followers_count: number;
  featured: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  thumbnail_url: string | null;
  user: { display_name: string };
  industries: string[];
  views_count: number;
  likes_count: number;
}

export const sampleMembers: CommunityMember[] = [
  {
    id: '1',
    display_name: 'Alex Rodriguez',
    title: 'Senior VFX Compositor',
    avatar_url: null,
    location: 'Los Angeles, CA',
    industries: ['vfx', 'film'],
    skills: ['Nuke', 'After Effects', 'Compositing'],
    is_available_for_hire: true,
    subscription_tier: 'artist',
    portfolio_count: 12,
    followers_count: 1250,
    featured: true,
  },
  {
    id: '2',
    display_name: 'Sarah Chen',
    title: '3D Character Artist',
    avatar_url: null,
    location: 'Vancouver, Canada',
    industries: ['animation', 'gaming'],
    skills: ['ZBrush', 'Maya', 'Substance Painter'],
    is_available_for_hire: false,
    subscription_tier: 'studio',
    portfolio_count: 24,
    followers_count: 3400,
    featured: true,
  },
  {
    id: '3',
    display_name: 'Marcus Johnson',
    title: 'Motion Graphics Designer',
    avatar_url: null,
    location: 'New York, NY',
    industries: ['advertising', 'youtube'],
    skills: ['After Effects', 'Cinema 4D', 'Motion Design'],
    is_available_for_hire: true,
    subscription_tier: 'free',
    portfolio_count: 8,
    followers_count: 890,
    featured: false,
  },
  {
    id: '4',
    display_name: 'Priya Sharma',
    title: 'Virtual Production Specialist',
    avatar_url: null,
    location: 'Mumbai, India',
    industries: ['virtual-production', 'film'],
    skills: ['Unreal Engine', 'LED Volume', 'Real-time Rendering'],
    is_available_for_hire: true,
    subscription_tier: 'artist',
    portfolio_count: 15,
    followers_count: 2100,
    featured: true,
  },
  {
    id: '5',
    display_name: 'Tom Williams',
    title: 'Colorist & DI Supervisor',
    avatar_url: null,
    location: 'London, UK',
    industries: ['film', 'tv'],
    skills: ['DaVinci Resolve', 'Color Grading', 'HDR'],
    is_available_for_hire: false,
    subscription_tier: 'studio',
    portfolio_count: 32,
    followers_count: 4500,
    featured: true,
  },
  {
    id: '6',
    display_name: 'Emma Garcia',
    title: 'FX TD',
    avatar_url: null,
    location: 'Barcelona, Spain',
    industries: ['vfx', 'film'],
    skills: ['Houdini', 'Simulations', 'Python'],
    is_available_for_hire: true,
    subscription_tier: 'artist',
    portfolio_count: 18,
    followers_count: 1800,
    featured: false,
  },
];

export const samplePortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Sci-Fi Environment',
    thumbnail_url: null,
    user: { display_name: 'Alex Rodriguez' },
    industries: ['vfx', 'film'],
    views_count: 12500,
    likes_count: 890,
  },
  {
    id: '2',
    title: 'Character Animation Reel',
    thumbnail_url: null,
    user: { display_name: 'Sarah Chen' },
    industries: ['animation', 'gaming'],
    views_count: 8700,
    likes_count: 650,
  },
  {
    id: '3',
    title: 'Product Commercial',
    thumbnail_url: null,
    user: { display_name: 'Marcus Johnson' },
    industries: ['advertising'],
    views_count: 5400,
    likes_count: 320,
  },
  {
    id: '4',
    title: 'Virtual Production BTS',
    thumbnail_url: null,
    user: { display_name: 'Priya Sharma' },
    industries: ['virtual-production'],
    views_count: 9200,
    likes_count: 780,
  },
];
