// models/Job.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const JobSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  department:  { type: String, default: '' },
  location:    { type: String, default: '' },
  type:        { type: String, enum: ['Full-time','Part-time','Contract','Internship','Remote',''], default: '' },
  experience:  { type: String, default: '' },
  salary:      { type: String, default: '' },
  preference:  { type: String, default: '' }, // optional
  description: { type: String, default: '' },
  responsibilities: [{ type: String }],
  requirements:     [{ type: String }],
  postedAt:    { type: Date, default: Date.now },
  closingDate: { type: Date, default: null },

  slug:        { type: String, unique: true, index: true },
  image:       { type: String, default: '' }, // optional header image
  isActive:    { type: Boolean, default: true },
  featured:    { type: Boolean, default: false },
}, { timestamps: true });

JobSchema.pre('validate', function(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Job', JobSchema);
