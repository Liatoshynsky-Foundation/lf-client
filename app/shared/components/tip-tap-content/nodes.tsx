import { Typography } from '@mui/material';

import renderText from '~/components/tip-tap-content/renderText';

import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TextNode, TipTapMarkRenderers, TipTapNodeRenderers } from '~/types/types/tiptap.types';

export const getDoc: TipTapNodeRenderers[TipTapNodeTypes.doc] = (children) => children;

export const getHeading: TipTapNodeRenderers[TipTapNodeTypes.heading] = (children, { attrs }) => {
  const variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = `h${attrs?.level ?? 2}`;
  return <Typography variant={variant}>{children}</Typography>;
};

export const getParagraph: TipTapNodeRenderers[TipTapNodeTypes.paragraph] = (children) => (
  <Typography variant="body2">{children}</Typography>
);

type GetText = (renderers: TipTapMarkRenderers) => TipTapNodeRenderers[TipTapNodeTypes.text];

export const getText: GetText = (renderers) => (node: TextNode) => renderText(renderers, node);
