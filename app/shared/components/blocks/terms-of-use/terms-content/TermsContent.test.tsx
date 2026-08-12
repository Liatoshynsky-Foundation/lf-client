import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import TermsContent from './TermsContent';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface ContentBlockProps {
  title?: string;
  description?: string;
  list?: string;
  containerSx?: object;
}

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'uk'
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false }))
}));

jest.mock('~/shared/components/design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({ title, description, list, containerSx }: ContentBlockProps) => (
    <div data-testid="content-block">
      {title && <div>{title}</div>}
      {description && <div data-testid="description">{JSON.stringify(description)}</div>}
      {list && (
        <ul data-testid="list">
          <li>{JSON.stringify(list)}</li>
        </ul>
      )}
      {containerSx && <div data-testid="sx">{JSON.stringify(containerSx)}</div>}
    </div>
  )
}));

jest.mock('./button-content-block/ButtonContentBlock', () => ({
  __esModule: true,
  default: ({ buttonText }: { buttonText: string }) => <button data-testid="button-block">{buttonText}</button>
}));

jest.mock('~/shared/components/design-system/all-components/skewed-block/SkewedBlock', () => ({
  SkewedBlock: () => <div data-testid="skewed-block" />
}));

describe('TermsContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });
  });

  it('should render the title libraryAccessTitle', () => {
    render(<TermsContent />);
    expect(screen.getByText('libraryAccessTitle')).toBeInTheDocument();
  });

  it('should render buttons with correct translation keys on desktop layout', () => {
    render(<TermsContent />);
    expect(screen.getByText('buttons.library.full')).toBeInTheDocument();
    expect(screen.getByText('buttons.archive.full')).toBeInTheDocument();
  });

  it('should render SkewedBlock component inside container', () => {
    render(<TermsContent />);
    expect(screen.getByTestId('skewed-block')).toBeInTheDocument();
  });

  it('should pass container styles to ContentBlock properly', () => {
    render(<TermsContent />);
    expect(screen.getAllByTestId('sx')[0]).toHaveTextContent('{"marginBottom":"16px"}');
  });

  it('should render shorthand button texts when switching to mobile breakpoints layout environment', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });

    render(<TermsContent />);
    expect(screen.getByText('buttons.library.short')).toBeInTheDocument();
    expect(screen.getByText('buttons.archive.short')).toBeInTheDocument();
  });
});
