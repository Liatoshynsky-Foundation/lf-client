import { Composition } from '~/types/types/composition.types';

export const isLatin = (text: string): boolean => /[A-Za-z]/.test(text);

export const parseOpus = (opus: string): number | null => {
  const match = /Op\.\s?(\d+)\s?(bis)?/i.exec(opus);
  return match ? parseInt(match[1], 10) : null;
};

export const compositionSort = (compositions: Composition[], reverse: boolean = false): Composition[] => {
  const direction = reverse ? -1 : 1;

  const customCompositionSortFunc = (a: Composition, b: Composition): number => {
    // presence of an opus
    if (!a.opus || !b.opus) {
      return (!a.opus ? 1 : -1) * direction;
    }

    // year of writing
    if (a.year !== b.year) {
      return (a.year - b.year) * direction;
    }

    // opus number
    if (a.opus && b.opus) {
      const opusA = parseOpus(a.opus.number);
      const opusB = parseOpus(b.opus.number);

      if (opusA === null || opusB === null) {
        throw new Error(`Invalid opus number: ${a.opus.number} or ${b.opus.number}`);
      }

      if (opusA === opusB) {
        console.log(`Opus numbers are equal: ${opusA} for both compositions.`);
        console.log(`Comparing opus bis status for: ${a.opus.number} and ${b.opus.number}`);
        console.log(`Opus A: ${/bis$/.test(a.opus.number)}, Opus B: ${/bis$/.test(b.opus.number)}`);

        if (/bis$/.test(a.opus.number)) {
          // If a is "bis", it comes after b
          return direction;
        }
        if (/bis$/.test(b.opus.number)) {
          // If b is "bis", it comes after a
          return -direction;
        }
        return 0; // If both are equal and neither is "bis"
      }

      return (opusA - opusB) * direction;
    }

    // title language
    const aIsLatin = isLatin(a.title);
    const bIsLatin = isLatin(b.title);
    if (aIsLatin !== bIsLatin) {
      return (aIsLatin ? 1 : -1) * direction;
    }

    // alphabetical order
    return a.title.localeCompare(b.title) * direction;
  };

  return compositions.sort(customCompositionSortFunc);
};
