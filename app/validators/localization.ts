import { Locale } from 'next-intl';
import z from 'zod';

import { TipTapDocSchema } from './pagesSchemas/tiptap.schema';
import { LocalizationErrors } from '~/constants/errors';
import { TipTapDoc } from '~/types/types/tiptap.types';

type TranslatedField<T> = Record<Locale, T>;

export type Localize<T> =
  T extends Record<Locale, infer U>
    ? U
    : T extends Array<infer A>
      ? Array<Localize<A>>
      : T extends object
        ? { [K in keyof T]: Localize<T[K]> }
        : T;

function isTranslatedField(value: unknown, locale: Locale): value is TranslatedField<unknown> {
  return typeof value === 'object' && value !== null && locale in (value as Record<string, unknown>);
}

function doesTipTapHaveTranslations(root: z.infer<typeof TipTapDocSchema>): boolean {
  for (const node of root.content) {
    if (!node.content) {
      continue;
    }

    return node.content.every((childNode) => typeof childNode.text === 'string' && childNode.text.trim() !== '');
  }

  return false;
}

function validTranslatedField(value: Record<string, unknown>, locale: Locale): boolean {
  if (typeof value[locale] === 'string') {
    return value[locale] !== '';
  }
  if (typeof value[locale] === 'object') {
    return doesTipTapHaveTranslations(value[locale] as TipTapDoc);
  }

  return false;
}

function translationErrorFactory(locale: Locale): Error {
  return new Error(locale === 'en' ? LocalizationErrors.MISSING_EN_ERROR : LocalizationErrors.MISSING_UK_ERROR);
}

export function LocalizeSchema<S extends z.ZodTypeAny>(schema: S, locale: Locale) {
  function localizeValue(value: unknown): unknown {
    if (isTranslatedField(value, locale)) {
      if (!validTranslatedField(value, locale)) {
        throw translationErrorFactory(locale);
      }

      return value[locale];
    }
    if (Array.isArray(value)) {
      return value.map(localizeValue);
    }
    if (typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype) {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localizeValue(v)]));
    }
    return value;
  }

  return z.union([z.array(schema), schema]).transform(localizeValue) as unknown as z.ZodType<Localize<z.infer<S>>>;
}
