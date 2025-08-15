import React from 'react';

import TextLink from './TextLink';
import { TipTapMarkType, TipTapNodeType } from '~/types/enums/common.enums';
import { Mark, Node, TipTapMarkRenderers } from '~/types/types/common.types';

interface TextNodeProps {
  node: Node;
}

const markRenderers: TipTapMarkRenderers = {
  [TipTapMarkType.bold]: (children) => <strong>{children}</strong>,
  [TipTapMarkType.italic]: (children) => <em>{children}</em>,
  [TipTapMarkType.underline]: (children) => <u>{children}</u>,
  [TipTapMarkType.link]: (children, mark) => (
    <TextLink href={mark.attrs.href || '#'} underline="hover">
      {children}
    </TextLink>
  )
};

export const RichText: React.FC<TextNodeProps> = ({ node }) => {
  if (node.type !== TipTapNodeType.text) return null;

  let content = (node.text ?? '') as React.ReactNode;

  if (node.marks) {
    content = node.marks.reduce((acc, mark) => {
      const wrap = markRenderers[mark.type] as (n: React.ReactNode, m: Mark) => React.ReactNode;
      return wrap ? wrap(acc, mark) : acc;
    }, content);
  }

  return <>{content}</>;
};
