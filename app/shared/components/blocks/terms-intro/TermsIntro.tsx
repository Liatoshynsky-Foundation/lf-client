import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { Svg } from '../../colored-svg/ColoredSvg';
import ContentBlock from '../../design-system/all-components/content-block/ContentBlock';
import { SkewedBlock } from '../../design-system/all-components/skewed-block/SkewedBlock';
import { styles } from '../../Quote/Quote.styles';
import TextBlock from '../../text-block/TextBlock';
import { skewedBlockHeight, style } from './TermsIntro.style';

import ArrowDown from '~/public/icons/arrow-down.svg';
import QuoteImage from '~/public/images/quote.svg';

const introHtml = `
<p>
<strong>Вітаємо на сайті Фундації Лятошинського!</strong> Радіємо, що ви зацікавилися українською музикою і спадщиною Бориса Лятошинського. Цей розділ створений для того, щоб користувачі сайту – виконавці, дослідники, слухачі – <strong>легко орієнтувалися</strong> в доступі до архіву, правилах використання матеріалів і роботі сайту загалом.
</p>
`;

const TermsIntro = () => {
  const t = useTranslations('termsOfUse');

  return (
    <>
      <Box sx={style.gridContainer}>
        <Box sx={style.titleSection}>
          <Typography variant="h2" sx={style.titleText}>
            УмОви KоРисТувАннЯ СайТоМ
          </Typography>
        </Box>
        <Box sx={style.textBlockContainer}>
          <TextBlock content={introHtml} />
        </Box>
      </Box>

      <Box sx={{ gridColumn: '-1/1', position: 'relative' }}>
        <Box sx={style.downArrowLabel}>
          <Svg Component={ArrowDown} color="#87756b" alt="arrow down" />
          Дивитись далі
        </Box>
        <SkewedBlock
          image="/images/liatoshynsky.png"
          backgroundSize="cover"
          height={skewedBlockHeight}
          sx={style.backgroundContainer}
        >
          <Box sx={style.quoteContainer}>
            <Box sx={style.mainContainer('left')}>
              <Box sx={style.image('white', 'left')}>
                <QuoteImage />
              </Box>
              <Box sx={style.textContainer('left')}>
                <Typography sx={{ ...styles.mainText('white', 'left'), lineHeight: { xs: '150%', md: '160%' } }}>
                  Ви можете торкатися клавіш як хочете. Але ж хочеться, щоб вийшло щось гарне, правда ж? Тож ось —
                  невеличкий набір правил. Ознайомтесь із ними, перш ніж почати імпровізувати.
                </Typography>
              </Box>
            </Box>
          </Box>
        </SkewedBlock>
        <ContentBlock title={t('general-provisions.title')} description={t('general-provisions.mainText')} />
      </Box>
    </>
  );
};

export default TermsIntro;
