type Localized = {
  en: string;
  uk: string;
};

export function isLocalized(value: unknown): value is Localized {
  return (
    typeof value === 'object' &&
    value !== null &&
    'en' in value &&
    'uk' in value &&
    typeof (value as any).en === 'string' &&
    typeof (value as any).uk === 'string'
  );
}
