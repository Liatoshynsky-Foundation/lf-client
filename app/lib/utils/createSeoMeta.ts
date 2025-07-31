import { Metadata } from 'next';

interface CreateSeoMetaProps {
  title: string;
  description: string;
  url: string;
  keywords?: string[];
  imageUrl?: string;
  locale?: string;
}

export function createSeoMeta({
  title,
  description,
  url,
  keywords = [],
  imageUrl = '/images/liatoshynsky-thumbnail.jpg',
  locale = 'uk'
}: CreateSeoMetaProps): Metadata {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000';
  const fullUrl = `${baseUrl}/${locale}${url}`;

  const locales = ['uk_UA', 'en_US'];
  const currentLocale = locales.find((loc) => loc.startsWith(locale));
  const alternateLocale = locales.find((loc) => loc !== currentLocale);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Liatoshynsky Foundation',
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
