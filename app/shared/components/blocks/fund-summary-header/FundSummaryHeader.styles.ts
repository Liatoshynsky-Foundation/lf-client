import { mainHexPallete } from '~/components/design-system/all-components/theme/colors';

export const TITLE_GRID_COLUMN = { xs: '1 / -1' } as const;
export const TITLE_SX = {
  '& h2': {
    fontSize: { xs: '24px', sm: '40px', md: '56px' },
    maxWidth: { xs: '80%', sm: 'none' }
  }
} as const;

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1'
  },

  backLink: {
    gridColumn: {
      xs: '1 / -1',
      md: '1 / 6'
    },
    mb: '24px',
    fontWeight: 'medium',
    justifySelf: 'start',
    alignSelf: 'start',
    '& .MuiButton-root': {
      px: 0
    }
  },

  title: {
    gridColumn: {
      xs: '1 / -1'
    },
    justifySelf: 'start',
    textAlign: 'left',
    mb: {
      xs: '16px',
      sm: '40px',
      md: '64px'
    },
    '& > div': {
      mb: 0
    }
  },

  contentGrid: {
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

  column: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: {
      xs: '12px',
      sm: '16px',
      md: '24px'
    },
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / 4',
      md: '2 / 6'
    },
    '&:last-child': {
      gridColumn: {
        xs: '1 / -1',
        sm: '4 / -1',
        md: '6 / -1'
      }
    }
  },

  contentItem: {
    fontSize: '16px',
    lineHeight: '150%',
    fontWeight: 'semibold',
    display: 'flex',
    flexDirection: 'column' as const
  },

  itemTitle: {
    fontSize: '16px',
    fontWeight: 'regular',
    color: mainHexPallete.brown[600]
  }
};
