'use client';
import { Box } from '@mui/material';
import Image from 'next/image';

import Button from '../button/Button';
import ContentBlock from '../content-block/ContentBlock';
import { styles } from './BulletTextWithLinks.styles';
import { TipTapDoc } from '~/types/types/common.types';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';
import ArrowUpRight from '~/public/icons/arrow-up-right.svg';
import FacebookIcon from '~/public/icons/facebook.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type ButtonItem = {
  shortText: string;
  fullText: string;
  link: string;
};

type RichContent = string | TipTapDoc;

type IconButtonContentBlockProps = {
  description?: RichContent;
  buttons: ButtonItem[];
  buttonText: string;
};

const imageSizes = {
  width: {
    xs: 22,
    md: 32
  },
  height: {
    xs: 20,
    md: 30
  }
};

export default function BulletTextWithLinks({
  description,
  buttons,
  buttonText
}: Readonly<IconButtonContentBlockProps>) {
  const { isMobile } = useBreakpoints();
  const sizesAttribute = generateSizesAttribute(imageSizes);

  const imageBox = (
    <Box sx={styles.image}>
      <Image src="/icons/ellipse-gray.svg" alt="ellipse" fill sizes={sizesAttribute} />
    </Box>
  );

  return (
    <Box sx={styles.wrapper}>
      {isMobile && imageBox}
      <Box sx={styles.buttonBox}>
        {!isMobile && imageBox}
        <Button size="medium" variant="contained" sx={{ ...styles.button }}>
          {buttonText}
          <Svg Component={ArrowUpRight} alt="icon" color="#fff" width="20px" height="20px" sx={styles.icon} />
        </Button>
      </Box>

      <Box sx={styles.contentBox}>
        <ContentBlock description={description} textSx={{ gridColumn: { xs: '1/ -1', sm: '4/ -1', md: '6/-1' } }} />
      </Box>
      <Box sx={styles.buttonsBox}>
        {buttons.map((button) => (
          <Button key={button.shortText} link={button.link} externalLink={true} variant="outlined" size="medium">
            {isMobile ? button.shortText : button.fullText}
            <Svg
              Component={FacebookIcon}
              fill="none"
              alt="icon"
              color="#000"
              width="20px"
              height="20px"
              sx={styles.icon}
            />
          </Button>
        ))}
      </Box>
    </Box>
  );
}
