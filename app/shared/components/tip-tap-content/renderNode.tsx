import { Fragment, ReactNode } from 'react';

import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapNode, TipTapNodeRenderers } from '~/types/types/tiptap.types';

type RenderNode = (renderers: TipTapNodeRenderers, node: TipTapNode) => ReactNode;

const mapChildren = (renderers: TipTapNodeRenderers, content: TipTapNode[]): ReactNode[] =>
  content.map((n, idx) => <Fragment key={`${n.type}-${idx}`}>{renderNode(renderers, n)}</Fragment>);

const renderNode: RenderNode = (renderers, node) => {
  switch (node.type) {
    case TipTapNodeTypes.doc: {
      const children = mapChildren(renderers, node.content);
      return renderers.doc(children, node);
    }

    case TipTapNodeTypes.heading: {
      const children = node.content ? mapChildren(renderers, node.content) : null;
      return renderers.heading(children, node);
    }

    case TipTapNodeTypes.paragraph: {
      const children = node.content ? mapChildren(renderers, node.content) : null;
      return renderers.paragraph(children, node);
    }

    case TipTapNodeTypes.text:
      return renderers.text(node);

    default: {
      return null;
    }
  }
};

export default renderNode;
