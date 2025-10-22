import '@testing-library/jest-dom';
import { Box } from '@mui/material';
import { render, screen } from '@testing-library/react';

import ColoredLayout from './ColoredLayout';

jest.mock('~/layouts/main-layout/MainLayout', () => {
  return jest.fn(({ children, ...props }: any) => (
    <Box data-testid="main-layout" {...props}>
      {children}
    </Box>
  ));
});

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
    const wrapper = screen.getByTestId('colored-layout');
    expect(wrapper).toHaveStyle(`background: ${defaultColor}`);
  });

  it('should use the provided background color', () => {
    const customColor = 'rgb(0, 0, 255)';
    render(<ColoredLayout color={customColor} />);
    const wrapper = screen.getByTestId('colored-layout');
    expect(wrapper).toHaveStyle(`background: ${customColor}`);
  });

  it('should pass down props to MainLayout component', () => {
    const mainLayoutProps = { id: 'custom-id', 'data-custom': 'value' };
    render(<ColoredLayout {...mainLayoutProps} />);
    const mainLayout = screen.getByTestId('main-layout');
    expect(mainLayout).toHaveAttribute('id', 'custom-id');
    expect(mainLayout).toHaveAttribute('data-custom', 'value');
  });

  it('should have the correct data-testid on the wrapper Box element', () => {
    render(<ColoredLayout />);
    expect(screen.getByTestId('colored-layout')).toBeInTheDocument();
  });

  it('should merge sx prop with MainLayout styles', () => {
    const customSx = { backgroundColor: 'rgb(255, 0, 0)', padding: '20px' };
    render(<ColoredLayout sx={customSx} />);
    const mainLayout = screen.getByTestId('main-layout');
    expect(mainLayout).toHaveStyle(`background-color: ${customSx.backgroundColor}`);
    expect(mainLayout).toHaveStyle(`padding: ${customSx.padding}`);
  });

  it('should handle sx prop as array', () => {
    const customSx = [{ backgroundColor: 'rgb(0, 255, 0)' }, { padding: '30px' }];
    render(<ColoredLayout sx={customSx} />);
    const mainLayout = screen.getByTestId('main-layout');
    expect(mainLayout).toHaveStyle('background-color: rgb(0, 255, 0)');
    expect(mainLayout).toHaveStyle('padding: 30px');
  });

  it('should merge wrapperSx with container styles', () => {
    const wrapperSx = { margin: '40px', border: '1px solid red' };
    render(<ColoredLayout wrapperSx={wrapperSx} />);
    const wrapper = screen.getByTestId('colored-layout');
    expect(wrapper).toHaveStyle('margin: 40px');
    expect(wrapper).toHaveStyle('border: 1px solid red');
  });

  it('should handle wrapperSx as array', () => {
    const wrapperSx = [{ margin: '10px' }, { border: '2px solid green' }];
    render(<ColoredLayout wrapperSx={wrapperSx} />);
    const wrapper = screen.getByTestId('colored-layout');
    expect(wrapper).toHaveStyle('margin: 10px');
    expect(wrapper).toHaveStyle('border: 2px solid green');
  });
});
