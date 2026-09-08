import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';

import { CustomBorderTextField } from './Search.styles';

describe('CustomBorderTextField', () => {
  it('should render', () => {
    const { container } = render(
      <ThemeProvider theme={createTheme()}>
        <CustomBorderTextField />
      </ThemeProvider>
    );
    expect(container).toBeDefined();
  });
});
