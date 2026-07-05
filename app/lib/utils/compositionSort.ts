import { Composition } from '~/types/types/composition.types';

import { parseFullOpus } from '~/lib/utils/opusParser';

export const isLatin = (text: string): boolean => /[A-Za-z]/.test(text);

export const compareOpus = (a: string, b: string): number => {
  if (a === b) {
    return 0;
  }

  const parsedA = parseFullOpus(a);
  const parsedB = parseFullOpus(b);

  if (parsedA === null || parsedB === null) {
    throw new Error(`Invalid opus number: ${a} or ${b}`);
  }

  if (parsedA.prefix !== parsedB.prefix) {
    return parsedA.prefix === 'op' ? -1 : 1;
  }

  if (parsedA.num !== parsedB.num) {
    return parsedA.num - parsedB.num;
  }

  const cleanA = parsedA.rest.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanB = parsedB.rest.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanA.localeCompare(cleanB, undefined, { numeric: true, sensitivity: 'base' });
};

export const compareLang = (a: string, b: string): number => {
  const aIsLatin = isLatin(a);
  const bIsLatin = isLatin(b);
  if (aIsLatin !== bIsLatin) {
    return aIsLatin ? 1 : -1;
  }

  return a.localeCompare(b);
};

export const compositionSort = (compositions: Composition[], reverse: boolean = false): Composition[] => {
  const direction = reverse ? -1 : 1;

  const customCompositionSortFunc = (a: Composition, b: Composition): number => {
    if ((!a.opus || !b.opus) && (a.opus || b.opus)) {
      return (!a.opus ? 1 : -1) * direction;
    }

    if (a.year !== b.year) {
      return (a.year - b.year) * direction;
    }

    if (a.opus && b.opus) {
      const opusComp = compareOpus(a.opus.number, b.opus.number);
      if (opusComp !== 0) {
        return opusComp * direction;
      }
    }

    return compareLang(a.title, b.title) * direction;
  };

  return compositions.sort(customCompositionSortFunc);
};
