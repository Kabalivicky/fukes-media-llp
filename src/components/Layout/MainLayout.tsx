import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import { Toaster } from '@/components/ui/toaster';
import LightweightBackground from '@/components/LightweightBackground';

interface MainLayoutProps {
  children?: React.ReactNode;
  pageKey?: string;
}

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <LightweightBackground />
      <Header />
      <main className="flex-1 pt-16 w-full relative z-10" id="main-content">
        <div className="w-full max-w-none">
          {children || <Outlet />}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingThemeToggle />
      <Toaster />
    </div>
  );
};

export default MainLayout;
