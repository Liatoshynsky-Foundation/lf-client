import { Locale } from 'next-intl';
import z from 'zod';

import { fieldKeyFromPath, hasLocalizedContent, isRecord } from './localization.utils';
import { LocalizationErrors } from '~/constants/errors';

type TranslatedField<T> = Record<Locale, T>;

export type LocalizeOptions = {
  fallbackFields?: readonly string[];
  allowEmptyFields?: readonly string[];
};

export type Localize<T> =
  T extends Record<Locale, infer U>
    ? U
    : T extends Array<infer A>
      ? Array<Localize<A>>
      : T extends object
        ? { [K in keyof T]: Localize<T[K]> }
        : T;

function isTranslatedField(value: unknown, locale: Locale): value is TranslatedField<unknown> {
  return isRecord(value) && locale in value;
}

function translationErrorFactory(locale: Locale, path: string): Error {
  const baseMessage = locale === 'en' ? LocalizationErrors.MISSING_EN_ERROR : LocalizationErrors.MISSING_UK_ERROR;
  return new Error(`${baseMessage} at path: ${path}`);
}

function resolveTranslation(
  value: TranslatedField<unknown>,
  locale: Locale,
  path: string,
  options?: LocalizeOptions
): unknown {
  if (hasLocalizedContent(value[locale], path, locale)) {
    return value[locale];
  }

  const fieldKey = fieldKeyFromPath(path);
  const canFallback = options?.fallbackFields?.includes(fieldKey);

  if (canFallback) {
    const fallbackLocale = locale === 'en' ? 'uk' : 'en';
    if (hasLocalizedContent(value[fallbackLocale], path, fallbackLocale)) {
      return value[fallbackLocale];
    }
  }

  if (options?.allowEmptyFields?.includes(fieldKey)) {
    return value[locale];
  }

  throw translationErrorFactory(locale, path);
}

export function LocalizeSchema<S extends z.ZodTypeAny>(schema: S, locale: Locale, options?: LocalizeOptions) {
  function localizeValue(value: unknown, path: string = 'root'): unknown {
    if (isTranslatedField(value, locale)) {
      return resolveTranslation(value, locale, path, options);
    }
    if (Array.isArray(value)) {
      return value.map((item, idx) => localizeValue(item, `${path}[${idx}]`));
    }
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === 'object' && value !== null) {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localizeValue(v, `${path}.${k}`)]));
    }
    return value;
  }

  return z.union([z.array(schema), schema]).transform((val) => localizeValue(val)) as unknown as z.ZodType<
    Localize<z.infer<S>>
  >;
}
