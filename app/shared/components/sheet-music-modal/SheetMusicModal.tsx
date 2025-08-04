import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import SheetMusicForm from '~/components/sheet-music-modal/sheet-music-form/SheetMusicForm';
import SheetMusicTable from '~/components/sheet-music-modal/sheet-music-table/SheetMusicTable';
import { Modal, ModalProps } from '~/ds-components/modal/Modal';
import { theme } from '~/ds-components/theme/Theme';

import { Music } from '~/types/types/enhancedTable';

import Signature from '~/public/images/signature.png';

enum ModalContentType {
  Table = 'table',
  Form = 'form',
  Info = 'info'
}

interface SheetMusicModalProps extends Omit<ModalProps, 'title' | 'subtitle' | 'topLine'> {
  data: Music;
}

const SheetMusicModal: React.FC<SheetMusicModalProps> = ({ data, handleClose, ...props }) => {
  const [contentType, setContentType] = useState<ModalContentType>(ModalContentType.Table);

  const switchContent = (type: ModalContentType) => () => setContentType(type);

  const closeHandler = () => {
    switchContent(ModalContentType.Table)();
    handleClose();
  };

  if (contentType === ModalContentType.Form) {
    return (
      <Modal
        topLine
        {...props}
        handleClose={closeHandler}
        title={'Музика вже майже у вас!'}
        subtitle={'Ми з вами зв’яжемося якнайшвидше'}
      >
        <SheetMusicForm changeContent={switchContent(ModalContentType.Info)} />
      </Modal>
    );
  }

  if (contentType === ModalContentType.Info) {
    return (
      <Modal
        modalSx={{ px: '112px', pt: '96px', pb: '154px' }}
        backgroundColor="burgundy"
        {...props}
        handleClose={closeHandler}
        title={'Чуєте це? Це я знову граю'}
      >
        <Box>
          <Typography sx={{ color: theme.palette.primary.contrastText }}>
            Чесно кажучи, не думав, що стільки років потому мої ноти знову матимуть сцену — хай і цифрову.
          </Typography>
          <Typography sx={{ color: theme.palette.primary.contrastText }}>
            Якщо моя музика тривожить, надихає чи змушує знизувати плечима — як композитор я живий.
          </Typography>
        </Box>
        <Image
          src={Signature}
          alt={'Signature'}
          style={{ position: 'absolute', bottom: '69px', right: '79px', transform: 'rotate(-4deg)' }}
        />
      </Modal>
    );
  }

  return (
    <Modal topLine {...props} handleClose={closeHandler} title={'Ноти:'} subtitle={data.name}>
      <SheetMusicTable data={data.sheetMusic} changeContent={switchContent(ModalContentType.Form)} />
    </Modal>
  );
};

export default SheetMusicModal;
