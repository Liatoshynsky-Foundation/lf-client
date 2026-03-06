import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

// --- Components ---
import ArtistrySection from '~/components/blocks/artistry-section/ArtistrySection';
import {
  artistrySectionData,
  artistrySectionTextContent
} from '~/components/blocks/artistry-section/ArtistrySection.data';
import BiographySection from '~/components/blocks/BiographySection/BiographySection';
import { ctaHref, ctaLabel, spanText, text, title } from '~/components/blocks/BiographySection/BiographySection.data';
import CooperationSection from '~/components/blocks/cooperation-section/CooperationSection';
import { cooperationSectionData } from '~/components/blocks/cooperation-section/CooperationSection.data';
import HeroSection from '~/components/blocks/home-page-hero/HeroSection';
import { heroQuote, heroQuoteSource, playbackButton } from '~/components/blocks/home-page-hero/HeroSection.data';
import LiatoshynskyOffice from '~/components/blocks/Liatoshynsky-office/LiatoshynskyOffice';
import NewsSection from '~/components/blocks/news-section/NewsSection';
import { newsSectionData, newsSectionTextContent } from '~/components/blocks/news-section/NewsSection.data';
import EventSection from '~/components/events-section/EventSection';
import {
  eventsCtaLabel,
  eventsMainText,
  eventsPublishDateLabel,
  eventsRegLabel,
  eventsTitle,
  eventsViewLabel,
  mockEventsData
} from '~/components/events-section/EventSection.data';
import FoundationSection from '~/components/foundation-section/FoundationSection';
import {
  foundationButtonText,
  foundationParagraph1,
  foundationParagraph2,
  foundationSectionData
} from '~/components/foundation-section/FoundationSection.data';
import UnderDevelopment from '~/components/under-development/UnderDevelopment';

// --- Types ---
import { Language } from '~/types/types/language';
import { isError, UnwrapResult } from '~/types/types/result';
import { createSeoMeta } from '~/utils/createSeoMeta';
import { isProductionMode } from '~/utils/isProductionMode';

// --- Layouts & Utils ---
import { PageNotFound } from '~/[lang]/[...unknown-route]/page-not-found/PageNotFound';
import MainLayout from '~/layouts/main-layout/MainLayout';
import { ErrorPageFactory } from '~/lib/utils/errorPageFactory';
import { resolvePageData } from '~/services/pages-data/resolvePageData';
import { IntroAnimation } from '~/shared/components/blocks/home-page-hero/animation';

export async function generateMetadata({ params }: Language): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta.pages.home');

  return createSeoMeta({
    title: t('title'),
    description: t('description'),
    url: '/',
    locale: lang
  });
}

