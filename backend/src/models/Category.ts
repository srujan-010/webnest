import mongoose, { Schema } from 'mongoose'; export default mongoose.model('Category', new Schema({ name: String, slug: String }, { strict: false }));
