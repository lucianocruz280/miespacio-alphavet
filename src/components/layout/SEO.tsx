import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

export default function SEO({
  title,
  description,
  image = "/images/logo.png",
  url,
  type = "website",
  keywords = "veterinaria, clinica veterinaria, mascotas, citas veterinarias, historial medico mascotas, vacunas, alphavet, pet care",
}: SEOProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const siteTitle = title || t("seo.title") || "AlphaVet - Centro Médico Veterinario";
  const siteDescription = description || t("seo.description") || "Cuidamos a quienes más amas con la mejor tecnología, profesionales especializados y el cariño que merecen.";
  
  // Resolve the domain dynamically for crawlers (like WhatsApp) that require absolute URLs
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "https://alphavet.com"; // Default fallback
  };

  const defaultBaseUrl = getBaseUrl();
  const absoluteImageUrl = image.startsWith("http") ? image : `${defaultBaseUrl}${image}`;
  const absolutePageUrl = url || (typeof window !== "undefined" ? window.location.href : `${defaultBaseUrl}${router.asPath}`);

  return (
    <Head>
      {/* Basic HTML Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={absolutePageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:url" content={absolutePageUrl} />
      <meta property="og:site_name" content="AlphaVet" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:url" content={absolutePageUrl} />
    </Head>
  );
}
