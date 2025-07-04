
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import { Toaster } from '@/components/ui/toaster';

interface MainLayoutProps {
  children?: React.ReactNode;
  pageKey?: string;
}

const MainLayout = ({ children, pageKey }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgressIndicator />
      <Navbar />
      <main className="flex-1 pt-16">
        {children || <Outlet />}
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default MainLayout;
