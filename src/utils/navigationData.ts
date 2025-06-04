
// Navigation data structure for the entire application
// This centralizes all navigation links for consistent usage across components

import React from 'react';
import { UserIcon, FileText, FilmIcon, Code, Palette, ChevronRight, Zap, Users, Home, Calculator, MessagesSquare, VrHeadset, Monitor, Globe, GitBranch } from 'lucide-react';

export interface NavLink {
  name: string;
  path: string;
  isAnchor?: boolean;
  icon?: React.ElementType;
  description?: string;
}

export interface DropdownItem {
  title: string;
  href: string;
  description: string;
  icon?: React.ElementType;
  isAnchor?: boolean;
}

export interface DropdownSection {
  title: string;
  path: string;
  items: DropdownItem[];
}

// Main navigation links
export const mainNavLinks: NavLink[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Users },
  { name: "Services", path: "/services", icon: FilmIcon },
  { name: "VFX Research", path: "/vfx-research", icon: ChevronRight },
  { name: "VFX Industry Insights", path: "/vfx-industry-insights", icon: ChevronRight },
  { name: "Resources", path: "/resources", icon: ChevronRight },
  { name: "Help Center", path: "/help-center", icon: ChevronRight },
  { name: "Production Guidelines", path: "/production-guidelines", icon: ChevronRight },
  { name: "Pricing", path: "/pricing", icon: ChevronRight },
  { name: "Advanced Pricing", path: "/advanced-pricing", icon: Calculator, description: "Detailed estimate with advanced options" },
  { name: "Contract Builder", path: "/contract-builder", icon: FileText },
  { name: "Freelancer Portal", path: "/freelancer-portal", icon: UserIcon },
  { name: "Team", path: "/team", icon: Users },
  { name: "Industry News", path: "/news", icon: ChevronRight, description: "Latest VFX industry news and updates" },
  { name: "AI Assistant", path: "/chat-assistant", icon: MessagesSquare, description: "Get help with your VFX projects" },
  { name: "Virtual Production", path: "/virtual-production", icon: Monitor, description: "Real-time filmmaking workflows" },
  { name: "AR/VR Showroom", path: "/ar-vr-showroom", icon: VrHeadset, description: "Immersive project exploration" },
  { name: "Meta Studio", path: "/meta-studio", icon: Globe, description: "Metaverse presentation space" },
  { name: "Real-time Pipeline", path: "/real-time-pipeline", icon: GitBranch, description: "Live production workflow" },
];

// Home page anchor links
export const homeAnchorLinks: NavLink[] = [
  { name: "Services", path: "/#services", isAnchor: true },
  { name: "Portfolio", path: "/#portfolio", isAnchor: true },
  { name: "Team", path: "/#team", isAnchor: true },
  { name: "Careers", path: "/#careers", isAnchor: true },
  { name: "Investors", path: "/#investors", isAnchor: true },
  { name: "Contact", path: "/#contact", isAnchor: true }
];

// Mega menu dropdown sections
export const megaMenuSections = {
  about: {
    title: "About",
    path: "/about",
    items: [
      {
        title: "Our Team",
        href: "/team",
        description: "Meet our diverse team of creative professionals and technical experts",
        icon: Users
      },
      {
        title: "Investors",
        href: "/#investors",
        description: "Learn about our investment partners and funding initiatives",
        icon: Zap,
        isAnchor: true
      },
      {
        title: "Careers",
        href: "/#careers",
        description: "Join our team and become part of the future of VFX",
        icon: ChevronRight,
        isAnchor: true
      }
    ]
  },
  services: {
    title: "Services",
    path: "/services",
    items: [
      {
        title: "VFX Services",
        href: "/services",
        description: "Industry-leading visual effects for film, television, and digital media",
        icon: FilmIcon
      },
      {
        title: "Virtual Production",
        href: "/virtual-production",
        description: "Real-time filmmaking and LED wall simulation workflows",
        icon: Monitor
      },
      {
        title: "AI Integration",
        href: "/services",
        description: "Cutting-edge AI solutions for content creation and automation",
        icon: Code
      },
      {
        title: "Creative Direction",
        href: "/services",
        description: "Expert creative guidance to bring your vision to life",
        icon: Palette
      }
    ]
  },
  immersive: {
    title: "Immersive",
    path: "/ar-vr-showroom",
    items: [
      {
        title: "AR/VR Showroom",
        href: "/ar-vr-showroom",
        description: "Explore our VFX projects in immersive AR and VR environments",
        icon: VrHeadset
      },
      {
        title: "Meta Studio",
        href: "/meta-studio",
        description: "Metaverse presentation studio for client meetings and reviews",
        icon: Globe
      },
      {
        title: "Real-time Pipeline",
        href: "/real-time-pipeline",
        description: "Live workflow visualization with instant previews and collaboration",
        icon: GitBranch
      },
      {
        title: "Virtual Production",
        href: "/virtual-production",
        description: "LED wall simulation and green screen workflow demonstrations",
        icon: Monitor
      }
    ]
  },
  resources: {
    title: "Resources",
    path: "/resources",
    items: [
      {
        title: "VFX Research",
        href: "/vfx-research",
        description: "In-depth analysis of the global VFX industry landscape",
        icon: ChevronRight
      },
      {
        title: "Industry Insights",
        href: "/vfx-industry-insights",
        description: "Data-driven insights into VFX industry trends and developments",
        icon: ChevronRight
      },
      {
        title: "Help Center",
        href: "/help-center",
        description: "Resources, guides, and support for partners and clients",
        icon: ChevronRight
      },
      {
        title: "Production Guidelines",
        href: "/production-guidelines",
        description: "Technical specifications and workflow guides for productions",
        icon: ChevronRight
      }
    ]
  },
  tools: {
    title: "Tools",
    path: "/contract-builder",
    items: [
      {
        title: "Contract Builder",
        href: "/contract-builder",
        description: "Create customized VFX contracts with our AI-powered builder",
        icon: FileText
      },
      {
        title: "Freelancer Portal",
        href: "/freelancer-portal",
        description: "Access your freelancer dashboard, projects and payments",
        icon: UserIcon
      },
      {
        title: "Advanced Pricing Calculator",
        href: "/advanced-pricing",
        description: "Get detailed estimates with our comprehensive pricing tool",
        icon: Calculator
      },
      {
        title: "AI Assistant",
        href: "/chat-assistant",
        description: "Get instant answers to your VFX production questions",
        icon: MessagesSquare
      }
    ]
  }
};

// Common utilities for navigation - memoized for better performance
export const isLinkActive = (currentPath: string, linkPath: string): boolean => {
  if (linkPath === '/') {
    return currentPath === '/' && !currentPath.includes('#');
  }
  
  if (linkPath.startsWith('/#')) {
    return currentPath === '/' && currentPath.includes(linkPath.substring(1));
  }
  
  return currentPath === linkPath;
};

export const handleAnchorClick = (
  e: React.MouseEvent<HTMLAnchorElement>, 
  path: string, 
  currentPath: string
) => {
  if (path.startsWith('/#') && currentPath !== '/') {
    // Let it navigate to home page with anchor
    return;
  } else if (path.startsWith('/#')) {
    e.preventDefault();
    const targetId = path.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Smooth scroll with improved behavior
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
      
      // Update URL without full page reload
      window.history.pushState(null, '', path);
    }
  }
};
