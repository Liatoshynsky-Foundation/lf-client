import { AppTypography } from '~/constants';

export const styles = {
  card: {
    pb: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
    borderColor: 'blue.200',
    maxHeight: '300px'
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  code: {
    ...AppTypography.mulish16Italic,
    lineHeight: '125%',
    fontWeight: 600,
    color: 'brown.600',
    mb: '4px'
  },
  name: {
    ...AppTypography.mulish18Regular,
    lineHeight: '140%',
    fontWeight: 800
  },
  label: {
    ...AppTypography.mulish16Italic,
    lineHeight: '100%',
    fontWeight: 600,
    color: 'brown.800'
  },
  labelValue: {
    ...AppTypography.mulish16Regular,
    fontWeight: 600
  },
  content: {
    ...AppTypography.mulish16Regular,
    fontWeight: 600,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  buttonsBox: {
    display: 'flex',
    gap: '10px',
    mt: '18px'
  }
};
