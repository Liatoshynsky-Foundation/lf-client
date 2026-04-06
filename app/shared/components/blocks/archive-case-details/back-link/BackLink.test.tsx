import { render, screen } from '@testing-library/react';

import BackLink, { type BackLinkProps } from './BackLink';

import { getDynamicRoute } from '~/shared/components/constants/routes';

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ alt }: { alt: string }) => <span data-testid="mock-svg" aria-label={alt} />
}));

const defaultProps: BackLinkProps = {
  href: `/uk${getDynamicRoute.archiveFund(2)}`,
  label: 'Повернутись'
};

describe('BackLink', () => {
  it('renders with default data-testid and label', () => {
    render(<BackLink {...defaultProps} />);

    const wrapper = screen.getByTestId('ArchiveCaseDetails-back');
    expect(wrapper).toBeInTheDocument();

    const link = screen.getByRole('link', { name: defaultProps.label });
    expect(link).toBeInTheDocument();
  });

  it('passes href to the underlying link', () => {
    render(<BackLink {...defaultProps} />);

    const link = screen.getByRole('link', { name: defaultProps.label });
    expect(link).toHaveAttribute('href', defaultProps.href);
  });

  it('supports custom dataTestId', () => {
    render(<BackLink {...defaultProps} dataTestId="CustomBackLink" />);

    const wrapper = screen.getByTestId('CustomBackLink');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders icon via Svg component', () => {
    render(<BackLink {...defaultProps} />);

    const icon = screen.getByTestId('mock-svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-label', '');
  });
});
