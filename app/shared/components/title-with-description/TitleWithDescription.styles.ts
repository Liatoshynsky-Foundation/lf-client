import type { Variant } from '~/types/types/titleWithDescriptionComponent';

export const Sizes = {
  goals: { xs: '213px', sm: '287px', md: '308px', lg: '256px', xl: '308px', xxl: '389.5px' },
  whatWeDo: { xs: '213px', sm: '287px', md: '308px', lg: '218px', xl: '260px', xxl: '330px' }
};

export const Gap = {
  textGap: { xs: '16px', md: '18px' }
};

export const Typography = {
  blockTitle: {
    fontFamily: 'Mulish',
    color: '#190D03',
    fontWeight: 700,
    lineHeight: '140%',
    fontSize: { xs: '16px', md: '20px' }
  },

  blockDescription: {
    fontFamily: 'Mulish',
    color: '#190D03',
    fontWeight: 400,
    lineHeight: { xs: '150%', md: '160%' },
    fontSize: { xs: '16px', md: '20px' }
  }
};

export const styles = {
  container: (variant: Variant) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: Gap.textGap,
    width: Sizes[variant],
    textAlign: 'left'
  }),

  blockTitle: () => ({
    ...Typography.blockTitle
  }),

  blockDescription: () => ({
    ...Typography.blockDescription
  })
};
