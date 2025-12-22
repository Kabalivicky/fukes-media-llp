import { useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import SEOHelmet from '@/components/SEOHelmet';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHelmet
        title="Privacy Policy - Fuke's Media"
        description="Learn about how Fuke's Media collects, uses, and protects your personal information in our comprehensive privacy policy."
        keywords="privacy policy, data protection, GDPR compliance, user privacy"
        canonical="https://fukes-media.com/privacy"
      />

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionTitle 
            title="Privacy Policy" 
            subtitle="How we collect, use, and protect your information"
          />
          
          <div className="max-w-4xl mx-auto mt-12 prose prose-lg dark:prose-invert">
            <div className="bg-card/30 p-8 rounded-lg border border-border/40">
              <h2>Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                contact us, or use our services.
              </p>

              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, and communicate with you.
              </p>

              <h2>Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>

              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@fukes-media.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
