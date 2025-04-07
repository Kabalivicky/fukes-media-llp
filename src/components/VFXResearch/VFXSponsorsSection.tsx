import { useState } from 'react';

import franceVFXLogo from '/placeholder.svg';
import accessVFXLogo from '/placeholder.svg';
import hdrConsultingLogo from '/placeholder.svg';
import digikoreVFXLogo from '/placeholder.svg';

const VFXSponsorsSection = () => {
  const platinumSponsors = [
    {
      name: "FranceVFX",
      logo: franceVFXLogo,
      description: "Visual Effects Vendors Association offering up to 40% tax rebate for international productions."
    }
  ];
  
  const goldSponsors = [
    {
      name: "ACCESS:VFX",
      logo: accessVFXLogo,
      description: "A global, industry-led initiative pursuing inclusion, diversity, awareness and opportunity in VFX."
    },
    {
      name: "HDRI Consulting",
      logo: hdrConsultingLogo,
      description: "Industry-leading insights for Visual Effects, Animation and Gaming. Growth | Strategy | M&A"
    }
  ];
  
  const silverSponsors = [
    {
      name: "Digikore Visual Effects",
      logo: digikoreVFXLogo,
      description: "Your trusted VFX vendor offering Canadian and Indian rebates with studios in Los Angeles, Montreal, Pune, and Tokyo."
    }
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold neon-text-orange">Industry Partners & Sponsors</h2>
        <p className="text-white/70">
          The Visual Effects World Atlas is made possible by the support of these organizations
        </p>
      </div>
      
      <div className="space-y-12">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center text-white/60">PLATINUM SPONSORS</h3>
          <div className="grid grid-cols-1 gap-6">
            {platinumSponsors.map((sponsor, index) => (
              <div key={index} className="glass p-6 rounded-xl hover:bg-white/5 transition">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-full md:w-1/3 bg-white p-4 rounded-lg flex items-center justify-center">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      className="max-w-full h-auto max-h-32 object-contain"
                    />
                  </div>
                  <div className="w-full md:w-2/3 space-y-3">
                    <h4 className="text-xl font-semibold">{sponsor.name}</h4>
                    <p className="text-white/80">{sponsor.description}</p>
                    <button className="text-primary hover:text-primary/80 transition text-sm flex items-center mt-2">
                      Visit website
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center text-white/60">GOLD SPONSORS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goldSponsors.map((sponsor, index) => (
              <div key={index} className="glass p-6 rounded-xl hover:bg-white/5 transition h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center mb-4">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      className="max-w-full h-auto max-h-24 object-contain"
                    />
                  </div>
                  <div className="space-y-3 flex-grow">
                    <h4 className="text-lg font-semibold">{sponsor.name}</h4>
                    <p className="text-white/80 text-sm">{sponsor.description}</p>
                  </div>
                  <button className="text-secondary hover:text-secondary/80 transition text-sm flex items-center mt-4">
                    Visit website
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center text-white/60">SILVER SPONSORS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {silverSponsors.map((sponsor, index) => (
              <div key={index} className="glass p-6 rounded-xl hover:bg-white/5 transition h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-white p-3 rounded-lg flex items-center justify-center mb-4">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      className="max-w-full h-auto max-h-20 object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-base font-semibold">{sponsor.name}</h4>
                    <p className="text-white/80 text-xs mt-2">{sponsor.description}</p>
                  </div>
                  <button className="text-accent hover:text-accent/80 transition text-xs flex items-center mt-3">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Want to contribute to the next edition?</h3>
          <p className="text-white/80 mb-4">
            Help improve future editions by sending corrections and suggestions to info@vfxatlas.com
          </p>
          <button className="gradient-button px-6 py-2 rounded-full text-white/90 hover:text-white">
            Contact the Research Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default VFXSponsorsSection;
