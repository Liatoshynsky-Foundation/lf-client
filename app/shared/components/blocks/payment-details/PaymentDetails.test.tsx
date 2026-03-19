import '@testing-library/jest-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { currencyList, paymentDetails } from './constants';
import PaymentDetails from './PaymentDetails';

jest.mock('../../design-system/all-components/button-group/ButtonGroup', () => ({
  __esModule: true,
  default: ({ buttons }: { buttons: React.ReactNode[] }) => <div data-testid="mock-button-group">{buttons}</div>
}));

jest.mock('../../design-system/all-components/copy-link/CopyLink', () => ({
  __esModule: true,
  default: (props: any) => {
    const val = props.text || props.value || props.copyText || '';
    return (
      <div data-testid="mock-copy-link" data-copy-value={val} onClick={() => navigator.clipboard.writeText(val)}>
        {props.children}
        <span data-testid="copy-content">{val}</span>
      </div>
    );
  }
}));

jest.mock('../../svg-image/SvgImage', () => ({
  SvgImage: (props: React.ComponentProps<'img'>) => <img data-testid="svg-image" {...props} alt="content copy icon" />
}));

function renderWithTheme(ui: React.ReactElement) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('PaymentDetails with Real Constants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) }
    });
  });

  test('should render currency buttons', () => {
    renderWithTheme(<PaymentDetails />);
    currencyList.forEach((currency) => {
      expect(screen.getByRole('button', { name: new RegExp(currency, 'i') })).toBeInTheDocument();
    });
  });

  test('should update IBAN when switching currencies', () => {
    renderWithTheme(<PaymentDetails />);

    expect(screen.getByTestId('mock-copy-link')).toHaveAttribute('data-copy-value', paymentDetails.uah.iban);

    const usdBtn = screen.getByRole('button', { name: /USD/i });
    fireEvent.click(usdBtn);

    expect(screen.getByTestId('mock-copy-link')).toHaveAttribute('data-copy-value', paymentDetails.usd.iban);
  });

  test('should copy the correct IBAN to clipboard on click', () => {
    renderWithTheme(<PaymentDetails />);

    fireEvent.click(screen.getByRole('button', { name: /EUR/i }));

    const copyLink = screen.getByTestId('mock-copy-link');
    fireEvent.click(copyLink);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(paymentDetails.eur.iban);
  });

  test('should render static labels correctly', () => {
    renderWithTheme(<PaymentDetails />);
    expect(screen.getByText(/Банк:/i)).toBeInTheDocument();
    expect(screen.getByText(paymentDetails.uah.bank)).toBeInTheDocument();
  });
});
