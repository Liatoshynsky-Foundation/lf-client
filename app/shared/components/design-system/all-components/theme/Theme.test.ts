import { describe, expect, it } from '@jest/globals';
import { createTheme } from '@mui/material/styles';
import React from 'react';

import { theme } from './Theme';

describe('Theme configuration', () => {
  it('should return correct style overrides for MuiTooltip and MuiDialog', () => {
    const mockTheme = createTheme();

    const tooltipStyleFunction = theme.components?.MuiTooltip?.styleOverrides?.tooltip;
    if (typeof tooltipStyleFunction === 'function') {
      const payload = {
        theme: mockTheme,
        title: '',
        children: React.createElement('div'),
        ownerState: {
          title: '',
          children: React.createElement('div')
        }
      };
      const styles = tooltipStyleFunction(payload as unknown as Parameters<typeof tooltipStyleFunction>[0]);
      expect(styles).toBeDefined();
    }

    const arrowStyleFunction = theme.components?.MuiTooltip?.styleOverrides?.arrow;
    if (typeof arrowStyleFunction === 'function') {
      const payload = {
        theme: mockTheme,
        title: '',
        children: React.createElement('div'),
        ownerState: {}
      };
      const arrowStyles = arrowStyleFunction(payload as unknown as Parameters<typeof arrowStyleFunction>[0]);
      expect(arrowStyles).toBeDefined();
    }

    const dialogRootFunction = theme.components?.MuiDialog?.styleOverrides?.root;
    if (typeof dialogRootFunction === 'function') {
      const payload = {
        theme: mockTheme,
        open: true,
        children: React.createElement('div'),
        ownerState: {}
      };
      const dialogStyles = dialogRootFunction(payload as unknown as Parameters<typeof dialogRootFunction>[0]);
      expect(dialogStyles).toBeDefined();
    }
  });
});
