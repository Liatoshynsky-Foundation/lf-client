import { act, render } from '@testing-library/react';
import React from 'react';

jest.mock('~/constants/phoneCountryCodes', () => ({
  PHONE_COUNTRY_CODES: {
    '+380': { minPhoneLength: 12, operatorCodeLength: 2 },
    '+1': { minPhoneLength: 10, operatorCodeLength: 0 }
  }
}));

const maskSpy = jest.fn(
  (args: {
    countryCode: string;
    nationalNumber: string;
    operatorCodeLength: number;
    maxPhoneNumberLength: number;
    separateBy?: ' ' | '-';
  }) => {
    const { countryCode, nationalNumber, operatorCodeLength } = args;
    const op = operatorCodeLength ? ` (${nationalNumber.slice(0, operatorCodeLength)})` : '';
    const rest = nationalNumber.slice(operatorCodeLength);
    return `${countryCode}${op} ${rest}`.trim();
  }
);

jest.mock('~/lib/utils/maskPhoneNumber', () => ({
  maskPhoneNumber: (args: any) => maskSpy(args)
}));

import { useHandlePhoneInput } from '~/shared/hooks/use-handle-phone-input/useHandlePhoneInput';

type Api = {
  handlePhoneInput: (raw: string, el: HTMLInputElement | null) => void;
  getHasError: () => boolean;
};
function Harness({ onReady }: { onReady: (api: Api) => void }) {
  const { handlePhoneInput, hasError } = useHandlePhoneInput();
  const errRef = React.useRef(false);

  React.useEffect(() => {
    errRef.current = hasError;
  }, [hasError]);

  React.useEffect(() => {
    onReady({
      handlePhoneInput,
      getHasError: () => errRef.current
    });
  }, [handlePhoneInput, onReady]);

  return null;
}

function makeInput(initial = ''): HTMLInputElement {
  const el = document.createElement('input');
  el.value = initial;
  Object.defineProperty(el, 'selectionStart', {
    get() {
      return el.value.length;
    },
    configurable: true
  });
  el.setSelectionRange = () => {};
  return el;
}

async function renderAndGetApi(): Promise<Api> {
  return new Promise<Api>((resolve) => {
    render(React.createElement(Harness, { onReady: resolve }));
  });
}

describe('useHandlePhoneInput', () => {
  beforeEach(() => {
    maskSpy.mockClear();
  });

  it('should clear empty input with no errors shown', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('   ', input);
    });

    expect(api.getHasError()).toBe(false);
    expect(input.value).toBe('');
    expect(maskSpy).not.toHaveBeenCalled();
  });

  it('should show error when letters present, no format', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('abc', input);
    });

    expect(api.getHasError()).toBe(true);
    expect(input.value).toBe('');
    expect(maskSpy).not.toHaveBeenCalled();
  });

  it('should show error when unknown country code', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('31234567891', input);
    });

    expect(input.value).toBe('+31234567891');
    expect(api.getHasError()).toBe(true);
    expect(maskSpy).not.toHaveBeenCalled();
  });

  it('should format UA zero rule: "0" ----> "+380..."', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('0631122334', input);
    });

    expect(maskSpy).toHaveBeenCalledTimes(1);
    const args = maskSpy.mock.calls[0][0];
    expect(args.countryCode).toBe('+380');
    expect(args.operatorCodeLength).toBe(2);
    expect(args.nationalNumber).toBe('631122334');

    expect(input.value).toBe('+380 (63) 1122334');
    expect(api.getHasError()).toBe(false);
  });

  it('should format and no error at length >= 10', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+11234567890', input);
    });

    expect(maskSpy).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('+1 1234567890');
    expect(api.getHasError()).toBe(false);
  });

  it('should show error when it is too long (> MAX=16)', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+1' + '1'.repeat(16), input);
    });

    expect(maskSpy).toHaveBeenCalledTimes(1);
    expect(api.getHasError()).toBe(true);
  });
});
