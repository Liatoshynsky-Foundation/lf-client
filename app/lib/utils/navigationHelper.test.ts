jest.mock('~/infrastructure/repositories/navigation/navigation.repository', () => {
  return jest.fn();
});

import { getNavigationLink, getNavigationLinkByHref, getNavigationLinkByLabel } from './navigationHelper';

import newNavigationRepository from '~/infrastructure/repositories/navigation/navigation.repository';

const mockNavigationData = [
  {
    title: { uk: 'Борис Лятошинський', en: 'Borys Liatoshynskyi' },
    links: [
      { label: { uk: 'Біографія', en: 'Biography' }, href: '/biography' },
      { label: { uk: 'Дослідження', en: 'Research' }, href: '/research' },
      { label: { uk: 'Мистецтво', en: 'Artistry' }, href: '/artistry' }
    ]
  },
  {
    title: { uk: 'Фундація', en: 'Foundation' },
    links: [
      { label: { uk: 'Про нас', en: 'About Us' }, href: '/about-us' },
      { label: { uk: 'Новини', en: 'News' }, href: '/news' },
      { label: { uk: 'Підтримати нас', en: 'Support Us' }, href: '/support-us' },
      { label: { uk: 'Контакти', en: 'Contacts' }, href: '/contacts' }
    ]
  },
  {
    title: { uk: 'Архів', en: 'Archive' },
    links: [{ label: { uk: 'Архів', en: 'Archive' }, href: '/archive' }]
  },
  {
    title: { uk: 'Співпраця', en: 'Cooperation' },
    links: [{ label: { uk: 'Співпраця', en: 'Cooperation' }, href: '/cooperation' }]
  }
];

describe('navigationHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockGetNavigation = jest.fn().mockResolvedValue(mockNavigationData);
    (newNavigationRepository as jest.Mock).mockReturnValue({
      getNavigation: mockGetNavigation
    });
  });

  describe('getNavigationLinkByHref', () => {
    it('should return the href when exact match is found', async () => {
      const result = await getNavigationLinkByHref('/archive');
      expect(result).toBe('/archive');
    });

    it('should return the href for single-link navigation items', async () => {
      const result = await getNavigationLinkByHref('/cooperation');
      expect(result).toBe('/cooperation');
    });

    it('should return undefined when href is not found', async () => {
      const result = await getNavigationLinkByHref('/non-existent');
      expect(result).toBeUndefined();
    });

    it('should return undefined for multi-link navigation items (no direct href)', async () => {
      const result = await getNavigationLinkByHref('/about-us');
      expect(result).toBeUndefined();
    });
  });

  describe('getNavigationLinkByLabel', () => {
    it('should find link by Ukrainian label (exact match)', async () => {
      const result = await getNavigationLinkByLabel('Архів');
      expect(result).toBe('/archive');
    });

    it('should find link by English label (exact match)', async () => {
      const result = await getNavigationLinkByLabel('Archive');
      expect(result).toBe('/archive');
    });

    it('should find link by Ukrainian label (partial match)', async () => {
      const result = await getNavigationLinkByLabel('архів');
      expect(result).toBe('/archive');
    });

    it('should find link by English label (partial match)', async () => {
      const result = await getNavigationLinkByLabel('arch');
      expect(result).toBe('/archive');
    });

    it('should be case-insensitive', async () => {
      const result = await getNavigationLinkByLabel('ARCHIVE');
      expect(result).toBe('/archive');
    });

    it('should return undefined when label is not found', async () => {
      const result = await getNavigationLinkByLabel('NonExistent');
      expect(result).toBeUndefined();
    });
  });

  describe('getNavigationLink', () => {
    it('should find link by exact href match', async () => {
      const result = await getNavigationLink('/archive');
      expect(result).toBe('/archive');
    });

    it('should find link by label search when href does not match', async () => {
      const result = await getNavigationLink('/non-existent', 'archive');
      expect(result).toBe('/archive');
    });

    it('should find matching link by href or label (whichever comes first)', async () => {
      const result = await getNavigationLink('/cooperation', 'archive');
      expect(result).toBe('/archive');
    });

    it('should return fallback when neither href nor label matches', async () => {
      const result = await getNavigationLink('/non-existent', 'also-non-existent', '/default');
      expect(result).toBe('/default');
    });

    it('should use href as default fallback when fallback is not provided', async () => {
      const result = await getNavigationLink('/non-existent', 'also-non-existent');
      expect(result).toBe('/non-existent');
    });

    it('should work with Ukrainian label search', async () => {
      const result = await getNavigationLink('/test', 'архів', '/fallback');
      expect(result).toBe('/archive');
    });

    it('should be case-insensitive for label search', async () => {
      const result = await getNavigationLink('/test', 'ARCHIVE', '/fallback');
      expect(result).toBe('/archive');
    });

    it('should work without label search parameter', async () => {
      const result = await getNavigationLink('/cooperation');
      expect(result).toBe('/cooperation');
    });
  });

  describe('integration scenarios', () => {
    it('should handle archive link lookup (LiatoshynskyOffice use case)', async () => {
      const result = await getNavigationLink('/archive', 'archive');
      expect(result).toBe('/archive');
    });

    it('should handle missing archive with fallback', async () => {
      (newNavigationRepository as jest.Mock).mockReturnValue({
        getNavigation: jest.fn().mockResolvedValue([])
      });

      const result = await getNavigationLink('/archive', 'archive', '/archive');
      expect(result).toBe('/archive');
    });

    it('should correctly transform navigation with single link', async () => {
      const result = await getNavigationLink('/cooperation');
      expect(result).toBe('/cooperation');
    });

    it('should return undefined for multi-link items when searching by href only', async () => {
      const result = await getNavigationLinkByHref('/about-us');
      expect(result).toBeUndefined();
    });
  });
});
