import { useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHelmet
        title="Terms of Service - Fuke's Media"
        description="Read our terms of service to understand the rules and regulations for using Fuke's Media services."
        keywords="terms of service, user agreement, legal terms, service conditions"
        canonical="https://fukes-media.com/terms"
      />

      <MainLayout pageKey="terms">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <SectionTitle 
              title="Terms of Service" 
              subtitle="Terms and conditions for using our services"
            />
            
            <div className="max-w-4xl mx-auto mt-12 prose prose-lg dark:prose-invert">
              <div className="bg-card/30 p-8 rounded-lg border border-border/40">
                <h2>Acceptance of Terms</h2>
                <p>
                  By accessing and using Fuke's Media services, you accept and agree to be bound by the 
                  terms and provision of this agreement.
                </p>

                <h2>Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on Fuke's Media's 
                  website for personal, non-commercial transitory viewing only.
                </p>

                <h2>Disclaimer</h2>
                <p>
                  The materials on Fuke's Media's website are provided on an 'as is' basis. Fuke's Media 
                  makes no warranties, expressed or implied.
                </p>

                <h2>Limitations</h2>
                <p>
                  In no event shall Fuke's Media or its suppliers be liable for any damages arising out of 
                  the use or inability to use the materials on our website.
                </p>

                <h2>Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at legal@fukes-media.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Terms;