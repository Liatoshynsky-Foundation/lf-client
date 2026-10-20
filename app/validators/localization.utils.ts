import { Locale } from 'next-intl';

type TipTapLikeDoc = {
  type?: string;
  content?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
};

const OPTIONAL_EMPTY_STRING_PATH_SUFFIXES = ['.alt', '.caption', '.genre'] as const;

const OPTIONAL_EMPTY_TIPTAP_IMAGE_SUFFIXES = ['.alt', '.caption'] as const;

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

  if (path === 'root.description' || path.endsWith('.canonicalUrl') || path.endsWith('.keywords')) {
    return true;
  }

  return locale === 'en' && path.endsWith('.description');
}

export function isOptionalEmptyTipTapPath(path: string): boolean {
  if (OPTIONAL_EMPTY_TIPTAP_IMAGE_SUFFIXES.some((suffix) => path.endsWith(suffix))) {
    return true;
  }

  const isTeamMemberPath = path.includes('.members[');
  return isTeamMemberPath && (path.endsWith('.name') || path.endsWith('.description'));
}

export function doesTipTapHaveTranslations(root: TipTapLikeDoc): boolean {
  if (!Array.isArray(root.content)) {
    return true;
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
  if (path.endsWith('.allowIndexation')) {
    return true;
  }

  if (
    !fieldValue &&
    (path.endsWith('.ticketUrl') ||
      path.endsWith('.canonicalUrl') ||
      path.endsWith('.keywords') ||
      path === 'root.description')
  ) {
    return true;
  }

  if (typeof fieldValue === 'string') {
    return fieldValue !== '' || isOptionalEmptyStringPath(path, locale);
  }

  if (typeof fieldValue === 'boolean') {
    return true;
  }

  if (isRecord(fieldValue)) {
    if (isOptionalEmptyTipTapPath(path)) {
      return true;
    }

    return doesTipTapHaveTranslations(fieldValue);
  }

  return false;
}
