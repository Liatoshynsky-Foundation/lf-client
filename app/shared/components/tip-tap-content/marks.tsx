import { Link } from '@mui/material';

import { TipTapMarkType } from '~/types/enums/common.enums';
import { TipTapMarkRenderers } from '~/types/types/common.types';

export const getBold: TipTapMarkRenderers[TipTapMarkType.bold] = (children) => <strong>{children}</strong>;
export const getItalic: TipTapMarkRenderers[TipTapMarkType.italic] = (children) => <em>{children}</em>;
export const getUnderline: TipTapMarkRenderers[TipTapMarkType.underline] = (children) => <u>{children}</u>;
export const getLink: TipTapMarkRenderers[TipTapMarkType.link] = (children, mark) => (
  <Link href={mark.attrs?.href || '#'} underline="hover">
    {children}
  </Link>
);
