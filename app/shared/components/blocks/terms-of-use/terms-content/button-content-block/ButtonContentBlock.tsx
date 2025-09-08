import { Box } from '@mui/material';

import { styles } from './ButtonContentBlock.styles';
import { TipTapDoc } from '~/types/types/common.types';

import ArrowUpRight from '~/public/icons/arrow-up-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import Button from '~/shared/components/design-system/all-components/button/Button';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

type ButtonContentBlockProps = {
  buttonText: string;
  buttonColor?: 'primary' | 'secondary' | 'tertiary';
  content: TipTapDoc;
  sx?: object;
};

const ButtonContentBlock = ({ buttonText, buttonColor = 'primary', content, sx }: ButtonContentBlockProps) => (
  <Box sx={styles.wrapper}>
    <Box sx={styles.buttonBox}>
      <Button variant="contained" color={buttonColor} fullWidth sx={{ ...styles.button, ...sx }}>
        {buttonText}
        <Svg Component={ArrowUpRight} alt="icon" color="#000" width="20px" height="20px" sx={styles.icon} />
      </Button>
    </Box>

    <Box sx={styles.contentBox}>
      <ContentBlock description={content} containerSx={{ marginBottom: { xs: '32px', md: '40px' } }} />
    </Box>
  </Box>
);

export default ButtonContentBlock;
