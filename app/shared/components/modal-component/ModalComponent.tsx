import { Dialog, DialogProps, DialogSlots } from '@mui/material';

import BackdropComponent from '~/components/backdrop-component/BackdropComponent';
import PaperComponent from '~/components/paper-component/PaperComponent';

const defaultSlots: Partial<DialogSlots> = {
  backdrop: BackdropComponent,
  paper: PaperComponent
};

const ModalComponent: React.FC<DialogProps> = ({ children, slots, ...props }) => {
  return (
    <Dialog slots={{ ...defaultSlots, ...slots }} {...props}>
      {children}
    </Dialog>
  );
};

export default ModalComponent;
