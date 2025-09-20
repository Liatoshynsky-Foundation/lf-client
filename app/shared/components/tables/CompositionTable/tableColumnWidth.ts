export type ColumnKey = 'expander' | 'opus' | 'play' | 'name' | 'year' | 'genre' | 'actions';

export type FullColumnWidths = Record<ColumnKey, string>;

export type PartialColumnWidths = Partial<Record<ColumnKey, string>>;

export const DESKTOP_COLUMN_WIDTHS: FullColumnWidths = {
  expander: '72px',
  opus: '48px',
  play: '48px',
  name: '504px',
  year: '140px',
  genre: 'auto',
  actions: '300px'
};

export const LAPTOP_COLUMN_WIDTHS: FullColumnWidths = {
  expander: '72px',
  opus: '44px',
  play: '44px',
  name: '440px',
  year: '112px',
  genre: 'auto',
  actions: '160px'
};

export const TABLET_COLUMN_WIDTHS: PartialColumnWidths = {
  expander: '48px',
  name: 'auto',
  actions: '40px'
};

export const MOBILE_COLUMN_WIDTHS: PartialColumnWidths = {
  expander: '48px',
  name: 'auto',
  actions: '48px'
};
