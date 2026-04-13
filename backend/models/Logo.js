import mongoose from 'mongoose';

const LogoSchema = new mongoose.Schema({
  name: { type: String, required: true },          // display name
  image: { type: String, required: true },         // cloudinary secure_url
  imagePublicId: { type: String },                 // cloudinary public_id (for delete/replace)
  href: { type: String, default: '' },             // optional link
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

LogoSchema.index({ name: 1 }, { unique: false });  // no hard uniqueness by default

export default mongoose.model('Logo', LogoSchema);
