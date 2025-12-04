import { Button } from '@mui/material';

export type PdfButtonProps = {
  href: string;
  label: string;
  dataTestId?: string;
};

const PdfButton = ({ href, label, dataTestId }: Readonly<PdfButtonProps>) => {
  return (
    <Button
      variant="contained"
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

export default PdfButton;
