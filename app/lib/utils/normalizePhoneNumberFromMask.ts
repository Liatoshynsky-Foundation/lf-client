export function normalizePhoneNumberFromMask(maskedRaw: unknown): string | undefined {
  if (typeof maskedRaw !== 'string') return undefined;

  const normalizedPhoneNumber = maskedRaw.replace(/\D/g, '');

  return normalizedPhoneNumber ? `+${normalizedPhoneNumber}` : undefined;
}
