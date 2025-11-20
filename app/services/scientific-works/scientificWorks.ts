import { Locale } from 'next-intl';

import { ScientificWorksRepository } from '~/infrastructure/repositories/scientific-works/scientificWorks.repo';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema, LocalizeSchema, NoIDSchema } from '~/validators/constants';
import { scientificWorkTitleSchema } from '~/validators/scientific-works/scientificWorks.schema';

export const createScientificWorksService = ({
  scientificWorksRepo
}: {
  scientificWorksRepo: ScientificWorksRepository;
}) => ({
  async getAllAuthors(locale: Locale) {
    const authors = await scientificWorksRepo.getAllAuthors();

    return ArraySchema(LocalizeSchema(NoIDSchema(namedFilterSchema), locale)).parse(authors);
  },

  async getAllScientificTitles(locale: Locale) {
    const titles = await scientificWorksRepo.getAllScientificTitles(locale);

    return ArraySchema(LocalizeSchema(scientificWorkTitleSchema, locale)).parse(titles);
  },

  async getScientificWorksYearRange() {
    return scientificWorksRepo.getScientificWorksYearRange();
  },

  async getAllScientificWorks(
    locale: Locale,
    filters?: { authorIds?: string[]; years?: { min?: number; max?: number } }
  ) {
    const works = await scientificWorksRepo.getAllScientificWorks({
      authorIds: filters?.authorIds,
      years:
        filters?.years && filters.years.min !== undefined && filters.years.max !== undefined
          ? [filters.years.min, filters.years.max]
          : undefined,
      title: '',
      locale
    });

    return works.map((w) => ({
      _id: w._id.toString(),
      title: w.title[locale],
      authors: w.authors.map((a: any) => `${a.name[locale]} ${a.surname[locale]}`.trim()),
      startYear: w.startYear,
      endYear: w.endYear,
      url: w.url,
      isPreview: w.isPreview
    }));
  }
});
