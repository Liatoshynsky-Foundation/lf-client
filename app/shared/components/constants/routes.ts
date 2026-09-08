export const ROUTES = {
  HOME: '/',
  WAR_IN_UKRAINE: '/war-in-ukraine',
  COOPERATION: '/cooperation',
  ARCHIVE: '/archive',
  ABOUT_US: '/about-us',
  NEWS: '/news',
  EVENTS: '/events',
  CONTACTS: '/contacts',
  BIOGRAPHY: '/biography',
  ARTISTRY: '/artistry',
  RESEARCH: '/research',
  SUPPORT_US: '/support-us',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms'
} as const;

export const getDynamicRoute = {
  archiveFund: (id: string | number) => `${ROUTES.ARCHIVE}/${id}`,
  archiveCase: (fundId: string | number, caseId: string | number) => `${ROUTES.ARCHIVE}/${fundId}/${caseId}`,
  newsItem: (slug: string) => `${ROUTES.NEWS}/${slug}`,
  opus: (slug: string | number) => `${ROUTES.ARTISTRY}/${slug}`
};

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
