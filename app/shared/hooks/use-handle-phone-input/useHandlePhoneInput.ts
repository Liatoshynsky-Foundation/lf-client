import { useRef, useState } from 'react';

import { PHONE_COUNTRY_CODES } from '~/constants/phoneCountryCodes';

import { maskPhoneNumber } from '~/lib/utils/maskPhoneNumber';

const COUNTRY_CODE_MAX_LENGTH = 3;
const PHONE_NUMBER_MAX_LENGTH = 16;

type CountryMeta = {
  minPhoneLength: number;
  operatorCodeLength?: number;
};

function countDigits(text: string) {
  return text.match(/\d/g)?.length ?? 0;
}

function getDigitIndexBeforeCaret(rawValue: string, caretPos: number, addedDigitsOffset: number) {
  const safePos = Math.max(0, caretPos);
  const digitsBeforeCaret = countDigits(rawValue.slice(0, safePos));
  return digitsBeforeCaret > 0 ? digitsBeforeCaret + addedDigitsOffset : 0;
}

function caretHandler(
  inputElement: HTMLInputElement | null,
  nextMaskedValue: string,
  prevRawValue: string,
  prevCaretPos: number,
  addedDigitsOffset = 0
) {
  if (!inputElement) return;

  const targetDigitIndex = getDigitIndexBeforeCaret(prevRawValue, prevCaretPos, addedDigitsOffset);

  if (targetDigitIndex <= 0) {
    const pos = nextMaskedValue.startsWith('+') ? 1 : 0;
    inputElement.setSelectionRange(pos, pos);
    return;
  }

  let seenDigits = 0;
  let nextCaretPos = nextMaskedValue.length;

  for (let i = 0; i < nextMaskedValue.length; i++) {
    const ch = nextMaskedValue[i];
    if (ch >= '0' && ch <= '9') {
      seenDigits++;
      if (seenDigits === targetDigitIndex) {
        nextCaretPos = i + 1;
        break;
      }
    }
  }

  inputElement.setSelectionRange(nextCaretPos, nextCaretPos);
}

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
  return rawValue.replaceAll(/\D/g, '');
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
  previousDigits: string,
  caretPos: number,
  addedDigitsOffset: number
) {
  const currentDigits = cleanedWithPlus.slice(1);
  const isBackspace = rawValue.length < prevInputLengthRef.current;

  if (!isBackspace || !countryCode || currentDigits.length === 0) {
    return { cleanedWithPlus, countryCode };
  }

  if (currentDigits !== previousDigits) {
    return { cleanedWithPlus, countryCode };
  }

  const targetDigitIndex = getDigitIndexBeforeCaret(rawValue, caretPos, addedDigitsOffset);
  const deleteIndex = targetDigitIndex - 1;

  if (deleteIndex < 0) return { cleanedWithPlus, countryCode };

  const newDigits = currentDigits.slice(0, deleteIndex) + currentDigits.slice(deleteIndex + 1);
  const newCleanedWithPlus = `+${newDigits}`;
  const newCountryCode = findCountryCodePrefix(newCleanedWithPlus);

  return { cleanedWithPlus: newCleanedWithPlus, countryCode: newCountryCode };
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
    const prevCaretPos = inputElement?.selectionStart ?? rawValue.length;

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

    const addedDigitsOffset = digitsOnly.startsWith('0') ? 2 : 0;

    let cleanedWithPlus = normalizeLeadingCharacters(digitsOnly);
    const previousDigits = prevDigitsRef.current;

    let countryCode = findCountryCodePrefix(cleanedWithPlus);

    ({ cleanedWithPlus, countryCode } = adjustForBackspace(
      rawValue,
      prevInputLengthRef,
      cleanedWithPlus,
      countryCode,
      previousDigits,
      prevCaretPos,
      addedDigitsOffset
    ));

    if (!countryCode) {
      setHasError(!!cleanedWithPlus);
      prevInputLengthRef.current = cleanedWithPlus.length;
      prevDigitsRef.current = cleanedWithPlus.slice(1);
      if (inputElement && inputElement.value !== cleanedWithPlus) inputElement.value = cleanedWithPlus;

      caretHandler(inputElement, cleanedWithPlus, rawValue, prevCaretPos, addedDigitsOffset);
      return;
    }

    const meta = PHONE_COUNTRY_CODES[countryCode] as CountryMeta;
    const nationalNumber = cleanedWithPlus.slice(countryCode.length);
    const masked = applyMaskToInput(inputElement, countryCode, nationalNumber, meta.operatorCodeLength ?? 0);

    caretHandler(inputElement, masked, rawValue, prevCaretPos, addedDigitsOffset);

    const totalDigitsWithoutPlus = cleanedWithPlus.length - 1;
    const nextError = computeNextError(meta, totalDigitsWithoutPlus);
    if (nextError !== hasError) setHasError(nextError);

    prevInputLengthRef.current = masked.length;
    prevDigitsRef.current = cleanedWithPlus.slice(1);
  };

  return { handlePhoneInput, hasError };
}
