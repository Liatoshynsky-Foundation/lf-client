export type ParsedIsoDate = {
  day: string;
  month: string;
  year: string;
};

export const parseIsoDate = (isoDate: string | null | undefined): ParsedIsoDate | null => {
  if (!isoDate) return null;

  const trimmed = isoDate.trim();
  if (!trimmed) return null;

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return { day, month, year };
};

export const formatIsoDateToDdMmYy = (isoDate: string | null | undefined): string | null => {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) return null;

  const shortYear = parsed.year.slice(-2);
  return `${parsed.day}.${parsed.month}.${shortYear}`;
};
