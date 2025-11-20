import { Locale } from 'next-intl';
import { z } from 'zod';

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
  return typeof value === 'object' && value !== null && locale in (value as any);
}

export function LocalizeSchema<S extends z.ZodTypeAny>(schema: S, locale: Locale) {
  function localizeValue(value: unknown): unknown {
    if (isTranslatedField(value, locale)) {
      return (value as Record<string, string>)[locale];
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
