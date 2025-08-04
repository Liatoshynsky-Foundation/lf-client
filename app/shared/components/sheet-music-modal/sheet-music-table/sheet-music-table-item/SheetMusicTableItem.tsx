import { Box, Typography } from '@mui/material';
import { ComponentType, SVGProps } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import Button from '~/ds-components/button/Button';
import { theme } from '~/ds-components/theme/Theme';

import { styles } from './SheetMusicTableItem.styles';
import { MusicSheet } from '~/types/types/composition.types';

import EyeIcon from '~/public/icons/colored-eye.svg';
import FrameIcon from '~/public/icons/colored-frame.svg';
import MessageSquareIcon from '~/public/icons/colored-messages-square.svg';

interface SheetMusicTableItemProps {
  item: MusicSheet;
  onClick: () => void;
}

const btnVariants = {
  freeBtn: {
    text: 'Переглянути ноти',
    Component: EyeIcon,
    alt: 'eye'
  },
  paidBtn: {
    text: 'Зв`язатись з нами',
    Component: MessageSquareIcon,
    alt: 'messages'
  }
};

interface getBtnProps {
  text: string;
  Component: ComponentType<SVGProps<SVGSVGElement>>;
  alt: string;
  onClick: SheetMusicTableItemProps['onClick'];
}

const getBtn = ({ text, Component, alt, onClick }: getBtnProps) => (
  <Button variant={'outlined'} sx={styles.btn} onClick={onClick}>
    <Typography sx={styles.text}>{text}</Typography>
    <Svg Component={Component} color={theme.palette.text.primary} alt={alt} height="20px" width="20px" />
  </Button>
);

const getFilenameFromUrl = (url: string) => {
  const filename = url.split('/').at(-1);
  const [name, type] = filename ? filename.split('.') : [];
  return { name, type, filename };
};

const SheetMusicTableItem: React.FC<SheetMusicTableItemProps> = ({ item, onClick }) => {
  const { name, type } = getFilenameFromUrl(item.url);

  const btnType = item.isFree ? { onClick, ...btnVariants.freeBtn } : { onClick, ...btnVariants.paidBtn };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.filenameWrapper}>
        <Svg Component={FrameIcon} color={theme.palette.text.primary} alt={'frame'} sx={styles.icon} />
        <Typography sx={[styles.text, styles.name]}>{name}</Typography>
        <Typography sx={styles.text}>{`.${type}`}</Typography>
      </Box>

      <Box sx={styles.dateWrapper}>
        <Typography sx={styles.text}>{item.dateUploaded.toLocaleDateString()}</Typography>
      </Box>

      <Box sx={styles.btnWrapper}>{getBtn(btnType)}</Box>
    </Box>
  );
};

export default SheetMusicTableItem;
