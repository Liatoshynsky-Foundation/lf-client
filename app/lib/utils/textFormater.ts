const hyphenateWord = (word: string, maxLength: number, lines: string[]): string => {
  let remainingWord = word;
  while (remainingWord.length > maxLength) {
    const chunk = remainingWord.slice(0, maxLength - 1);
    lines.push(`${chunk}-`);
    remainingWord = remainingWord.slice(maxLength - 1);
  }
  return remainingWord;
};

export function formatTextWithHyphens(text: string | null | undefined, maxLength: number): string {
  if (!text) return '';

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (word.length > maxLength) {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = hyphenateWord(word, maxLength, lines);
    } else if (currentLine.length + word.length + (currentLine ? 1 : 0) > maxLength) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.join('\n');
}
