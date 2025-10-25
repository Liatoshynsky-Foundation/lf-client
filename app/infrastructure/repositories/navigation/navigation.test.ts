import { Navigation } from '~/infrastructure/models/navigation/navigation';
import { navigationRepository } from '~/infrastructure/repositories/navigation/navigation.repository';

jest.mock('~/infrastructure/db/connect', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('~/infrastructure/models/navigation/navigation', () => ({
  Navigation: {
    find: jest.fn(),
    findOne: jest.fn()
  }
}));

describe('navigationRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return parsed navigation data with raw translations', async () => {
    const mockDocs = [
      {
        title: { uk: 'Головна', en: 'Main' },
        links: [
          { label: { uk: 'Дім', en: 'Home' }, href: '/', visibility: true },
          { label: { uk: 'Про нас', en: 'About' }, href: '/about', visibility: false }
        ],
        order: 1
      }
    ];

    (Navigation.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockDocs)
      })
    });

    const result = await navigationRepository.getNavigation();

    expect(result).toEqual([
      {
        title: mockDocs[0].title,
        links: mockDocs[0].links
      }
    ]);

    expect(Navigation.find).toHaveBeenCalled();
  });

  it('should throw if data does not match schema', async () => {
    const invalidDocs = [
      {
        title: { uk: 'Головна' },
        links: [{ label: { uk: 'Дім', en: 'Home' }, href: '/', visibility: true }],
        order: 1
      }
    ];

    (Navigation.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(invalidDocs)
      })
    });

    await expect(navigationRepository.getNavigation()).rejects.toThrow();
  });

  it('should return special navigation data with raw translations', async () => {
    const mockDoc = {
      title: { uk: 'Спеціальна', en: 'Special' },
      links: [{ label: { uk: 'Спеціальна посилання', en: 'Special Link' }, href: '/special', visibility: true }],
      order: -1
    };

    (Navigation.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockDoc)
    });

    const result = await navigationRepository.getSpecialNavigation();

    expect(result).toEqual({
      title: mockDoc.title,
      links: mockDoc.links
    });

    expect(Navigation.findOne).toHaveBeenCalled();
  });

  it('should return null if no special navigation found', async () => {
    (Navigation.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(null)
    });

    const result = await navigationRepository.getSpecialNavigation();

    expect(result).toBeNull();
    expect(Navigation.findOne).toHaveBeenCalled();
  });

  it('should throw if special navigation data does not match schema', async () => {
    const invalidDoc = {
      title: { uk: 'Спеціальна' },
      links: [{ label: { uk: 'Спеціальна посилання', en: 'Special Link' }, href: '/special', visibility: true }],
      order: -1
    };

    (Navigation.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(invalidDoc)
    });

    await expect(navigationRepository.getSpecialNavigation()).rejects.toThrow();
  });
});
