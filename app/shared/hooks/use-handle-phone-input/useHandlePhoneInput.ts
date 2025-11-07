import { useRef, useState } from 'react';

import { PHONE_COUNTRY_CODES } from '~/constants/phoneCountryCodes';

import { maskPhoneNumber } from '~/lib/utils/maskPhoneNumber';

const COUNTRY_CODE_MAX_LENGTH = 3;
const PHONE_NUMBER_MAX_LENGTH = 16;

type CountryMeta = {
  minPhoneLength: number;
  operatorCodeLength?: number;
};

function resetState(
  setHasError: (value: boolean) => void,
  prevInputLengthRef: { current: number },
  prevDigitsRef: { current: string }
) {
  setHasError(false);
  prevInputLengthRef.current = 0;
  prevDigitsRef.current = '';
}

function toDigitsOnly(rawValue: string) {
  return rawValue.replace(/\D/g, '');
}

function normalizeLeadingCharacters(cleanedDigits: string) {
  let normalized = cleanedDigits;
  if (normalized.startsWith('0')) normalized = `38${normalized}`;
  if (!normalized.startsWith('+')) normalized = `+${normalized}`;
  return normalized;
}

function findCountryCodePrefix(cleanedWithPlus: string): string | null {
  for (let length = COUNTRY_CODE_MAX_LENGTH; length >= 1; length--) {
    const candidate = cleanedWithPlus.slice(0, 1 + length);
    if (PHONE_COUNTRY_CODES[candidate]) return candidate;
  }
  return null;
}

function adjustForBackspace(
  rawValue: string,
  prevInputLengthRef: { current: number },
  cleanedWithPlus: string,
  countryCode: string | null,
  previousDigits: string
) {
  const isBackspace = rawValue.length < prevInputLengthRef.current;
  const currentDigits = cleanedWithPlus.slice(1);

  if (!isBackspace || !countryCode || currentDigits !== previousDigits || currentDigits.length === 0) {
    return { cleanedWithPlus, countryCode };
  }

  const countryDigits = countryCode.slice(1);
  const nationalDigits = currentDigits.slice(countryDigits.length);

  if (nationalDigits.length === 0) return { cleanedWithPlus: '', countryCode: null };
  if (nationalDigits.length === 1) return { cleanedWithPlus: countryCode, countryCode };

  return { cleanedWithPlus: `+${currentDigits.slice(0, -1)}`, countryCode };
}

function applyMaskToInput(
  inputElement: HTMLInputElement | null,
  countryCode: string,
  nationalNumber: string,
  operatorCodeLength: number
) {
  const masked = maskPhoneNumber({
    countryCode,
    nationalNumber,
    operatorCodeLength,
    maxPhoneNumberLength: PHONE_NUMBER_MAX_LENGTH,
    separateBy: '-'
  });
  if (inputElement) inputElement.value = masked;
  return masked;
}

function computeNextError(meta: CountryMeta, totalDigitsWithoutPlus: number) {
  const tooShort = meta.minPhoneLength !== null && totalDigitsWithoutPlus < meta.minPhoneLength;
  const tooLong = totalDigitsWithoutPlus > PHONE_NUMBER_MAX_LENGTH;
  return tooShort || tooLong;
}

export function useHandlePhoneInput() {
  const [hasError, setHasError] = useState(false);

  const prevInputLengthRef = useRef(0);
  const prevDigitsRef = useRef('');

  const handlePhoneInput = (rawValue: string, inputElement: HTMLInputElement | null) => {
    if (rawValue.trim() === '') {
      resetState(setHasError, prevInputLengthRef, prevDigitsRef);
      return;
    }

    const digitsOnly = toDigitsOnly(rawValue);
    if (!digitsOnly) {
      resetState(setHasError, prevInputLengthRef, prevDigitsRef);
      setHasError(true);
      return;
    }

    let cleanedWithPlus = normalizeLeadingCharacters(digitsOnly);
    const previousDigits = prevDigitsRef.current;

    let countryCode = findCountryCodePrefix(cleanedWithPlus);

    ({ cleanedWithPlus, countryCode } = adjustForBackspace(
      rawValue,
      prevInputLengthRef,
      cleanedWithPlus,
      countryCode,
      previousDigits
    ));

    if (!countryCode) {
      setHasError(!!cleanedWithPlus);
      prevInputLengthRef.current = cleanedWithPlus.length;
      prevDigitsRef.current = cleanedWithPlus.slice(1);
      if (inputElement && inputElement.value !== cleanedWithPlus) inputElement.value = cleanedWithPlus;
      return;
    }

    const meta = PHONE_COUNTRY_CODES[countryCode] as CountryMeta;
    const nationalNumber = cleanedWithPlus.slice(countryCode.length);
    const masked = applyMaskToInput(inputElement, countryCode, nationalNumber, meta.operatorCodeLength ?? 0);

    const totalDigitsWithoutPlus = cleanedWithPlus.length - 1;
    const nextError = computeNextError(meta, totalDigitsWithoutPlus);
    if (nextError !== hasError) setHasError(nextError);

    prevInputLengthRef.current = masked.length;
    prevDigitsRef.current = cleanedWithPlus.slice(1);
  };

  return { handlePhoneInput, hasError };
}
