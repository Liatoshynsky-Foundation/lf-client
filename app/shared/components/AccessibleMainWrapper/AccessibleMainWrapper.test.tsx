import { render, screen } from '@testing-library/react';

import { AccessibleMainWrapper } from './AccessibleMainWrapper';

const renderComponent = (props = {}) => {
  return render(<AccessibleMainWrapper {...props}>Content</AccessibleMainWrapper>);
};

describe('AccessibleMainWrapper component', () => {
  it('should render main landmark role with correct id and tabIndex', () => {
    renderComponent();

    const mainElement = screen.getByRole('main');

    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveAttribute('id', 'main');
    expect(mainElement).toHaveAttribute('tabindex', '-1');
    expect(mainElement).toHaveTextContent('Content');
  });

  it('should pass down additional props', () => {
    renderComponent({ 'aria-label': 'Main Content Area' });

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('aria-label', 'Main Content Area');
  });
});
