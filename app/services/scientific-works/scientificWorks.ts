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

    const normalized = authors.map((a) => ({
      key: a._id.toString(),
      name: {
        uk: `${a.surname.uk} ${a.name.uk}`,
        en: `${a.surname.en} ${a.name.en}`
      }
    }));

    return ArraySchema(LocalizeSchema(NoIDSchema(namedFilterSchema), locale)).parse(normalized);
  },

  async getAllScientificTitles(locale: Locale) {
    const titles = await scientificWorksRepo.getAllScientificTitles();

    return ArraySchema(LocalizeSchema(scientificWorkTitleSchema, locale)).parse(titles);
  },

  async getScientificWorksYearRange() {
    return scientificWorksRepo.getScientificWorksYearRange();
  },

  async getAllScientificWorks(
    locale: Locale,
    filters?: { authorIds?: string[]; years?: { min?: number; max?: number } },
    search?: string
  ) {
    const works = await scientificWorksRepo.getAllScientificWorks({
      authorIds: filters?.authorIds,
      years:
        filters?.years?.min != null && filters?.years?.max != null ? [filters.years.min, filters.years.max] : undefined,
      search
    });

    return works.map((w) => ({
      id: w._id.toString(),
      name: w.title[locale],
      author: w.authors.map((a) => `${a.surname[locale]} ${a.name[locale]}`).join(', '),
      sortableYear: w.startYear,
      year: w.endYear ? `${w.startYear}-${w.endYear}` : String(w.startYear),
      url: w.url,
      isPreview: w.isPreview
    }));
  }
});
