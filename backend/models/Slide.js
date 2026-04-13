import mongoose from 'mongoose';


const SlideSchema = new mongoose.Schema({
image: { type: String, required: true },
heading: { type: String, required: true },
subheading: { type: String, required: true },
order: { type: Number, default: 0 },
isActive: { type: Boolean, default: true }
}, { timestamps: true });


export default mongoose.model('Slide', SlideSchema);