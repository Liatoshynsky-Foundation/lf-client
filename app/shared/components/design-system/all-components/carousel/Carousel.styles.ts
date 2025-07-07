export const SIZES = {
  activeWidth: 1080,
  activeHeight: 744,
  inactiveWidth: 415,
  inactiveHeight: 286,
  containerWidth: 2900,
  containerHeight: 818,
  photoGap: 40
};

export const styles = {
  fullWidthContainerStyles: {
    width: '100vw',
    height: `${SIZES.containerHeight}px`,
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    overflow: 'hidden'
  },

  centeredCarouselWrapperStyles: {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: 'translateX(-50%)',
    width: `${SIZES.containerWidth}px`,
    height: '100%'
  },
  carouselContainerStyles: {
    position: 'relative',
    width: `${SIZES.containerWidth}px`,
    height: `${SIZES.containerHeight}px`,
    overflow: 'hidden'
  },

  getCarouselTrackStyles: (activeIndex: number) => {
    let trackPosition = 0;

    for (let i = 0; i < activeIndex; i++) {
      trackPosition += SIZES.inactiveWidth + SIZES.photoGap;
    }

    const targetPosition = 910;
    const translateX = targetPosition - trackPosition;

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      gap: `${SIZES.photoGap}px`,
      transform: `translateX(${translateX}px)`,
      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  },

  getImageContainerStyles: (isActive: boolean, index: number, activeIndex: number) => {
    const offset = index - activeIndex;

    let translateY = 0;

    if (isActive) {
      translateY = 0;
    }

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
      width: isActive ? `${SIZES.activeWidth}px` : `${SIZES.inactiveWidth}px`,
      height: isActive ? `${SIZES.activeHeight}px` : `${SIZES.inactiveHeight}px`,
      transform: `translateY(${translateY}px) scale(1)`,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  },

  styledImageStyles: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  getArrowContainerStyles: (direction: 'left' | 'right', disabled: boolean = false) => ({
    position: 'absolute',
    top: '354px',
    left: direction === 'left' ? '782px' : 'none',
    right: direction === 'right' ? '782px' : 'none',
    transition: 'opacity 0.5s linear',
    opacity: disabled ? 0 : 1
  }),

  dotsContainerStyles: {
    position: 'absolute',
    bottom: '30px',
    left: '1406px',
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
    top: '744px',
    left: '910px',
    width: '1080px',
    height: '22px',
    color: 'rgba(99, 102, 110, 1)',
    textAlign: 'end',
    display: 'flex',
    justifyContent: 'end'
  })
};
