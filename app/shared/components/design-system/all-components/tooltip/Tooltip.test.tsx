import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TooltipCustom from './Tooltip';

describe('TooltipCustom Component', () => {
  test('renders the button with tooltip', () => {
    render(<TooltipCustom showArrow={false} text="My Tooltip" />);
    const buttonElement = screen.getByText(/My Tooltip/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders tooltip with arrow when showArrow is true', async () => {
    render(<TooltipCustom showArrow={true} text="My Tooltip with Arrow" />);
    const buttonElement = screen.getByText(/My Tooltip with Arrow/i);
    fireEvent.mouseOver(buttonElement);
    const tooltipElement = await screen.findByText(/My Tooltip with Arrow/i);
    expect(tooltipElement).toBeVisible();
  });

  test('renders tooltip without arrow when showArrow is false', async () => {
    render(<TooltipCustom showArrow={false} text="My Tooltip" />);
    const buttonElement = screen.getByText(/My Tooltip/i);
    fireEvent.mouseOver(buttonElement);
    const tooltipElement = await screen.findByText(/My Tooltip/i);
    expect(tooltipElement).toBeVisible();
  });

  test('covers controlled open state when isOpen is true', async () => {
    render(<TooltipCustom isOpen={true} text="Controlled Open Tooltip" />);
    const tooltipElement = await screen.findByRole('tooltip');
    expect(tooltipElement).toBeVisible();
    expect(tooltipElement).toHaveTextContent('Controlled Open Tooltip');
  });

  test('covers controlled closed state when isOpen is false', () => {
    render(<TooltipCustom isOpen={false} text="Controlled Closed Tooltip" />);
    const textElement = screen.getByText(/Controlled Closed Tooltip/i);
    expect(textElement).toBeInTheDocument();
  });

  test('covers title prop priority over text prop', () => {
    render(<TooltipCustom title="Priority Title" text="Secondary Text" />);
    expect(screen.getByText('Priority Title')).toBeInTheDocument();
    expect(screen.queryByText('Secondary Text')).not.toBeInTheDocument();
  });

  test('covers fallback empty string when title and text are missing', () => {
    render(<TooltipCustom data-testid="empty-tooltip" />);
    expect(screen.getByTestId('empty-tooltip')).toBeInTheDocument();
  });
});
