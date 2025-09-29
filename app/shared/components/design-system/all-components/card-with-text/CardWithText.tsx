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
      <Box sx={{ overflowY: 'auto' }}>
        <Typography sx={styles.title} variant="customBold20">
          {title}
        </Typography>

        {list.map((item) => {
          return (
            <Box sx={styles.listItem} key={item}>
              <SvgImage src="/icons/bullet-small-secondary.svg" alt="Bullet icon" width={12} height={12} />
              <Typography sx={styles.listText} variant="subtitle1">
                {item}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </PaperComponent>
  );
}
