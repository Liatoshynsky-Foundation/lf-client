import React from 'react';

import { TipTapMarkType, TipTapNodeType } from '~/types/enums/common.enums';
import { Node, TipTapMarkRenderers } from '~/types/types/common.types';

interface TextNodeProps {
  node: Node;
}

const markRenderers: TipTapMarkRenderers = {
  [TipTapMarkType.bold]: (children) => <strong>{children}</strong>,
  [TipTapMarkType.italic]: (children) => <em>{children}</em>,
  [TipTapMarkType.underline]: (children) => <em>{children}</em>,
  [TipTapMarkType.link]: (children) => <a>{children}</a>
};

export const RichText: React.FC<TextNodeProps> = ({ node }) => {
  if (node.type !== TipTapNodeType.text) return null;

  let content = (node.text ?? '') as React.ReactNode;

  if (node.marks) {
    content = node.marks.reduce((acc, mark) => {
      const wrap = markRenderers[mark.type];
      return wrap ? wrap(acc) : acc;
    }, content);
  }

  return <>{content}</>;
};
