import mongoose from 'mongoose';

import { FoundationInfo } from './foundationInfoBase';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

export const PublicInfo =
  FoundationInfo.discriminators?.['public-info'] ??
  FoundationInfo.discriminator(
    'public-info',
    new mongoose.Schema(
      {
        copyright: translatedFieldSchema,
        links: [
          {
            label: translatedFieldSchema,
            href: { type: String, required: true }
          }
        ]
      },
      { _id: false, timestamps: true }
    )
  );
