import type { SxProps, Theme } from '@mui/material/styles';

import { PartnershipImageType } from '~/types/page/cooperation.types';

type ImageConfig = {
  container: SxProps<Theme>;
  wrapper: SxProps<Theme>;
  borderWidth: number;
};

const baseStyles = {
  cardsWrapper: {
    display: {
      xs: 'flex',
      sm: 'flex',
      md: 'flex',
      lg: 'contents',
      xl: 'contents'
    },
    gridColumn: '1 / -1',
    justifyContent: 'flex-end',
    gap: '30px',
    marginTop: { xs: '0', sm: '0', md: '0' },
    marginBottom: { xs: '0', sm: '40px', md: '10px', lg: 0 }
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1'
  },
  title: {
    gap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    }
  },
  mobileSlider: {
    display: {
      xs: 'block',
      sm: 'none'
    },
    gridColumn: '1 / -1',
    mb: {
      xs: '24px'
    }
  },
  firstRow: {
    display: {
      xs: 'none',
      sm: 'flex',
      md: 'flex',
      lg: 'contents',
      xl: 'contents'
    },
    height: {
      xs: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '480px'
    },
    flexDirection: 'column',
    alignItems: 'flex-end',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    rowGap: {
      xs: '24px',
      sm: '8px',
      md: '0',
      lg: '24px',
      xl: '0'
    },
    mb: {
      xs: '24px',
      sm: '24x',
      md: '8px',
      lg: '10px',
      xl: '10px',
      xxl: '10px'
    },
    position: {
      lg: 'relative',
      xl: 'relative'
    }
  },
  secondRow: {
    display: {
      xs: 'none',
      sm: 'contents',
      md: 'contents',
      lg: 'contents',
      xl: 'contents'
    },
    height: {
      xs: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '480px'
    },
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
    rowGap: {
      xs: '24px',
      sm: '8px',
      md: '8px',
      lg: '24px',
      xl: '0'
    },
    mb: {
      xs: '24px',
      sm: '32px',
      md: '40px'
    },
    position: {
      lg: 'relative',
      xl: 'relative'
    }
  },
  card: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: 'span 3',
      lg: 'span 3',
      xl: 'span 3'
    }
  },
  lastCardInRow: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  firstRowTopWrapper: {
    display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'contents' },
    width: { sm: '618px', md: '618px', lg: 'auto' },
    justifyContent: 'space-between'
  },
  firstRowBottomWrapper: {
    display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'contents' },
    width: { sm: '618px', md: '618px', lg: 'auto' },
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  firstRowFirstCard: {
    justifySelf: {
      lg: 'end',
      xl: 'start'
    },
    alignSelf: {
      xs: 'start',
      lg: 'start',
      xl: 'end'
    },
    width: { sm: '294px', md: '294px', lg: 'auto' },
    marginTop: {
      lg: '24px',
      xl: '60px'
    },
    gridColumn: {
      md: '6 / 10',
      lg: '2 / 6',
      xl: 'span 3',
      xxl: '3 / 6'
    },
    mb: {
      md: '0',
      lg: '24px'
    }
  },
  firstRowSecondCard: {
    width: { sm: '294px', md: '294px', lg: 'auto' },
    justifySelf: {
      lg: 'end',
      xxl: 'end'
    },
    marginTop: {
      xs: '0',
      sm: '13px',
      md: '25px',
      lg: '0',
      xl: '55px'
    },
    gridColumn: {
      md: '6 / 10',
      lg: '9 / 13',
      xl: 'span 3',
      xxl: '7 / 10'
    },

    mb: {
      md: '24px',
      lg: '24px'
    }
  },
  secondRowFirstCard: {
    display: {
      xs: 'flex',
      sm: 'flex',
      md: 'flex',
      lg: 'none',
      xl: 'flex'
    },
    justifySelf: {
      lg: 'auto',
      xxl: 'end'
    },

    marginTop: {
      xs: '0',
      sm: '12px',
      md: '15px',
      lg: '0',
      xl: '28px'
    },
    gridColumn: {
      lg: '10 / 13',
      xl: 'span 3',
      xxl: '7 / 10'
    },
    width: { sm: '294px', md: 'auto' }
  },
  secondRowSecondCard: {
    justifySelf: {
      lg: 'end',
      xxl: 'end'
    },
    marginTop: {
      xs: '0',
      md: '0',
      lg: '0',
      xl: '12px'
    },
    gridColumn: {
      lg: '10 / 13',
      xl: 'span 3',
      xxl: '10 / 13'
    }
  },
  emptyColumn: {
    justifySelf: {
      md: 'end'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: '10 / 13',
      lg: 'span 1',
      xl: 'span 3',
      xxl: '6 / 7'
    },
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block',
      xl: 'block'
    },
    mb: {
      md: '24px',
      lg: '24px'
    }
  },
  secondRowFirstCardLg: {
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'flex',
      xl: 'none'
    },
    justifySelf: {
      md: 'end',
      lg: 'start'
    },
    gridColumn: {
      md: '10 / 13',
      lg: '6 / 10'
    },
    width: {
      lg: '294px'
    }
  },
  emptyColumnSecond: {
    gridColumn: {
      lg: '9 / 13'
    },
    display: {
      xs: 'none',
      sm: 'none',
      md: 'none',
      lg: 'block',
      xl: 'none'
    },
    mb: {
      lg: '24px'
    }
  },
  firstRowImageContainer: {
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 4',
      md: '10 / 13',
      lg: '2 / 6',
      xl: 'span 3',
      xxl: '10 / 13'
    },
    justifySelf: {
      sm: 'end',
      md: 'end',
      lg: 'end',
      xl: 'end'
    },
    mt: {
      lg: '15px',
      xl: '0'
    },
    mb: {
      md: '24px',
      lg: '0',
      xl: '24px'
    },
    height: '100%',
    width: {
      sm: '294px',
      md: '294px'
    },
    display: 'flex',
    alignItems: 'stretch'
  },
  firstRowImageWrapper: {
    transform: 'skewY(-2deg)',
    mt: { sm: '0', md: '15px', lg: '0', xl: '42px' },
    width: '100%',
    height: { xs: '386px', sm: '386px', md: '386px', lg: '386px', xl: '386px' },
    position: 'relative',
    flex: 1
  },
  secondRowImageContainer: {
    alignSelf: {
      xs: 'start',
      lg: 'start',
      xl: 'start'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: 'span 8',
      md: '4 / 13',
      lg: '3 / 10',
      xl: 'span 6',
      xxl: '3 / 7'
    },
    mt: {
      lg: '20px',
      xl: '50px'
    },
    mb: {
      md: '0',
      lg: '0'
    },
    height: '100%',
    transform: {
      lg: 'translateX(-37px)',
      xl: 'translateX(0px)'
    },
    justifySelf: { sm: 'end', md: 'end', lg: 'auto' },
    width: {
      sm: '618px',
      md: '618px',
      lg: '626px'
    },
    display: 'flex',
    alignItems: 'stretch'
  },
  secondRowImageWrapper: {
    transform: 'skewY(-2deg)',
    mb: { sm: '40px', md: '40px', lg: '0', xl: '0' },
    width: '100%',
    height: { xs: '400px', sm: '400px', md: '400px', lg: '400px', xl: '400px' },
    position: 'relative',
    flex: 1
  },
  descriptionContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    gridColumn: '1 / -1',
    mt: {
      md: '40px',
      lg: '50px',
      xxl: '50px'
    },
    mb: {
      xs: '24px',
      sm: '32px'
    }
  },
  descriptionText: {
    textIndent: {
      sm: 'calc((100vw - 112px) / 8 * 3 - 11px)',
      md: 'calc((100vw - 144px) / 12 * 3 + 11px)',
      xxl: 'calc((1728px - 144px) / 12 * 3 + 11px)'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / 13'
    }
  },
  descriptionTypography: {
    fontSize: { xs: '16px', md: '20px' }
  },
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(4, 1fr)',
      sm: 'repeat(8, 1fr)',
      md: 'repeat(12, 1fr)'
    },
    columnGap: {
      xs: '16px',
      sm: '24px',
      md: '40px'
    },
    gridColumn: '1 / -1'
  },
  button: {
    gridColumn: {
      xs: '1 / -1',
      sm: '4 / -1',
      md: '6 / -1',
      lg: '6 / 13'
    }
  },
  modalContent: {
    maxHeight: '95vh',
    maxWidth: {
      xs: '100vw',
      sm: '482px',
      md: '744px',
      xl: '1024px'
    },
    minWidth: {
      xs: '95vw',
      sm: 'min(90vw, 482px)',
      md: 'min(70vw, 744px)',
      xl: 'min(70vw, 1024px)'
    },
    padding: {
      xs: '40px 24px',
      sm: '24px 30px',
      md: '24px 56px',
      xl: '37px 60px'
    },
    '@media (max-width: 480px)': {
      height: 'calc(100vh - 24px)',
      width: '100vw'
    }
  },
  closeIcon: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    zIndex: '100',
    top: {
      xs: '10px',
      lg: '16px'
    },
    right: {
      xs: '23px',
      md: '35px',
      lg: '50px'
    }
  }
} as const;

const imageByType: Record<PartnershipImageType, ImageConfig> = {
  [PartnershipImageType.FirstRowImage]: {
    container: baseStyles.firstRowImageContainer,
    wrapper: baseStyles.firstRowImageWrapper,
    borderWidth: 8
  },
  [PartnershipImageType.SecondRowImage]: {
    container: baseStyles.secondRowImageContainer,
    wrapper: baseStyles.secondRowImageWrapper,
    borderWidth: 8
  }
};

export const styles = {
  ...baseStyles,
  imageByType
} as const;
