import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DynamicHeader from '@/components/DynamicHeader';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import { Toaster } from '@/components/ui/toaster';
import LightweightBackground from '@/components/LightweightBackground';
import PageTransition from '@/components/PageTransition';
import PageLoadingBar from '@/components/PageLoadingBar';
import ScrollPercentageIndicator from '@/components/ScrollPercentageIndicator';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <PageLoadingBar />
      <LightweightBackground />
      <DynamicHeader />
      <main className="flex-1 pt-16 w-full relative z-10" id="main-content">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <div className="w-full max-w-none">
              {children || <Outlet />}
            </div>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingThemeToggle />
      <ScrollPercentageIndicator />
      <Toaster />
    </div>
  );
};

export default MainLayout;
