
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
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
    <div className="min-h-screen flex flex-col w-full">
      <ScrollProgressIndicator />
      <Header />
      <main className="flex-1 pt-16 w-full">
        <div className="w-full max-w-none">
          {children || <Outlet />}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default MainLayout;
