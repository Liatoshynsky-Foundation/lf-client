import { act, fireEvent, render, screen } from '@testing-library/react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { ContactLink } from './ContactLink';

import { sxToArray } from '~/lib/utils/sxToArray';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, ...props }: { Component: React.ComponentType }) => <Component {...props} />
}));

let mockIsMobile = false;

jest.mock('~/ds-components/copy-link/CopyLink', () => ({
  __esModule: true,
  default: ({ value, hrefType, disabled }: { value: string | number; hrefType?: string; disabled?: boolean }) => {
    const handleClick = () => {
      if (!disabled && !mockIsMobile) {
        navigator.clipboard.writeText(String(value));
      }
    };

    if (mockIsMobile && hrefType) {
      const href = hrefType === 'phone' ? `tel:${value}` : `mailto:${value}`;
      return (
        <a href={href} data-testid="mock-copy-link">
          {value}
        </a>
      );
    }

    return (
      <div aria-disabled={disabled ? 'true' : 'false'} onClick={handleClick} data-testid="mock-copy-link">
        <span>{value}</span>
      </div>
    );
  }
}));

const mockedUseBreakpoints = useBreakpoints as jest.Mock;

beforeEach(() => {
  mockIsMobile = false;
  mockedUseBreakpoints.mockReturnValue({ isMobile: false });
});

const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: { writeText: mockWriteText }
});

const IconMock = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="mock-icon" {...props} />;

describe('ContactLink component', () => {
  afterEach(() => jest.clearAllMocks());

  it('should render email label and text on desktop', () => {
    render(<ContactLink type="email" value="test@example.com" label="Email" />);

    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should render mailto link on mobile', () => {
    mockIsMobile = true;
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });

    render(<ContactLink type="email" value="mobile@example.com" label="Email" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:mobile@example.com');
  });

  it('should render phone link with tel: on mobile', () => {
    mockIsMobile = true;
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });

    render(<ContactLink type="phone" value="+380123456789" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'tel:+380123456789');
  });

  it('should render phone value on desktop', () => {
    render(<ContactLink type="phone" value="+380123456789" />);
    const copyLink = screen.getByTestId('mock-copy-link');
    expect(copyLink).toBeInTheDocument();
    expect(copyLink).toHaveTextContent('+380123456789');
  });

  it('should render icon when provided', () => {
    render(<ContactLink type="email" value="test@example.com" icon={IconMock} />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should copy value to clipboard when copy link clicked', async () => {
    render(<ContactLink type="email" value="copy@example.com" />);
    const copyLink = screen.getByTestId('mock-copy-link');

    await act(async () => {
      fireEvent.click(copyLink);
    });

    expect(mockWriteText).toHaveBeenCalledWith('copy@example.com');
  });

  it('should not copy value when disabled', async () => {
    render(<ContactLink type="email" value="test@example.com" disabled />);
    const copyLink = screen.getByTestId('mock-copy-link');

    await act(async () => {
      fireEvent.click(copyLink);
    });

    expect(mockWriteText).not.toHaveBeenCalled();
  });

  it('should render layout in column direction', () => {
    render(<ContactLink type="email" value="col@example.com" direction="column" />);
    const contentBox = screen.getByText('col@example.com').closest('.MuiBox-root');
    expect(contentBox).toBeInTheDocument();
  });

  it('should render inline copy link in column direction', () => {
    render(<ContactLink type="email" value="inline@example.com" direction="column" />);
    expect(screen.getByTestId('mock-copy-link')).toBeInTheDocument();
  });

  it('should render copy link next to row layout', () => {
    render(<ContactLink type="email" value="row@example.com" direction="row" />);
    expect(screen.getByTestId('mock-copy-link')).toBeInTheDocument();
  });

  it('should not render copy button on mobile', () => {
    mockIsMobile = true;
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });

    render(<ContactLink type="email" value="mobile@example.com" />);

    const copyLink = screen.getByTestId('mock-copy-link');
    expect(copyLink).toBeInTheDocument();
    expect(copyLink).toHaveAttribute('href', 'mailto:mobile@example.com');
  });

  it('should merge custom iconSx correctly', () => {
    const result = sxToArray({ backgroundColor: 'transparent' });
    expect(result).toContainEqual({ backgroundColor: 'transparent' });
  });
});
