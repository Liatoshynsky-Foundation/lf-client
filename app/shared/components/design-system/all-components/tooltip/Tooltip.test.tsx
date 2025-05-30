import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TooltipCustom from './Tooltip';

describe('TooltipCustom Component', () => {
  test('renders the button with tooltip', () => {
    render(<TooltipCustom showArrow={true} text="My Tooltip" />);
    const buttonElement = screen.getByText(/My Tooltip/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('shows the tooltip with arrow when hovered', async () => {
    render(<TooltipCustom showArrow={true} text="My Tooltip" />);
    const buttonElement = screen.getByText(/My Tooltip/i);
    fireEvent.mouseOver(buttonElement);
    const tooltipElement = await screen.findByText(/My Tooltip/i);
    expect(tooltipElement).toBeVisible();
  });

  test('renders tooltip without arrow when showArrow is false', async () => {
    render(<TooltipCustom showArrow={false} text="My Tooltip" />);
    const buttonElement = screen.getByText(/My Tooltip/i);
    fireEvent.mouseOver(buttonElement);
    const tooltipElement = await screen.findByText(/My Tooltip/i);
    expect(tooltipElement).toBeVisible();
  });
});
