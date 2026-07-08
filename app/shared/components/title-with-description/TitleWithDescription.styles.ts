import type { Variant } from '~/types/types/titleWithDescriptionComponent';

import { commonSx } from '~/shared/styles/commonSx';

export const Sizes = {
  goals: '100%',
  whatWeDo: '100%'
};

export const Gap = {
  textGap: { xs: '16px', md: '18px' }
};

export const Typography = {
  blockTitle: {
    fontFamily: 'Mulish',
    color: 'black',
    fontWeight: 700,
    lineHeight: '140%',
    fontSize: commonSx.layout.typography.bodyLarge
  },

  blockDescription: {
    fontFamily: 'Mulish',
    color: 'black',
    fontWeight: 400,
    lineHeight: { xs: '150%', md: '160%' },
    fontSize: commonSx.layout.typography.bodyLarge
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
