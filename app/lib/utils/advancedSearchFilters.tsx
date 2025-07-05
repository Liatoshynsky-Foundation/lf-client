export const advancedSearchFilter = (value: string, filterValue: string) => {
  if (!value) return false;

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[’'"]/g, '')
      .trim();

  const name = normalize(value);
  const keywords = normalize(filterValue).split(/\s+/);

  return keywords.every((keyword) => name.includes(keyword));
};
