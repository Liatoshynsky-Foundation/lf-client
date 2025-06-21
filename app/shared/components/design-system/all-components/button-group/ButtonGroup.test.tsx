import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { hexButtonGroupColors } from '~/ds-components/theme/colors';

import ButtonGroup from './ButtonGroup';

class MockResizeObserver {
  observe() {
    return;
  }
  unobserve() {
    return;
  }
  disconnect() {
    return;
  }
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

describe('Button Group', () => {
  beforeEach(() => {
    global.ResizeObserver = MockResizeObserver;

    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(mockGetBoundingClientRect);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Default settings', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      render(<ButtonGroup buttons={mockButtons} />);
    });

    it('should render all provided buttons', () => {
      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Button 2')).toBeInTheDocument();
      expect(screen.getByText('Button 3')).toBeInTheDocument();
    });

    it('should have default color styles applied', () => {
      const button1 = screen.getByText('Button 1').parentElement as HTMLElement;
      expect(button1).toHaveStyle(`color: ${hexButtonGroupColors.primary.buttonTextColor}`);
    });

    it('should change active button style on click', async () => {
      const user = userEvent.setup();
      const button1 = screen.getByText('Button 1').parentElement as HTMLElement;
      const button2 = screen.getByText('Button 2').parentElement as HTMLElement;

      await user.click(button1);
      expect(button1).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
      expect(button2).toHaveStyle(`color: ${hexButtonGroupColors.primary.buttonTextColor}`);

      await user.click(button2);
      expect(button2).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
      expect(button1).toHaveStyle(`color: ${hexButtonGroupColors.primary.buttonTextColor}`);
    });

    it('should call the corresponding onClick handler when a button is clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Button 1'));
      expect(buttonClickHandlers.button1Click).toHaveBeenCalledTimes(1);

      await user.click(screen.getByText('Button 2'));
      expect(buttonClickHandlers.button2Click).toHaveBeenCalledTimes(1);

      await user.click(screen.getByText('Button 3'));
      expect(buttonClickHandlers.button3Click).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom settings', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should place the indicator on the default active button if provided', () => {
      render(<ButtonGroup buttons={mockButtons} defaultActiveButton={1} />);
      const button2 = screen.getByText('Button 2');
      const indicator = screen.getByLabelText('indicator');

      const computedIndicatorStyle = window.getComputedStyle(indicator);

      expect(computedIndicatorStyle.left).toBe(button2.dataset.offsetLeft + 'px');
      expect(computedIndicatorStyle.width).toBe(button2.dataset.offsetWidth + 'px');
      expect(button2.parentElement).toHaveStyle(`color: ${hexButtonGroupColors.primary.selectedButtonTextColor}`);
    });

    it('should set indicator style to zero when activeButton is out of range', () => {
      render(<ButtonGroup buttons={mockButtons} defaultActiveButton={5} />);
      const indicator = screen.getByLabelText('indicator');

      const computedIndicatorStyle = window.getComputedStyle(indicator);
      const computedLeft = parseFloat(computedIndicatorStyle.left);
      const computedWidth = parseFloat(computedIndicatorStyle.width);

      expect(computedLeft).toBe(0);
      expect(computedWidth).toBe(0);
    });
  });
});
