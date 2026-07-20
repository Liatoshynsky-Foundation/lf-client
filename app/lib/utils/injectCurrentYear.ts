const YEAR_PLACEHOLDER = '{year}';

export function injectCurrentYear(input: string, year: number = new Date().getFullYear()) {
  if (!input) return '';
  return input.split(YEAR_PLACEHOLDER).join(String(year));
}
