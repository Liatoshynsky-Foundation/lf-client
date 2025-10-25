import { Box, SxProps, Theme } from '@mui/material';
import type { ResponsiveStyleValue } from '@mui/system';

import { styles } from './ButtonContentBlock.styles';
import { TipTapDoc } from '~/types/types/common.types';

import { sxToArray } from '~/lib/utils/sxToArray';
import ArrowUpRight from '~/public/icons/arrow-up-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import Button from '~/shared/components/design-system/all-components/button/Button';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';

type ButtonContentBlockProps = {
  buttonText: string;
  buttonColor?: 'primary' | 'secondary' | 'tertiary';
  content: TipTapDoc;
  sx?: object;
  contentTextGridColumn?: string | Record<string, string>;
  contentTextSx?: object;
  contentContainerSx?: SxProps<Theme>;
  buttonGridColumn?: object;
  buttonWidth?: object | string;
  ml?: ResponsiveStyleValue<string | number>;
  textIndentation?: string | object;
};

const ButtonContentBlock = ({
  buttonText,
  buttonColor = 'primary',
  content,
  sx,
  contentTextGridColumn,
  contentTextSx,
  contentContainerSx,
  buttonGridColumn = { xs: '1/9', sm: '1/12', md: '3 / 6' },
  buttonWidth = '100%',
  textIndentation,
  ml
}: ButtonContentBlockProps) => (
  <Box sx={styles.wrapper}>
    <Box sx={styles.buttonBox(buttonGridColumn, buttonWidth)} ml={ml}>
      <Button variant="contained" color={buttonColor} fullWidth sx={{ ...styles.button, ...sx }}>
        {buttonText}
        <Svg Component={ArrowUpRight} alt="icon" color="#000" width="20px" height="20px" sx={styles.icon} />
      </Button>
    </Box>

    <Box sx={styles.contentBox}>
      <ContentBlock
        description={content}
        containerSx={{ marginBottom: { xs: '32px', md: '40px' }, ...(sxToArray(contentContainerSx ?? {}) ?? {}) }}
        textSx={{
          ...(contentTextSx ?? {}),
          ...(contentTextGridColumn && { gridColumn: contentTextGridColumn })
        }}
        textIndentation={textIndentation}
        textGridColumn={contentTextGridColumn}
      />
    </Box>
  </Box>
);

export default ButtonContentBlock;
