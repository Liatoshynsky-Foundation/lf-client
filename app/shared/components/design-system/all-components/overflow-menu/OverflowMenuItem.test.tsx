import { fireEvent, render, screen } from '@testing-library/react';

import { OverflowMenuItem } from './OverflowMenuItem';

describe('OverflowMenuItem', () => {
  it('should render left icon by default', () => {
    render(<OverflowMenuItem label="Label" icon={<span data-testid="icon" />} onClick={jest.fn()} />);

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    const menuItem = screen.getByRole('menuitem', { name: /Label/ });
    expect(menuItem).toBeInTheDocument();
  });

  it('should render right icon when iconPosition="right"', () => {
    render(
      <OverflowMenuItem label="Label" icon={<span data-testid="icon" />} iconPosition="right" onClick={jest.fn()} />
    );

    const menuItem = screen.getByRole('menuitem', { name: /Label/ });
    const icon = screen.getByTestId('icon');

    const labelNode = screen.getByText('Label');
    expect(labelNode.compareDocumentPosition(icon) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(menuItem).toBeInTheDocument();
  });

  it('should render Typography for string label', () => {
    render(<OverflowMenuItem label="Hello" onClick={jest.fn()} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hello').tagName.toLowerCase()).toBe('span');
  });

  it('should render ReactNode label via Box branch', () => {
    render(<OverflowMenuItem label={<span data-testid="custom-label">NodeLabel</span>} onClick={jest.fn()} />);

    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /NodeLabel/ })).toBeInTheDocument();
  });

  it('should call onClick when enabled', () => {
    const onClick = jest.fn();
    render(<OverflowMenuItem label="ClickMe" onClick={onClick} />);

    fireEvent.click(screen.getByRole('menuitem', { name: /ClickMe/ }));
    expect(onClick).toHaveBeenCalled();
  });

  it('should not call onClick when disabled', () => {
    const onClick = jest.fn();
    render(<OverflowMenuItem label="Disabled" onClick={onClick} disabled />);

    fireEvent.click(screen.getByRole('menuitem', { name: /Disabled/ }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
