import { keyframes } from '@mui/system';

const fadeIn = keyframes`from {opacity: 0;} to {opacity: 1;}`;

export const SIZES = {
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
  },
  containerWidth: 2900,
  containerHeight: {
    xs: '255px',
    sm: '387px',
    md: '703px',
    lg: '818px'
  },
  photoGap: {
    xs: '20px',
    sm: '30px',
    md: '40px'
  }
};

const trackCenter = {
  xs: SIZES.containerWidth / 2 - Number.parseInt(SIZES.activeWidth.xs) / 2,
  sm: SIZES.containerWidth / 2 - Number.parseInt(SIZES.activeWidth.sm) / 2,
  md: SIZES.containerWidth / 2 - Number.parseInt(SIZES.activeWidth.md) / 2,
  lg: SIZES.containerWidth / 2 - Number.parseInt(SIZES.activeWidth.lg) / 2,
  xl: SIZES.containerWidth / 2 - Number.parseInt(SIZES.activeWidth.xl) / 2
};

export const styles = {
  fullWidthContainerStyles: {
    width: '100vw',
    height: SIZES.containerHeight,
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    overflow: 'hidden'
  },

  centeredCarouselWrapperStyles: {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translateX(-50%)',
    height: '100%'
  },
  carouselContainerStyles: {
    position: 'relative',
    width: `${SIZES.containerWidth}px`,
    height: SIZES.containerHeight,
    overflow: 'hidden'
  },

  getCarouselTrackStyles: (activeIndex: number) => {
    const trackPosition = { xs: 0, sm: 0, md: 0 };

    for (let i = 0; i < activeIndex; i++) {
      trackPosition.xs += Number.parseInt(SIZES.inactiveWidth.xs) + Number.parseInt(SIZES.photoGap.xs);
      trackPosition.sm += Number.parseInt(SIZES.inactiveWidth.sm) + Number.parseInt(SIZES.photoGap.sm);
      trackPosition.md += Number.parseInt(SIZES.inactiveWidth.md) + Number.parseInt(SIZES.photoGap.md);
    }

    const translateX = {
      xs: `translateX(${trackCenter.xs - trackPosition.xs}px)`,
      sm: `translateX(${trackCenter.sm - trackPosition.sm}px)`,
      md: `translateX(${trackCenter.md - trackPosition.md}px)`,
      lg: `translateX(${trackCenter.lg - trackPosition.md}px)`,
      xl: `translateX(${trackCenter.xl - trackPosition.md}px)`
    };

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      gap: SIZES.photoGap,
      transform: translateX,
      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  },

  getImageContainerStyles: (isActive: boolean, index: number, activeIndex: number, isDragging: boolean = false) => {
    const offset = index - activeIndex;
    let translateY = 0;

    if (index > activeIndex) {
      const distance = Math.abs(offset);
      const multiplier = 17 * distance;
      translateY = 241 - multiplier;
    }

    if (index < activeIndex) {
      const distance = Math.abs(offset);
      const multiplier = 17 * distance;
      translateY = 241 + multiplier;
    }

    return {
      position: 'relative',
      width: isActive ? SIZES.activeWidth : SIZES.inactiveWidth,
      height: isActive ? SIZES.activeHeight : SIZES.inactiveHeight,
      transform: `translateY(${translateY}px) scale(1)`,
      transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  },

  styledImageStyles: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  getArrowContainerStyles: (direction: 'left' | 'right', disabled = false) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [direction]: { sm: '1082px', md: '782px' },
    zIndex: 1,
    transition: 'opacity 0.5s linear',
    opacity: disabled ? 0 : 1
  }),

  dotsContainerStyles: {
    position: 'absolute',
    bottom: { xs: '10px', md: '30px' },
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px'
  },

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
  }),

  getCaptionStyles: () => ({
    position: 'absolute',
    bottom: { xs: '30px', md: '50px' },
    left: trackCenter,
    width: SIZES.activeWidth,
    height: '22px',
    color: 'rgba(99, 102, 110, 1)',
    textAlign: 'end',
    display: 'flex',
    justifyContent: 'end',
    opacity: 0,
    animation: `${fadeIn} 1s ease forwards`
  })
};
