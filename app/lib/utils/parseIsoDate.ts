export type ParsedIsoDate = {
  day: string;
  month: string;
  year: string;
};

export const parseIsoDate = (isoDate: string | null | undefined): ParsedIsoDate | null => {
  if (!isoDate) return null;

  const trimmed = isoDate.trim();
  if (!trimmed) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;

  return { day, month, year };
};
