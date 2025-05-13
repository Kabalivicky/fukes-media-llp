
import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: Record<string, any>;
  lang?: string;
  noindex?: boolean;
}

const SEOHelmet = ({
  title,
  description,
  keywords = "VFX, visual effects, creative studio, AI, digital media",
  ogImage = "/lovable-uploads/a0ad627e-2387-4f68-9856-c313d6d46f87.png",
  canonical,
  structuredData,
  lang = "en",
  noindex = false,
}: SEOHelmetProps) => {
  // Make sure title doesn't exceed recommended length
  const trimmedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Make sure description doesn't exceed recommended length
  const trimmedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{trimmedTitle}</title>
      <meta name="description" content={trimmedDescription} />
      <meta name="keywords" content={keywords} />
      
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={trimmedTitle} />
      <meta property="og:description" content={trimmedDescription} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={trimmedTitle} />
      <meta name="twitter:description" content={trimmedDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Structured Data for SEO */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
