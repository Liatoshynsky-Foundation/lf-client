import { Box, Typography } from '@mui/material';

import { styles } from './CardWithText.styles';

import PaperComponent from '~/shared/components/paper-component/PaperComponent';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type CardWithTextProps = {
  icon?: string;
  title: string;
  list: Array<string>;
};

export default function CardWithText({ icon, title, list }: Readonly<CardWithTextProps>) {
  return (
    <PaperComponent sx={styles.container} childrenSx={styles.content}>
      {icon && <SvgImage src={icon} alt="Bullet icon" width={48} height={48} />}
      <Box sx={styles.contentBox}>
        <Typography sx={styles.title} variant="customBold20">
          {title}
        </Typography>

        <Box sx={styles.listContainer}>
          {list.map((item) => {
            return (
              <Box sx={styles.listItem} key={item}>
                <Box sx={styles.listIcon}>
                  <SvgImage src="/icons/bullet-small-secondary.svg" alt="List bullet icon" width={12} height={12} />
                </Box>
                <Typography variant="subtitle1">{item}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </PaperComponent>
  );
}
