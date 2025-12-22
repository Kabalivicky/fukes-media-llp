import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Package, Sparkles, Heart, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundEffect from '@/components/BackgroundEffect';
import { AdBanner, DonationButtons, AffiliateLinks, DigitalProducts } from '@/components/Monetization';
import SectionTitle from '@/components/SectionTitle';

const Shop = () => {
  return (
    <>
      <Helmet>
        <title>Shop - Digital Products & Resources | Fukes Media</title>
        <meta
          name="description"
          content="Browse our collection of professional VFX assets, LUTs, presets, templates, and recommended tools for film and video production."
        />
      </Helmet>

      <div className="min-h-screen bg-background relative overflow-hidden">
        <BackgroundEffect />
        <Navbar />

        <main className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <SectionTitle
                title="Shop & Resources"
                subtitle="Professional VFX assets, tools, and resources to elevate your projects"
              />
            </motion.div>

            {/* Ad Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <AdBanner format="horizontal" />
            </motion.div>

            {/* Digital Products */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <DigitalProducts />
            </motion.section>

            {/* Support Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <DonationButtons />
            </motion.section>

            {/* Affiliate Links */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <AffiliateLinks />
            </motion.section>

            {/* Bottom Ad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AdBanner format="rectangle" />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
