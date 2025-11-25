import { Box } from '@mui/material';
import { useLocale } from 'next-intl';
import { Fragment, ReactNode } from 'react';

import { biographyContentStyles, imageLeftPossition } from './BiographyContent.styles';
import type {
  BiographyContentBlock,
  BiographyContentProps,
  ChronologyList,
  ExcerptBlockItem,
  FullWidthImage,
  OnlyImageBlock
} from '~/types/page/biography.types';
import { ContentType, tiptapToPlainText } from '~/types/page/biography.types';

import ContentBlock from '~/shared/components/design-system/all-components/content-block/ContentBlock';
import ExcerptBlock from '~/shared/components/excerpt-block/ExcerptBlock';
import ImageWithCaption from '~/shared/components/image-with-caption/ImageWithCaption';
import YearWithLine from '~/shared/components/year-with-line/YearWithLine';

export function BiographyContent({ data }: BiographyContentProps) {
  const locale = useLocale();

  function renderChrolologyList(item: ChronologyList, key: string): ReactNode {
    return (
      <Fragment key={key}>
        {item.additionalImage && (
          <Box sx={imageLeftPossition(item.additionalImage.size)}>
            {item.additionalImage.rectangleTopLeftCorner && <Box sx={biographyContentStyles.imageAccentRectangle} />}

            <ImageWithCaption
              src={item.additionalImage.src}
              alt={tiptapToPlainText(item.additionalImage.alt[locale])}
              caption={tiptapToPlainText(item.additionalImage.caption[locale])}
              containerSx={biographyContentStyles.imageContainer}
              captionSx={biographyContentStyles.leftImageCaption}
              sizes={biographyContentStyles[item.additionalImage.size]}
              dataTestId="BiographyContent-chronologyList-imageWithCaption"
            />
          </Box>
        )}

        <Box sx={biographyContentStyles.chronologyListColumn} data-testid="BiographyContent-chronologyList">
          {item.listItems.map((listItem, index) => (
            <Box key={index} sx={{ width: '100' }}>
              <ContentBlock
                containerSx={biographyContentStyles.chronologyItemContainer}
                textSx={biographyContentStyles.ChronologyListItemText}
                description={listItem.description[locale]}
                dataTestId="BiographyContent-chronologyListItem"
              />
            </Box>
          ))}
        </Box>
      </Fragment>
    );
  }

  function renderExcerptBlock(item: ExcerptBlockItem, key: string): ReactNode {
    return (
      <Box key={key} sx={biographyContentStyles.excerptBlock} data-testid="BiographyContent-excerptBlockItem">
        <ExcerptBlock
          quote={tiptapToPlainText(item.quote.quoteText[locale])}
          source={tiptapToPlainText(item.quote.sourceText[locale])}
          dataTestId="BiographyContent-excerptBlock"
        />
      </Box>
    );
  }

  function renderOnlyImageBlock(item: OnlyImageBlock, key: string): ReactNode {
    if (item.additionalImage) {
      return (
        <Fragment key={key}>
          <Box sx={biographyContentStyles.onlyImageLeft} data-testid="BiographyContent-onlyImageBlock-left">
            <ImageWithCaption
              src={item.additionalImage.src}
              alt={tiptapToPlainText(item.additionalImage.alt[locale])}
              caption={tiptapToPlainText(item.additionalImage.caption[locale])}
              captionSx={biographyContentStyles.leftImageCaption}
              containerSx={biographyContentStyles.imageContainer}
              sizes={biographyContentStyles[item.additionalImage.size]}
              dataTestId="BiographyContent-OnlyImageBlock-additionalImage"
            />
          </Box>

          <Box sx={biographyContentStyles.onlyImageRight} data-testid="BiographyContent-onlyImageBlock-right">
            {item.mainImage.rectangleTopLeftCorner && <Box sx={biographyContentStyles.imageAccentRectangle} />}
            <ImageWithCaption
              src={item.mainImage.src}
              alt={tiptapToPlainText(item.mainImage.alt[locale])}
              caption={tiptapToPlainText(item.mainImage.caption[locale])}
              captionSx={biographyContentStyles.rigthImageCaption}
              containerSx={biographyContentStyles.imageContainer}
              imageSx={{ width: '100%' }}
              sizes={biographyContentStyles[item.mainImage.size]}
              dataTestId="BiographyContent-OnlyImageBlock-mainImage"
            />
          </Box>
        </Fragment>
      );
    }

    return (
      <Box key={key} sx={biographyContentStyles.onlyImageRight} data-testid="BiographyContent-onlyImageBlock-single">
        {item.mainImage.rectangleTopLeftCorner && <Box sx={biographyContentStyles.imageAccentRectangle} />}
        <ImageWithCaption
          src={item.mainImage.src}
          alt={tiptapToPlainText(item.mainImage.alt[locale])}
          caption={tiptapToPlainText(item.mainImage.caption[locale])}
          containerSx={biographyContentStyles.imageContainer}
          sizes={biographyContentStyles[item.mainImage.size]}
          captionSx={biographyContentStyles.rigthImageCaption}
          imageSx={{ width: '100%' }}
          dataTestId="BiographyContent-OnlyImageBlock-mainImage"
        />
      </Box>
    );
  }

  function renderFullWidthImageBlock(item: FullWidthImage, key: string): ReactNode {
    if (!item.image) return null;

    return (
      <Box key={key} sx={biographyContentStyles.fullWidthBlock} data-testid="BiographyContent-fullWidthImage">
        <ImageWithCaption
          src={item.image.src}
          alt={tiptapToPlainText(item.image.alt[locale])}
          caption={tiptapToPlainText(item.image.caption[locale])}
          sizes={biographyContentStyles.fullWidth}
          containerSx={biographyContentStyles.fullWidthContainer}
          imageSx={biographyContentStyles.fullWidthImage}
          captionSx={biographyContentStyles.rigthImageCaption}
          align="right"
          dataTestId="BiographyContent-fullWidthImage-imageWithCaption"
        />
      </Box>
    );
  }

  function renderBlock(block: BiographyContentBlock, blockIndex: number) {
    const yearNumber = block.yearTitle && !Number.isNaN(Number(block.yearTitle)) ? Number(block.yearTitle) : null;

    return (
      <Fragment key={block.yearTitle ?? `block-${blockIndex}`}>
        {yearNumber && <YearWithLine year={yearNumber} />}

        {block.items.map((item, itemIndex) => {
          const key = `${item.type}-${blockIndex}-${itemIndex}`;

          switch (item.type) {
            case ContentType.ChronologyList:
              return renderChrolologyList(item, key);
            case ContentType.ExcerptBlockItem:
              return renderExcerptBlock(item, key);
            case ContentType.OnlyImageBlock:
              return renderOnlyImageBlock(item, key);
            case ContentType.FullWidthImage:
              return renderFullWidthImageBlock(item, key);
            default:
              return null;
          }
        })}
      </Fragment>
    );
  }

  return (
    <Box sx={biographyContentStyles.mainContainer} data-testid="BiographyContent">
      {data.map((block, index) => renderBlock(block, index))}
    </Box>
  );
}
