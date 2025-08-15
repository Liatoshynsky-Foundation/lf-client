import { TypographyProps } from '@mui/material';
import React from 'react';

import { Heading } from '~/components/tip-tap-node/extentions/Heading';
import { Paragraph } from '~/components/tip-tap-node/extentions/Paragraph';
import { RichText } from '~/components/tip-tap-node/extentions/RichText';

import { TipTapNodeType } from '~/types/enums/common.enums';
import { Node, TipTapNodeRenderers } from '~/types/types/common.types';

type NodeRenderer = (n: Node, props?: TypographyProps) => React.ReactNode;

export const renderers: TipTapNodeRenderers = {
  [TipTapNodeType.doc]: (node, props) => node.content && renderTipTapNode(node.content, props),
  [TipTapNodeType.heading]: (node, props) => <Heading node={node} {...props} />,
  [TipTapNodeType.paragraph]: (node, props) => <Paragraph node={node} {...props} />,
  [TipTapNodeType.text]: (node) => <RichText node={node} />
};

function renderTipTapNode(node: Node | Node[], props?: TypographyProps) {
  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const renderer = renderers[child.type] as NodeRenderer;
      return <React.Fragment key={index}>{renderer ? renderer(child, props) : null}</React.Fragment>;
    });
  } else {
    const renderer = renderers[node.type] as NodeRenderer;
    return renderer ? renderer(node, props) : null;
  }
}

export default renderTipTapNode;
