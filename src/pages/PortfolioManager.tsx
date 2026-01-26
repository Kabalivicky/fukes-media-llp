import PortfolioManager from '@/components/Portfolio/PortfolioManager';
import SEOHelmet from '@/components/SEOHelmet';

const PortfolioManagerPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHelmet
        title="Portfolio Manager | Showcase Your Work"
        description="Manage your portfolio items and showcase your best work to attract clients."
      />
      <PortfolioManager />
    </div>
  );
};

export default PortfolioManagerPage;
