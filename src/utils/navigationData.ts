
// Navigation data structure for the entire application
// This centralizes all navigation links for consistent usage across components

export interface NavLink {
  name: string;
  path: string;
  isAnchor?: boolean;
}

export interface DropdownItem {
  title: string;
  href: string;
  description: string;
  icon?: string;
  isAnchor?: boolean;
}

export interface DropdownSection {
  title: string;
  path: string;
  items: DropdownItem[];
}

// Main navigation links
export const mainNavLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "VFX Research", path: "/vfx-research" },
  { name: "VFX Industry Insights", path: "/vfx-industry-insights" },
  { name: "Resources", path: "/resources" },
  { name: "Help Center", path: "/help-center" },
  { name: "Production Guidelines", path: "/production-guidelines" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contract Builder", path: "/contract-builder" },
  { name: "Freelancer Portal", path: "/freelancer-portal" },
  { name: "Team", path: "/team" },
];

// Home page anchor links
export const homeAnchorLinks: NavLink[] = [
  { name: "Services", path: "/#services", isAnchor: true },
  { name: "Portfolio", path: "/#portfolio", isAnchor: true },
  { name: "Team", path: "/#team", isAnchor: true },
  { name: "Careers", path: "/#careers", isAnchor: true },
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
        description: "Meet our diverse team of creative professionals and technical experts"
      },
      {
        title: "Investors",
        href: "/#investors",
        description: "Learn about our investment partners and funding initiatives",
        isAnchor: true
      },
      {
        title: "Careers",
        href: "/#careers",
        description: "Join our team and become part of the future of VFX",
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
        description: "Industry-leading visual effects for film, television, and digital media"
      },
      {
        title: "AI Integration",
        href: "/services",
        description: "Cutting-edge AI solutions for content creation and automation"
      },
      {
        title: "Production Support",
        href: "/services",
        description: "Comprehensive production services from pre to post"
      },
      {
        title: "Creative Direction",
        href: "/services",
        description: "Expert creative guidance to bring your vision to life"
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
        description: "In-depth analysis of the global VFX industry landscape"
      },
      {
        title: "Industry Insights",
        href: "/vfx-industry-insights",
        description: "Data-driven insights into VFX industry trends and developments"
      },
      {
        title: "Help Center",
        href: "/help-center",
        description: "Resources, guides, and support for partners and clients"
      },
      {
        title: "Production Guidelines",
        href: "/production-guidelines",
        description: "Technical specifications and workflow guides for productions"
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
        description: "Create customized VFX contracts with our AI-powered builder"
      },
      {
        title: "Freelancer Portal",
        href: "/freelancer-portal",
        description: "Access your freelancer dashboard, projects and payments"
      }
    ]
  }
};

// Common utilities for navigation
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
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', path);
    }
  }
};
