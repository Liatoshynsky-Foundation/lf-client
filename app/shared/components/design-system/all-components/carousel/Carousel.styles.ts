import { keyframes } from '@mui/system';

const fadeIn = keyframes`from {opacity: 0;} to {opacity: 1;}`;

export const SIZES = {
  activeWidth: {
    xs: 271,
    sm: 484,
    md: 724,
    lg: 938,
    xl: 1080
  },
  activeHeight: {
    xs: 188,
    sm: 334,
    md: 500,
    lg: 648,
    xl: 744
  },
  inactiveWidth: {
    xs: 218,
    sm: 369,
    md: 415
  },
  inactiveHeight: {
    xs: 150,
    sm: 254,
    md: 286
  },
  gap: {
    xs: 8,
    sm: 24,
    md: 40
  }
};

export const SIZES_PX = {
  activeWidth: {
    xs: '271px',
    sm: '484px',
    md: '724px',
    lg: '938px',
    xl: '1080px'
  },
  activeHeight: {
    xs: '188px',
    sm: '334px',
    md: '500px',
    lg: '648px',
    xl: '744px'
  },
  inactiveWidth: {
    xs: '218px',
    sm: '369px',
    md: '415px'
  },
  inactiveHeight: {
    xs: '150px',
    sm: '254px',
    md: '286px'
  }
};

export const styles = {
  carouselTrackStyles: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    height: SIZES_PX.activeHeight
  },
  carouselFooterStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  captionStyles: {
    width: SIZES.activeWidth,
    color: 'rgba(99, 102, 110, 1)',
    textAlign: 'end',
    opacity: 0,
    animation: `${fadeIn} 1s ease forwards`
  },
  dotsContainerStyles: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px'
  },
  getImageWrapperStyles: (index: number, activeIndex: number, isActive: boolean) => {
    const offset = index - activeIndex;
    const direction = offset >= 0 ? 1 : -1;
    const positionObjectSX = {
      xs: `calc(50% + ${(SIZES.activeWidth.lg / 30) * direction + offset * (SIZES.inactiveWidth.xs + SIZES.gap.xs)}px)`,
      sm: `calc(50% + ${(SIZES.activeWidth.sm / 9) * direction + offset * (SIZES.inactiveWidth.sm + SIZES.gap.sm)}px)`,
      md: `calc(50% + ${(SIZES.activeWidth.md / 5) * direction + offset * (SIZES.inactiveWidth.md + SIZES.gap.md)}px)`,
      lg: `calc(50% + ${(SIZES.activeWidth.lg / 3.8) * direction + offset * (SIZES.inactiveWidth.md + SIZES.gap.md)}px)`,
      xl: `calc(50% + ${(SIZES.activeWidth.xl / 3.2) * direction + offset * (SIZES.inactiveWidth.md + SIZES.gap.md)}px)`
    };
    const positionY = isActive ? '50%' : `calc(50% - ${offset * 17}px)`;
    const positionX = isActive ? '50%' : positionObjectSX;

    return {
      position: 'absolute',
      width: isActive ? SIZES_PX.activeWidth : SIZES_PX.inactiveWidth,
      height: isActive ? SIZES_PX.activeHeight : SIZES_PX.inactiveHeight,
      top: positionY,
      left: positionX,
      transform: 'translate(-50% , -50%)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)'
    };
  },
  getArrowContainerStyles: (direction: 'left' | 'right', disabled = false) => ({
    display: { xs: 'none', sm: 'block' },
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [direction]: '0px',
    zIndex: 1,
    transition: 'opacity 0.5s linear',
    opacity: disabled ? 0 : 1
  }),
  getDotStyles: (isActive: boolean) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: isActive ? 'rgba(25, 13, 3, 1)' : 'rgba(211, 202, 192, 1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)'
    }
  })
};
