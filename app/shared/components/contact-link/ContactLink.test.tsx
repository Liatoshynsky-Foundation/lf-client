import { fireEvent, render, screen } from '@testing-library/react';

import { ContactLink } from './ContactLink';

const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: { writeText: mockWriteText }
});

const IconMock = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="mock-icon" {...props} />;

describe('ContactLink component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label', () => {
    render(<ContactLink type="email" value="test@example.com" label="Email" />);

    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /test@example.com/i })).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('renders with icon', () => {
    render(<ContactLink type="phone" value="+380123456789" icon={IconMock} isMobile />);

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'tel:+380123456789');
  });

  it('copies phone to clipboard when clicked on desktop', async () => {
    render(<ContactLink type="phone" label="Phone" value="+380123456789" isMobile={false} />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockWriteText).toHaveBeenCalledWith('+380123456789');
  });

  it('does nothing when disabled', () => {
    render(<ContactLink type="phone" label="Phone" value="+380111111111" disabled />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockWriteText).not.toHaveBeenCalled();
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
  });

  it('renders in column direction correctly', () => {
    render(<ContactLink type="email" value="column@example.com" label="Email" direction="column" />);

    const box = screen.getByText('Email:').parentElement;
    expect(box).toHaveStyle({ flexDirection: 'column' });
  });

  it('applies custom linkSx styles', () => {
    render(<ContactLink type="email" value="style@example.com" label="Email" linkSx={{ color: 'red' }} />);

    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ color: 'red' });
  });
});
