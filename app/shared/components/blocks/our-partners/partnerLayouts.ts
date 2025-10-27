import { PartnerKey } from './partners.const';

const largeLayout: (PartnerKey | null)[] = [
  'musicHouse',
  'philharmonic',
  null,
  'liatoshynsky',
  'masterKlass',
  'kolomyia',
  'axon',
  'espreso',
  null,
  'softserve',
  'opentech'
];

const smallLayout: (PartnerKey | null)[] = [
  'musicHouse',
  'philharmonic',
  null,
  'liatoshynsky',
  'masterKlass',
  'kolomyia',
  null,
  'axon',
  'espreso',
  'softserve',
  'opentech'
];

export const layouts: Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm', (PartnerKey | null)[]> = {
  xxl: largeLayout,
  xl: largeLayout,
  lg: largeLayout,
  md: smallLayout,
  sm: smallLayout
};

export const gridConfigs = [
  { key: 'xxl', min: 'xxl', max: null, columns: 5, rows: 3 },
  { key: 'xl', min: 'xl', max: 'xxl', columns: 4, rows: 3 },
  { key: 'lg', min: 'lg', max: 'xl', columns: 4, rows: 3 },
  { key: 'md', min: 'md', max: 'lg', columns: 3, rows: 4 },
  { key: 'sm', min: 'sm', max: 'md', columns: 3, rows: 4 }
] as const;
