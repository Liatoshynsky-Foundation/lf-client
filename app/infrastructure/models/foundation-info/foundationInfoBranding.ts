import mongoose from 'mongoose';

import { FoundationInfo } from './foundationInfoBase';

import { translatedFieldSchema } from '~/infrastructure/models/commonSchemas';

export const BrandingInfo =
  FoundationInfo.discriminators?.['branding-info'] ??
  FoundationInfo.discriminator(
    'branding-info',
    new mongoose.Schema(
      {
        foundationName: translatedFieldSchema,
        supportButtonLink: { type: String, required: true }
      },
      { _id: false, timestamps: true }
    )
  );
