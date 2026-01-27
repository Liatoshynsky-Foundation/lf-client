import { Locale } from 'next-intl';
import { z } from 'zod';

import { LocalizationErrors } from '~/constants/errors';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

export const hrefSchema = z.string().refine((val) => /^\/[^\s]*$/.test(val) || /^https?:\/\//.test(val), {
  message: 'Must be a valid relative or absolute URL'
});

export const translatedFieldSchema = z.object({
  uk: z.string(),
  en: z.string()
});

export const translatedLinkSchema = z.object({
  label: translatedFieldSchema,
  href: hrefSchema
});

export function ArraySchema<T extends z.ZodTypeAny>(schema: T): z.ZodArray<T> {
  return z.array(schema);
}

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

function doesTipTapHaveTranslations(value: unknown): boolean {
  // we receive doc -> content<paragraph | heading> -> text structure
  if (typeof value !== 'object' || value === null) return false;

  const rootNode = value as Record<string, unknown>; // start from the root (is a doc)

  if (rootNode['type'] !== TipTapNodeTypes.doc || !Array.isArray(rootNode['content'])) {
    return false;
  }

  for (const node of rootNode['content'] as Array<unknown>) {
    if (typeof node !== 'object' || node === null) continue;
    const paragraphOrHeading = node as Record<string, unknown>;
    if (
      (paragraphOrHeading['type'] !== TipTapNodeTypes.paragraph &&
        paragraphOrHeading['type'] !== TipTapNodeTypes.heading) ||
      !Array.isArray(paragraphOrHeading['content'])
    ) {
      continue;
    }

    for (const textNode of paragraphOrHeading['content'] as Array<unknown>) {
      if (typeof textNode !== 'object' || textNode === null) continue;
      const text = textNode as Record<string, unknown>;
      if (text['type'] === TipTapNodeTypes.text && Array.isArray(text['marks'])) {
        return text['text'] !== '';
      }
    }
  }

  return true;
}

export function LocalizeSchema<S extends z.ZodTypeAny>(schema: S, locale: Locale) {
  function localizeValue(value: unknown): unknown {
    if (isTranslatedField(value, locale)) {
      const field = value as Record<string, unknown>;

      if (typeof field[locale] === 'string' && field[locale] === '') {
        throw new Error(locale === 'en' ? LocalizationErrors.MISSING_EN_ERROR : LocalizationErrors.MISSING_UK_ERROR);
      }
      if (typeof field[locale] === 'object' && !doesTipTapHaveTranslations(field[locale])) {
        throw new Error(locale === 'en' ? LocalizationErrors.MISSING_EN_ERROR : LocalizationErrors.MISSING_UK_ERROR);
      }

      return field[locale];
    }
    if (Array.isArray(value)) {
      return value.map(localizeValue);
    }
    if (typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype) {
      const result: Record<string, unknown> = {};
      for (const key in value) {
        result[key] = localizeValue((value as Record<string, unknown>)[key]);
      }
      return result;
    }
    return value;
  }

  return z.union([z.array(schema), schema]).transform(localizeValue) as unknown as z.ZodType<Localize<z.infer<S>>>;
}

export type ExcludeDBFields<S> = Omit<S, 'pageType' | '_id' | 'createdAt' | 'updatedAt'>;

export function NoTime<T extends z.ZodRawShape>(
  schema: z.ZodObject<
    T & {
      createdAt: z.ZodOptional<z.ZodDate>;
      updatedAt: z.ZodOptional<z.ZodDate>;
    }
  >
) {
  return schema.omit({ createdAt: true, updatedAt: true });
}

export function NoPageType<T extends z.ZodRawShape>(schema: z.ZodObject<T & { pageType: z.ZodLiteral<string> }>) {
  return schema.omit({ pageType: true });
}

export function NoIDSchema<T extends z.ZodRawShape>(schema: z.ZodObject<T & { _id: typeof mongoObjectIdSchema }>) {
  return schema.omit({ _id: true });
}

export function NoSupportButtonLink<T extends z.ZodRawShape>(
  schema: z.ZodObject<T & { supportButtonLink: z.ZodOptional<typeof hrefSchema> }>
) {
  return schema.omit({ supportButtonLink: true });
}

export type Stringifiable = {
  toString: () => string;
};

export const isStringifiable = (value: unknown): value is Stringifiable => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toString' in value &&
    typeof (value as Stringifiable).toString === 'function'
  );
};

export const mongoObjectIdSchema = z.preprocess(
  (val) => {
    if (isStringifiable(val)) {
      return val.toString();
    }
    return val;
  },
  z.string().regex(/^[0-9a-fA-F]{24}$/)
);
