import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  title: { type: String, required: true },   // e.g. "ISO 9001:2015"
  image: { type: String, required: true },   // Cloudinary secure_url (or direct URL)
  imagePublicId: { type: String },           // Cloudinary public_id (for delete/replace)
  href: { type: String, default: '' },       // optional link to PDF/details page
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

CertificationSchema.index({ title: 1 }, { unique: false });

export default mongoose.model('Certification', CertificationSchema);
