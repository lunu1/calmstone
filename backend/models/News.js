// models/News.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const NewsSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    slug:        { type: String, unique: true, index: true },
    summary:     { type: String, default: '' },
    content:     { type: String, default: '' },      // plain text / markdown
    image:       { type: String, default: '' },      // Cloudinary URL or direct URL
    tags:        [{ type: String }],
    publishedAt: { type: Date, default: Date.now },
    isActive:    { type: Boolean, default: true },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

NewsSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('News', NewsSchema);
