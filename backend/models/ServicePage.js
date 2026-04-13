import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  key: { type: String, required: true },      // e.g. "civil-structural" (anchor id)
  title: { type: String, required: true },
  image: { type: String, default: '' },       // Cloudinary/direct URL
  imagePublicId: { type: String, default: '' },
  intro: { type: String, default: '' },
  scope: [{ type: String }],
  conclusion: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { _id: true, timestamps: true });

const ServicePageSchema = new mongoose.Schema({
  title: { type: String, required: true },    // e.g. "Oilfield Surface Construction"
  slug:  { type: String, required: true, unique: true }, // "construction"
  heroImage: { type: String, default: '' },
  summary: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  sections: [SectionSchema],
  seo: { title: String, description: String },
}, { timestamps: true });

ServicePageSchema.index({ isActive: 1, order: 1 });
export default mongoose.model('ServicePage', ServicePageSchema);
