import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { hexButtonGroupColors } from '~/ds-components/theme/colors';

import ButtonGroup from './ButtonGroup';

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const buttonClickHandlers = {
  button1Click: jest.fn(),
  button2Click: jest.fn(),
  button3Click: jest.fn()
};

const mockButtons = [
  <button key="1" onClick={buttonClickHandlers.button1Click} data-offset-left="10" data-offset-width="100">
    Button 1
  </button>,
  <button key="2" onClick={buttonClickHandlers.button2Click} data-offset-left="120" data-offset-width="80">
    Button 2
  </button>,
  <button key="3" onClick={buttonClickHandlers.button3Click} data-offset-left="210" data-offset-width="90">
    Button 3
  </button>
];

const mockGetBoundingClientRect = function (this: HTMLElement) {
  const dataLeft: string | undefined =
    (this.firstChild instanceof HTMLElement ? this.firstChild.dataset.offsetLeft : undefined) ??
    this.dataset.offsetLeft;
  const dataWidth: string | undefined =
    (this.firstChild instanceof HTMLElement ? this.firstChild.dataset.offsetWidth : undefined) ??
    this.dataset.offsetWidth;

  const customLeft = dataLeft ? parseFloat(dataLeft) : 0;
  const customWidth = dataWidth ? parseFloat(dataWidth) : 0;

  const params = {
    x: customLeft,
    y: 0,
    left: customLeft,
    top: 0,
    right: customLeft + customWidth,
    bottom: customWidth,
    width: customWidth,
    height: 50
  };

  return {
    ...params,
    toJSON: () => params
  } as DOMRect;
};

let originalResizeObserver: typeof global.ResizeObserver;

describe('ButtonGroup component', () => {
  beforeAll(() => {
    originalResizeObserver = global.ResizeObserver;
    global.ResizeObserver = MockResizeObserver;
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
  });

  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(mockGetBoundingClientRect);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe('Uncontrolled behavior', () => {
    beforeEach(() => {
      render(<ButtonGroup buttons={mockButtons} />);
    });

    it('should render all provided buttons', () => {
      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
      expect(screen.getByText('Button 3')).toBeInTheDocument();
    });

    it('should apply default palette color styles', () => {
      const button1 = screen.getByText('Button 1').parentElement!;
      expect(button1).toHaveStyle(`color: ${hexButtonGroupColors.primary.buttonTextColor}`);
    });

    it('should update active button styles on click', async () => {
      const user = userEvent.setup();
      const button1 = screen.getByText('Button 1').parentElement!;
      const button2 = screen.getByText('Button 2').parentElement!;

      await user.click(button1);
      expect(button1).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
      expect(button2).toHaveStyle(`color: ${hexButtonGroupColors.primary.buttonTextColor}`);

      await user.click(button2);
      expect(button2).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
      expect(button1).toHaveStyle(`color: ${hexButtonGroupColors.primary.buttonTextColor}`);
    });

    it('should call correct onClick handlers when buttons are clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Button 1'));
      await user.click(screen.getByText('Button 2'));
      await user.click(screen.getByText('Button 3'));

      expect(buttonClickHandlers.button1Click).toHaveBeenCalledTimes(1);
      expect(buttonClickHandlers.button2Click).toHaveBeenCalledTimes(1);
      expect(buttonClickHandlers.button3Click).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom settings with defaultActiveButton', () => {
    it('should place the indicator under the default active button', () => {
      render(<ButtonGroup buttons={mockButtons} defaultActiveButton={1} />);
      const button2 = screen.getByText('Button 2');
      const indicator = screen.getByLabelText('indicator');
      const computedStyle = window.getComputedStyle(indicator);

      expect(computedStyle.left).toBe(button2.dataset.offsetLeft + 'px');
      expect(computedStyle.width).toBe(button2.dataset.offsetWidth + 'px');
      expect(button2.parentElement).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
    });

    it('should reset indicator position when defaultActiveButton is out of bounds', () => {
      render(<ButtonGroup buttons={mockButtons} defaultActiveButton={10} />);
      const indicator = screen.getByLabelText('indicator');
      const computedStyle = window.getComputedStyle(indicator);

      expect(parseFloat(computedStyle.left)).toBe(0);
      expect(parseFloat(computedStyle.width)).toBe(0);
    });
  });

  describe('Controlled behavior with activeButton prop', () => {
    it('should highlight the button passed as activeButton', () => {
      const { rerender } = render(<ButtonGroup buttons={mockButtons} activeButton={2} />);
      const button3 = screen.getByText('Button 3').parentElement!;
      const indicator = screen.getByLabelText('indicator');
      const computedStyle = window.getComputedStyle(indicator);

      expect(button3).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
      expect(computedStyle.left).toBe('210px');
      expect(computedStyle.width).toBe('90px');

      rerender(<ButtonGroup buttons={mockButtons} activeButton={1} />);
      const button2 = screen.getByText('Button 2').parentElement!;
      const updatedIndicator = screen.getByLabelText('indicator');
      const updatedStyle = window.getComputedStyle(updatedIndicator);

      expect(button2).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
      expect(updatedStyle.left).toBe('120px');
      expect(updatedStyle.width).toBe('80px');
    });

    it('should not change active button on click when controlled', async () => {
      const user = userEvent.setup();
      render(<ButtonGroup buttons={mockButtons} activeButton={0} />);

      await user.click(screen.getByText('Button 2'));

      const button1 = screen.getByText('Button 1').parentElement!;
      const button2 = screen.getByText('Button 2').parentElement!;

      expect(button1).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
      expect(button2).toHaveStyle(`color: ${hexButtonGroupColors.primary.buttonTextColor}`);
    });
  });
});
