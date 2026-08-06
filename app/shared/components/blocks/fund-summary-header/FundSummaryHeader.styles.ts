import { AppTypography } from '~/constants';
import { commonSx } from '~/shared/styles/commonSx';

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
    gridTemplateColumns: commonSx.layout.standardGrid.gridTemplateColumns,
    columnGap: commonSx.layout.standardGrid.columnGap,
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
    display: 'flex',
    flexDirection: 'column' as const
  },

  itemTitle: {
    ...AppTypography.mulish16Regular,
    color: 'brown.600'
  }
};
