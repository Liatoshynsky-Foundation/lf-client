import { ReactNode } from 'react';

import { Mark, TextNode, TipTapMarkRenderers } from '~/types/types/tiptap.types';

type RenderText = (renderers: TipTapMarkRenderers, node: TextNode) => ReactNode;

const renderText: RenderText = (finalMarkRenderers, node) => {
  let result = node.text as ReactNode;

  node.marks?.forEach((mark) => {
    const wrap = finalMarkRenderers[mark.type] as (n: ReactNode, m: Mark) => ReactNode;
    if (wrap) {
      result = wrap(result, mark);
    }
  });

  return result;
};

export default renderText;
