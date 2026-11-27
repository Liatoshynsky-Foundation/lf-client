import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PaymentDetails from './PaymentDetails';

import type { PaymentDetailsTabDTO } from '~/domain/dto/paymentDetails.dto';
import { usePaymentDetails } from '~/shared/hooks/use-payment-details/usePaymentDetails';

jest.mock('~/shared/hooks/use-payment-details/usePaymentDetails', () => ({
  usePaymentDetails: jest.fn()
}));

jest.mock('../../design-system/all-components/button-group/ButtonGroup', () => ({
  __esModule: true,
  default: ({ buttons }: { buttons: React.ReactNode[] }) => <div data-testid="mock-button-group">{buttons}</div>
}));

const textDoc = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
});

const tabs: PaymentDetailsTabDTO[] = [
  { id: 'tab-uah', name: 'UAH', content: textDoc('UAH requisites'), order: 0 },
  { id: 'tab-usd', name: 'USD', content: textDoc('USD requisites'), order: 1 }
];

const mockTabs = (value: PaymentDetailsTabDTO[]) =>
  (usePaymentDetails as jest.Mock).mockReturnValue({ tabs: value, isLoading: false, isError: false });

describe('PaymentDetails', () => {
  beforeEach(() => mockTabs(tabs));

  it('renders a tab button for every loaded tab in the given order', () => {
    render(<PaymentDetails />);

    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual(['UAH', 'USD']);
  });

  it('selects the first tab by default', () => {
    render(<PaymentDetails />);

    expect(screen.getByRole('button', { name: 'UAH' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('UAH requisites')).toBeInTheDocument();
    expect(screen.queryByText('USD requisites')).not.toBeInTheDocument();
  });

  it('switches the content when another tab is selected', () => {
    render(<PaymentDetails />);

    fireEvent.click(screen.getByRole('button', { name: 'USD' }));

    expect(screen.getByRole('button', { name: 'USD' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('USD requisites')).toBeInTheDocument();
    expect(screen.queryByText('UAH requisites')).not.toBeInTheDocument();
  });

  it('renders nothing while there are no tabs', () => {
    mockTabs([]);

    const { container } = render(<PaymentDetails />);

    expect(container).toBeEmptyDOMElement();
  });
});
