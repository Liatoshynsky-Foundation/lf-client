import React from 'react';

import { Heading } from '~/components/tip-tap-node/extentions/Heading';
import { Paragraph } from '~/components/tip-tap-node/extentions/Paragraph';
import { RichText } from '~/components/tip-tap-node/extentions/RichText';

import { TipTapNodeType } from '~/types/enums/common.enums';
import { Node, TipTapNodeRenderers } from '~/types/types/common.types';

export const renderers: TipTapNodeRenderers = {
  [TipTapNodeType.doc]: (node) => node.content && renderTipTapNode(node.content),
  [TipTapNodeType.heading]: (node) => <Heading node={node} />,
  [TipTapNodeType.paragraph]: (node) => <Paragraph node={node} />,
  [TipTapNodeType.text]: (node) => <RichText node={node} />
};

function renderTipTapNode(node: Node | Node[]) {
  if (Array.isArray(node)) {
    return node.map((child, index) => {
      const renderer = renderers[child.type] as (n: Node) => React.ReactNode;
      return <React.Fragment key={index}>{renderer ? renderer(child) : null}</React.Fragment>;
    });
  } else {
    const renderer = renderers[node.type] as (n: Node) => React.ReactNode;
    return renderer ? renderer(node) : null;
  }
}

export default renderTipTapNode;
