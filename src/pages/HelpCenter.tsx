
import { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/SectionTitle';
import { Input } from '@/components/ui/input';
import HelpCategoryCard from '@/components/HelpCenter/HelpCategoryCard';
import TopArticles from '@/components/HelpCenter/TopArticles';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Help center categories with their icons and descriptions
  const categories = [
    {
      id: 'imaging',
      name: 'Imaging',
      icon: '/lovable-uploads/078b7692-904e-4572-b0ff-9679ba8c0d17.png',
      description: 'Camera requirements, image capture, color workflows and best practices'
    },
    {
      id: 'sound',
      name: 'Sound',
      icon: '/lovable-uploads/e4894ec2-ac14-43ca-9872-8168b5459282.png',
      description: 'Production sound recording, music and effects, mix and delivery specifications'
    },
    {
      id: 'delivery',
      name: 'Delivery',
      icon: '/lovable-uploads/9b44c662-ddd2-491c-a33b-ff542cfb1ede.png',
      description: 'Specifications, best practices, and delivery tools & procedures'
    },
    {
      id: 'quality-control',
      name: 'Quality Control',
      icon: '/lovable-uploads/c0057123-10a6-4ffd-9e5e-854a7569c5a0.png',
      description: 'Asset QC, error codes, tooling for branded content'
    },
    {
      id: 'visual-effects',
      name: 'Visual Effects',
      icon: '/lovable-uploads/deace8a3-ac11-4347-b516-084dde66cd31.png',
      description: 'Content hub, production tracking, specifications & best practices'
    },
    {
      id: 'virtual-production',
      name: 'Virtual Production',
      icon: '/lovable-uploads/f276964c-0fd9-4e3a-a72b-e78d08802adc.png',
      description: 'Overview, production context, plate capture & infrastructure'
    },
    {
      id: 'dubbed-audio',
      name: 'Dubbed Audio Resources',
      icon: '/lovable-uploads/84174699-1450-41e7-b201-b809628d5ae1.png',
      description: 'Scopes of work, style guides, creative excellence guidelines'
    },
    {
      id: 'globalization',
      name: 'Globalization',
      icon: '/lovable-uploads/a2cbc073-49de-4be1-b921-18d59140d65b.png',
      description: 'Latest updates, billing, guidelines, programs and tools'
    },
    {
      id: 'production-health',
      name: 'Production Health & Safety',
      icon: '/lovable-uploads/d6b387bb-c9bf-4092-a0f1-fce5bb1be574.png',
      description: 'Policies, toolbox talks, forms, bulletins, manuals and resources'
    },
    {
      id: 'production-international',
      name: 'Production International SOS',
      icon: '/lovable-uploads/b8660dbb-b8aa-4753-bb94-216ee028a058.png',
      description: 'International SOS partner-managed resources and support'
    },
    {
      id: 'talent-privacy',
      name: 'Talent & Crew Privacy Notices',
      icon: '/lovable-uploads/a0202abb-735a-4218-96e9-1912399217fe.png',
      description: 'EEA translations, ROW translations, US talent & crew notices'
    },
    {
      id: 'data-protection',
      name: 'Data Protection Schedules',
      icon: '/lovable-uploads/4958fcde-4ede-49f3-acfd-99862da87e00.png',
      description: 'EEA & UK and ROW data protection schedules'
    },
    {
      id: 'content-security',
      name: 'Content and Information Security',
      icon: '/lovable-uploads/87f5cda0-02a7-4be1-999d-ae767e67211b.png',
      description: 'Resources for productions and vendors on content security'
    },
    {
      id: 'screenings',
      name: 'Screenings and Reviews',
      icon: '/lovable-uploads/56876f2f-b686-4533-922f-bb049d45b801.png',
      description: 'Asset delivery specs, screenings & reviews, critical mix & color reviews'
    },
    {
      id: 'animation',
      name: 'Animation',
      icon: '/lovable-uploads/d6df5e90-57cb-4ba7-8f10-0cf16f20c2c0.png',
      description: 'Partner deliveries, automatic downloads, pipeline overview'
    },
    {
      id: 'branded-content',
      name: 'Branded Content QC',
      icon: '/lovable-uploads/cc4e62e7-c366-4823-9bfa-1c232251ffb8.png',
      description: 'Working in Asset QC, QC issues, error code glossary'
    }
  ];

  // Top articles to display in the banner
  const topArticles = [
    "Cameras & Image Capture: Requirements and Best Practices",
    "Backlog Overview - Delivery Page for IMF Deliveries",
    "Backlog Overview - Delivery Page",
    "Authoring Tool: Dubbed Audio Reference When Updating the As Recorded Dubbing Script",
    "Fuke's Media Confidentiality & NDA Obligations",
    "Fuke's Media Content Security Requirements"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero section with search */}
      <section className="pt-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/lovable-uploads/a0ad627e-2387-4f68-9856-c313d6d46f87.png" 
                alt="Fuke's Media Logo" 
                className="h-8" 
              />
              <span className="text-xl font-semibold">PARTNER HELP CENTER</span>
            </div>
            
            <div className="relative w-full max-w-3xl mb-8">
              <Input
                type="text"
                placeholder="Search"
                className="bg-white/90 border-0 pl-10 h-12 rounded text-black placeholder:text-gray-500 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            
            {/* Top articles */}
            <TopArticles articles={topArticles} />
          </div>
        </div>
      </section>
      
      {/* Categories grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Help Center Categories"
            subtitle="Find resources, specifications, and guidelines for Fuke's Media partnership"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <HelpCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Support section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="inline-block w-8 h-8 bg-red-600 rounded-full mr-3 flex items-center justify-center text-white">
                  ?
                </span>
                Submit a Request
              </h3>
              <p className="text-muted-foreground mb-4">
                Have a question or need help with an issue? Send us a ticket and we'll help you to a resolution.
              </p>
              <Button variant="default" className="gradient-button">
                Contact Support
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="inline-block w-8 h-8 bg-red-600 rounded-full mr-3 flex items-center justify-center text-white">
                  ★
                </span>
                Partner Management Programs
              </h3>
              <p className="text-muted-foreground mb-4">
                Discover how the Fuke's Media Partner Management Programs can help with your projects and equipment considerations.
              </p>
              <Button variant="default" className="gradient-button">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
