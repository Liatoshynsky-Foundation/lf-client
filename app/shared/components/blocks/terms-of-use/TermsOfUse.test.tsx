import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import TermsOfUse from './TermsOfUse';

jest.mock('~/public/icons/arrow-down.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="arrow-icon" />
}));

jest.mock('~/public/images/quote.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="quote-icon" />
}));

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, alt }: { Component: React.ComponentType<object>; alt?: string }) => (
    <div data-testid="svg-wrapper">
      <Component />
      {alt ?? ''}
    </div>
  )
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'Умови користування сайтом',
      quote: 'Цитата тестова',
      generalProvisionsTitle: 'General Provisions:'
    };
    return translations[key] || key;
  },
  useLocale: () => 'uk',
  useIntl: () => ({
    formatMessage: ({ defaultMessage }: { defaultMessage: string }) => defaultMessage
  })
}));

jest.mock('./terms.const.', () => ({
  introDoc: {
    uk: 'Intro текст тестовий'
  },
  rulesDoc: {
    uk: 'Rules текст тестовий'
  }
}));

jest.mock('~/shared/components/design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({ title, description }: { title?: string; description?: string }) => (
    <div data-testid="content-block">
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
    </div>
  )
}));

jest.mock('~/shared/components/design-system/all-components/skewed-block/SkewedBlock', () => ({
  SkewedBlock: ({ children }: { children: React.ReactNode }) => <div data-testid="skewed-block">{children}</div>
}));

jest.mock('./terms-content/TermsContent', () => ({
  __esModule: true,
  default: () => <div data-testid="terms-content" />
}));

describe('TermsOfUse', () => {
  beforeEach(() => {
    render(<TermsOfUse />);
  });

  it('should render the main title', () => {
    expect(screen.getByRole('heading', { name: /Умови користування сайтом/i })).toBeInTheDocument();
  });

  it('should render ContentBlock with introDoc', () => {
    expect(screen.getAllByTestId('content-block')[0]).toBeInTheDocument();
  });

  it('should render SkewedBlock with quote', () => {
    const skewedBlock = screen.getByTestId('skewed-block');
    expect(skewedBlock).toBeInTheDocument();
    expect(screen.getByText(/Цитата тестова/i)).toBeInTheDocument();
  });

  it('should render ContentBlock with General Provisions', () => {
    expect(screen.getAllByTestId('content-block')[1]).toBeInTheDocument();
    expect(screen.getByText(/General Provisions:/i)).toBeInTheDocument();
  });

  it('should render TermsContent', () => {
    expect(screen.getByTestId('terms-content')).toBeInTheDocument();
  });
});
