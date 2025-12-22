
import { UserIcon, FileText, FilmIcon, ChevronRight, Users, Home, MessagesSquare, Brain } from 'lucide-react';
import { NavLink } from './types';

// Main navigation links
export const mainNavLinks: NavLink[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Users },
  { name: "Services", path: "/services", icon: FilmIcon },
  { name: "AI Tools", path: "/ai-tools", icon: Brain, description: "AI-powered VFX tools and features" },
  { name: "VFX Research", path: "/vfx-research", icon: ChevronRight },
  { name: "Help Center", path: "/help-center", icon: ChevronRight },
  { name: "Production Guidelines", path: "/production-guidelines", icon: ChevronRight },
  { name: "Contract Builder", path: "/contract-builder", icon: FileText },
  { name: "Freelancer Portal", path: "/freelancer-portal", icon: UserIcon },
  { name: "Team", path: "/team", icon: Users },
  { name: "Industry News", path: "/news", icon: ChevronRight, description: "Latest VFX industry news and updates" },
  { name: "AI Assistant", path: "/chat-assistant", icon: MessagesSquare, description: "Get help with your VFX projects" },
];

// Home page anchor links
export const homeAnchorLinks: NavLink[] = [
  { name: "Services", path: "/#services", isAnchor: true },
  { name: "Portfolio", path: "/#portfolio", isAnchor: true },
  { name: "Team", path: "/#team", isAnchor: true },
  { name: "Careers", path: "/#careers", isAnchor: true },
  { name: "Contact", path: "/#contact", isAnchor: true }
];
