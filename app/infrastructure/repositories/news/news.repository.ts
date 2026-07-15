import { NewsStatus } from '~/domain/dto/news.dto';
import dbConnect from '~/infrastructure/db/connect';
import NewsModel from '~/infrastructure/models/news/news.model';
import { parseArraySafely } from '~/lib/utils/parseArraySafely';
import { newsListItemSchema, newsSchema } from '~/validators/news.schema';

const newsRepository = {
  async getAllPublishedNews() {
    await dbConnect();

    const news = await NewsModel.find({ status: NewsStatus.Published })
      .select('_id publishedAt newsDate title description slug coverImage meta')
      .sort({ publishedAt: -1 })
      .lean();

    if (!news) {
      return [];
    }

    return parseArraySafely(news, newsListItemSchema);
  },

  async getNewsBySlug(slug: string) {
    await dbConnect();

    const news = await NewsModel.findOne({ slug, status: NewsStatus.Published }).lean();

    if (!news) return null;

    return newsSchema.parse(news);
  }
};

function newNewsRepository(): typeof newsRepository {
  return newsRepository;
}

export default newNewsRepository;
