import { Box, styled } from '@mui/material';

export const Thumb = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '16px',
  height: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '16px',
  transition: 'height 0.2s, top 0.2s',
  border: '4px solid transparent',
  boxSizing: 'border-box',
  backgroundClip: 'content-box',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export const Track = styled(Box)({
  height: '100%',
  width: '16px',
  backgroundColor: 'transparent',
  position: 'relative'
});

export const ScrollableContent = styled(Box)({
  overflowY: 'auto',
  flex: 1,
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
});

export const ScrollableContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%'
});
