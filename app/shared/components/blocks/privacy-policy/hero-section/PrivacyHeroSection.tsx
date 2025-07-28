import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styles } from './PrivacyHeroSection.styles';

export const PrivacyHeroSection = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.container}>
        <Typography variant="h2" sx={styles.title}>
          ПоЛітИкА <br />
          КонФеДеНційНоСті
        </Typography>

        <Box sx={styles.container}>
          <Typography sx={styles.textBlock1}>
            Ми цінуємо вашу довіру, тому прагнемо захищати вашу приватність та особисту інформацію, яку ви надаєте нам
            через наш вебсайт. У цій Політиці конфіденційності ми пояснюємо, як ми{' '}
            <span style={styles.span}>обробляємо</span> ваші персональні дані, чому це важливо і як ми{' '}
            <span style={styles.span}>гарантуємо</span> їх безпеку.
          </Typography>

          <Typography sx={styles.textBlock2}>
            Користуючись нашим сайтом, <span style={styles.span}>ви погоджуєтесь з умовами</span> цієї Політики. Якщо ви
            не згодні з будь-якими її пунктами, ми просимо вас припинити використання нашого сайту. Ми залишаємо за
            собою право оновлювати цю Політику, зокрема у разі змін у законодавстві або функціональності сайту. Тому
            радимо час від часу переглядати її, щоб бути в курсі будь-яких змін.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyHeroSection;
