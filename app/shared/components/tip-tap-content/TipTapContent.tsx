import { getBold, getItalic, getLink, getUnderline } from '~/components/tip-tap-content/marks';
import { getDoc, getHeading, getMultiLangText, getParagraph, getText } from '~/components/tip-tap-content/nodes';
import renderNode from '~/components/tip-tap-content/renderNode';

import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc, TipTapMarkRenderers, TipTapNodeRenderers } from '~/types/types/tiptap.types';

interface TipTapContentProps {
  data: TipTapDoc;
  nodeRenderers?: Partial<TipTapNodeRenderers>;
  markRenderers?: Partial<TipTapMarkRenderers>;
  locale?: string;
}

const TipTapContent: React.FC<TipTapContentProps> = ({ data, nodeRenderers, markRenderers, locale = 'en' }) => {
  const TipTapDefaultMarkRenderers: TipTapMarkRenderers = {
    [TipTapMarkType.bold]: getBold,
    [TipTapMarkType.italic]: getItalic,
    [TipTapMarkType.underline]: getUnderline,
    [TipTapMarkType.link]: getLink
  };

  const finalMarkRenderers: TipTapMarkRenderers = { ...TipTapDefaultMarkRenderers, ...markRenderers };

  const TipTapDefaultNodeRenderers: TipTapNodeRenderers = {
    [TipTapNodeTypes.doc]: getDoc,
    [TipTapNodeTypes.heading]: getHeading,
    [TipTapNodeTypes.paragraph]: getParagraph,
    [TipTapNodeTypes.text]: getText(finalMarkRenderers),
    [TipTapNodeTypes.multiLangText]: getMultiLangText(finalMarkRenderers, locale)
  };

  const finalNodeRenderers: TipTapNodeRenderers = { ...TipTapDefaultNodeRenderers, ...nodeRenderers };

  return renderNode(finalNodeRenderers, data);
};

export default TipTapContent;
