import { getTranslations } from 'next-intl/server';

export type FooterNavLink = { label: string; href: string };
export type FooterNavSection = { title: string; links: FooterNavLink[] };

import { ROUTES } from '~/shared/components/constants/routes';

const UNIFIED_NEWS_ROUTE = ROUTES.NEWS;

export async function mapFooterNavigation(sections: FooterNavSection[]): Promise<FooterNavSection[]> {
  const tNav = await getTranslations('header.navLabels');

  const labels = {
    news: tNav('news'),
    events: tNav('events'),
    media: tNav('mediaAboutUs')
  };

  return sections.map((section) => ({
    ...section,
    links: section.links.flatMap((link) => {
      if (link.href !== UNIFIED_NEWS_ROUTE) {
        return link;
      }

      return [
        { label: labels.news, href: `${UNIFIED_NEWS_ROUTE}#news` },
        { label: labels.events, href: `${UNIFIED_NEWS_ROUTE}#events` },
        { label: labels.media, href: `${UNIFIED_NEWS_ROUTE}#media` }
      ];
    })
  }));
}
