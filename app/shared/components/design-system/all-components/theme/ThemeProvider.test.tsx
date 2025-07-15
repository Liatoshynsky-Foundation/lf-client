import { Button, Typography, useTheme } from '@mui/material';
import { render, screen } from '@testing-library/react';

import ThemeProvider from './ThemeProvider';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';

const ThemeConsumer = () => {
  const theme = useTheme();
  return <Typography data-testid="color" style={{ color: theme.palette.error.main }}></Typography>;
};
describe('Theme Provider', () => {
  it('should render children without crashing', () => {
    render(
      <ThemeProvider>
        <div>Test children</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });
  it('should provide access to theme inside children components', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    const element = screen.getByTestId('color');
    const style = getComputedStyle(element);
    expect(style.color).toBe(hexToRGBA('#D13712'));
  });
  it('should apply custom theme overrides (if any)', () => {
    render(
      <ThemeProvider>
        <Button variant="contained" color="primary">
          Contained Button
        </Button>
      </ThemeProvider>
    );
    const button = screen.getByRole('button', { name: /contained button/i });
    const style = getComputedStyle(button);

    expect(style.backgroundColor).toBe(hexToRGBA('#190d03'));
    expect(style.color).toBe(hexToRGBA('#FCFCFC'));
  });
});
