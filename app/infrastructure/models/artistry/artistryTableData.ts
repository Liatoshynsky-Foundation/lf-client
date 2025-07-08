import mongoose from 'mongoose';

const sheetMusicItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    dateUploaded: { type: Date, default: Date.now },
    isFree: { type: Boolean, default: false }
  },
  { _id: false }
);

const songSchema = new mongoose.Schema(
  {
    opusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Opus' },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    audioAvailable: { type: Boolean, default: true },
    sheetAvailable: { type: Boolean, default: true },
    sheetMusic: [sheetMusicItemSchema]
  },
  { timestamps: true }
);

export const Compositions = mongoose.models.Compositions ?? mongoose.model('Compositions', songSchema);
