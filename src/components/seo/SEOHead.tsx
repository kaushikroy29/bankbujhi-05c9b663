import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  schema?: Record<string, any>;
}

const BASE_URL = "https://bankbujhi.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/og/og-home.jpg`;

const SEOHead = ({
  title,
  description,
  image,
  path,
  type = "website",
  schema
}: SEOHeadProps) => {
  const fullUrl = path ? `${BASE_URL}${path}` : BASE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  // Default Website Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BankBujhi",
    "url": BASE_URL,
    "description": "বাংলাদেশের ব্যাংক ও ক্রেডিট কার্ড তুলনা করুন - সহজ বাংলা ভাষায়",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/compare?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Prime Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="BankBujhi" />
      <meta property="og:locale" content="bn_BD" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(defaultSchema)}
      </script>
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
