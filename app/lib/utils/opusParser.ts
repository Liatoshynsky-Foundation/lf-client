export const OPUS_REGEX = /^(op|sine op)\.\s*(\d+)(?:\s+(.{1,20}))?$/i;

export interface ParsedOpus {
  prefix: string;
  num: number;
  rest: string;
}

type OpusValue = number | string | null | undefined;

const normalizeOpus = (opus: OpusValue): string | null => {
  if (typeof opus === 'number') {
    return Number.isFinite(opus) ? `op. ${opus}` : null;
  }

  return opus?.trim() || null;
};

export const parseFullOpus = (opusStr?: OpusValue): ParsedOpus | null => {
  const trimmedStr = normalizeOpus(opusStr);
  if (!trimmedStr) return null;
  const match = OPUS_REGEX.exec(trimmedStr);
  if (!match) return null;
  return {
    prefix: match[1].toLowerCase(),
    num: Number.parseFloat(match[2]),
    rest: match[3] ? match[3].trim() : ''
  };
};

export const parseOpus = (opusStr?: OpusValue): number | null => {
  const parsed = parseFullOpus(opusStr);
  return parsed ? parsed.num : null;
};
