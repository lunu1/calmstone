import mongoose from 'mongoose';

// Flexible structure for various sections (about, services, testimonials, cta, etc.)
const SectionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },   // e.g., 'about', 'services', 'cta'
    title: { type: String },
    subtitle: { type: String },
    content: { type: String },                // rich text or JSON string
    image: { type: String },
    imagePublicId: { type: String },
    items: [
      {
        image: String,
        title: String,
        subtitle: String,
        text: String,
        link: String,
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      },
    ],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

SectionSchema.index({ type: 1, title: 1 }, { unique: true });


export default mongoose.model('Section', SectionSchema);
