import { Typography } from '@mui/material';

import renderText from '~/components/tip-tap-content/renderText';

import TitleWithDescription from '../title-with-description/TitleWithDescription';
import renderMultiLangText from './multiLangText';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import {
  ParagraphNode,
  TextNode,
  TipTapDoc,
  TipTapMarkRenderers,
  TipTapNodeRenderers
} from '~/types/types/tiptap.types';
import { Variant } from '~/types/types/titleWithDescriptionComponent';

export const getDoc: TipTapNodeRenderers[TipTapNodeTypes.doc] = (children) => children;

export const getHeading: TipTapNodeRenderers[TipTapNodeTypes.heading] = (children, { attrs }) => {
  const variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = `h${attrs?.level ?? 2}`;
  return <Typography variant={variant}>{children}</Typography>;
};

export const getParagraph: TipTapNodeRenderers[TipTapNodeTypes.paragraph] = (children) => (
  <Typography variant="body2">{children}</Typography>
);

type GetTitledParagraph = (
  variant: Variant,
  title: string | TipTapDoc
) => (_children: React.ReactNode, node: ParagraphNode) => React.JSX.Element;

export const getTitledParagraph: GetTitledParagraph = (variant, title) => {
  const TitledParagraph = (_children: React.ReactNode, node: ParagraphNode) => {
    const descriptionDoc: TipTapDoc = {
      type: TipTapNodeTypes.doc,
      content: [node]
    };

    return <TitleWithDescription variant={variant} title={title} description={descriptionDoc} />;
  };

  return TitledParagraph;
};
type RenderData = (input: string | TipTapDoc) => TipTapDoc;

export const renderData: RenderData = (input) => {
  if (typeof input === 'object' && input !== null) {
    return input;
  }
  return {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [{ type: TipTapNodeTypes.text, text: input }]
      }
    ]
  };
};

type GetText = (renderers: TipTapMarkRenderers) => TipTapNodeRenderers[TipTapNodeTypes.text];

export const getText: GetText = (renderers) => (node: TextNode) => renderText(renderers, node);

type GetMultiLangText = (
  renderers: TipTapMarkRenderers,
  locale: string
) => TipTapNodeRenderers[TipTapNodeTypes.multiLangText];

export const getMultiLangText: GetMultiLangText = (renderers, locale) => (node) =>
  renderMultiLangText(renderers, node, locale);
