import { Types } from 'mongoose';

import dbConnect from '~/infrastructure/db/connect';
import AssetModel from '~/infrastructure/models/assets/asset.model';

const assetRepository = {
  async getMainComposition() {
    await dbConnect();

    const asset = await AssetModel.findOne({ type: 'audio', isMainComposition: true })
      .select('_id filename originalname url')
      .lean();

    if (!asset) return null;

    return {
      _id: (asset._id as Types.ObjectId).toString(),
      filename: asset.filename,
      originalname: asset.originalname,
      url: asset.url
    };
  }
};

function newAssetRepository(): typeof assetRepository {
  return assetRepository;
}

export default newAssetRepository;
