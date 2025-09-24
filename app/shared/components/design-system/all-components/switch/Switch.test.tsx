import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Switch from './Switch';

const handleChange = jest.fn();
describe('CustomSwitch', () => {
  it('should render with checked state when checked prop is true', () => {
    render(<Switch checked={true} onChange={handleChange} />);
    const input = screen.getByRole('switch');
    expect(input).toBeChecked();
  });

  it('should not call onChange when disabled', async () => {
    const user = userEvent.setup();

    const { container } = render(<Switch checked={false} onChange={handleChange} disabled />);

    const switchRoot = container.querySelector('.MuiSwitch-root');
    expect(switchRoot).toBeInTheDocument();

    await user.click(switchRoot as Element);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should applie the small size variant', () => {
    const { container } = render(<Switch checked={false} onChange={handleChange} size="small" />);

    const switchRoot = container.querySelector('.MuiSwitch-root');
    expect(switchRoot?.className).toMatch(/MuiSwitch-sizeSmall/);
  });
});
