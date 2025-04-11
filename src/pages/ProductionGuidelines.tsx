
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductionGuidelines from '@/components/HelpCenter/ProductionGuidelines';

const ProductionGuidelinesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero banner */}
      <section className="pt-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center">
            <div className="breadcrumbs text-sm mb-4">
              <span>Fuke's Media | Partner Help Center — Production Guidelines</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Production & Post-Production Guidelines</h1>
          <p className="mt-4 max-w-3xl">
            Technical specifications, best practices, and workflow guides for Fuke's Media productions
          </p>
        </div>
      </section>
      
      {/* Guidelines content */}
      <section className="bg-background">
        <ProductionGuidelines />
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductionGuidelinesPage;
