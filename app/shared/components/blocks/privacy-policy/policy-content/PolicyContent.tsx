import type { SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';

import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import type { TipTapDoc } from '~/types/types/common.types';

export function PolicyContent({ doc, paragraphSx }: { doc: TipTapDoc; paragraphSx?: SxProps<Theme> }) {
  if (!doc) return null;

  return (
    <TipTapContent
      data={doc}
      nodeRenderers={{
        paragraph: (children) => <Typography sx={{ ...paragraphSx, display: 'block' }}>{children}</Typography>
      }}
    />
  );
}
