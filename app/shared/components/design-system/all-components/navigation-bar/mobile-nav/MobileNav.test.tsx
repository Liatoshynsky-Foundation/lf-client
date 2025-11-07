import { fireEvent, render, screen } from '@testing-library/react';

import MobileNav from './MobileNav';

describe('MobileNav', () => {
  it('should render the mobile navigation toggle button and trigger onToggle on click', () => {
    const onToggleMock = jest.fn();

    render(<MobileNav isOpen={false} onToggle={onToggleMock} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('menu');
    expect(button).not.toHaveClass('opened');

    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();

    const lines = button.querySelectorAll('rect');
    expect(lines.length).toBe(2);

    fireEvent.click(button);
    expect(onToggleMock).toHaveBeenCalled();
  });

  it('should apply opened class when isOpen is true', () => {
    const { container } = render(<MobileNav isOpen={true} onToggle={() => {}} />);

    const button = container.querySelector('button');
    expect(button).toHaveClass('menu opened');
  });
});
