
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import { Toaster } from '@/components/ui/toaster';
import { useTheme } from '@/components/ui/theme-provider';

const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgressIndicator />
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default MainLayout;
