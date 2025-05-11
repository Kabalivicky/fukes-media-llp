
import * as React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, href, icon, onClick, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={href}
            className={cn(
              "flex select-none flex-col space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative overflow-hidden group",
              className
            )}
            onClick={onClick}
            {...props}
          >
            {/* Hover background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-md opacity-0 group-hover:opacity-100"
              initial={false}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            
            <motion.div 
              className="flex items-center text-sm font-medium leading-none relative z-10"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon && (
                <motion.span 
                  className="mr-2 text-primary"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {icon}
                </motion.span>
              )}
              {title}
            </motion.div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground relative z-10">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default ListItem;
