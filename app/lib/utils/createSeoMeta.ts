import { Metadata } from 'next';

interface CreateSeoMetaProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  locale?: string;
}

export function createSeoMeta({
  title,
  description,
  url,
  imageUrl = '/opengraph-image.png',
  locale = 'uk'
}: CreateSeoMetaProps): Metadata {
  const baseUrl = process.env.CLIENT_BASE_URL;
  const fullUrl = `${baseUrl}/${locale}${url}`;

  const locales = ['uk_UA', 'en_US'];
  const currentLocale = locales.find((loc) => loc.startsWith(locale));
  const alternateLocale = locales.find((loc) => loc !== currentLocale);

  return {
    title,
    description,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico'
    },
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
          url: `${baseUrl}${imageUrl}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${imageUrl}`]
    },
    alternates: {
      canonical: fullUrl
    }
  };
}
