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
    it.each([
      ['/archive', '/archive', 'exact match'],
      ['/cooperation', '/cooperation', 'single-link navigation item']
    ])('should return the href when %s', async (href, expected) => {
      const result = await getNavigationLinkByHref(href);
      expect(result).toBe(expected);
    });

    it.each([
      ['/non-existent', 'href is not found'],
      ['/about-us', 'multi-link navigation item (no direct href)']
    ])('should return undefined when %s', async (href) => {
      const result = await getNavigationLinkByHref(href);
      expect(result).toBeUndefined();
    });
  });

  describe('getNavigationLinkByLabel', () => {
    it.each([
      ['Архів', '/archive', 'Ukrainian label (exact match)'],
      ['Archive', '/archive', 'English label (exact match)'],
      ['архів', '/archive', 'Ukrainian label (partial match)'],
      ['arch', '/archive', 'English label (partial match)'],
      ['ARCHIVE', '/archive', 'case-insensitive search']
    ])('should find link by %s', async (label, expected) => {
      const result = await getNavigationLinkByLabel(label);
      expect(result).toBe(expected);
    });

    it('should return undefined when label is not found', async () => {
      const result = await getNavigationLinkByLabel('NonExistent');
      expect(result).toBeUndefined();
    });
  });

  describe('getNavigationLink', () => {
    it.each([
      ['/archive', undefined, undefined, '/archive', 'exact href match'],
      ['/non-existent', 'archive', undefined, '/archive', 'label search when href does not match'],
      ['/cooperation', 'archive', undefined, '/archive', 'href or label (whichever comes first)'],
      ['/non-existent', 'also-non-existent', '/default', '/default', 'fallback when neither href nor label matches'],
      ['/non-existent', 'also-non-existent', undefined, '/non-existent', 'href as default fallback'],
      ['/test', 'архів', '/fallback', '/archive', 'Ukrainian label search'],
      ['/test', 'ARCHIVE', '/fallback', '/archive', 'case-insensitive label search'],
      ['/cooperation', undefined, undefined, '/cooperation', 'without label search parameter']
    ])('should find link by %s', async (href, label, fallback, expected, _description) => {
      const result = await getNavigationLink(href, label, fallback);
      expect(result).toBe(expected);
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
