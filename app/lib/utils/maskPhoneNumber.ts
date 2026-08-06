export type MaskPhoneNumberProps = {
  countryCode: string;
  nationalNumber: string;
  operatorCodeLength: number;
  maxPhoneNumberLength: number;
  separateBy?: SeparateBy;
};

type SeparateBy = ' ' | '-';

function clampNational(national: string, maxDigits: number, countryCodeLength: number): string {
  const allowed = Math.max(0, maxDigits - countryCodeLength);
  return national.slice(0, allowed);
}

function groupNationalRest(rest: string, separator: string): string {
  const length = rest.length;
  if (length <= 1) {
    return rest;
  }

  if (length < 9) {
    const firstGroupSize = Math.floor(length / 2);
    return rest.slice(0, firstGroupSize) + separator + rest.slice(firstGroupSize);
  }

  const baseGroupSize = Math.floor(length / 3);
  const firstGroup = rest.slice(0, baseGroupSize);
  const secondGroup = rest.slice(baseGroupSize, baseGroupSize * 2);
  const lastGroup = rest.slice(baseGroupSize * 2);

  return [firstGroup, secondGroup, lastGroup].join(separator);
}

export function maskPhoneNumber({
  countryCode,
  nationalNumber,
  operatorCodeLength,
  maxPhoneNumberLength,
  separateBy
}: MaskPhoneNumberProps): string {
  const clampedNational = clampNational(nationalNumber, maxPhoneNumberLength, countryCode.length);

  const operatorCode = clampedNational.slice(0, operatorCodeLength);
  const rest = clampedNational.slice(operatorCodeLength);

  let out = `${countryCode}`;
  if (out) {
    out += ' ';
  }

  if (operatorCodeLength > 0 && !!operatorCode) {
    out += `(${operatorCode}) `;
  }

  const grouped = groupNationalRest(rest, separateBy ?? ' ');

  return `${out}${grouped}`.trim();
}
