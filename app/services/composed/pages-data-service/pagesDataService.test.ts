import { Locale } from 'next-intl';
import { z } from 'zod';

import { createPagesDataService } from './pagesDataService';
import { selectSchema } from './selectSchema';
import type { PageData } from '~/types/page/pagesBase.type';

import type { PagesService } from '~/services/core/pagesDataService';

jest.mock('./selectSchema', () => ({ selectSchema: jest.fn() }));

describe('createPagesDataService', () => {
  const get: jest.MockedFunction<PagesService['getPageData']> = jest.fn();
  const pagesService: PagesService = { getPageData: get };

  const slug = 'about-us';
  const locale: Locale = 'uk';

  type RepoReturn = Awaited<ReturnType<PagesService['getPageData']>>;
  const repoPage = { slug } as unknown as NonNullable<RepoReturn>;

  let service: ReturnType<typeof createPagesDataService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = createPagesDataService(pagesService);
  });

  it('should return null when page is not found', async () => {
    get.mockResolvedValue(null);

    const res = await service.getPageData(slug, locale);

    expect(res).toBeNull();
    expect(get).toHaveBeenCalledWith(slug);
    expect(selectSchema).not.toHaveBeenCalled();
  });

  it('should return localized data when schema parses successfully', async () => {
    const localized = { slug } as unknown as PageData;
    const schema: z.ZodTypeAny = z.any();
    const parseSpy = jest.spyOn(schema, 'parse').mockReturnValue(localized);

    (selectSchema as jest.MockedFunction<typeof selectSchema>).mockReturnValue(schema);
    get.mockResolvedValue(repoPage);

    const res = await service.getPageData(slug, locale);

    expect(get).toHaveBeenCalledWith(slug);
    expect(selectSchema).toHaveBeenCalledWith(slug, locale);
    expect(parseSpy).toHaveBeenCalledWith(repoPage);
    expect(res).toEqual(localized);
  });

  it('should propagate parsing error', async () => {
    const err = new Error('Zod validation failed');
    const schema: z.ZodTypeAny = z.any();
    jest.spyOn(schema, 'parse').mockImplementation(() => {
      throw err;
    });

    (selectSchema as jest.MockedFunction<typeof selectSchema>).mockReturnValue(schema);
    get.mockResolvedValue(repoPage);

    await expect(service.getPageData(slug, locale)).rejects.toThrow(err);
    expect(selectSchema).toHaveBeenCalledWith(slug, locale);
  });

  it('should return null if schema is undefined', async () => {
    (selectSchema as jest.MockedFunction<typeof selectSchema>).mockReturnValue(undefined as unknown as z.ZodTypeAny);
    get.mockResolvedValue(repoPage);

    const res = await service.getPageData('unknown-slug', locale);

    expect(res).toBeNull();
  });

  it('should propagate service errors', async () => {
    const err = new Error('DB down');
    get.mockRejectedValue(err);

    await expect(service.getPageData(slug, locale)).rejects.toThrow(err);
    expect(get).toHaveBeenCalledWith(slug);
  });
});
