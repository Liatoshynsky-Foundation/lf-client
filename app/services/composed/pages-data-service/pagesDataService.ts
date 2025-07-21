import { Locale } from 'next-intl';

import { PageServiceDeps } from '~/domain/services/pagesService.type';
import { blockTransformers } from '~/services/strategy/blockStrategy/blockTransformStrategy';
import { AnyBlock } from '~/validators/page/blocks/anyBlock.schema';

export const createPagesDataService = ({ pagesDataRepository }: PageServiceDeps) => ({
  async getPageData(slug: string, locale: Locale) {
    const pageData = await pagesDataRepository.getPageData(slug);
    if (!pageData) return null;

    return pageData.blocks.reduce(
      (acc, block) => {
        const { componentName } = block;
        const transformer = blockTransformers[componentName];

        if (transformer) {
          acc[componentName] = transformer(block, locale);
        } else {
          acc[componentName] = block;
        }
        return acc;
      },
      {} as Record<string, AnyBlock>
    );
  }
});
