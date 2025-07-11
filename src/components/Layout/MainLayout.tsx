
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import EnhancedCursor from '@/components/EnhancedCursor';
import WebGLParticleBackground from '@/components/WebGLParticleBackground';
import ShaderBackground from '@/components/ShaderBackground';
import AdaptiveColorScheme from '@/components/AdaptiveColorScheme';
import PageTransition from '@/components/PageTransition';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children?: React.ReactNode;
  pageKey?: string;
}

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <AdaptiveColorScheme>
      <div className="min-h-screen flex flex-col w-full relative">
        <ShaderBackground />
        <WebGLParticleBackground />
        <EnhancedCursor />
        <ScrollProgressIndicator />
        <Header />
        <main className="flex-1 pt-16 w-full relative z-10">
          <div className="w-full max-w-none">
            <PageTransition>
              {children || <Outlet />}
            </PageTransition>
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingThemeToggle />
        <Toaster />
      </div>
    </AdaptiveColorScheme>
  );
};

export default MainLayout;
