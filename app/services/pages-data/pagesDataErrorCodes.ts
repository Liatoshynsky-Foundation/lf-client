export const PAGES_DATA_ERROR_CODES = {
  PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
  DRAFT_NOT_FOUND: 'DRAFT_NOT_FOUND'
} as const;

export type PagesDataErrorCode = (typeof PAGES_DATA_ERROR_CODES)[keyof typeof PAGES_DATA_ERROR_CODES];
