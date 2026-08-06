import { NewsStatus } from '~/domain/dto/news.dto';
import dbConnect from '~/infrastructure/db/connect';
import NewsModel from '~/infrastructure/models/news/news.model';

const newsRepository = {
  async getAllPublishedNews() {
    await dbConnect();

    const news = await NewsModel.find({ status: NewsStatus.Published })
      .select('_id publishedAt newsDate title description slug coverImage meta')
      .sort({ publishedAt: -1 })
      .lean();

    return news ?? [];
  },

  async getNewsBySlug(slug: string) {
    await dbConnect();

    return await NewsModel.findOne({ slug }).lean();
  }
};

function newNewsRepository(): typeof newsRepository {
  return newsRepository;
}

export default newNewsRepository;
