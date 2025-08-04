
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import EnhancedCursor from '@/components/EnhancedCursor';
import SpaceBackground from '@/components/SpaceBackground';
import CinematicPageTransition from '@/components/CinematicPageTransition';
import EmotionDrivenUI from '@/components/EmotionDrivenUI';
import VoiceGestureNavigation from '@/components/VoiceGestureNavigation';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children?: React.ReactNode;
  pageKey?: string;
}

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <EmotionDrivenUI>
      <div className="min-h-screen flex flex-col w-full relative">
        <SpaceBackground />
        <EnhancedCursor />
        <ScrollProgressIndicator />
        <Header />
        <main className="flex-1 pt-16 w-full relative z-10">
          <div className="w-full max-w-none">
            <CinematicPageTransition>
              {children || <Outlet />}
            </CinematicPageTransition>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingThemeToggle />
        <VoiceGestureNavigation />
        <Toaster />
      </div>
    </EmotionDrivenUI>
  );
};

export default MainLayout;
