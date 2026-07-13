export const OPUS_REGEX = /^(op|sine op)\.\s*(\d+)(?:\s+(.{1,20}))?$/i;

export interface ParsedOpus {
  prefix: string;
  num: number;
  rest: string;
}

export const parseFullOpus = (opusStr?: string): ParsedOpus | null => {
  if (!opusStr) return null;
  const trimmedStr = opusStr.trim();
  const match = OPUS_REGEX.exec(trimmedStr);
  if (!match) return null;
  return {
    prefix: match[1].toLowerCase(),
    num: Number.parseFloat(match[2]),
    rest: match[3] ? match[3].trim() : ''
  };
};

export const parseOpus = (opusStr?: string): number | null => {
  const parsed = parseFullOpus(opusStr);
  return parsed ? parsed.num : null;
};
