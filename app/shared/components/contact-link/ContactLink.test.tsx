import { createEvent, fireEvent, render, screen } from '@testing-library/react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { ContactLink } from './ContactLink';

import { sxToArray } from '~/lib/utils/sxToArray';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, ...props }: { Component: React.ComponentType }) => <Component {...props} />
}));

jest.mock('~/ds-components/copy-link/CopyLink', () => {
  return function MockCopyLink({ value, disabled, sx }: { value: string; disabled?: boolean; sx?: unknown }) {
    return (
      <div data-testid="mock-copy-link" data-disabled={disabled} data-sx={JSON.stringify(sx)}>
        {value}
      </div>
    );
  };
});

const mockedUseBreakpoints = useBreakpoints as jest.Mock;

beforeEach(() => {
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
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });

    render(<ContactLink type="email" value="mobile@example.com" label="Email" icon={IconMock} useNativeLink={true} />);

    const link = screen.getByText('mobile@example.com');
    expect(link).toHaveAttribute('href', 'mailto:mobile@example.com');
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
  });

  it('should render phone link with tel: on mobile', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });

    render(<ContactLink type="phone" value="+380123456789" useNativeLink={true} />);

    const link = screen.getByText('+380123456789');
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

  it('should pass disabled prop to copy link', () => {
    render(<ContactLink type="email" value="test@example.com" disabled />);
    const copyLink = screen.getByTestId('mock-copy-link');
    expect(copyLink).toHaveAttribute('data-disabled', 'true');
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

  it('should merge custom iconSx correctly', () => {
    const result = sxToArray({ backgroundColor: 'transparent' });
    expect(result).toContainEqual({ backgroundColor: 'transparent' });
  });

  it('should render an anchor tag without href and prevent default action when useNativeLink and disabled are true', () => {
    render(<ContactLink type="email" value="test@example.com" useNativeLink={true} disabled={true} />);

    const link = screen.getByText('test@example.com');
    expect(link).not.toHaveAttribute('href');

    const clickEvent = fireEvent.click(link);
    expect(clickEvent).toBe(false);
  });

  it('should cover the execution of preventDefault when clicking a disabled native link', () => {
    render(<ContactLink type="phone" value="+380123456789" useNativeLink={true} disabled={true} />);

    const link = screen.getByText('+380123456789');

    const mockPreventDefault = jest.fn();
    const customEvent = createEvent.click(link);
    Object.defineProperty(customEvent, 'preventDefault', { value: mockPreventDefault });

    fireEvent(link, customEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it('should pass valueSx to CopyLink on desktop', () => {
    const customSx = { color: 'red' };
    render(<ContactLink type="email" value="test@example.com" valueSx={customSx} />);

    const copyLink = screen.getByTestId('mock-copy-link');
    expect(copyLink).toHaveAttribute('data-sx', JSON.stringify(customSx));
  });

  it('should pass mobile stretched styles to CopyLink on mobile when useNativeLink is false', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });
    const customSx = { color: 'blue' };

    render(<ContactLink type="email" value="mobile-copy@example.com" valueSx={customSx} useNativeLink={false} />);

    const copyLink = screen.getByTestId('mock-copy-link');
    expect(copyLink).toBeInTheDocument();
    expect(copyLink).toHaveAttribute('data-sx');
  });
});
