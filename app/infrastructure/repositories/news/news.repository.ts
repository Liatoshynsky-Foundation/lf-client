import { NewsStatus } from '~/domain/dto/news.dto';
import dbConnect from '~/infrastructure/db/connect';
import NewsModel from '~/infrastructure/models/news/news.model';
import { ArraySchema } from '~/validators/constants';
import { newsListItemSchema, newsSchema } from '~/validators/news.schema';

const newsRepository = {
  async getAllPublishedNews() {
    await dbConnect();

    const news = await NewsModel.find({ status: NewsStatus.Published })
      .select('_id publishedAt newsDate title description slug coverImage meta')
      .sort({ publishedAt: -1 })
      .lean();

    return ArraySchema(newsListItemSchema).parse(news);
  },

  async getNewsBySlug(slug: string) {
    await dbConnect();

    const news = await NewsModel.findOne({ slug }).lean();

    if (!news) return null;

    return newsSchema.parse(news);
  }
};

function newNewsRepository(): typeof newsRepository {
  return newsRepository;
}

export default newNewsRepository;
