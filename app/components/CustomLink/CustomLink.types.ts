import { ButtonProps } from '@mui/material/Button';
export interface CustomLinkProps extends ButtonProps {
  children: React.ReactNode;
  path: string;
}
