import { Box, Typography } from '@mui/material';
import Quote from '~/shared/components/Quote/Quote';
import Button from '~/shared/components/design-system/all-components/button/Button';
import { styles } from './LiatoshynskyOffice.styles';

const LiatoshynskyOffice = () => {
  return (
    <Box sx={styles.mainContainer}>
      {/* Трапеція */}
      <Box sx={styles.trapezoid} />
      {/* Контентний контейнер */}
      <Box sx={styles.contentContainer}>
        {/* Цитата — абсолютно */}
        <Box sx={styles.quoteBlock}>
          <Quote
            quoteText={
              'Ах, мила, милий мій котику, коли ж нарешті прийде той час, коли ми будемо разом із тобою, у вітальні, де так гарно, стоїть рояль і багато нот.'
            }
            sourceText={{
              tittle: 'Лист Бориса Лятошинського Маргариті Царевич',
              data: '29 вересня 1957',
              place: 'Берлін'
            }}
            quoteIconColor="black"
            mainTextColor="black"
            alignRight
          />
        </Box>
        {/* Текст зліва */}
        <Box sx={styles.textBlock}>
          <Typography sx={styles.text}>КабІНет</Typography>
          <Typography sx={[styles.text, styles.indentedLine]}>ЛЯтоШинСькоГо</Typography>
        </Box>
        {/* Кнопка */}
        <Box sx={styles.buttonBlock}>
          <Button size="large" color="primary">
            Увійти до кабінету
          </Button>
        </Box>

        {/* Блока з фото */}

        {/*<Box sx={{*/}
        {/*      position: 'absolute',*/}
        {/*      bottom: '2rem',*/}
        {/*      right: '3rem',*/}
        {/*      zIndex: 1,*/}
        {/*    }}>*/}
        {/*      <OfficeMedia />*/}
        {/*</Box>*/}
      </Box>
    </Box>
  );
};

export default LiatoshynskyOffice;
