import { ReactNode } from 'react';

import { Mark, MultiLangNode, TipTapMarkRenderers } from '~/types/types/tiptap.types';

type RenderMultiLangText = (renderers: TipTapMarkRenderers, node: MultiLangNode, locale: string) => ReactNode;

const renderMultiLangText: RenderMultiLangText = (finalMarkRenderers, node, locale) => {
  let result = node.text[locale] as ReactNode;

  node.marks?.forEach((mark) => {
    const wrap = finalMarkRenderers[mark.type] as (n: ReactNode, m: Mark) => ReactNode;
    if (wrap) {
      result = wrap(result, mark);
    }
  });

  return result;
};

export default renderMultiLangText;
