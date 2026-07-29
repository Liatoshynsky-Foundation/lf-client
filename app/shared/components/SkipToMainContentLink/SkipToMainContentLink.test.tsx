import { render, screen } from '@testing-library/react';

import { SkipToMainContentLink } from './SkipToMainContentLink';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      skipToMainContent: 'Skip to main content'
    };
    return translations[key];
  }
}));

const defaultProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {};

const renderComponent = (overrides: Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> = {}) => {
  const mergedProps = {
    ...defaultProps,
    ...overrides
  };

  return render(<SkipToMainContentLink {...mergedProps} />);
};

describe('SkipToMainContentLink component', () => {
  it('should render the anchor tag with href to #main', () => {
    renderComponent();

    expect(screen.getByRole('link')).toHaveTextContent('Skip to main content');
  });

  it('should apply overridden props', () => {
    renderComponent({ href: '#new-target', 'aria-label': 'Skip navigation' });

    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Skip navigation');
    expect(screen.getByRole('link')).toHaveAttribute('href', '#new-target');
  });
});
