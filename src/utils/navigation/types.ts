
import React from 'react';

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
