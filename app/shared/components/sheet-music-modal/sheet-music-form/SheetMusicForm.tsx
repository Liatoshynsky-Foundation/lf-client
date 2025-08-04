import { Box, Typography } from '@mui/material';

import Button from '~/ds-components/button/Button';
import TextField from '~/ds-components/text-field/TextField';

import { styles } from './SheetMusicForm.styles';

interface SheetMusicFormProps {
  changeContent: () => void;
}

const Input = () => {
  return (
    <Box sx={styles.inputBox}>
      <TextField
        sx={styles.input}
        onChange={() => {}}
        value={''}
        variant="outlined"
        label={'Label *'}
        error={false}
        helperText={''}
      />
      <Typography sx={styles.info}>Text info</Typography>
    </Box>
  );
};

const SheetMusicForm: React.FC<SheetMusicFormProps> = ({ changeContent }) => {
  const handleClick = () => {
    console.log('something else');
    changeContent();
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.inputs}>
        <Box sx={styles.firstRow}>
          <Input />
          <Input />
        </Box>
        <Input />
      </Box>
      <Button onClick={handleClick} size="large" variant="contained" sx={styles.btn}>
        Надіслати
      </Button>
      <Typography sx={styles.hint}>Ми відповімо вам протягом 1-2 днів</Typography>
    </Box>
  );
};

export default SheetMusicForm;
