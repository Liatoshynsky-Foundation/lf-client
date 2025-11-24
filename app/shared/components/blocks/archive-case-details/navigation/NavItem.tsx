import { Box, Button, Typography } from '@mui/material';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from './Navigation.styles';
import type { ArchiveAdjacentCase } from '~/types/page/archive.types';

import ArrowLeft from '~/public/icons/arrow-left.svg';
import ArrowRight from '~/public/icons/arrow-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

export type NavItemDirection = 'prev' | 'next';

export type NavItemProps = {
  direction: NavItemDirection;
  caseLink: ArchiveAdjacentCase;
  label: string;
};

const NAV_ICON_COLOR = mainHexPallete.black;

const NavItem = ({ direction, caseLink, label }: Readonly<NavItemProps>) => {
  const isPrev = direction === 'prev';

  const containerSx = isPrev ? styles.navItemLeft : styles.navItemRight;
  const metaSx = isPrev ? styles.navMetaLeft : styles.navMetaRight;

  const ariaLabel = label;
  const buttonLabel = label;
  const testId = isPrev ? 'ArchiveCaseDetails-prevCase' : 'ArchiveCaseDetails-nextCase';

  const icon = <Svg Component={isPrev ? ArrowLeft : ArrowRight} alt="" color={NAV_ICON_COLOR} sx={styles.navIcon} />;

  const iconProps = isPrev ? { startIcon: icon } : { endIcon: icon };

  return (
    <Box sx={containerSx}>
      <Button
        variant="outlined"
        color="inherit"
        href={caseLink.href}
        sx={styles.navButton}
        aria-label={ariaLabel}
        data-testid={testId}
        {...iconProps}
      >
        <Typography component="span" sx={styles.navButtonLabel}>
          {buttonLabel}
        </Typography>
      </Button>

      <Box sx={metaSx}>
        <Typography component="p" sx={styles.navCaseIndex}>
          ({caseLink.indexLabel})
        </Typography>
        <Typography component="p" sx={styles.navCaseTitle}>
          {caseLink.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default NavItem;
