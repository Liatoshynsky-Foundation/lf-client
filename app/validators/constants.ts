import { Locale } from 'next-intl';
import { z, ZodTypeAny } from 'zod';

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

export function ArraySchema(schema: ZodTypeAny) {
  return z.array(schema);
}

function isTranslatedField(value: unknown, locale: Locale): value is Record<Locale, string> {
  return typeof value === 'object' && value !== null && locale in value;
}

export function LocalizeSchema<T extends z.ZodRawShape>(schema: z.ZodObject<T>, locale: Locale) {
  function localizeValue(value: unknown): unknown {
    if (isTranslatedField(value, locale)) {
      return value[locale];
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

  return z.union([z.array(schema), schema]).transform(localizeValue);
}

export function NoIDSchema<T extends z.ZodRawShape>(schema: z.ZodObject<T & { _id: any }>) {
  return schema.omit({ _id: true });
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
