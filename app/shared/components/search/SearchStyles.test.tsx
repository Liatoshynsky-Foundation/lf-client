import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';

import { CustomBorderTextField } from './SearchStyles';

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