export default async function Home({ params }: Readonly<Language>) {
  const { lang } = await params;
  setRequestLocale(lang);

  if (isProductionMode()) {
    return <UnderDevelopment />;
  }

  const [pageResult, t] = await Promise.all([
    resolvePageData('about-us', lang),
    getTranslations('home.liatoshynskyOffice')
  ]);

  if (isError(pageResult)) {
    return ErrorPageFactory(pageResult.error);
  }

  const page = UnwrapResult(pageResult);

  if (!page) {
    return <PageNotFound />;
  }

  const liatochynskyBlocks = page.blocks;

  const eventsForCurrentLang = mockEventsData.events.map((event) => ({
    id: event.id,
    image: event.image,
    regLink: event.regLink,
    date: event.date[lang],
    title: event.title[lang],
    description: event.description[lang],
    publishDate: event.publishDate[lang]
  }));

  const blocks = {
    HeroSection: {
      heroQuote: heroQuote[lang],
      heroQuoteSource: heroQuoteSource[lang],
      playbackButton: {
        startPlayback: playbackButton.startPlayback[lang],
        stopPlayback: playbackButton.stopPlayback[lang]
      }
    },
    FoundationSection: {
      imageSrc: foundationSectionData.imageSrc,
      caption: foundationSectionData.caption,
      paragraph1: foundationParagraph1[lang],
      paragraph2: foundationParagraph2[lang],
      buttonText: foundationButtonText[lang],
      buttonLink: foundationSectionData.buttonLink
    },
    BiographySection: {
      title: title,
      spanText: spanText,
      text: text,
      ctaLabel: ctaLabel,
      ctaHref: ctaHref
    },
    ArtistrySection: {
      subTitle: artistrySectionData.subTitle,
      textContent: artistrySectionTextContent,
      buttonText: artistrySectionData.buttonText,
      buttonLink: artistrySectionData.buttonLink
    },
    EventSection: {
      title: eventsTitle[lang],
      text: eventsMainText[lang],
      ctaLabel: eventsCtaLabel[lang],
      ctaHref: '/events',
      publishDateLabes: eventsPublishDateLabel[lang],
      viewLabel: eventsViewLabel[lang],
      regLabel: eventsRegLabel[lang],
      events: eventsForCurrentLang
    },
    NewsSection: {
      title: newsSectionData.title,
      textContent: newsSectionTextContent,
      buttonText: newsSectionData.buttonText,
      buttonLink: newsSectionData.buttonLink
    },
    CooperationSection: {
      title: cooperationSectionData.title,
      textContent: cooperationSectionData.textContent,
      buttonText: cooperationSectionData.buttonText,
      buttonLink: cooperationSectionData.buttonLink,
      partners: cooperationSectionData.partners
    }
  };

  return (
    <MainLayout>
      {blocks.HeroSection && (
        <IntroAnimation>
          <HeroSection
            heroQuote={blocks.HeroSection.heroQuote}
            heroQuoteSource={blocks.HeroSection.heroQuoteSource}
            playbackButton={blocks.HeroSection.playbackButton}
          />
        </IntroAnimation>
      )}

      {blocks.FoundationSection && (
        <FoundationSection
          imageSrc={blocks.FoundationSection.imageSrc}
          caption={blocks.FoundationSection.caption}
          paragraph1={blocks.FoundationSection.paragraph1}
          paragraph2={blocks.FoundationSection.paragraph2}
          buttonText={blocks.FoundationSection.buttonText}
          buttonLink={blocks.FoundationSection.buttonLink}
        />
      )}

      {blocks.BiographySection && (
        <BiographySection
          title={blocks.BiographySection.title}
          spanText={blocks.BiographySection.spanText}
          text={blocks.BiographySection.text}
          ctaLabel={blocks.BiographySection.ctaLabel}
          ctaHref={blocks.BiographySection.ctaHref}
        />
      )}

      {blocks.ArtistrySection && (
        <ArtistrySection
          subTitle={blocks.ArtistrySection.subTitle}
          textContent={blocks.ArtistrySection.textContent}
          buttonText={blocks.ArtistrySection.buttonText}
          buttonLink={blocks.ArtistrySection.buttonLink}
        />
      )}

      {blocks.EventSection && (
        <EventSection
          title={blocks.EventSection.title}
          text={blocks.EventSection.text}
          events={blocks.EventSection.events}
          ctaHref={blocks.EventSection.ctaHref}
          ctaLabel={blocks.EventSection.ctaLabel}
          publishDateLabel={blocks.EventSection.publishDateLabes}
          viewLabel={blocks.EventSection.viewLabel}
          regLabel={blocks.EventSection.regLabel}
        />
      )}

      {blocks.NewsSection && (
        <NewsSection
          title={blocks.NewsSection.title}
          textContent={blocks.NewsSection.textContent}
          buttonText={blocks.NewsSection.buttonText}
          buttonLink={blocks.NewsSection.buttonLink}
          locale={lang}
        />
      )}

      {liatochynskyBlocks.LiatoshynskyOffice && (
        <LiatoshynskyOffice data={liatochynskyBlocks.LiatoshynskyOffice} t={t} />
      )}

      {blocks.CooperationSection && (
        <CooperationSection
          title={blocks.CooperationSection.title}
          textContent={blocks.CooperationSection.textContent}
          buttonText={blocks.CooperationSection.buttonText}
          buttonLink={blocks.CooperationSection.buttonLink}
          partners={blocks.CooperationSection.partners}
        />
      )}
    </MainLayout>
  );
}
