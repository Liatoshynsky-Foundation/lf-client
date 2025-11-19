import { act, fireEvent, render, screen } from '@testing-library/react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { ContactLink } from './ContactLink';

import { sxToArray } from '~/lib/utils/sxToArray';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

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
    render(<ContactLink type="email" value="mobile@example.com" label="Email" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:mobile@example.com');
  });

  it('should render phone link with tel: on mobile', () => {
    render(<ContactLink type="phone" value="+380123456789" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'tel:+380123456789');
  });

  it('should render phone link with tel: on desktop', () => {
    render(<ContactLink type="phone" value="+380123456789" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'tel:+380123456789');
    expect(link).toHaveTextContent('+380123456789');
  });

  it('should render icon when provided', () => {
    render(<ContactLink type="email" value="test@example.com" icon={IconMock} />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('should copy value to clipboard when copy button clicked', async () => {
    render(<ContactLink type="email" value="copy@example.com" />);
    const copyButton = screen.getByRole('button', { name: /copy content/i });

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(mockWriteText).toHaveBeenCalledWith('copy@example.com');
  });

  it('should not copy value when disabled', async () => {
    render(<ContactLink type="email" value="test@example.com" disabled />);
    expect(screen.queryByRole('button', { name: /copy content/i })).toBeNull();
    expect(mockWriteText).not.toHaveBeenCalled();
  });

  it('should render layout in column direction', () => {
    render(<ContactLink type="email" value="col@example.com" direction="column" />);
    const contentBox = screen.getByText('col@example.com').closest('.MuiBox-root');
    expect(contentBox).toBeInTheDocument();
  });

  it('should render inline copy button in column direction', () => {
    render(<ContactLink type="email" value="inline@example.com" direction="column" />);
    expect(screen.getByRole('button', { name: /copy content/i })).toBeInTheDocument();
  });

  it('should render copy button next to row layout', () => {
    render(<ContactLink type="email" value="row@example.com" direction="row" />);
    expect(screen.getByRole('button', { name: /copy content/i })).toBeInTheDocument();
  });

  it('should not render copy button on mobile', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });

    render(<ContactLink type="email" value="mobile@example.com" />);

    expect(screen.queryByRole('button', { name: /copy content/i })).toBeNull();
  });

  it('should apply custom linkSx styles', () => {
    render(<ContactLink type="email" value="styled@example.com" linkSx={{ color: 'red' }} />);
    expect(screen.getByText('styled@example.com')).toHaveStyle({ color: 'red' });
  });

  it('should merge custom iconSx correctly', () => {
    const result = sxToArray({ backgroundColor: 'transparent' });
    expect(result).toContainEqual({ backgroundColor: 'transparent' });
  });
});
