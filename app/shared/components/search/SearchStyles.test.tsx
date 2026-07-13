import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';

import { CustomBorderTextField } from './SearchStyles';

describe('CustomBorderTextField', () => {
  it('should render', () => {
    render(
      <ThemeProvider theme={createTheme()}>
        <CustomBorderTextField />
      </ThemeProvider>
    );
  });
});
