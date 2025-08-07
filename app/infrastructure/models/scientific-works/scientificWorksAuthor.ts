import mongoose from 'mongoose';

const scientificWorksAuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true }
});

export const ScientificWorksAuthor =
  mongoose.models.ScientificWorksAuthor ?? mongoose.model('ScientificWorksAuthor', scientificWorksAuthorSchema);
