export type FullColumnWidths<T extends string> = Record<T, string>;
export type PartialColumnWidths<T extends string> = Partial<Record<T, string>>;

export type ColumnWidths<T extends string> = {
  DESKTOP: FullColumnWidths<T> | PartialColumnWidths<T>;
  LAPTOP: FullColumnWidths<T> | PartialColumnWidths<T>;
  TABLET: PartialColumnWidths<T>;
  MOBILE: PartialColumnWidths<T>;
};
