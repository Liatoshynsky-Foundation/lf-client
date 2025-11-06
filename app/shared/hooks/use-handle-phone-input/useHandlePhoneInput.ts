import { useRef, useState } from 'react';

import { PHONE_COUNTRY_CODES } from '~/constants/phoneCountryCodes';

import { maskPhoneNumber } from '~/lib/utils/maskPhoneNumber';

const COUNTRY_CODE_MAX_LENGTH = 3;
const PHONE_NUMBER_MAX_LENGTH = 16;

export function useHandlePhoneInput() {
  const [hasError, setHasError] = useState(false);

  const prevInputLengthRef = useRef(0);
  const prevDigitsRef = useRef('');

  const handlePhoneInput = (rawValue: string, inputEl: HTMLInputElement | null) => {
    if (rawValue.trim() === '') {
      setHasError(false);
      prevInputLengthRef.current = 0;
      prevDigitsRef.current = '';
      return;
    }

    const digitsOnly = rawValue.replace(/\D/g, '');
    let cleaned = digitsOnly ?? '';

    if (!cleaned) {
      setHasError(true);
      prevInputLengthRef.current = 0;
      prevDigitsRef.current = '';
      return;
    }

    if (cleaned.startsWith('0')) cleaned = `38${cleaned}`;
    if (!cleaned.startsWith('+')) cleaned = `+${cleaned}`;

    const currentDigits = cleaned.slice(1);
    const prevDigits = prevDigitsRef.current;
    const isBackspace = rawValue.length < prevInputLengthRef.current;
    let countryCode: string | null = null;

    for (let len = COUNTRY_CODE_MAX_LENGTH; len >= 1; len--) {
      const candidate = cleaned.slice(0, 1 + len);
      if (PHONE_COUNTRY_CODES[candidate]) {
        countryCode = candidate;
        break;
      }
    }

    if (isBackspace && currentDigits === prevDigits && currentDigits.length > 0 && countryCode) {
      const countryDigits = countryCode.slice(1);
      const nationalDigits = currentDigits.slice(countryDigits.length);

      if (nationalDigits.length === 0) {
        cleaned = '';
        countryCode = null;
      } else if (nationalDigits.length === 1) {
        cleaned = countryCode;
      } else {
        cleaned = `+${currentDigits.slice(0, -1)}`;
      }
    }

    if (!countryCode) {
      setHasError(!!cleaned);
      prevInputLengthRef.current = cleaned.length;
      prevDigitsRef.current = cleaned.slice(1);
      if (inputEl && inputEl.value !== cleaned) inputEl.value = cleaned;
      return;
    }

    const meta = PHONE_COUNTRY_CODES[countryCode];
    const expectedMinLength = meta.minPhoneLength;
    const operatorCodeLength = meta.operatorCodeLength ?? 0;

    const digitsCount = cleaned.length - 1;
    const nationalNumber = cleaned.slice(countryCode.length);

    const masked = maskPhoneNumber({
      countryCode,
      nationalNumber,
      operatorCodeLength,
      maxPhoneNumberLength: PHONE_NUMBER_MAX_LENGTH,
      separateBy: '-'
    });

    if (inputEl) {
      inputEl.value = masked;
    }

    const tooShort = expectedMinLength !== null && digitsCount < expectedMinLength;
    const tooLong = digitsCount > PHONE_NUMBER_MAX_LENGTH;
    const nextError = tooShort || tooLong;

    if (nextError !== hasError) {
      setHasError(nextError);
    }

    prevInputLengthRef.current = masked.length;
    prevDigitsRef.current = cleaned.slice(1);
  };

  return {
    handlePhoneInput,
    hasError
  };
}
