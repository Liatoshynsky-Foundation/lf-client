import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ColoredLayout from './ColoredLayout';
import { styles } from './ColoredLayout.styles';

jest.mock('~/layouts/main-layout/MainLayout', () => {
  return jest.fn(({ children, ...props }: any) => (
    <div data-testid="main-layout" {...props}>
      {children}
    </div>
  ));
});

jest.mock('./ColoredLayout.styles', () => ({
  styles: {
    container: jest.fn((color) => ({ background: color })),
    childrenBox: { pt: '100px' }
  }
}));

describe('ColoredLayout Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with children', () => {
    render(
      <ColoredLayout>
        <div>Test Child</div>
      </ColoredLayout>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should use default background color when no color prop is provided', () => {
    const defaultColor = '#F2EEE8';
    render(<ColoredLayout />);
    expect(styles.container).toHaveBeenCalledWith(defaultColor);
  });

  it('should use the provided background color', () => {
    const customColor = 'rgb(0, 0, 255)'; // blue
    render(<ColoredLayout color={customColor} />);
    expect(styles.container).toHaveBeenCalledWith(customColor);
  });

  it('should pass down mainLayoutProps to MainLayout component', () => {
    const mainLayoutProps = { id: 'custom-id', 'data-custom': 'value' };
    render(<ColoredLayout mainLayoutProps={mainLayoutProps} />);
    const mainLayout = screen.getByTestId('main-layout');
    expect(mainLayout).toHaveAttribute('id', 'custom-id');
    expect(mainLayout).toHaveAttribute('data-custom', 'value');
  });

  it('should pass other props like data-testid to the root Box element', () => {
    render(<ColoredLayout data-testid="colored-layout-root" />);
    expect(screen.getByTestId('colored-layout-root')).toBeInTheDocument();
  });
});
