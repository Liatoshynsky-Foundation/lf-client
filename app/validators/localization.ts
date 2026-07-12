import { Locale } from 'next-intl';
import z from 'zod';

import { TipTapDocSchema } from './pagesSchemas/tiptap.schema';
import { LocalizationErrors } from '~/constants/errors';

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
  if (!Array.isArray(root.content)) return true;
  for (const node of root.content) {
    if (!node.content) {
      continue;
    }

    return node.content.every((childNode) => typeof childNode.text === 'string' && childNode.text !== '');
  }

  return false;
}

function validTranslatedField(value: Record<string, unknown>, locale: Locale, path: string): boolean {
  const fieldValue = value[locale];

  if (typeof fieldValue === 'string') {
    const isOptionalField = path.endsWith('.alt') || path.endsWith('.caption');
    if (fieldValue === '' && isOptionalField) {
      return true;
    }
    return fieldValue !== '';
  }

  if (typeof fieldValue === 'object') {
    return doesTipTapHaveTranslations(fieldValue as z.infer<typeof TipTapDocSchema>);
  }

  return false;
}
function translationErrorFactory(locale: Locale, path: string): Error {
  const baseMessage = locale === 'en' ? LocalizationErrors.MISSING_EN_ERROR : LocalizationErrors.MISSING_UK_ERROR;
  return new Error(`${baseMessage} at path: ${path}`);
}

export function LocalizeSchema<S extends z.ZodTypeAny>(schema: S, locale: Locale) {
  function localizeValue(value: unknown, path: string = 'root'): unknown {
    if (isTranslatedField(value, locale)) {
      if (!validTranslatedField(value, locale, path)) {
        throw translationErrorFactory(locale, path);
      }

      return value[locale];
    }
    if (Array.isArray(value)) {
      return value.map((item, idx) => localizeValue(item, `${path}[${idx}]`));
    }
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localizeValue(v, `${path}.${k}`)]));
    }
    return value;
  }

  return z.union([z.array(schema), schema]).transform((val) => localizeValue(val)) as unknown as z.ZodType<
    Localize<z.infer<S>>
  >;
}
