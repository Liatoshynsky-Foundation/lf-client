import { Box, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { introDoc, rulesDoc } from './terms.const.';
import TermsContent from './terms-content/TermsContent';
import { skewedBlockHeight, style } from './TermsOfUse.style';

import ArrowDown from '~/public/icons/arrow-down.svg';
import QuoteImage from '~/public/images/quote.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';
import { SkewedBlock } from '~/shared/components/design-system/all-components/skewed-block/SkewedBlock';
import { styles } from '~/shared/components/Quote/Quote.styles';

const TermsOfUse = () => {
  const t = useTranslations('termsOfUse');
  const locale = useLocale();

  return (
    <>
      <Box sx={style.gridContainer} data-testid="TermsOfUse">
        <Box sx={style.titleSection}>
          <Typography variant="h2" sx={style.titleText} data-testid="TermsOfUse-title">
            {t('title')}
          </Typography>
        </Box>
        <Box sx={style.textBlockContainer}>
          <ContentBlock
            description={introDoc[locale]}
            textSx={{ gridColumn: '1 / -1', maxWidth: { sm: '400px', md: '907px' } }}
          />
        </Box>
      </Box>
      <Box sx={{ gridColumn: '-1/1', position: 'relative' }} data-testid="TermsOfUse-quoteSection">
        <Box sx={style.downArrowLabel}>
          <Svg Component={ArrowDown} color={mainHexPallete.brown[500]} alt="arrow down" />
          {t('seeMore')}
        </Box>
        <SkewedBlock
          image="/images/liatoshynsky.png"
          backgroundSize="cover"
          isBackground
          height={skewedBlockHeight}
          sx={style.backgroundContainer}
        >
          <Box sx={style.quoteContainer}>
            <Box sx={style.mainContainer('left')}>
              <Box sx={style.image('white', 'left')}>
                <QuoteImage />
              </Box>
              <Box sx={style.textContainer('left')}>
                <Typography
                  sx={{
                    ...styles.mainText('white', 'left'),
                    lineHeight: { xs: '150%', md: '160%' }
                  }}
                  data-testid="TermsOfUse-quote"
                >
                  {t('quote')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </SkewedBlock>
        <ContentBlock
          title={t('generalProvisionsTitle')}
          description={rulesDoc[locale]}
          containerSx={{ marginBottom: { xs: '80px', sm: '104px', md: '128px', lg: '144px' } }}
        />
        <TermsContent />
      </Box>
    </>
  );
};

export default TermsOfUse;
