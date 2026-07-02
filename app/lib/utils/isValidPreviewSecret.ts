import { timingSafeEqual } from 'node:crypto';

export const isValidPreviewSecret = (secret: string): boolean => {
  const expected = process.env.PREVIEW_SECRET;
  if (!expected) {
    return false;
  }

  const provided = Buffer.from(secret);
  const configured = Buffer.from(expected);

  if (provided.length !== configured.length) {
    return false;
  }

  return timingSafeEqual(provided, configured);
};
