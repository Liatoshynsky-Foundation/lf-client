import mongoose from 'mongoose';
import { FoundationInfo } from './foundationInfoBase';

export const PublicInfo =
  FoundationInfo.discriminators?.['public-info'] ||
  FoundationInfo.discriminator(
    'public-info',
    new mongoose.Schema(
      {
        copyright: {
          uk: { type: String, required: true },
          en: { type: String, required: true }
        },
        links: [
          {
            label: {
              uk: { type: String, required: true },
              en: { type: String, required: true }
            },
            href: { type: String, required: true }
          }
        ]
      },
      { _id: false, timestamps: true }
    )
  );
