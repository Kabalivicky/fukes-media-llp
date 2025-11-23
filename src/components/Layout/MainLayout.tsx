
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import DraggableThemeToggle from '@/components/DraggableThemeToggle';
import { Toaster } from '@/components/ui/toaster';
import GlobalScrollProgress from '@/components/GlobalScrollProgress';
import StickyCTAs from '@/components/StickyCTAs';
import CustomCursor from '@/components/CustomCursor';

interface MainLayoutProps {
  children?: React.ReactNode;
  pageKey?: string;
}

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <>
      <GlobalScrollProgress />
      <CustomCursor />
      <div className="min-h-screen flex flex-col w-full relative cursor-none">
        <Navbar />
        <main className="flex-1 pt-16 w-full relative z-10" id="main-content">
          <div className="w-full max-w-none">
            {children || <Outlet />}
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <StickyCTAs />
        <DraggableThemeToggle />
        <Toaster />
      </div>
    </>
  );
};

export default MainLayout;
