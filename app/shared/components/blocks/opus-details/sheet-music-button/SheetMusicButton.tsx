import { Button } from '@mui/material';

export type SheetMusicButtonVariant = 'contained' | 'outlined';

export type SheetMusicButtonProps = {
  href: string;
  label: string;
  variant?: SheetMusicButtonVariant;
  dataTestId?: string;
};

const SheetMusicButton = ({ href, label, variant = 'contained', dataTestId }: Readonly<SheetMusicButtonProps>) => {
  return (
    <Button
      variant={variant}
      color="primary"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={dataTestId}
    >
      {label}
    </Button>
  );
};

export default SheetMusicButton;
