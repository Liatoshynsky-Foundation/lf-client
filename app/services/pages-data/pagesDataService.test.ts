import { Locale } from 'next-intl';
import { z, ZodError } from 'zod';

import { createDraftPagesDataService, createPagesDataService } from './pagesDataService';
import { SchemaFactory } from './schema-factory';
import type { PageDataMap } from '~/types/page/pagesBase.type';
import { WrapError, WrapSuccess } from '~/types/types/result';

import type { PagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repo';
import logger from '~/middleware/logger/logger';

jest.mock('./schema-factory', () => ({ SchemaFactory: jest.fn() }));
jest.mock('~/middleware/logger/logger', () => ({
  error: jest.fn()
}));

describe('pagesDataService', () => {
  const slug = 'about-us';
  const locale: Locale = 'uk';

  type RepoPage = NonNullable<Awaited<ReturnType<PagesDataRepository['getBySlug']>>>;
  const repoPage = { slug } as unknown as RepoPage;

  const mockRepo: jest.Mocked<PagesDataRepository> = {
    getBySlug: jest.fn(),
    getDraftBySlug: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPagesDataService', () => {
    let service: ReturnType<typeof createPagesDataService>;

    beforeEach(() => {
      service = createPagesDataService({ pagesDataRepo: mockRepo });
    });

    it('should return error when page is not found', async () => {
      mockRepo.getBySlug.mockResolvedValue(null as unknown as RepoPage);

      const res = await service.getPageData(slug, locale);

      expect(res).toEqual(WrapError(`No page found with slug: ${slug}`));
      expect(mockRepo.getBySlug).toHaveBeenCalledWith(slug);
    });

    it('should return error if schema is undefined', async () => {
      (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(undefined);
      mockRepo.getBySlug.mockResolvedValue(repoPage);

      const res = await service.getPageData(slug, locale);

      expect(res).toEqual(WrapError(`No page schema found with slug: ${slug} at locale: ${locale}`));
    });

    it('should return localized data when schema parses successfully', async () => {
      const localized = { slug } as unknown as PageDataMap[typeof slug];
      const schema = z.object({ slug: z.string() }) as unknown as z.ZodType<PageDataMap[typeof slug]>;
      const parseSpy = jest.spyOn(schema, 'parse').mockReturnValue(localized);

      (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(schema);
      mockRepo.getBySlug.mockResolvedValue(repoPage);

      const res = await service.getPageData(slug, locale);

      expect(mockRepo.getBySlug).toHaveBeenCalledWith(slug);
      expect(SchemaFactory).toHaveBeenCalledWith(slug, locale);
      expect(parseSpy).toHaveBeenCalledWith(repoPage);
      expect(res).toEqual(WrapSuccess(localized));
    });

    it('should handle ZodError validation failure', async () => {
      const schema = z.object({ slug: z.string() }) as unknown as z.ZodType<PageDataMap[typeof slug]>;
      const zodError = new ZodError([{ code: 'custom', path: ['title'], message: 'Required field missing' }]);
      jest.spyOn(schema, 'parse').mockImplementation(() => {
        throw zodError;
      });

      (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(schema);
      mockRepo.getBySlug.mockResolvedValue(repoPage);

      const res = await service.getPageData(slug, locale);

      expect(logger.error).toHaveBeenCalledWith(
        `[PagesDataService] Schema validation failed for slug "${slug}" [${locale}]:`,
        zodError.flatten()
      );
      expect(res).toEqual(WrapError('Validation error on fields: title: Required field missing'));
    });

    it('should handle native Error instances during parse', async () => {
      const schema = z.object({ slug: z.string() }) as unknown as z.ZodType<PageDataMap[typeof slug]>;
      const nativeError = new Error('Unexpected parse crash');
      jest.spyOn(schema, 'parse').mockImplementation(() => {
        throw nativeError;
      });

      (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(schema);
      mockRepo.getBySlug.mockResolvedValue(repoPage);

      const res = await service.getPageData(slug, locale);

      expect(logger.error).toHaveBeenCalledWith(
        `[PagesDataService] Unexpected error parsing slug "${slug}":`,
        nativeError
      );
      expect(res).toEqual(WrapError('Unexpected parse crash'));
    });

    it('should handle unknown thrown errors during parse', async () => {
      const schema = z.object({ slug: z.string() }) as unknown as z.ZodType<PageDataMap[typeof slug]>;
      const unknownError = 'Some string error representation';
      jest.spyOn(schema, 'parse').mockImplementation(() => {
        throw unknownError;
      });

      (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(schema);
      mockRepo.getBySlug.mockResolvedValue(repoPage);

      const res = await service.getPageData(slug, locale);

      expect(logger.error).toHaveBeenCalledWith(
        `[PagesDataService] Unknown error parsing slug "${slug}":`,
        unknownError
      );
      expect(res).toEqual(WrapError('Unknown parsing error'));
    });
  });

  describe('createDraftPagesDataService', () => {
    let draftService: ReturnType<typeof createDraftPagesDataService>;

    beforeEach(() => {
      draftService = createDraftPagesDataService({ pagesDataRepo: mockRepo });
    });

    it('should fetch data using getDraftBySlug method', async () => {
      const localized = { slug } as unknown as PageDataMap[typeof slug];
      const schema = z.object({ slug: z.string() }) as unknown as z.ZodType<PageDataMap[typeof slug]>;
      jest.spyOn(schema, 'parse').mockReturnValue(localized);

      (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(schema);
      mockRepo.getDraftBySlug.mockResolvedValue(repoPage);

      const res = await draftService.getPageData(slug, locale);

      expect(mockRepo.getDraftBySlug).toHaveBeenCalledWith(slug);
      expect(res).toEqual(WrapSuccess(localized));
    });
  });
});
