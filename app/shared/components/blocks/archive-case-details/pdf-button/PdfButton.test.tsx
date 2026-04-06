import { render, screen } from '@testing-library/react';

import PdfButton, { type PdfButtonProps } from './PdfButton';

import { getDynamicRoute } from '~/shared/components/constants/routes';

describe('PdfButton', () => {
  const defaultProps: PdfButtonProps = {
    href: `/uk${getDynamicRoute.archiveCase(2, 'op1-spr2')}`,
    label: 'View PDF',
    dataTestId: 'PdfButton-test'
  };

  it('renders button with provided label', () => {
    render(<PdfButton {...defaultProps} />);

    const btn = screen.getByTestId('PdfButton-test');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(defaultProps.label);
  });

  it('sets correct link-related attributes', () => {
    render(<PdfButton {...defaultProps} />);

    const btn = screen.getByTestId('PdfButton-test');

    expect(btn).toHaveAttribute('href', defaultProps.href);
    expect(btn).toHaveAttribute('target', '_blank');
    expect(btn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('supports rendering without dataTestId', () => {
    render(<PdfButton href={defaultProps.href} label={defaultProps.label} />);

    const link = screen.getByRole('link', { name: defaultProps.label });
    expect(link).toBeInTheDocument();
  });
});
