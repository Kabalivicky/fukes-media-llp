
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import EnhancedCursor from '@/components/EnhancedCursor';
import SpaceBackground from '@/components/SpaceBackground';
import EnhancedWorldTransitions from '@/components/EnhancedWorldTransitions';
import Enhanced3DSceneManager from '@/components/Enhanced3DSceneManager';
import EmotionDrivenUI from '@/components/EmotionDrivenUI';
import VoiceGestureNavigation from '@/components/VoiceGestureNavigation';
import ImmersiveNavigation from '@/components/ImmersiveNavigation';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children?: React.ReactNode;
  pageKey?: string;
}

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <EmotionDrivenUI>
      <Enhanced3DSceneManager>
        <div className="min-h-screen flex flex-col w-full relative">
          <SpaceBackground />
          <EnhancedCursor />
          <ScrollProgressIndicator />
          <Header />
          <main className="flex-1 pt-16 w-full relative z-10">
            <div className="w-full max-w-none">
              <EnhancedWorldTransitions>
                {children || <Outlet />}
              </EnhancedWorldTransitions>
            </div>
          </main>
          <Footer />
          <ScrollToTop />
          <FloatingThemeToggle />
          <ImmersiveNavigation />
          <VoiceGestureNavigation />
          <Toaster />
        </div>
      </Enhanced3DSceneManager>
    </EmotionDrivenUI>
  );
};

export default MainLayout;
