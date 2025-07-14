import { Composition } from '~/types/types/composition.types';

export const isLatin = (text: string): boolean => /[A-Za-z]/.test(text);

export const parseOpus = (opus: string): number | null => {
  const match = /Op\.\s?(\d+)/i.exec(opus);
  return match ? parseInt(match[1], 10) : null;
};

export const compareOpus = (a: string, b: string): number => {
  if (a === b) {
    return 0;
  }

  const opusA = parseOpus(a);
  const opusB = parseOpus(b);

  if (opusA === null || opusB === null) {
    throw new Error(`Invalid opus number: ${a} or ${b}`);
  }

  if (opusA === opusB) {
    if (a.endsWith('bis')) {
      return 1;
    }
    if (b.endsWith('bis')) {
      return -1;
    }
  }

  return opusA - opusB;
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
