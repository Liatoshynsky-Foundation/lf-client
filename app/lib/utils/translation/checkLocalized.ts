type Localized = {
  en: string;
  uk: string;
};

export function isLocalized(value: unknown): value is Localized {
  const v = value as Record<string, unknown>;

  return (
    typeof value === 'object' &&
    value !== null &&
    'en' in v &&
    'uk' in v &&
    typeof v.en === 'string' &&
    typeof v.uk === 'string'
  );
}
