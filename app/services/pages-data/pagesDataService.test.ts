import { Locale } from 'next-intl';
import { z } from 'zod';

import { createPagesDataService } from './pagesDataService';
import { SchemaFactory } from './schema-factory';
import type { PageDataMap } from '~/types/page/pagesBase.type';
import { WrapError, WrapSuccess } from '~/types/types/result';

import type { PagesDataRepository } from '~/infrastructure/repositories/pages-data/pagesData.repo';

jest.mock('./schema-factory', () => ({ SchemaFactory: jest.fn() }));

describe('createPagesDataService', () => {
  const slug = 'about-us';
  const locale: Locale = 'uk';

  type RepoPage = NonNullable<Awaited<ReturnType<PagesDataRepository['getBySlug']>>>;
  const repoPage = { slug } as unknown as RepoPage;

  const mockRepo: jest.Mocked<PagesDataRepository> = {
    getBySlug: jest.fn(),
    getDraftBySlug: jest.fn()
  };

  let service: ReturnType<typeof createPagesDataService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = createPagesDataService({ pagesDataRepo: mockRepo });
  });

  it('should return null when page is not found', async () => {
    const repoErr = WrapError<PageDataMap[typeof slug]>(`No page found with slug: ${slug} and status: published`);
    mockRepo.getBySlug.mockResolvedValue(repoErr as any);

    const res = await service.getPageData(slug, locale);

    expect(res).toEqual(WrapError(`No page schema found with slug: ${slug} at locale: ${locale}`));
    expect(mockRepo.getBySlug).toHaveBeenCalledWith(slug);
    expect(SchemaFactory).toHaveBeenCalledWith(slug, locale);
  });

  it('should return localized data when schema parses successfully', async () => {
    const localized = { slug } as unknown as PageDataMap[typeof slug];
    const schema: z.ZodTypeAny = z.any();
    const parseSpy = jest.spyOn(schema, 'parse').mockReturnValue(localized);

    (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(schema);
    mockRepo.getBySlug.mockResolvedValue(WrapSuccess(repoPage) as any);

    const res = await service.getPageData(slug, locale);

    expect(mockRepo.getBySlug).toHaveBeenCalledWith(slug);
    expect(SchemaFactory).toHaveBeenCalledWith(slug, locale);
    expect(parseSpy).toHaveBeenCalled();
    expect(res).toEqual(WrapSuccess(localized));
  });

  it('should propagate parsing error', async () => {
    const err = new Error('Zod validation failed');
    const schema: z.ZodTypeAny = z.any();
    jest.spyOn(schema, 'parse').mockImplementation(() => {
      throw err;
    });

    (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(schema);
    mockRepo.getBySlug.mockResolvedValue(WrapSuccess(repoPage) as any);

    await expect(service.getPageData(slug, locale)).resolves.toEqual(WrapError(err.message));
    expect(SchemaFactory).toHaveBeenCalledWith(slug, locale);
  });

  it('should return null if schema is undefined', async () => {
    (SchemaFactory as jest.MockedFunction<typeof SchemaFactory>).mockReturnValue(undefined as unknown as z.ZodTypeAny);
    mockRepo.getBySlug.mockResolvedValue(WrapSuccess(repoPage) as any);

    const res = await service.getPageData('unknown-slug' as unknown as typeof slug, locale);

    expect(res).toEqual(WrapError(`No page schema found with slug: unknown-slug at locale: ${locale}`));
  });

  it('should propagate service errors', async () => {
    const err = new Error('DB down');
    mockRepo.getBySlug.mockRejectedValue(err);

    await expect(service.getPageData(slug, locale)).rejects.toThrow(err);
    expect(mockRepo.getBySlug).toHaveBeenCalledWith(slug);
  });
});
