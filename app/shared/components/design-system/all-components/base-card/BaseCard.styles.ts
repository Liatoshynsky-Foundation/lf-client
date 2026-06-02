import { mainHexPallete } from '~/ds-components/theme/colors';
import { oswald } from '~/ds-components/theme/Theme';

const ellipsisStyles = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
} as const;

const textBaseStyles = {
  fontFamily: 'Mulish, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '150%'
} as const;

export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textDecoration: 'none',
    color: 'inherit'
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '501 / 320',
    overflow: 'hidden',
    clipPath: 'polygon(0% 5.5%, 100% 0%, 100% 94.5%, 0% 100%)',
    maxWidth: {
      xs: '100%',
      sm: '400px',
      md: '501px'
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: mainHexPallete.blue[200],
      clipPath: `
    polygon(
      0% calc(5.5%),
      100% 0%,
      100% calc(0% + 1px),
      0% calc(5.5% + 1px)
    )
  `,
      zIndex: 1
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: mainHexPallete.blue[200],
      clipPath: `
    polygon(
      0% calc(100% - 1px),
      100% calc(94.5% - 1px),
      100% 94.5%,
      0% 100%
    )
  `
    }
  },

  image: {
    objectFit: 'cover' as const,
    objectPosition: '45% 48%'
  },

  fallbackImage: {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: '45% 48%'
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '8px', sm: '5px', md: '8px' },
    marginTop: { xs: '25px', sm: '22px', md: '26px', lg: '25px', xl: '23px' },
    flex: 1
  },

  title: {
    fontFamily: oswald.style.fontFamily,
    fontSize: { xs: '18px', md: '20px' },
    fontWeight: 700,
    lineHeight: '150%',
    textTransform: 'uppercase',
    color: mainHexPallete.black,
    ...ellipsisStyles,
    WebkitLineClamp: 2,
    marginBottom: { sm: '6px', md: '8px', lg: '9px', xxl: '6px' }
  },

  date: {
    ...textBaseStyles,
    fontWeight: 500,
    color: mainHexPallete.brown[600]
  },

  description: {
    ...textBaseStyles,
    color: mainHexPallete.black,
    ...ellipsisStyles,
    WebkitLineClamp: 3,
    marginBottom: { xs: '8px', sm: '11px', md: '9px', lg: '8px', xl: '10px' }
  },

  buttonWrapper: {
    marginTop: 'auto',
    maxWidth: '150px'
  }
};
