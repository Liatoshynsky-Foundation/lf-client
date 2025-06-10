import mongoose from 'mongoose';

import { FoundationInfo } from './foundationInfoBase';

export const BrandingInfo =
  FoundationInfo.discriminators?.['branding-info'] ??
  FoundationInfo.discriminator(
    'branding-info',
    new mongoose.Schema(
      {
        foundationName: {
          uk: { type: String, required: true },
          en: { type: String, required: true }
        },
        supportButtonLink: { type: String, required: true }
      },
      { _id: false, timestamps: true }
    )
  );
