import type { SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';

import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import type { TipTapDoc } from '~/types/types/common.types';

const createParagraph = (paragraphSx?: SxProps<Theme>) => {
  const ParagraphRenderer = (children: React.ReactNode) => (
    <Typography sx={{ display: 'block', ...paragraphSx }}>{children}</Typography>
  );
  ParagraphRenderer.displayName = 'ParagraphRenderer';
  return ParagraphRenderer;
};

type PolicyContentProps = {
  doc: TipTapDoc;
  paragraphSx?: SxProps<Theme>;
};

export function PolicyContent({ doc, paragraphSx }: Readonly<PolicyContentProps>) {
  if (!doc) return null;

  return (
    <TipTapContent
      data={doc}
      nodeRenderers={{
        paragraph: createParagraph(paragraphSx)
      }}
    />
  );
}
