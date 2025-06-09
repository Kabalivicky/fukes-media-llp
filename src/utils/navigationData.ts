
// Re-export all navigation data and utilities from modular files
export type { NavLink, DropdownItem, DropdownSection } from './navigation/types';
export { mainNavLinks, homeAnchorLinks } from './navigation/links';
export { megaMenuSections } from './navigation/dropdowns';
export { isLinkActive, handleAnchorClick } from './navigation/helpers';
