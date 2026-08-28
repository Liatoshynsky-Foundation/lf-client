import { render, screen } from '@testing-library/react';
import React from 'react';

import { PaymentMethodItem } from './PaymentMethodItem';

interface MockCopyLinkProps {
  hint: string;
  forceShowCopyIcon?: boolean;
  value: string;
}

jest.mock('~/ds-components/copy-link/CopyLink', () => ({
  __esModule: true,
  default: (props: MockCopyLinkProps) => (
    <div data-testid="mock-copy-link" data-hint={props.hint} data-force-icon={String(props.forceShowCopyIcon)}>
      {props.value}
    </div>
  )
}));

describe('PaymentMethodItem', () => {
  it('should render the label and value when a label is provided', () => {
    render(<PaymentMethodItem method={{ label: 'PayPal', value: 'paypal@example.com' }} hint="Copied" />);

    expect(screen.getByText('PayPal:')).toBeInTheDocument();
    expect(screen.getByTestId('mock-copy-link')).toHaveTextContent('paypal@example.com');
  });

  it('should render only the value when the label is an empty string', () => {
    render(<PaymentMethodItem method={{ label: '', value: 'bank@example.com' }} hint="Copied" />);

    expect(screen.queryByText(':')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-copy-link')).toHaveTextContent('bank@example.com');
  });

  it('should pass the hint and force-show-icon props through to CopyLink', () => {
    render(<PaymentMethodItem method={{ label: 'PayPal', value: 'paypal@example.com' }} hint="Copied!" />);

    const copyLink = screen.getByTestId('mock-copy-link');
    expect(copyLink).toHaveAttribute('data-hint', 'Copied!');
    expect(copyLink).toHaveAttribute('data-force-icon', 'true');
  });
});
