jest.mock('~/infrastructure/repositories/navigation/navigation.repository', () => {
  return jest.fn();
});

import { getNavigationLink, getNavigationLinkByHref, getNavigationLinkByLabel } from './navigationHelper';

import newNavigationRepository from '~/infrastructure/repositories/navigation/navigation.repository';
import { ROUTES } from '~/shared/components/constants/routes';

const mockNavigationData = [
  {
    title: { uk: 'Борис Лятошинський', en: 'Borys Liatoshynskyi' },
    links: [
      { label: { uk: 'Біографія', en: 'Biography' }, href: ROUTES.BIOGRAPHY },
      { label: { uk: 'Дослідження', en: 'Research' }, href: ROUTES.RESEARCH },
      { label: { uk: 'Мистецтво', en: 'Artistry' }, href: ROUTES.ARTISTRY }
    ]
  },
  {
    title: { uk: 'Фундація', en: 'Foundation' },
    links: [
      { label: { uk: 'Про нас', en: 'About Us' }, href: ROUTES.ABOUT_US },
      { label: { uk: 'Новини', en: 'News' }, href: ROUTES.NEWS },
      { label: { uk: 'Підтримати нас', en: 'Support Us' }, href: ROUTES.SUPPORT_US },
      { label: { uk: 'Контакти', en: 'Contacts' }, href: ROUTES.CONTACTS }
    ]
  },
  {
    title: { uk: 'Архів', en: 'Archive' },
    links: [{ label: { uk: 'Архів', en: 'Archive' }, href: ROUTES.ARCHIVE }]
  },
  {
    title: { uk: 'Співпраця', en: 'Cooperation' },
    links: [{ label: { uk: 'Співпраця', en: 'Cooperation' }, href: ROUTES.COOPERATION }]
  }
];

describe('navigationHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (newNavigationRepository as jest.Mock).mockReturnValue({
      getNavigation: jest.fn().mockResolvedValue(mockNavigationData)
    });
  });

  it('returns archive when href matches exactly', async () => {
    await expect(getNavigationLinkByHref(ROUTES.ARCHIVE)).resolves.toBe(ROUTES.ARCHIVE);
  });

  it('returns cooperation for single-link navigation item', async () => {
    await expect(getNavigationLinkByHref(ROUTES.COOPERATION)).resolves.toBe(ROUTES.COOPERATION);
  });

  it('returns undefined when href does not exist', async () => {
    await expect(getNavigationLinkByHref('/non-existent')).resolves.toBeUndefined();
  });

  it('returns undefined for multi-link item when searching by href only', async () => {
    await expect(getNavigationLinkByHref(ROUTES.ABOUT_US)).resolves.toBeUndefined();
  });

  it('finds archive by Ukrainian label', async () => {
    await expect(getNavigationLinkByLabel('Архів')).resolves.toBe(ROUTES.ARCHIVE);
  });

  it('finds archive by English label', async () => {
    await expect(getNavigationLinkByLabel('Archive')).resolves.toBe(ROUTES.ARCHIVE);
  });

  it('returns undefined when label is not found', async () => {
    await expect(getNavigationLinkByLabel('NonExistent')).resolves.toBeUndefined();
  });

  it('falls back to label search when href does not match', async () => {
    await expect(getNavigationLink('/non-existent', 'archive')).resolves.toBe(ROUTES.ARCHIVE);
  });

  it('returns fallback when neither href nor label matches', async () => {
    await expect(getNavigationLink('/non-existent', 'also-non-existent', '/default')).resolves.toBe('/default');
  });

  it('returns href as fallback when no other match exists', async () => {
    await expect(getNavigationLink('/non-existent', 'also-non-existent')).resolves.toBe('/non-existent');
  });

  it('returns fallback when navigation is empty', async () => {
    (newNavigationRepository as jest.Mock).mockReturnValue({
      getNavigation: jest.fn().mockResolvedValue([])
    });

    await expect(getNavigationLink(ROUTES.ARCHIVE, 'archive', ROUTES.ARCHIVE)).resolves.toBe(ROUTES.ARCHIVE);
  });
});
