import mongoose from 'mongoose';

const MusicItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    dateUploaded: { type: Date, default: Date.now },
    isFree: { type: Boolean, default: false }
  },
  { _id: false }
);

const localizedFieldSchema = new mongoose.Schema(
  {
    uk: { type: String, required: true },
    en: { type: String, required: true }
  },
  {
    _id: false
  }
);

const songSchema = new mongoose.Schema(
  {
    opusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Opus' },
    name: { localizedFieldSchema },
    year: { type: Number },
    genre: { localizedFieldSchema },
    audioAvailable: { type: Boolean, default: true },
    sheetAvailable: { type: Boolean, default: true },
    sheetMusic: [MusicItemSchema],
    audios: [MusicItemSchema]
  },
  { timestamps: true }
);

export const Compositions = mongoose.models.Compositions ?? mongoose.model('Compositions', songSchema);
