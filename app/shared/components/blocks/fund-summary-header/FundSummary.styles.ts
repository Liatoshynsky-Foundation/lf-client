import { mainHexPallete } from '~/components/design-system/all-components/theme/colors';

export const TITLE_GRID_COLUMN = { xs: '1 / -1', sm: '1 / -1', md: '1 / -1' } as const;
export const TITLE_SX = { '& h2': { fontSize: { xxl: '56px' } } } as const;

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1'
  },

  backLink: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / -1',
      md: '1 / 6'
    },
    mb: '24px',
    justifySelf: 'start',
    alignSelf: 'start',
    '& .MuiButton-root': {
      px: 0
    }
  },

  title: {
    gridColumn: {
      xs: '1 / -1',
      sm: '1 / -1',
      md: '1 / -1'
    },
    justifySelf: 'start',
    textAlign: 'left',
    mb: '64px',
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
    gap: '24px',
    gridColumn: {
      xs: '2 / -1',
      sm: '1 / 5',
      md: '2 / 6'
    },
    '&:last-child': {
      gridColumn: {
        xs: '2 / -1',
        sm: '5 / -1',
        md: '6 / -1'
      }
    }
  },

  contentItem: {
    fontSize: '16px',
    lineHeight: '150%',
    display: 'flex',
    flexDirection: 'column' as const
  },

  itemTitle: {
    color: mainHexPallete.brown[600]
  }
};
