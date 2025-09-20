import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const hostName = headersList.get('host') ?? 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';
  const baseUrl = `${protocol}://${hostName}`;

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
