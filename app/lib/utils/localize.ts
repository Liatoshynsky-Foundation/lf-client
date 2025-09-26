import { Localized } from '~/types/page/research.types';
import { TipTapDoc } from '~/types/types/common.types';

type RawSectionItem = {
  subtitle?: Localized<TipTapDoc>;
  description?: Localized<TipTapDoc>;
  list?: Array<Localized<TipTapDoc>>;
  note?: Localized<TipTapDoc>;
};

export function localizeField<T>(field: Localized<T> | undefined, lang: string): T | undefined {
  return field ? field[lang] : undefined;
}

export function localizeList<T>(list: Array<Localized<T>> | undefined, lang: string): T[] {
  return list ? list.map((item) => item[lang]) : [];
}

export function localizeSections(sections: RawSectionItem[], lang: string) {
  return sections
    ? sections.map((section) => ({
        subtitle: localizeField(section.subtitle, lang),
        description: localizeField(section.description, lang),
        note: localizeField(section.note, lang),
        list: localizeList(section.list, lang)
      }))
    : [];
}
