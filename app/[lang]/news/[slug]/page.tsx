import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getLocale, setRequestLocale } from 'next-intl/server';

import { ArticleDetail } from '~/components/blocks/article-detail/ArticleDetail';
import type { BlockNoteBlock } from '~/components/blocks/article-detail/BlockNoteContent';

import { createRequestContainer } from '~/di/container';
import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import { formatIsoDateToDdMmYy } from '~/lib/utils/parseIsoDate';

type NewsDetailPageParams = { lang: Locale; slug: string };
type NewsDetailPageProps = { params: Promise<NewsDetailPageParams> };

export async function generateMetadata({ params }: Readonly<NewsDetailPageProps>): Promise<Metadata> {
  const { lang, slug } = await params;
  setRequestLocale(lang);

  const container = createRequestContainer();
  const newsService = container.resolve('newsService');
  const news = await newsService.getNewsBySlug(slug, lang);

  if (!news) {
    return createSeoMeta({
      title: 'News not found',
      description: '',
      url: `/news/${slug}`,
      locale: lang
    });
  }

  return createSeoMeta({
    title: news.title,
    description: news.description,
    url: `/news/${slug}`,
    imageUrl: news.coverImage.src,
    locale: lang
  });
}

export default async function NewsDetailPage({ params }: Readonly<NewsDetailPageProps>) {
  const { lang, slug } = await params;
  setRequestLocale(lang);
  const locale = await getLocale();

  const container = createRequestContainer();
  const newsService = container.resolve('newsService');

  const news = await newsService.getNewsBySlug(slug, locale as Locale);

  if (!news) notFound();

  const displayDate = news.publishedAt ? (formatIsoDateToDdMmYy(news.publishedAt) ?? '') : '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blocks = ((news.content as any)?.content?.blocks ?? []) as BlockNoteBlock[];

  return <ArticleDetail lang={lang} date={displayDate} title={news.title} blocks={blocks} />;
}
