import { Box, SxProps, Theme, Typography } from '@mui/material';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { styles } from './ButtonCard.styles';

import { Link } from '~/i18n/navigation';
import { sxToArray } from '~/lib/utils/sxToArray';
import ArrowDownRightIcon from '~/public/icons/arrow-down-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

interface ButtonCardProps {
  text: string;
  link?: string;
  sx?: SxProps<Theme>;
}

const ButtonCard = ({ text, link, sx }: ButtonCardProps) => {
  const cardContent = (
    <Box sx={[styles.container, ...sxToArray(sx)]}>
      <Box sx={styles.background} className="background" />
      <Box sx={styles.content}>
        <Typography variant="customBold20">{text}</Typography>
      </Box>
      <Box sx={styles.arrowDown}>
        <Svg
          alt="arrow down right"
          width="40px"
          height="40px"
          Component={ArrowDownRightIcon}
          stroke={mainHexPallete.black}
        />
      </Box>
    </Box>
  );

  return link ? <Link href={link}>{cardContent}</Link> : cardContent;
};

export default ButtonCard;
