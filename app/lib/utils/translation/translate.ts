import { Locale } from 'next-intl';

function isLocaleObject(v: unknown): v is Record<Locale, string> {
  return !!v && typeof v === 'object' && 'en' in (v as any) && 'uk' in (v as any);
}

export default function translate(tgt: Record<string, unknown>, locale: Locale): Record<string, unknown> {
  function localizeValue(value: unknown): unknown {
    if (isLocaleObject(value)) {
      return value[locale];
    }
    if (Array.isArray(value)) {
      return value.map(localizeValue);
    }
    if (typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype) {
      const result: Record<string, unknown> = {};
      const obj = value as Record<string, unknown>;
      for (const key in obj) {
        result[key] = localizeValue(obj[key]);
      }
      return result;
    }
    return value;
  }

  return localizeValue(tgt) as Record<string, unknown>;
}
