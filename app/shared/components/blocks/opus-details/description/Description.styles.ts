import type { SxProps, Theme } from '@mui/material/styles';

import { commonSx } from '~/shared/styles/commonSx';

export const styles: Record<string, SxProps<Theme>> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: {
      xs: '16px',
      md: '24px'
    }
  },

  paragraph: {
    fontFamily: 'Mulish',
    fontSize: {
      xs: '16px',
      md: '18px'
    },
    fontWeight: 400,
    lineHeight: '160%',
    color: 'black'
  },

  firstParagraph: {
    fontFamily: 'Mulish',
    fontSize: {
      xs: '16px',
      md: '18px'
    },
    fontWeight: 400,
    lineHeight: '160%',
    color: 'black',
    textIndent: commonSx.layout.textIndent.textIndentThirdColumn
  }
};
