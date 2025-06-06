import { navigationRepository } from '~/repositories/navigation/navigation';
import { Navigation } from '~/models/navigation/navigation';
import { navigationSchema } from '~/validators/navigation.schema';
import type { Locale } from 'next-intl';

jest.mock('~/models/navigation/navigation', () => ({
  Navigation: {
    find: jest.fn()
  }
}));

describe('navigationRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns parsed and localized navigation data', async () => {
    const mockDocs = [
      {
        title: { uk: 'Головна', en: 'Main' },
        links: [
          {
            label: { uk: 'Дім', en: 'Home' },
            href: '/',
            visibility: 'true'
          },
          {
            label: { uk: 'Про нас', en: 'About' },
            href: '/about',
            visibility: 'true'
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
          { label: 'Home', href: '/', visibility: 'true' },
          { label: 'About', href: '/about', visibility: 'true' }
        ]
      }
    ]);

    expect(Navigation.find).toHaveBeenCalled();
  });

  it('throws if data does not match schema', async () => {
    const invalidDocs = [
      {
        title: { uk: 'Головна' },
        links: [
          {
            label: { uk: 'Дім', en: 'Home' },
            href: '/',
            visibility: 'true'
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
