import { Locale } from 'next-intl';

type TipTapLikeDoc = {
  type?: string;
  content?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
};

const OPTIONAL_EMPTY_STRING_PATH_SUFFIXES = ['.alt', '.caption', '.genre'] as const;

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function fieldKeyFromPath(path: string): string {
  return (
    path
      .split('.')
      .pop()
      ?.replace(/\[\d+\]$/, '') ?? ''
  );
}

export function isOptionalEmptyStringPath(path: string, locale: Locale): boolean {
  if (OPTIONAL_EMPTY_STRING_PATH_SUFFIXES.some((suffix) => path.endsWith(suffix))) {
    return true;
  }

  return locale === 'en' && path.endsWith('.description');
}

export function doesTipTapHaveTranslations(root: TipTapLikeDoc): boolean {
  if (!Array.isArray(root.content)) {
    return false;
  }

  for (const node of root.content) {
    if (!node.content) {
      continue;
    }

    return node.content.every((childNode) => typeof childNode.text === 'string' && childNode.text !== '');
  }

  return false;
}

export function hasTipTapLocaleContent(value: unknown): boolean {
  if (typeof value === 'string') {
    return value !== '';
  }

  if (!isRecord(value)) {
    return false;
  }

  return doesTipTapHaveTranslations(value);
}

export function hasLocalizedContent(fieldValue: unknown, path: string, locale: Locale): boolean {
  if (!fieldValue && path.endsWith('.ticketUrl')) {
    return true;
  }

  if (typeof fieldValue === 'string') {
    return fieldValue !== '' || isOptionalEmptyStringPath(path, locale);
  }

  if (isRecord(fieldValue)) {
    return true;
  }

  return false;
}
