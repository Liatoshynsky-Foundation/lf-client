import { Box, Modal as MuiModal, Typography } from '@mui/material';

import { IconButton } from '../icon-button/IconButton';
import { style } from './Modal.styles';
import { IconButtonVariant, PositionEnum } from '~/types/enums/common.enums';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export type Color = 'white' | 'burgundy';
export type VerticalAlignment = PositionEnum.Top | PositionEnum.Bottom | undefined;
export type HorizontalAlignment = PositionEnum.Left | PositionEnum.Right | undefined;

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  width?: number;
  height?: number;
  isBackdrop?: boolean;
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundColor?: Color;
  topLine?: boolean;
  verticalAlignment?: VerticalAlignment;
  horizontalAlignment?: HorizontalAlignment;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  handleClose,
  width = 1080,
  height = 400,
  isBackdrop = false,
  title,
  subtitle,
  backgroundColor = 'burgundy',
  topLine = false,
  verticalAlignment,
  horizontalAlignment,
  children
}) => {
  const isBigModal = width > 1000;

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      hideBackdrop={!isBackdrop}
      sx={style.modal(width, height, backgroundColor, verticalAlignment, horizontalAlignment)}
    >
      <Box sx={style.content}>
        <Box sx={style.topSection}>
          <Box>
            <Typography variant={isBigModal ? 'h3' : 'h4'} sx={style.title(backgroundColor)}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={style.title(backgroundColor)}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <IconButton type={IconButtonVariant.icon} size="small" onClick={handleClose}>
            <div
              style={{
                filter: backgroundColor === 'burgundy' ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'
              }}
            >
              <SvgImage
                src="/icons/x.svg"
                alt="closing modal"
                width={isBigModal ? 40 : 24}
                height={isBigModal ? 40 : 24}
              />
            </div>
          </IconButton>
        </Box>
        {topLine && <Box sx={style.topLine(width)} />}
        <Box sx={style.children}>{children}</Box>
      </Box>
    </MuiModal>
  );
};
