import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000';
  const languages = ['en', 'uk'];
  const staticPages = ['', '/artistry'];

  const staticRoutes: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    staticPages.forEach((page) => {
      staticRoutes.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(languages.map((altLang) => [altLang, `${baseUrl}/${altLang}${page}`]))
        }
      });
    });
  });

  return staticRoutes;
}
