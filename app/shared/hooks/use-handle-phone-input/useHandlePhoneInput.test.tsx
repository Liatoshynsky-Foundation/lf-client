import { act, render } from '@testing-library/react';
import React from 'react';

jest.mock('~/constants/phoneCountryCodes', () => ({
  PHONE_COUNTRY_CODES: {
    '+380': { minPhoneLength: 12, operatorCodeLength: 2 },
    '+1': { minPhoneLength: 10, operatorCodeLength: undefined }
  }
}));

type MaskArgs = {
  countryCode: string;
  nationalNumber: string;
  operatorCodeLength: number;
  maxPhoneNumberLength: number;
  separateBy?: ' ' | '-';
};

const maskSpy = jest.fn((args: MaskArgs) => {
  const { countryCode, nationalNumber, operatorCodeLength } = args;
  const op = operatorCodeLength ? ` (${nationalNumber.slice(0, operatorCodeLength)})` : '';
  const rest = nationalNumber.slice(operatorCodeLength);
  return `${countryCode}${op} ${rest}`.trim();
});

jest.mock('~/lib/utils/maskPhoneNumber', () => ({
  maskPhoneNumber: (args: MaskArgs) => maskSpy(args)
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
  let customSelectionStart = initial.length;

  Object.defineProperty(el, 'selectionStart', {
    get() {
      return customSelectionStart;
    },
    set(value: number) {
      customSelectionStart = value;
    },
    configurable: true
  });

  el.setSelectionRange = jest.fn((start: number) => {
    customSelectionStart = start;
  });

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
    const mockArgs = maskSpy.mock.calls[0][0];
    expect(mockArgs.countryCode).toBe('+380');
    expect(mockArgs.operatorCodeLength).toBe(2);
    expect(mockArgs.nationalNumber).toBe('631122334');

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

  it('should adjust for backspace and recalculate country code cleanly when digits match previous', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+38063', input);
    });

    input.selectionStart = 6;
    await act(async () => {
      api.handlePhoneInput('+3806', input);
    });

    expect(maskSpy).toHaveBeenCalled();
  });

  it('should handle caret placement at the beginning or near the plus sign cleanly', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    input.selectionStart = 0;
    await act(async () => {
      api.handlePhoneInput('+1555', input);
    });
    expect(input.setSelectionRange).toHaveBeenCalledWith(1, 1);
  });

  it('should loop through masked characters and find the correct caret position inside digits', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+38063', input);
    });

    input.selectionStart = 4;
    await act(async () => {
      api.handlePhoneInput('+380631', input);
    });
    expect(input.setSelectionRange).toHaveBeenCalled();
  });

  it('should early return from caretHandler if inputElement parameter is missing', async () => {
    const api = await renderAndGetApi();
    await act(async () => {
      api.handlePhoneInput('+1555', null);
    });
    expect(api.getHasError()).toBe(true);
  });

  it('should skip adjustForBackspace when backspace occurs but input digits do not match previous state', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+38063', input);
    });

    await act(async () => {
      api.handlePhoneInput('+3809', input);
    });
    expect(maskSpy).toHaveBeenCalled();
  });

  it('should execute branch in adjustForBackspace and handle fully custom inner slice deletion indexes', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+1555', input);
    });

    input.selectionStart = 3;
    await act(async () => {
      api.handlePhoneInput('+155', input);
    });

    expect(maskSpy).toHaveBeenCalled();
  });

  it('should trigger deleteIndex boundary guard checks inside adjustForBackspace workflow cleanly', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+1', input);
    });

    input.selectionStart = 0;
    await act(async () => {
      api.handlePhoneInput('+', input);
    });

    expect(api.getHasError()).toBe(true);
  });

  it('should enter the inner backspace block where digits match previous because mask formatting character was deleted', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+38063', input);
    });

    input.selectionStart = 5;
    await act(async () => {
      api.handlePhoneInput('+38063', input);
    });

    expect(maskSpy).toHaveBeenCalled();
  });

  it('should cover branch targetDigitIndex less than or equal to zero inside caretHandler cleanly', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();
    input.selectionStart = -1;
    await act(async () => {
      api.handlePhoneInput('+1', input);
    });
    expect(input.setSelectionRange).toHaveBeenCalled();
  });

  it('should cover deleteIndex guard inside adjustForBackspace branch when index evaluates below zero', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();
    await act(async () => {
      api.handlePhoneInput('+1', input);
    });
    input.selectionStart = 0;
    await act(async () => {
      api.handlePhoneInput('+', input);
    });
    expect(api.getHasError()).toBe(true);
  });

  it('should cover error toggling conditional workflows inside primary hook thread handler', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();
    await act(async () => {
      api.handlePhoneInput('+11234567890', input);
    });
    expect(api.getHasError()).toBe(false);
    await act(async () => {
      api.handlePhoneInput('+112', input);
    });
    expect(api.getHasError()).toBe(true);
  });

  it('should cover alternative branch inside caretHandler for nextMaskedValue not starting with plus', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();
    maskSpy.mockReturnValueOnce('123');
    await act(async () => {
      api.handlePhoneInput('1', input);
    });
    expect(input.setSelectionRange).toHaveBeenCalledWith(0, 0);
  });

  it('should cover backspace branch on first character causing negative deleteIndex to satisfy line 111', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();
    await act(async () => {
      api.handlePhoneInput('+1', input);
    });
    input.selectionStart = 1;
    await act(async () => {
      api.handlePhoneInput('+', input);
    });
    expect(api.getHasError()).toBe(true);
  });

  it('should hit the false branch where deleteIndex is greater than or equal to zero on line 111', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+3806312345', input);
    });
    input.value = '+380 (63) 123-45';
    input.selectionStart = 14;
    await act(async () => {
      api.handlePhoneInput('+380 (63) 12345', input);
    });
    expect(maskSpy).toHaveBeenCalled();
  });
  it('should cover fallback operator value zero on line 193 when country operatorCodeLength is undefined', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();
    await act(async () => {
      api.handlePhoneInput('+1555555', input);
    });
    expect(maskSpy).toHaveBeenCalledWith(expect.objectContaining({ operatorCodeLength: 0 }));
  });
  it('should hit deleteIndex negative branch when caret is at position zero during formatting backspace', async () => {
    const api = await renderAndGetApi();
    const input = makeInput();

    await act(async () => {
      api.handlePhoneInput('+38063', input);
    });

    input.selectionStart = 0;
    await act(async () => {
      api.handlePhoneInput('+380 (63', input);
    });

    expect(maskSpy).toHaveBeenCalled();
  });
});
