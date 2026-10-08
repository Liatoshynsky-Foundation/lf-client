import { Metadata } from 'next';

interface CreateSeoMetaProps {
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  imageAlt?: string;
  locale?: string;
  keywords?: string | string[];
  allowIndexation?: boolean;
}

export function createSeoMeta({
  title,
  description,
  url,
  imageUrl = '/opengraph-image.png',
  imageAlt,
  locale = 'uk',
  keywords,
  allowIndexation
}: CreateSeoMetaProps): Metadata {
  const baseUrl = process.env.CLIENT_BASE_URL;
  const fullUrl = `${baseUrl}/${locale}${url}`;

  const locales = ['uk_UA', 'en_US'];
  const currentLocale = locales.find((loc) => loc.startsWith(locale));
  const alternateLocale = locales.find((loc) => loc !== currentLocale);

  const stableImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  const stableImageAlt = imageAlt || title;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico'
    },
    ...(allowIndexation !== undefined
      ? {
          robots: {
            index: allowIndexation,
            follow: allowIndexation
          }
        }
      : {}),
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'liatoshynsky.com',
      locale: currentLocale,
      alternateLocale,
      type: 'website',
      images: [
        {
          url: stableImageUrl,
          width: 1200,
          height: 630,
          alt: stableImageAlt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [stableImageUrl]
    },
    alternates: {
      canonical: fullUrl
    }
  };
}
