import { type TipTapDoc } from '~/types/types/common.types';

export function getDocKey(doc?: TipTapDoc): string | undefined {
  const maybeText = doc?.content?.[0]?.content?.[0]?.text ?? (doc as { text?: string })?.text;

  const text = typeof maybeText === 'string' ? maybeText.trim() : '';
  return text ? text.slice(0, 50) : undefined;
}
