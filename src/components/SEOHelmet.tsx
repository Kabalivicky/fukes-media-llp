import { Helmet } from 'react-helmet-async';

interface SEOHelmetProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  structuredData?: Record<string, unknown>;
  lang?: string;
  noindex?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  articleType?: 'article' | 'website' | 'product' | 'service';
}

const SEOHelmet = ({
  title,
  description,
  keywords = "VFX, visual effects, creative studio, AI, digital media, Fuke's Media",
  ogImage = "/lovable-uploads/173b4ebf-d33a-4c15-bd6e-9038e214c933.png",
  canonical,
  structuredData,
  lang = "en",
  noindex = false,
  author = "Fuke's Media LLP",
  publishedTime,
  modifiedTime,
  section,
  articleType = 'website',
}: SEOHelmetProps) => {
  // Make sure title doesn't exceed recommended length
  const trimmedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  
  // Make sure description doesn't exceed recommended length
  const trimmedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  // Generate absolute URL for images
  const absoluteOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `https://fukes-media.com${ogImage}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{trimmedTitle}</title>
      <meta name="description" content={trimmedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Social Media */}
      <meta property="og:title" content={trimmedTitle} />
      <meta property="og:description" content={trimmedDescription} />
      <meta property="og:type" content={articleType} />
      <meta property="og:site_name" content="Fuke's Media" />
      <meta property="og:locale" content="en_US" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={trimmedTitle} />
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fukesmedia" />
      <meta name="twitter:creator" content="@fukesmedia" />
      <meta name="twitter:title" content={trimmedTitle} />
      <meta name="twitter:description" content={trimmedDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={trimmedTitle} />
      
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
