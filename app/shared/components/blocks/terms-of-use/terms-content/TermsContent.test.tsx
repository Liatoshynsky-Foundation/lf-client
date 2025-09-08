import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TermsContent from './TermsContent';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'uk'
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => ({ isMobile: false })
}));

jest.mock('~/shared/components/design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({
    title,
    description,
    list,
    containerSx
  }: {
    title?: string;
    description?: string;
    list?: string;
    containerSx?: object;
  }) => (
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
  it('should render the title libraryAccessTitl', () => {
    render(<TermsContent />);
    expect(screen.getByText('libraryAccessTitle')).toBeInTheDocument();
  });

  it('should render buttons with correct translation keys (desktop)', () => {
    render(<TermsContent />);
    expect(screen.getByText('buttons.library.full')).toBeInTheDocument();
    expect(screen.getByText('buttons.archive.full')).toBeInTheDocument();
  });

  it('should render SkewedBlock', () => {
    render(<TermsContent />);
    expect(screen.getByTestId('skewed-block')).toBeInTheDocument();
  });

  it('should pass container styles to ContentBlock', () => {
    render(<TermsContent />);
    expect(screen.getAllByTestId('sx')[0]).toHaveTextContent('{"marginBottom":"16px"}');
  });
});
