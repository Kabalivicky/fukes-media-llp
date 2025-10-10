
import Navbar from '@/components/Navbar';
import ProductionGuidelines from '@/components/HelpCenter/ProductionGuidelines';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const ProductionGuidelinesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero banner */}
      <section className="pt-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center mb-4">
            <Breadcrumb className="text-sm text-white/80">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Fuke's Media</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/help-center">Partner Help Center</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span>Production Guidelines</span>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Production & Post-Production Guidelines</h1>
          <p className="mt-4 max-w-3xl">
            Technical specifications, best practices, and workflow guides for Fuke's Media productions
          </p>
        </div>
      </section>
      
      {/* Guidelines content */}
      <section className="bg-background py-8">
        <div className="container mx-auto">
          <div className="bg-card shadow-lg rounded-lg overflow-hidden">
            <ProductionGuidelines />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionGuidelinesPage;
