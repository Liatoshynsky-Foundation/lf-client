import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import OverflowMenu from './OverflowMenu';

describe('OverflowMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const Trigger = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button data-testid="trigger" type="button" {...props}>
      open
    </button>
  );

  it('should render trigger element', () => {
    render(<OverflowMenu items={[]} trigger={<Trigger />} />);

    expect(screen.getByTestId('trigger')).toBeInTheDocument();
  });

  it('should open menu on trigger click and sets aria attributes', async () => {
    render(<OverflowMenu items={[{ id: 'a', label: 'Item A', onClick: jest.fn() }]} trigger={<Trigger />} />);

    const trigger = screen.getByTestId('trigger');

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.getAttribute('aria-controls')).toBeTruthy();

    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });
  it('should call original trigger onClick and still opens menu', async () => {
    const triggerOnClick = jest.fn();

    render(
      <OverflowMenu
        items={[{ id: 'a', label: 'Item A', onClick: jest.fn() }]}
        trigger={<Trigger onClick={triggerOnClick} />}
      />
    );

    fireEvent.click(screen.getByTestId('trigger'));

    expect(triggerOnClick).toHaveBeenCalled();
    expect(await screen.findByRole('menu')).toBeInTheDocument();
  });

  it('should not render hidden items', async () => {
    render(
      <OverflowMenu
        items={[
          { id: 'visible', label: 'Visible', onClick: jest.fn() },
          { id: 'hidden', label: 'Hidden', onClick: jest.fn(), hidden: true }
        ]}
        trigger={<Trigger />}
      />
    );

    fireEvent.click(screen.getByTestId('trigger'));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Visible/ })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /Hidden/ })).not.toBeInTheDocument();
  });

  it('should pass data-testid to Menu Paper', async () => {
    render(
      <OverflowMenu
        dataTestId="my-menu-paper"
        items={[{ id: 'a', label: 'Item A', onClick: jest.fn() }]}
        trigger={<Trigger />}
      />
    );

    fireEvent.click(screen.getByTestId('trigger'));

    expect(await screen.findByTestId('my-menu-paper')).toBeInTheDocument();
  });

  it('should call item.onClick and close menu by clicking an item', async () => {
    const onItemClick = jest.fn();

    render(<OverflowMenu items={[{ id: 'a', label: 'Item A', onClick: onItemClick }]} trigger={<Trigger />} />);

    fireEvent.click(screen.getByTestId('trigger'));
    const item = await screen.findByRole('menuitem', { name: /Item A/ });

    fireEvent.click(item);

    expect(onItemClick).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('should disable item has aria-disabled=true and does not call onClick', async () => {
    const onItemClick = jest.fn();

    render(
      <OverflowMenu
        items={[{ id: 'a', label: 'Item A', onClick: onItemClick, disabled: true }]}
        trigger={<Trigger />}
      />
    );

    fireEvent.click(screen.getByTestId('trigger'));

    const item = await screen.findByRole('menuitem', { name: /Item A/ });
    expect(item).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(item);
    expect(onItemClick).not.toHaveBeenCalled();
  });
});
