import '@testing-library/jest-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PaymentDetails from './PaymentDetails';

jest.mock('../../design-system/all-components/button-group/ButtonGroup', () => ({
  __esModule: true,
  default: ({ buttons }: { buttons: React.ReactNode[] }) => <div data-testid="mock-button-group">{buttons}</div>
}));

jest.mock('../../design-system/all-components/copy-link/CopyLink', () => ({
  __esModule: true,
  default: ({ value }: { value: string | number; hint?: string }) => {
    const handleClick = () => {
      navigator.clipboard.writeText(String(value));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <button type="button" onClick={handleClick} onKeyDown={handleKeyDown} data-testid="mock-copy-link">
        <span>{value}</span>
      </button>
    );
  }
}));

jest.mock('../../svg-image/SvgImage', () => ({
  SvgImage: (props: React.ComponentProps<'img'>) => <img data-testid="svg-image" {...props} alt="content copy icon" />
}));

jest.mock('./constants', () => {
  const currencyList = ['uah', 'usd', 'eur'] as const;

  const paymentDetails = {
    uah: {
      receiver: 'ГО "ФУНДАЦІЯ ЛЯТОШИНСЬКОГО"',
      edrpou: '45111281',
      bank: 'АТ «УКРСИББАНК»',
      iban: 'UA28-U-A-H'
    },
    usd: {
      receiver: 'B. Lyatoshynsky Foundation',
      edrpou: '45111281',
      bank: 'JSC UKRSIBBANK (USD)',
      iban: 'UA28-U-S-D'
    },
    eur: {
      receiver: 'B. Lyatoshynsky Foundation',
      edrpou: '45111281',
      bank: 'JSC UKRSIBBANK (EUR)',
      iban: 'UA28-E-U-R'
    }
  };

  const paymentFields = [
    { label: 'Отримувач:', key: 'receiver' },
    { label: 'ЄДРПОУ:', key: 'edrpou' },
    { label: 'Банк:', key: 'bank' },
    { label: 'IBAN:', key: 'iban', isIban: true }
  ] as const;

  return {
    __esModule: true,
    currencyList,
    paymentDetails,
    paymentFields
  };
});

function renderWithTheme(ui: React.ReactElement) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) }
  });
});

describe('PaymentDetails', () => {
  test('should render currency buttons and default to UAH', () => {
    renderWithTheme(<PaymentDetails />);

    expect(screen.getByRole('button', { name: 'UAH' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'USD' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EUR' })).toBeInTheDocument();

    expect(screen.getByText('Отримувач:')).toBeInTheDocument();
    expect(screen.getByText('ГО "ФУНДАЦІЯ ЛЯТОШИНСЬКОГО"')).toBeInTheDocument();
    expect(screen.getByText('ЄДРПОУ:')).toBeInTheDocument();
    expect(screen.getByText('45111281')).toBeInTheDocument();
    expect(screen.getByText('Банк:')).toBeInTheDocument();
    expect(screen.getByText('АТ «УКРСИББАНК»')).toBeInTheDocument();
    expect(screen.getByText('IBAN:')).toBeInTheDocument();
    expect(screen.getByText('UA28-U-A-H')).toBeInTheDocument();
  });

  test('should switch currency and update details', () => {
    renderWithTheme(<PaymentDetails />);

    fireEvent.click(screen.getByRole('button', { name: 'USD' }));
    expect(screen.getByText('JSC UKRSIBBANK (USD)')).toBeInTheDocument();
    expect(screen.getByText('UA28-U-S-D')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'EUR' }));
    expect(screen.getByText('JSC UKRSIBBANK (EUR)')).toBeInTheDocument();
    expect(screen.getByText('UA28-E-U-R')).toBeInTheDocument();
  });

  it('should copy IBAN to clipboard when IBAN is clicked', async () => {
    render(<PaymentDetails />);

    const copyLinks = screen.getAllByTestId('mock-copy-link');
    const ibanCopyButton = copyLinks.find((link) => link.textContent?.includes('UA28-U-A-H'));

    await act(async () => {
      if (ibanCopyButton) {
        fireEvent.click(ibanCopyButton);
      }
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('UA28-U-A-H');
  });

  test('should render all labels from paymentFields', () => {
    renderWithTheme(<PaymentDetails />);
    expect(screen.getByText('Отримувач:')).toBeInTheDocument();
    expect(screen.getByText('ЄДРПОУ:')).toBeInTheDocument();
    expect(screen.getByText('Банк:')).toBeInTheDocument();
    expect(screen.getByText('IBAN:')).toBeInTheDocument();
  });
});
