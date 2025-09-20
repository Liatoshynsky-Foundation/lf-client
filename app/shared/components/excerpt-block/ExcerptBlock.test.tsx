import { render, screen } from '@testing-library/react';

import ExcerptBlock from './ExcerptBlock';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('ExcerptBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders mobile view', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });

    render(<ExcerptBlock quote="Some quote" source="Some source" />);

    expect(screen.getByText('Some quote')).toBeInTheDocument();
    expect(screen.getByText('Some source')).toBeInTheDocument();
  });

  it('renders desktop view', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });

    render(<ExcerptBlock quote="Some quote" source="Some source" />);

    expect(screen.getByText('Some quote')).toBeInTheDocument();
    expect(screen.getByText('Some source')).toBeInTheDocument();
    expect(screen.getByAltText('Quote icon')).toBeInTheDocument();
  });
  it('applies correct class for mobile', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });

    render(<ExcerptBlock quote="Some quote" source="Some source" />);
    const quote = screen.getByText('Some quote');
    const source = screen.getByText('Some source');

    expect(quote.className).toMatch(/MuiTypography-customItalic18/);
    expect(source.className).toMatch(/MuiTypography-customItalic14/);
  });

  it('applies correct class for desktop', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });

    render(<ExcerptBlock quote="Some quote" source="Some source" />);
    const quote = screen.getByText('Some quote');
    const source = screen.getByText('Some source');

    expect(quote.className).toMatch(/MuiTypography-h5/);
    expect(source.className).toMatch(/MuiTypography-customItalic14/);
  });
});
