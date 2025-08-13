import { FrontendBlock, FrontendElement, FrontendPage, NodeVisitor } from '~/types/pages';
import { traverseNode, urlVisitor } from '~/utils/traversNode';

import { Page as PageType } from '~/validators/page2/page.schema';
import { Doc as TipTapDoc } from '~/validators/page2/tiptap.schema';

export function transformPageForFrontend(page: PageType, lang: 'uk' | 'en'): FrontendPage | null {
  if (!page) {
    return null;
  }
  const visitorsToApply: NodeVisitor[] = [urlVisitor];

  const transformedBlocks: FrontendBlock[] = page.blocks.map((block) => {
    const transformedElements: FrontendElement[] = block.elements.map((element) => {
      const singleLanguageContent = element.content ? element.content[lang] : undefined;

      if (
        !singleLanguageContent ||
        singleLanguageContent.type !== 'doc' ||
        !Array.isArray(singleLanguageContent.content)
      ) {
        return {
          _id: element._id,
          elementType: element.elementType,
          content: { type: 'doc', content: [] }
        };
      }

      const processedContent: TipTapDoc = {
        ...singleLanguageContent,
        content: singleLanguageContent.content.map((rootNode) => traverseNode(rootNode, visitorsToApply))
      };

      return {
        _id: element._id,
        elementType: element.elementType,
        content: processedContent
      };
    });

    return {
      _id: block._id,
      elements: transformedElements
    };
  });

  return {
    ...page,
    title: page.title ? page.title[lang] : '',
    blocks: transformedBlocks
  };
}
