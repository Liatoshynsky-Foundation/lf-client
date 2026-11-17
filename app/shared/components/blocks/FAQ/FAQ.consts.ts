export const faqItemKeys = [
  'refund',
  'usage',
  'waysToDonate',
  'cardSafety',
  'monthlySetup',
  'monthlyCancel',
  'monthlyChange',
  'otherSupport',
  'reports',
  'partnership'
] as const;
export type FaqItemKey = (typeof faqItemKeys)[number];
