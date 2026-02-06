import { useEffect } from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import ContactHero from '@/components/Contact/ContactHero';
import ContactMethodCards from '@/components/Contact/ContactMethodCards';
import ContactForm from '@/components/Contact/ContactForm';
import ContactMap from '@/components/Contact/ContactMap';
import WhatsAppButton from '@/components/Contact/WhatsAppButton';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fuke's Media LLP",
    "description": "Award-winning VFX and visual effects studio in Bengaluru, India. Specializing in film, TV, commercial VFX, and AI-assisted production.",
    "url": "https://fukes-media.com/contact",
    "telephone": ["+91-636-228-1003", "+91-991-625-4096", "+91-966-362-5519"],
    "email": ["info@fukesmedia.com", "business@fukesmedia.com", "projects@fukesmedia.com"],
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Kumaraswamy Layout, 2nd Stage",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560078",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Kathriguppe IV Phase, Banashankari",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560070",
        "addressCountry": "IN"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "19:00"
    },
    "image": "https://fukes-media.com/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png",
    "priceRange": "$$$",
    "sameAs": [
      "https://twitter.com/fukesmedia"
    ]
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHelmet
        title="Contact Us - Start Your VFX Project Today"
        description="Contact Fuke's Media for VFX consultation, project quotes, and creative partnerships. Award-winning studio in Bengaluru with 24h response time."
        keywords="contact VFX studio, VFX consultation, project quote, visual effects Bengaluru, Fuke's Media contact, VFX India"
        canonical="https://fukes-media.com/contact"
        structuredData={structuredData}
      />

      <ContactHero />
      <ContactMethodCards />
      <ContactForm />
      <ContactMap />
      <WhatsAppButton />
    </main>
  );
};

export default Contact;
