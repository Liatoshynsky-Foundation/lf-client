import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import SupportFoundation from './SupportFoundation';

const WAY_FOR_PAY_TEXT = 'Quick Online Payment via WayForPay';
const IBAN_TEXT = 'Bank Transfer (IBAN)';

jest.mock('../../forms/donation-form/DonationForm', () => ({
  __esModule: true,
  default: () => <div data-testid="donation-form" />
}));

jest.mock('../payment-details/PaymentDetails', () => ({
  __esModule: true,
  default: () => <div data-testid="payment-details" />
}));

const tMock = Object.assign(
  jest.fn((key: string) => {
    if (key === 'title') return 'Support the Foundation';
    if (key === 'methods.wayForPay') return WAY_FOR_PAY_TEXT;
    if (key === 'methods.iban') return IBAN_TEXT;
    return `__${key}__`;
  }),
  {
    rich: jest.fn((key: string, tags: { [name: string]: (chunks: React.ReactNode) => React.ReactNode }) => {
      if (key === 'methods.wayForPay') return WAY_FOR_PAY_TEXT;
      if (key === 'methods.iban') return IBAN_TEXT;
      if (key !== 'subTitle') return `__${key}__`;

      return (
        <>
          All contributions go {tags.b('directly')} to the Lutoslawski Foundation —{tags.b('banking details below')} for
          the transfer
        </>
      );
    })
  }
);

jest.mock('next-intl', () => ({
  useTranslations: () => tMock
}));

describe('SupportFoundation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the main heading with the correct translation', () => {
    render(<SupportFoundation />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Support the Foundation'
    });

    expect(heading).toBeInTheDocument();
    expect(tMock).toHaveBeenCalledWith('title');
  });

  it('should render the subtitle with bold formatting from t.rich', () => {
    const { container } = render(<SupportFoundation />);

    expect(screen.getByText(/All contributions go/i)).toBeInTheDocument();

    const boldTags = container.querySelectorAll('b');
    const boldTexts = Array.from(boldTags).map((el) => el.textContent);

    expect(boldTexts).toEqual(expect.arrayContaining(['directly', 'banking details below']));
  });

  it('should render payment methods on separate lines', () => {
    render(<SupportFoundation />);

    const subtitle = screen.getByTestId('SupportFoundation-infoSection-subtitle');

    expect(subtitle).toHaveTextContent(WAY_FOR_PAY_TEXT);
    expect(subtitle).toHaveTextContent(IBAN_TEXT);
    expect(subtitle.querySelectorAll('br')).toHaveLength(4);
    expect(tMock.rich).toHaveBeenCalledWith('methods.wayForPay', expect.anything());
    expect(tMock.rich).toHaveBeenCalledWith('methods.iban', expect.anything());
  });

  it('should render the DonationForm component', () => {
    render(<SupportFoundation />);
    expect(screen.getByTestId('donation-form')).toBeInTheDocument();
  });

  it('should render the PaymentDetails component', () => {
    render(<SupportFoundation />);
    expect(screen.getByTestId('payment-details')).toBeInTheDocument();
  });

  it('should call t.rich with the "subTitle" key and proper tag mapping', () => {
    render(<SupportFoundation />);

    expect(typeof tMock.rich).toBe('function');
    expect(tMock).toHaveBeenCalledWith('title');
  });
});
