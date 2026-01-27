import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
}

const BASE_URL = "https://bankbujhi.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/og/og-home.jpg`;

const updateMetaTag = (selector: string, attribute: string, content: string) => {
  let element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, content);
  }
};

const SEOHead = ({ 
  title, 
  description, 
  image, 
  path, 
  type = "website" 
}: SEOHeadProps) => {
  const fullUrl = path ? `${BASE_URL}${path}` : BASE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  useEffect(() => {
    // Store original values for cleanup
    const originalTitle = document.title;

    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag('meta[name="description"]', "content", description);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', "content", title);
    updateMetaTag('meta[property="og:description"]', "content", description);
    updateMetaTag('meta[property="og:image"]', "content", ogImage);
    updateMetaTag('meta[property="og:url"]', "content", fullUrl);
    updateMetaTag('meta[property="og:type"]', "content", type);

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', "content", title);
    updateMetaTag('meta[name="twitter:description"]', "content", description);
    updateMetaTag('meta[name="twitter:image"]', "content", ogImage);

    // Cleanup on unmount - restore original title
    return () => {
      document.title = originalTitle;
    };
  }, [title, description, ogImage, fullUrl, type]);

  return null;
};

export default SEOHead;
