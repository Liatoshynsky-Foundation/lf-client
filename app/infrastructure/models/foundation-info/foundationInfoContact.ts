import mongoose from 'mongoose';

import { FoundationInfo } from './foundationInfoBase';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: String, required: true }
  },
  { _id: false }
);

export const ContactInfo =
  FoundationInfo.discriminators?.['contact-info'] ??
  FoundationInfo.discriminator(
    'contact-info',
    new mongoose.Schema({
      phone: String,
      email: String,
      socialLinks: [socialLinkSchema]
    })
  );
