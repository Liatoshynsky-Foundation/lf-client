import { render, screen } from '@testing-library/react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import type { VolunteerDonationProps } from '~/components/blocks/volunteer-donation/VolunteerDonation';
import type { WarCarouselSectionProps } from '~/components/blocks/war-carousel/WarCarouselSection';
import type { WarInfoSectionProps } from '~/components/blocks/war-info/WarInfoSection';

import WarInUkraine, { generateMetadata } from './page';
import type { WarInUkrainePage } from '~/types/page/pagesBase.type';
import { createSeoMeta } from '~/utils/createSeoMeta';

import type { PrincipleOfHopeProps } from '~/shared/components/blocks/principle-of-hope/PrincipleOfHope';
import type { YermolenkoLinksProps } from '~/shared/components/blocks/yermolenko-links/YermolenkoLinks';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((data) => data)
}));

jest.mock('~/components/blocks/war-info/WarInfoSection', () => ({
  __esModule: true,
  default: (props: WarInfoSectionProps) => <div data-testid="war-info">{JSON.stringify(props.data)}</div>
}));

jest.mock('~/components/blocks/war-carousel/WarCarouselSection', () => ({
  __esModule: true,
  default: (props: WarCarouselSectionProps) => <div data-testid="war-carousel">{JSON.stringify(props.data)}</div>
}));

jest.mock('~/components/blocks/volunteer-donation/VolunteerDonation', () => ({
  __esModule: true,
  default: (props: VolunteerDonationProps) => <div data-testid="volunteer-donation">{JSON.stringify(props.data)}</div>
}));

jest.mock('~/shared/components/blocks/principle-of-hope/PrincipleOfHope', () => ({
  __esModule: true,
  default: (props: PrincipleOfHopeProps) => <div data-testid="principle-of-hope">{JSON.stringify(props.data)}</div>
}));

jest.mock('~/shared/components/blocks/yermolenko-links/YermolenkoLinks', () => ({
  __esModule: true,
  default: (props: YermolenkoLinksProps) => <div data-testid="yermolenko-links">{JSON.stringify(props.data)}</div>
}));

interface MockBlockRendererProps {
  blockId: string;
  blocks: WarInUkrainePage['blocks'];
  rendererMap: Record<string, React.ElementType>;
  namesMap: Record<string, string>;
}

jest.mock('~/shared/components/blocks/block-renderer/BlockRenderer', () => ({
  BlockRenderer: ({ blockId, blocks, rendererMap, namesMap }: MockBlockRendererProps) => {
    const key = namesMap[blockId];
    const Renderer = rendererMap[key];
    return Renderer ? <Renderer blocks={blocks} /> : null;
  }
}));

interface MockPageBuilderProps {
  renderBlock: (args: {
    blockId: string;
    blocks: WarInUkrainePage['blocks'];
    uniqueRenderKey: string;
  }) => React.ReactNode;
}

jest.mock('~/shared/components/page-builder/PageBuilder', () => ({
  __esModule: true,
  default: ({ renderBlock }: MockPageBuilderProps) => {
    const blockIds = [
      'war-info',
      'principle-of-hope',
      'war-carousel',
      'yermolenko-links',
      'volunteer-donation',
      'unknown-block'
    ];
    const blocks = {
      WarInfo: { title: 'War info data' } as Partial<WarInUkrainePage['blocks']['WarInfo']>,
      PrincipleOfHope: { buttonText: 'Hope' } as Partial<WarInUkrainePage['blocks']['PrincipleOfHope']>,
      WarCarousel: { images: [] } as Partial<WarInUkrainePage['blocks']['WarCarousel']>,
      YermolenkoLinks: { buttonText: 'Links' } as Partial<WarInUkrainePage['blocks']['YermolenkoLinks']>,
      VolunteerDonation: { title: 'Donate' } as Partial<WarInUkrainePage['blocks']['VolunteerDonation']>
    } as WarInUkrainePage['blocks'];

    return (
      <div data-testid="page-builder">
        {blockIds.map((blockId, i) => (
          <React.Fragment key={blockId}>{renderBlock({ blockId, blocks, uniqueRenderKey: `key-${i}` })}</React.Fragment>
        ))}
      </div>
    );
  }
}));

describe('WarInUkraine page', () => {
  const mockParams = Promise.resolve({ lang: 'uk' as const });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateMetadata', () => {
    it('should build SEO metadata from translations for the given locale', async () => {
      const metadata = await generateMetadata({ params: mockParams });

      expect(setRequestLocale).toHaveBeenCalledWith('uk');
      expect(getTranslations).toHaveBeenCalledWith('meta.pages.warInUkraine');
      expect(createSeoMeta).toHaveBeenCalledWith({
        title: 'title',
        description: 'description',
        url: expect.any(String),
        locale: 'uk'
      });
      expect(metadata).toEqual({
        title: 'title',
        description: 'description',
        url: expect.any(String),
        locale: 'uk'
      });
    });
  });

  describe('default export', () => {
    it('should render every mapped block through the BlockRenderer', async () => {
      const element = await WarInUkraine({ params: mockParams });
      render(element);

      expect(screen.getByTestId('war-info')).toHaveTextContent('War info data');
      expect(screen.getByTestId('principle-of-hope')).toHaveTextContent('Hope');
      expect(screen.getByTestId('war-carousel')).toBeInTheDocument();
      expect(screen.getByTestId('yermolenko-links')).toHaveTextContent('Links');
      expect(screen.getByTestId('volunteer-donation')).toHaveTextContent('Donate');
    });

    it('should render nothing for a block id with no matching renderer', async () => {
      const element = await WarInUkraine({ params: mockParams });
      const { container } = render(element);

      expect(container.querySelectorAll('[data-testid]')).toHaveLength(6);
    });
  });
});
