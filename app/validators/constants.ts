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
