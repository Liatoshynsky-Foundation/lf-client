export const compositionSort = <T>(arr: T[], compareFn: (a: T, b: T) => number): T[] => {
  const sorted = [...arr].sort(compareFn);
  return sorted;
};
