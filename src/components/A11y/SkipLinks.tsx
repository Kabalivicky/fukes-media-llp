import { Button } from '@/components/ui/button';

interface SkipLink {
  href: string;
  label: string;
}

const defaultLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#services', label: 'Skip to services' },
  { href: '#portfolio', label: 'Skip to portfolio' },
  { href: '#contact', label: 'Skip to contact' },
];

interface SkipLinksProps {
  links?: SkipLink[];
}

/**
 * Accessible skip links for keyboard navigation
 */
const SkipLinks = ({ links = defaultLinks }: SkipLinksProps) => {
  return (
    <nav
      aria-label="Skip links"
      className="fixed top-0 left-0 z-[100] -translate-y-full focus-within:translate-y-0 transition-transform"
    >
      <ul className="flex flex-wrap gap-2 p-2 bg-background border-b border-border">
        {links.map((link) => (
          <li key={link.href}>
            <Button
              asChild
              variant="default"
              size="sm"
              className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <a href={link.href}>{link.label}</a>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SkipLinks;
