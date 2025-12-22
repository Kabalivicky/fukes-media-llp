
import { UserIcon, FileText, FilmIcon, Palette, ChevronRight, Users, MessagesSquare, Headset, Monitor, Globe, GitBranch, Brain } from 'lucide-react';
import { DropdownSection } from './types';

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
        icon: Users,
        isAnchor: false
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
        title: "VFX Solutions",
        href: "/services",
        description: "Industry-leading visual effects for film, television, and digital media",
        icon: FilmIcon,
        isAnchor: false
      },
      {
        title: "AI Tools",
        href: "/ai-tools",
        description: "AI-powered visual generation, emotion detection, and smart automation",
        icon: Brain,
        isAnchor: false
      },
      {
        title: "Virtual Production",
        href: "/virtual-production",
        description: "Real-time filmmaking and LED wall simulation workflows",
        icon: Monitor,
        isAnchor: false
      },
      {
        title: "Creative Direction",
        href: "/services",
        description: "Expert creative guidance to bring your vision to life",
        icon: Palette,
        isAnchor: false
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
        icon: Headset,
        isAnchor: false
      },
      {
        title: "Meta Studio",
        href: "/meta-studio",
        description: "Metaverse presentation studio for client meetings and reviews",
        icon: Globe,
        isAnchor: false
      },
      {
        title: "Real-time Pipeline",
        href: "/real-time-pipeline",
        description: "Live workflow visualization with instant previews and collaboration",
        icon: GitBranch,
        isAnchor: false
      },
      {
        title: "Virtual Production",
        href: "/virtual-production",
        description: "LED wall simulation and green screen workflow demonstrations",
        icon: Monitor,
        isAnchor: false
      }
    ]
  },
  resources: {
    title: "Resources",
    path: "/vfx-research",
    items: [
      {
        title: "VFX Research",
        href: "/vfx-research",
        description: "In-depth analysis of the global VFX industry landscape",
        icon: ChevronRight,
        isAnchor: false
      },
      {
        title: "Industry Insights",
        href: "/vfx-industry-insights",
        description: "Data-driven insights into VFX industry trends and developments",
        icon: ChevronRight,
        isAnchor: false
      },
      {
        title: "Help Center",
        href: "/help-center",
        description: "Resources, guides, and support for partners and clients",
        icon: ChevronRight,
        isAnchor: false
      },
      {
        title: "Production Guidelines",
        href: "/production-guidelines",
        description: "Technical specifications and workflow guides for productions",
        icon: ChevronRight,
        isAnchor: false
      }
    ]
  },
  tools: {
    title: "Tools",
    path: "/contract-builder",
    items: [
      {
        title: "AI Tools",
        href: "/ai-tools",
        description: "AI visual generation, emotion detection, and 3D asset management",
        icon: Brain,
        isAnchor: false
      },
      {
        title: "Contract Builder",
        href: "/contract-builder",
        description: "Create customized VFX contracts with our AI-powered builder",
        icon: FileText,
        isAnchor: false
      },
      {
        title: "Freelancer Portal",
        href: "/freelancer-portal",
        description: "Access your freelancer dashboard, projects and payments",
        icon: UserIcon,
        isAnchor: false
      },
      {
        title: "AI Assistant",
        href: "/chat-assistant",
        description: "Get instant answers to your VFX production questions",
        icon: MessagesSquare,
        isAnchor: false
      }
    ]
  }
};
