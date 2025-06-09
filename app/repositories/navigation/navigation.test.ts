import type { Locale } from 'next-intl';

import { Navigation } from '~/models/navigation/navigation';
import { navigationRepository } from '~/repositories/navigation/navigation';
import { navigationSchema } from '~/validators/navigation.schema';

jest.mock('~/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('~/models/navigation/navigation', () => ({
  Navigation: {
    find: jest.fn()
  }
}));

describe('navigationRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return parsed and localized navigation data', async () => {
    const mockDocs = [
      {
        title: { uk: 'Головна', en: 'Main' },
        links: [
          {
            label: { uk: 'Дім', en: 'Home' },
            href: '/',
            visibility: true
          },
          {
            label: { uk: 'Про нас', en: 'About' },
            href: '/about',
            visibility: true
          }
        ]
      }
    ];

    (Navigation.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockDocs)
    });

    const locale: Locale = 'en';

    const result = await navigationRepository.getNavigation(locale);

    mockDocs.forEach((doc) => navigationSchema.parse(doc));

    expect(result).toEqual([
      {
        title: 'Main',
        links: [
          { label: 'Home', href: '/', visibility: true },
          { label: 'About', href: '/about', visibility: true }
        ]
      }
    ]);

    expect(Navigation.find).toHaveBeenCalled();
  });

  it('should throw if data does not match schema', async () => {
    const invalidDocs = [
      {
        title: { uk: 'Головна' },
        links: [
          {
            label: { uk: 'Дім', en: 'Home' },
            href: '/',
            visibility: true
          }
        ]
      }
    ];

    (Navigation.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(invalidDocs)
    });

    const locale: Locale = 'uk';

    await expect(navigationRepository.getNavigation(locale)).rejects.toThrow();
  });
});
