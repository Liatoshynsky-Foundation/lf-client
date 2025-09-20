import { Backdrop, BackdropProps } from '@mui/material';

import { styles } from './BackdropComponent.styles';
import { sxToArray } from '~/utils/sxToArray';

const BackdropComponent: React.FC<BackdropProps> = ({ children, sx, ...props }) => (
  <Backdrop sx={[styles, ...sxToArray(sx)]} {...props}>
    {children}
  </Backdrop>
);

export default BackdropComponent;
