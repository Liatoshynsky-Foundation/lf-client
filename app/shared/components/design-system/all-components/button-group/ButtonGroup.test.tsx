import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonGroup from './ButtonGroup';
import { defaultButtonGroupColorScheme } from './ButtonGroup.styles';

const buttonClickHandlers = {
  button1Click: jest.fn(),
  button2Click: jest.fn(),
  button3Click: jest.fn()
};

const mockButtons = [
  <button key="1" onClick={buttonClickHandlers.button1Click}>
    Button 1
  </button>,
  <button key="2" onClick={buttonClickHandlers.button2Click}>
    Button 2
  </button>,
  <button key="3" onClick={buttonClickHandlers.button3Click}>
    Button 3
  </button>
];

const mockColorSettings = {
  selectedButtonColor: '#FF0000',
  selectedButtonTextColor: '#00FF00',
  groupBackgroundColor: '#0000FF',
  buttonTextColor: '#333333'
};

describe('Button Group', () => {
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
      expect(button1).toHaveStyle(`color: ${defaultButtonGroupColorScheme.buttonTextColor}`);
    });

    it('should change active button style on click', async () => {
      const user = userEvent.setup();
      const button1 = screen.getByText('Button 1').parentElement as HTMLElement;
      const button2 = screen.getByText('Button 2').parentElement as HTMLElement;

      await user.click(button1);
      expect(button1).toHaveStyle(`color: ${defaultButtonGroupColorScheme.selectedButtonTextColor}`);
      expect(button2).toHaveStyle(`color: ${defaultButtonGroupColorScheme.buttonTextColor}`);

      await user.click(button2);
      expect(button2).toHaveStyle(`color: ${defaultButtonGroupColorScheme.selectedButtonTextColor}`);
      expect(button1).toHaveStyle(`color: ${defaultButtonGroupColorScheme.buttonTextColor}`);
    });

    it('should call the corresponding onClick handler when a button is clicked', async () => {
      const user = userEvent.setup();
      const button1 = screen.getByText('Button 1');
      const button2 = screen.getByText('Button 2');
      const button3 = screen.getByText('Button 3');

      await user.click(button1);
      expect(buttonClickHandlers.button1Click).toHaveBeenCalledTimes(1);

      await user.click(button2);
      expect(buttonClickHandlers.button2Click).toHaveBeenCalledTimes(1);

      await user.click(button3);
      expect(buttonClickHandlers.button3Click).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom settings', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should place the indicator on the default active button if provided', () => {
      render(<ButtonGroup buttons={mockButtons} defaultActiveButton={1} />);

      const button2 = screen.getByText('Button 2').parentElement as HTMLElement;
      const indicator = screen.getByRole('presentation', { hidden: true });

      expect(indicator).toHaveStyle(`left: ${button2.offsetLeft - 5}px`);
      expect(indicator).toHaveStyle(`width: ${button2.offsetWidth + 10}px`);
      expect(button2).toHaveStyle(`color: ${defaultButtonGroupColorScheme.selectedButtonTextColor}`);
    });

    it('should apply custom styles from colorSettings', () => {
      render(<ButtonGroup buttons={mockButtons} colorSettings={mockColorSettings} />);

      const buttonGroup = screen.getByLabelText('Button Group');
      expect(buttonGroup).toHaveStyle(`background-color: ${mockColorSettings.groupBackgroundColor}`);
      expect(buttonGroup).toHaveStyle(`color: ${mockColorSettings.buttonTextColor}`);
    });
  });
});
