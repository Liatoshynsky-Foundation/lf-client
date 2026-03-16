import { Navigation } from '~/infrastructure/models/navigation/navigation';
import newNavigationRepository from '~/infrastructure/repositories/navigation/navigation.repository';

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

const mockMongooseChain = (resolvedValue: any) => ({
  sort: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolvedValue)
});

describe('navigationRepository', () => {
  const navigationRepository = newNavigationRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('newNavigationRepository', () => {
    it('should return the repository object', () => {
      const repo = newNavigationRepository();
      expect(repo).toBeDefined();
      expect(typeof repo.getNavigation).toBe('function');
      expect(typeof repo.getSpecialNavigation).toBe('function');
    });
  });

  describe('getNavigation', () => {
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

      (Navigation.find as jest.Mock).mockReturnValue(mockMongooseChain(mockDocs));

      const result = await navigationRepository.getNavigation();

      expect(result).toEqual([
        {
          title: mockDocs[0].title,
          links: mockDocs[0].links
        }
      ]);

      expect(Navigation.find).toHaveBeenCalled();
    });

    it('should return empty array if no navigation data found', async () => {
      (Navigation.find as jest.Mock).mockReturnValue(mockMongooseChain([]));

      const result = await navigationRepository.getNavigation();

      expect(result).toEqual([]);
    });

    it('should throw if data does not match schema', async () => {
      const invalidDocs = [
        {
          title: { uk: 'Головна' },
          links: [{ label: { uk: 'Дім', en: 'Home' }, href: '/', visibility: true }],
          order: 1
        }
      ];

      (Navigation.find as jest.Mock).mockReturnValue(mockMongooseChain(invalidDocs));

      await expect(navigationRepository.getNavigation()).rejects.toThrow();
    });
  });

  describe('getSpecialNavigation', () => {
    it('should return special navigation data with raw translations', async () => {
      const mockDoc = {
        title: { uk: 'Спеціальна', en: 'Special' },
        links: [{ label: { uk: 'Спеціальна посилання', en: 'Special Link' }, href: '/special', visibility: true }],
        order: -1
      };

      (Navigation.findOne as jest.Mock).mockReturnValue(mockMongooseChain(mockDoc));

      const result = await navigationRepository.getSpecialNavigation();

      expect(result).toEqual({
        title: mockDoc.title,
        links: mockDoc.links
      });

      expect(Navigation.findOne).toHaveBeenCalled();
    });

    it('should return null if no special navigation found', async () => {
      (Navigation.findOne as jest.Mock).mockReturnValue(mockMongooseChain(null));

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

      (Navigation.findOne as jest.Mock).mockReturnValue(mockMongooseChain(invalidDoc));

      await expect(navigationRepository.getSpecialNavigation()).rejects.toThrow();
    });
  });
  describe('getFooterNavigation', () => {
    it('should return sorted footer navigation and parse via Zod', async () => {
      const mockDocs = [
        {
          title: { uk: 'Політика', en: 'Policy' },
          links: [{ label: { uk: 'Конфіденційність', en: 'Privacy' }, href: '/privacy', visibility: true }],
          footerOrder: 1
        }
      ];

      (Navigation.find as jest.Mock).mockReturnValue(mockMongooseChain(mockDocs));

      const result = await navigationRepository.getFooterNavigation();

      expect(Navigation.find).toHaveBeenCalledWith({ footerOrder: { $ne: null } });

      expect(result).toEqual([
        {
          title: mockDocs[0].title,
          links: mockDocs[0].links,
          footerOrder: mockDocs[0].footerOrder
        }
      ]);
    });

    it('should return empty array if no footer navigation found', async () => {
      (Navigation.find as jest.Mock).mockReturnValue(mockMongooseChain([]));

      const result = await navigationRepository.getFooterNavigation();

      expect(result).toEqual([]);
    });

    it('should throw if footer navigation data does not match schema', async () => {
      const invalidDocs = [
        {
          title: { uk: 'Політика' },
          links: [{ label: { uk: 'Конфіденційність', en: 'Privacy' }, href: '/privacy', visibility: true }],
          footerOrder: 1
        }
      ];

      (Navigation.find as jest.Mock).mockReturnValue(mockMongooseChain(invalidDocs));

      await expect(navigationRepository.getFooterNavigation()).rejects.toThrow();
    });
  });
});
