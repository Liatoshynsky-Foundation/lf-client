import { render, screen } from '@testing-library/react';
import ButtonGroup from './ButtonGroup';

const mockButtons = ['Button 1', 'Button 2', 'Button 3'];

describe('Button Group', () => {
  beforeEach(() => {
    render(<ButtonGroup buttons={mockButtons} />);
  });

  it('should render component', () => {
    const buttonElements = mockButtons.map((button) => screen.getByText(button));

    buttonElements.forEach((button) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle('cursor: pointer');
    });
  });
});
