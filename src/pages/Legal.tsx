import { useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';

const Legal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHelmet
        title="Legal Information - Fuke's Media"
        description="Legal information, compliance, and regulatory details for Fuke's Media services."
        keywords="legal information, compliance, regulations, copyright, intellectual property"
        canonical="https://fukes-media.com/legal"
      />

      <MainLayout pageKey="legal">
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <SectionTitle 
              title="Legal Information" 
              subtitle="Legal compliance and regulatory information"
            />
            
            <div className="max-w-4xl mx-auto mt-12 prose prose-lg dark:prose-invert">
              <div className="bg-card/30 p-8 rounded-lg border border-border/40">
                <h2>Company Information</h2>
                <p>
                  Fuke's Media LLP is a limited liability partnership registered in India, 
                  specializing in visual effects and creative services.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                  All content, trademarks, and intellectual property on this website are owned by 
                  Fuke's Media LLP unless otherwise stated.
                </p>

                <h2>Copyright Notice</h2>
                <p>
                  © 2025 Fuke's Media LLP. All rights reserved. No part of this website may be 
                  reproduced without written permission.
                </p>

                <h2>Compliance</h2>
                <p>
                  We comply with all applicable laws and regulations in the jurisdictions where we operate, 
                  including data protection and privacy laws.
                </p>

                <h2>Dispute Resolution</h2>
                <p>
                  Any disputes arising from the use of our services shall be governed by Indian law and 
                  resolved through appropriate legal channels.
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Legal;