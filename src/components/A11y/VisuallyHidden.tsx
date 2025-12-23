import { ReactNode } from 'react';

interface VisuallyHiddenProps {
  children: ReactNode;
}

/**
 * Visually hidden component for screen reader only content
 */
const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
};

export default VisuallyHidden;
